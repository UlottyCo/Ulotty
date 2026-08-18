-- Trigger que crea automáticamente la fila en public.users cuando alguien
-- se registra vía Supabase Auth. Espera que el formulario de registro
-- mande full_name y role en options.data del signUp():
--
--   supabase.auth.signUp({
--     email, password,
--     options: { data: { full_name: "...", role: "comprador" } }
--   })

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_role text := new.raw_user_meta_data->>'role';
  v_full_name text := new.raw_user_meta_data->>'full_name';
begin
  -- 'admin' nunca se acepta por esta vía, aunque alguien lo mande a mano
  -- llamando la API de Auth directo (sin pasar por el formulario). El
  -- rol admin solo se asigna manualmente desde el dashboard.
  if v_role is null or v_role not in ('particular', 'desarrolladora', 'agente', 'comprador') then
    raise exception 'Rol inválido para registro público: %', v_role;
  end if;

  if v_full_name is null or length(trim(v_full_name)) = 0 then
    raise exception 'full_name es requerido para registrarse';
  end if;

  insert into public.users (id, full_name, email, role, is_verified)
  values (new.id, v_full_name, new.email, v_role, false);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
