-- La página de registro real también manda "phone" en options.data.
-- Actualiza la función del trigger para copiarlo también a public.users.
-- (phone es opcional: se guarda null si no lo mandan).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_role text := new.raw_user_meta_data->>'role';
  v_full_name text := new.raw_user_meta_data->>'full_name';
  v_phone text := new.raw_user_meta_data->>'phone';
begin
  if v_role is null or v_role not in ('particular', 'desarrolladora', 'agente', 'comprador') then
    raise exception 'Rol inválido para registro público: %', v_role;
  end if;

  if v_full_name is null or length(trim(v_full_name)) = 0 then
    raise exception 'full_name es requerido para registrarse';
  end if;

  insert into public.users (id, full_name, email, phone, role, is_verified)
  values (new.id, v_full_name, new.email, v_phone, v_role, false);

  return new;
end;
$$;
