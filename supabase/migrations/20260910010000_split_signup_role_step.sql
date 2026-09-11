-- Registro en 2 pasos: Paso 1 (cuenta) ya no pide rol, Paso 2
-- ("¿Cómo vas a usar Ulotty?") lo pide después. No cambia los roles
-- que ya existen, ni sus nombres — solo cuándo se preguntan.

-- role deja de ser obligatorio en el insert inicial: un usuario recién
-- registrado vive un momento con role = null hasta que completa el
-- Paso 2. El check constraint ya existente (role in (...)) no necesita
-- tocarse: en Postgres NULL siempre pasa un CHECK, solo lo bloquea un
-- valor que esté explícitamente fuera de la lista.
alter table public.users alter column role drop not null;

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
  if v_role is not null and v_role not in ('particular', 'desarrolladora', 'agente', 'comprador') then
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

-- Guarda el rol elegido en el Paso 2. Solo funciona una vez (mientras
-- el usuario todavía no tiene rol) — así no reabre la puerta que ya
-- cerramos en "Users can update their own basic info" (esa política
-- bloquea que un usuario cambie su propio role vía .update() normal).
create or replace function public.set_initial_role(p_role text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null then
    raise exception 'No autenticado';
  end if;

  if p_role not in ('particular', 'desarrolladora', 'agente', 'comprador') then
    raise exception 'Rol inválido: %', p_role;
  end if;

  update public.users
  set role = p_role
  where id = auth.uid()
    and role is null;

  if not found then
    raise exception 'Ya tienes un rol asignado o tu cuenta no existe.';
  end if;
end;
$$;
