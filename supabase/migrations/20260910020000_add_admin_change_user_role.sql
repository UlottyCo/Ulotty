-- Herramienta de admin para cambiar el rol de un usuario manualmente.
-- Aditiva: no toca ninguna cuenta existente por sí sola, solo corre
-- cuando el admin la llama explícitamente sobre un usuario puntual.

create or replace function public.admin_change_user_role(p_user_id uuid, p_new_role text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.is_admin() then
    raise exception 'Solo un admin puede cambiar roles.';
  end if;

  if p_new_role not in ('particular', 'desarrolladora', 'agente', 'comprador') then
    raise exception 'Rol inválido: %', p_new_role;
  end if;

  if (select role from public.users where id = p_user_id) = 'admin' then
    raise exception 'No se puede cambiar el rol de una cuenta admin desde aquí.';
  end if;

  update public.users set role = p_new_role where id = p_user_id;
end;
$$;
