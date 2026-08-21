-- Fase 1 del modelo de negocio: comisión escalonada, penalización por
-- "vendido fuera", y tipo de cambio sugerido (manual, sin integración
-- externa por ahora).

-- =========================================================
-- 1. Columnas nuevas
-- =========================================================

-- Comisión: se calcula y se guarda UNA sola vez, en la primera salida
-- de 'borrador'. No se recalcula si el predio vuelve a pasar por
-- 'apartado' y regresa a 'disponible'.
alter table public.listings
  add column commission_rate_pct numeric(4, 2),
  add column commission_amount_mxn numeric(12, 2);

-- price_mxn_snapshot: el precio del predio en el momento exacto en que
-- entró a 'disponible' (se guarda en CADA transición a 'disponible',
-- no solo la primera — un predio puede reactivarse varias veces).
--
-- penalty_amount_mxn / penalty_status: solo se llenan cuando la fila es
-- una transición a 'vendido_fuera'. El monto se calcula sobre el precio
-- de la ÚLTIMA vez que el predio estuvo 'disponible' (price_mxn_snapshot
-- de esa fila anterior), no el precio actual — así nadie puede bajar el
-- precio justo antes de marcarlo para reducir la penalización.
alter table public.listing_status_history
  add column price_mxn_snapshot numeric(12, 2),
  add column penalty_amount_mxn numeric(12, 2),
  add column penalty_status text check (penalty_status in ('pendiente', 'cobrado'));

-- =========================================================
-- 2. Tipo de cambio del día (100% manual, sin integración externa)
-- =========================================================

-- Cada actualización del admin es una fila nueva (igual que el resto
-- del proyecto: nadie borra/edita, es un registro histórico). "El tipo
-- de cambio de hoy" = la fila más reciente por set_at.
create table public.daily_exchange_rate (
  id uuid primary key default gen_random_uuid(),
  rate numeric(8, 4) not null,
  set_by uuid not null references public.users (id),
  set_at timestamptz not null default now()
);

alter table public.daily_exchange_rate enable row level security;

create policy "Authenticated users can view exchange rates"
on public.daily_exchange_rate for select
using (auth.uid() is not null);

create policy "Admins can set exchange rate"
on public.daily_exchange_rate for insert
with check (public.is_admin());

-- =========================================================
-- 3. Política de UPDATE para marcar una penalización como cobrada
-- =========================================================

-- listing_status_history seguía sin política de UPDATE (append-only a
-- propósito). Esta es angosta: solo admin, y en la práctica la Server
-- Action solo va a tocar penalty_status — RLS no restringe columna por
-- columna, pero el código de la app es el único que escribe aquí.
create policy "Admins can update penalty status"
on public.listing_status_history for update
using (public.is_admin())
with check (public.is_admin());

-- =========================================================
-- 4. update_listing_status(): ahora también calcula comisión,
--    guarda el precio en cada 'disponible', y calcula la penalización
--    al marcar 'vendido_fuera'.
-- =========================================================

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
  v_owner_id uuid;
  v_owner_role text;
  v_current_status text;
  v_price_mxn numeric;
  v_commission_rate_pct numeric;
  v_commission_amount_mxn numeric;
  v_other_activated_count int;
  v_price_snapshot numeric;
  v_last_disponible_price numeric;
  v_penalty_amount numeric;
  v_penalty_status text;
begin
  if auth.uid() is null then
    raise exception 'No autorizado.';
  end if;

  if p_new_status not in ('disponible', 'apartado', 'vendido', 'vendido_fuera') then
    raise exception 'Estatus inválido: %', p_new_status;
  end if;

  select l.status, l.price_mxn, lg.owner_id
  into v_current_status, v_price_mxn, v_owner_id
  from public.listings l
  join public.listing_groups lg on lg.id = l.listing_group_id
  where l.id = p_listing_id;

  if v_owner_id is null then
    raise exception 'Predio no encontrado.';
  end if;

  v_is_owner := (v_owner_id = auth.uid());

  if not v_is_owner and not public.is_admin() then
    raise exception 'No tienes permiso para cambiar el estatus de este predio.';
  end if;

  if p_new_status = 'vendido_fuera' and (p_reason is null or trim(p_reason) = '') then
    raise exception 'Debes indicar un motivo para marcar "vendido fuera de la plataforma".';
  end if;

  -- Comisión: solo la primera vez que sale de 'borrador'. Por ahora
  -- solo definida para dueños con role = 'particular' — desarrolladora
  -- y agente todavía no tienen modelo de comisión (queda null).
  if v_current_status = 'borrador' and p_new_status = 'disponible' then
    select role into v_owner_role from public.users where id = v_owner_id;

    if v_owner_role = 'particular' then
      select count(*) into v_other_activated_count
      from public.listings l2
      join public.listing_groups lg2 on lg2.id = l2.listing_group_id
      where lg2.owner_id = v_owner_id
        and l2.id <> p_listing_id
        and l2.commission_rate_pct is not null;

      if v_other_activated_count > 0 then
        v_commission_rate_pct := 2.5;
      elsif v_price_mxn < 1000000 then
        v_commission_rate_pct := 4.0;
      elsif v_price_mxn <= 3000000 then
        v_commission_rate_pct := 3.5;
      else
        v_commission_rate_pct := 3.0;
      end if;

      v_commission_amount_mxn := round(v_price_mxn * v_commission_rate_pct / 100, 2);
    end if;
  end if;

  if p_new_status = 'disponible' then
    v_price_snapshot := v_price_mxn;
  end if;

  if p_new_status = 'vendido_fuera' then
    select price_mxn_snapshot into v_last_disponible_price
    from public.listing_status_history
    where listing_id = p_listing_id
      and status = 'disponible'
      and price_mxn_snapshot is not null
    order by changed_at desc
    limit 1;

    -- Si por algún motivo no hay un snapshot previo (predio muy viejo,
    -- de antes de que existiera esta columna), usamos el precio actual
    -- como mejor dato disponible.
    v_penalty_amount := round(coalesce(v_last_disponible_price, v_price_mxn) * 0.015, 2);
    v_penalty_status := 'pendiente';
  end if;

  update public.listings
  set
    status = p_new_status,
    status_changed_at = now(),
    commission_rate_pct = coalesce(v_commission_rate_pct, commission_rate_pct),
    commission_amount_mxn = coalesce(v_commission_amount_mxn, commission_amount_mxn)
  where id = p_listing_id;

  insert into public.listing_status_history
    (listing_id, status, changed_by, reason, price_mxn_snapshot, penalty_amount_mxn, penalty_status)
  values
    (p_listing_id, p_new_status, auth.uid(), p_reason, v_price_snapshot, v_penalty_amount, v_penalty_status);
end;
$$;
