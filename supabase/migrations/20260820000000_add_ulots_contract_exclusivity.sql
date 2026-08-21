-- Fase 2 del modelo de negocio: sistema de Ulots (crédito para
-- mantener activo un 2do predio en adelante), vigencia del contrato
-- (renovación automática cada 90 días), y exclusividad opcional.
--
-- Reglas confirmadas:
-- - Ulots aplica a dueños 'particular' y 'agente'. 'desarrolladora'
--   queda exenta (usará su plan de suscripción, Fase 4).
-- - 'apartado' consigue Ulots igual que 'disponible' — el reloj no se
--   pausa.
-- - Sin saldo: el predio pasa a 'pausado_por_falta_de_credito' (nunca
--   se borra, solo se oculta al público).
-- - En esta fase, sin pasarela de pago real: el admin asigna Ulots a
--   mano desde /panel/admin, simulando una compra.
-- - "Cola de protección" de 90 días: por ahora solo informativa
--   (se muestra la fecha, sin ninguna lógica automática todavía).
-- - Exclusividad: el dueño la acepta con un checkbox (Paso 2 o desde
--   su panel), sin límite de cupo. La foto profesional gratis para los
--   primeros 10 queda FUERA de esta fase a propósito.

-- =========================================================
-- 1. Columnas nuevas en listings
-- =========================================================

alter table public.listings
  add column requires_ulot boolean not null default false,
  add column next_renewal_at timestamptz,
  add column delisted_at timestamptz,
  add column is_exclusive boolean not null default false,
  add column exclusive_until date;

alter table public.listings drop constraint listings_status_check;
alter table public.listings add constraint listings_status_check
  check (status in (
    'borrador', 'disponible', 'apartado', 'vendido', 'vendido_fuera',
    'pausado_por_falta_de_credito'
  ));

-- =========================================================
-- 2. Bitácora de Ulots (nadie edita/borra — el saldo de un dueño es
--    la suma de sus deltas, no un número aparte que se pueda
--    desincronizar)
-- =========================================================

create table public.ulot_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  delta integer not null,
  reason text not null,
  related_listing_id uuid references public.listings (id) on delete set null,
  created_by uuid references public.users (id),
  created_at timestamptz not null default now()
);

create index ulot_transactions_user_id_idx on public.ulot_transactions (user_id);

alter table public.ulot_transactions enable row level security;

create policy "Owners can view their own ulot transactions"
on public.ulot_transactions for select
using (user_id = auth.uid());

create policy "Admins can view all ulot transactions"
on public.ulot_transactions for select
using (public.is_admin());

-- Sin política de INSERT: todas las filas se crean a través de
-- grant_ulots() (admin) o process_listing_renewals() (sistema), ambas
-- security definer — igual que listing_status_history, nadie inserta
-- directo.

-- =========================================================
-- 3. grant_ulots(): el admin asigna Ulots a mano (simulando una
--    compra, mientras no haya pasarela de pago real)
-- =========================================================

create or replace function public.grant_ulots(
  p_user_id uuid,
  p_amount integer,
  p_reason text default 'Asignado manualmente por admin'
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.is_admin() then
    raise exception 'Solo un admin puede asignar Ulots.';
  end if;

  if p_amount = 0 then
    raise exception 'La cantidad debe ser distinta de cero.';
  end if;

  insert into public.ulot_transactions (user_id, delta, reason, created_by)
  values (p_user_id, p_amount, p_reason, auth.uid());
end;
$$;

-- =========================================================
-- 4. update_listing_status(): ahora también maneja Ulots (cobro al
--    activar/reactivar, candado si no hay saldo) y las fechas de
--    vigencia del contrato / cola de protección.
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
  v_requires_ulot boolean;
  v_commission_rate_pct numeric;
  v_commission_amount_mxn numeric;
  v_other_activated_count int;
  v_is_first_activation boolean;
  v_price_snapshot numeric;
  v_last_disponible_price numeric;
  v_penalty_amount numeric;
  v_penalty_status text;
  v_next_renewal_at timestamptz;
  v_delisted_at timestamptz;
  v_ulot_balance integer;
begin
  if auth.uid() is null then
    raise exception 'No autorizado.';
  end if;

  if p_new_status not in ('disponible', 'apartado', 'vendido', 'vendido_fuera') then
    raise exception 'Estatus inválido: %', p_new_status;
  end if;

  select l.status, l.price_mxn, l.requires_ulot, lg.owner_id
  into v_current_status, v_price_mxn, v_requires_ulot, v_owner_id
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

  select role into v_owner_role from public.users where id = v_owner_id;

  -- "¿Ya activó algún otro predio antes?" — señal compartida por la
  -- comisión y por Ulots: cualquier otro listing suyo que ya haya
  -- salido de 'borrador' (sin importar su estatus actual) cuenta.
  select count(*) into v_other_activated_count
  from public.listings l2
  join public.listing_groups lg2 on lg2.id = l2.listing_group_id
  where lg2.owner_id = v_owner_id
    and l2.id <> p_listing_id
    and l2.status <> 'borrador';

  v_is_first_activation := (v_other_activated_count = 0);

  -- Comisión: solo la primera vez que sale de 'borrador', solo para
  -- 'particular'. No se recalcula en reactivaciones.
  if v_current_status = 'borrador' and p_new_status = 'disponible' and v_owner_role = 'particular' then
    if not v_is_first_activation then
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

  -- Ulots: se activa (primera vez) o se reactiva (desde pausado por
  -- falta de crédito). En ambos casos, si requiere Ulot, se cobra 1 de
  -- inmediato — el candado real es que no puede completarse sin saldo.
  if p_new_status = 'disponible' and v_current_status in ('borrador', 'pausado_por_falta_de_credito') then
    if v_current_status = 'borrador' then
      -- primera activación: aquí es donde se fija requires_ulot para
      -- siempre.
      if v_owner_role in ('particular', 'agente') then
        v_requires_ulot := not v_is_first_activation;
      else
        v_requires_ulot := false;
      end if;
    end if;
    -- si viene de 'pausado_por_falta_de_credito', v_requires_ulot ya
    -- viene cargado de la fila (siempre true en ese caso, porque solo
    -- se pausa por eso quien sí lo requiere).

    if v_requires_ulot then
      select coalesce(sum(delta), 0) into v_ulot_balance
      from public.ulot_transactions
      where user_id = v_owner_id;

      if v_ulot_balance < 1 then
        raise exception 'No tienes Ulots suficientes para activar este predio. Contacta al administrador para recargar.';
      end if;

      insert into public.ulot_transactions (user_id, delta, reason, related_listing_id, created_by)
      values (v_owner_id, -1, 'Consumo por activación de predio', p_listing_id, auth.uid());
    end if;

    v_next_renewal_at := now() + interval '90 days';
    v_delisted_at := null;
  end if;

  -- Precio a guardar en la bitácora: en cada entrada a 'disponible'.
  if p_new_status = 'disponible' then
    v_price_snapshot := v_price_mxn;
  end if;

  -- Se "da de baja" (empieza a correr la cola de protección de 90
  -- días) al vender o al reportar venta fuera de la plataforma.
  if p_new_status in ('vendido', 'vendido_fuera') then
    v_delisted_at := now();
  end if;

  if p_new_status = 'vendido_fuera' then
    select price_mxn_snapshot into v_last_disponible_price
    from public.listing_status_history
    where listing_id = p_listing_id
      and status = 'disponible'
      and price_mxn_snapshot is not null
    order by changed_at desc
    limit 1;

    v_penalty_amount := round(coalesce(v_last_disponible_price, v_price_mxn) * 0.015, 2);
    v_penalty_status := 'pendiente';
  end if;

  update public.listings
  set
    status = p_new_status,
    status_changed_at = now(),
    commission_rate_pct = coalesce(v_commission_rate_pct, commission_rate_pct),
    commission_amount_mxn = coalesce(v_commission_amount_mxn, commission_amount_mxn),
    requires_ulot = coalesce(v_requires_ulot, requires_ulot),
    next_renewal_at = coalesce(v_next_renewal_at, next_renewal_at),
    delisted_at = case when v_delisted_at is not null or p_new_status = 'disponible'
                        then v_delisted_at
                        else delisted_at end
  where id = p_listing_id;

  insert into public.listing_status_history
    (listing_id, status, changed_by, reason, price_mxn_snapshot, penalty_amount_mxn, penalty_status)
  values
    (p_listing_id, p_new_status, auth.uid(), p_reason, v_price_snapshot, v_penalty_amount, v_penalty_status);
end;
$$;

-- =========================================================
-- 5. process_listing_renewals(): la corrida diaria de pg_cron. No
--    revisa auth.uid() (no hay sesión — corre como tarea programada de
--    Postgres) y por eso se bloquea la ejecución directa desde la API.
-- =========================================================

create or replace function public.process_listing_renewals()
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_listing record;
  v_balance integer;
begin
  for v_listing in
    select l.id, l.requires_ulot, lg.owner_id
    from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.status in ('disponible', 'apartado')
      and l.next_renewal_at is not null
      and l.next_renewal_at <= now()
  loop
    if v_listing.requires_ulot then
      select coalesce(sum(delta), 0) into v_balance
      from public.ulot_transactions
      where user_id = v_listing.owner_id;

      if v_balance >= 1 then
        insert into public.ulot_transactions (user_id, delta, reason, related_listing_id)
        values (v_listing.owner_id, -1, 'Consumo por renovación automática (90 días)', v_listing.id);

        update public.listings
        set next_renewal_at = next_renewal_at + interval '90 days'
        where id = v_listing.id;
      else
        update public.listings
        set status = 'pausado_por_falta_de_credito',
            status_changed_at = now(),
            delisted_at = now()
        where id = v_listing.id;

        insert into public.listing_status_history (listing_id, status, changed_by, reason)
        values (v_listing.id, 'pausado_por_falta_de_credito', null, 'Sin saldo de Ulots suficiente para renovar');
      end if;
    else
      update public.listings
      set next_renewal_at = next_renewal_at + interval '90 days'
      where id = v_listing.id;
    end if;
  end loop;
end;
$$;

revoke execute on function public.process_listing_renewals() from public, anon, authenticated;

-- =========================================================
-- 6. Programar la corrida diaria (necesita la extensión pg_cron
--    habilitada: Database → Extensions → pg_cron, en tu dashboard de
--    Supabase). Si esta línea falla, actívala ahí y vuelve a correr
--    solo este bloque.
-- =========================================================

create extension if not exists pg_cron;

select cron.schedule(
  'process-listing-renewals',
  '0 6 * * *',
  $$select public.process_listing_renewals();$$
);
