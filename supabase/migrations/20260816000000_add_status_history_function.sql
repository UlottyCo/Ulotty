-- Panel de propietario: selector rápido de estatus + bitácora automática.
--
-- Esta migración hace dos cosas:
-- 1. Agrega la función update_listing_status(), que centraliza cualquier
--    cambio de estatus de un predio: valida quién puede hacerlo, exige
--    un motivo obligatorio cuando el nuevo estatus es 'vendido_fuera'
--    (protección de comisión), actualiza listings y registra la bitácora
--    en listing_status_history, todo en una sola transacción.
-- 2. Corrige un hueco real que este selector habría dejado expuesto: las
--    políticas públicas de listings/listing_photos solo revisaban la
--    verificación aprobada, nunca el estatus. Sin este fix, un predio
--    marcado como 'vendido' o 'vendido_fuera' seguiría apareciendo en
--    /propiedades como si estuviera disponible.

-- 1a. La bitácora necesita poder guardar el motivo del cambio.
-- "if not exists" para que sea seguro volver a correr este script si
-- una corrida anterior falló a medias (Supabase corre todo el archivo
-- como una sola transacción: si algo falla, nada de lo anterior queda
-- aplicado, así que reintentar el archivo completo debe ser inofensivo).
alter table public.listing_status_history
  add column if not exists reason text;

-- 1b. Es security definer porque listing_status_history no tiene (ni debe
-- tener) una política de INSERT abierta a los usuarios: así nadie puede
-- insertar renglones falsos en la bitácora directamente, solo a través de
-- esta función controlada, que primero valida el permiso a mano (mismo
-- patrón que is_admin() y las demás funciones auxiliares).
create or replace function public.update_listing_status(
  p_listing_id uuid,
  p_new_status text,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_is_owner boolean;
begin
  if auth.uid() is null then
    raise exception 'No autorizado.';
  end if;

  if p_new_status not in ('disponible', 'apartado', 'vendido', 'vendido_fuera') then
    raise exception 'Estatus inválido: %', p_new_status;
  end if;

  select exists (
    select 1
    from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = p_listing_id and lg.owner_id = auth.uid()
  ) into v_is_owner;

  if not v_is_owner and not public.is_admin() then
    raise exception 'No tienes permiso para cambiar el estatus de este predio.';
  end if;

  if p_new_status = 'vendido_fuera' and (p_reason is null or trim(p_reason) = '') then
    raise exception 'Debes indicar un motivo para marcar "vendido fuera de la plataforma".';
  end if;

  update public.listings
  set status = p_new_status, status_changed_at = now()
  where id = p_listing_id;

  if not found then
    raise exception 'Predio no encontrado.';
  end if;

  insert into public.listing_status_history (listing_id, status, changed_by, reason)
  values (p_listing_id, p_new_status, auth.uid(), p_reason);
end;
$$;

-- 2. Ahora sí, revisar el estatus para visibilidad pública — no solo la
-- verificación. La regla de negocio (decidida desde el inicio del
-- proyecto): 'disponible' y 'apartado' son visibles (dan transparencia
-- de qué hay disponible y qué ya está en proceso), 'vendido' TAMBIÉN
-- sigue siendo visible (prueba social de que la plataforma sí vende),
-- pero 'vendido_fuera' se oculta (ya no es una oportunidad real, y es
-- justo el caso que se rastrea por posible pérdida de comisión).
-- 'borrador' nunca es público.
drop policy "Public can view verified listings" on public.listings;
create policy "Public can view verified listings"
on public.listings for select
using (
  status in ('disponible', 'apartado', 'vendido')
  and (
    not requires_verification
    or public.listing_has_approved_verification(listings.id)
  )
);

drop policy "Public can view photos of visible listings" on public.listing_photos;
create policy "Public can view photos of visible listings"
on public.listing_photos for select
using (
  exists (
    select 1 from public.listings l
    where l.id = listing_photos.listing_id
      and l.status in ('disponible', 'apartado', 'vendido')
      and (
        not l.requires_verification
        or public.listing_has_approved_verification(l.id)
      )
  )
);
