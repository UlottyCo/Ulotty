-- Políticas de seguridad (RLS) para el marketplace
-- Requiere que ya exista el esquema de 20260815000000_create_marketplace_schema.sql

-- 0. Agregar el rol 'admin' a los valores permitidos de users.role
alter table public.users drop constraint users_role_check;
alter table public.users add constraint users_role_check
  check (role in ('particular', 'desarrolladora', 'agente', 'comprador', 'admin'));

-- 0.1 Función auxiliar: ¿el usuario que hace la petición es admin?
-- security definer + search_path fijo: evita que la revisión de "role"
-- dependa de las políticas de la propia tabla users, y evita que alguien
-- manipule el search_path para hacerla apuntar a otra tabla.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public, pg_temp
stable
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

-- =========================================================
-- 1. users
-- =========================================================

create policy "Users can view their own profile"
on public.users for select
using (auth.uid() = id);

create policy "Admins can view all profiles"
on public.users for select
using (public.is_admin());

create policy "Users can create their own profile"
on public.users for insert
with check (auth.uid() = id);

-- Puede editar su propia fila, pero role e is_verified deben quedar
-- exactamente igual a como ya estaban guardados (no se auto-asciende).
create policy "Users can update their own basic info"
on public.users for update
using (auth.uid() = id)
with check (
  auth.uid() = id
  and role = (select u.role from public.users u where u.id = auth.uid())
  and is_verified = (select u.is_verified from public.users u where u.id = auth.uid())
);

create policy "Admins can update any profile"
on public.users for update
using (public.is_admin())
with check (public.is_admin());

-- =========================================================
-- 2. listing_groups
-- =========================================================

create policy "Anyone can view listing groups"
on public.listing_groups for select
using (true);

create policy "Owners can create their own listing groups"
on public.listing_groups for insert
with check (owner_id = auth.uid());

-- Puede editar la suya, pero owner_id debe quedar igual (no se puede
-- "regalar" o robar una zona reasignando el dueño).
create policy "Owners can update their own listing groups"
on public.listing_groups for update
using (owner_id = auth.uid())
with check (
  owner_id = (select lg.owner_id from public.listing_groups lg where lg.id = listing_groups.id)
);

create policy "Admins can update any listing group"
on public.listing_groups for update
using (public.is_admin())
with check (public.is_admin());

-- =========================================================
-- 3. listings
-- =========================================================

-- Regla de negocio central: un listing solo es público si no requiere
-- verificación, o si ya tiene una verificación aprobada.
create policy "Public can view verified listings"
on public.listings for select
using (
  not requires_verification
  or exists (
    select 1 from public.verifications v
    where v.listing_id = listings.id and v.status = 'aprobado'
  )
);

create policy "Owners can view their own listings"
on public.listings for select
using (
  exists (
    select 1 from public.listing_groups lg
    where lg.id = listings.listing_group_id and lg.owner_id = auth.uid()
  )
);

create policy "Admins can view all listings"
on public.listings for select
using (public.is_admin());

create policy "Owners can create listings in their own groups"
on public.listings for insert
with check (
  exists (
    select 1 from public.listing_groups lg
    where lg.id = listing_group_id and lg.owner_id = auth.uid()
  )
);

-- Puede editar los suyos, pero requires_verification debe quedar igual
-- (no se puede auto-eximir de la verificación) y el listing debe seguir
-- perteneciendo a un listing_group propio.
create policy "Owners can update their own listings"
on public.listings for update
using (
  exists (
    select 1 from public.listing_groups lg
    where lg.id = listings.listing_group_id and lg.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.listing_groups lg
    where lg.id = listing_group_id and lg.owner_id = auth.uid()
  )
  and requires_verification = (select l.requires_verification from public.listings l where l.id = listings.id)
);

create policy "Admins can update any listing"
on public.listings for update
using (public.is_admin())
with check (public.is_admin());

-- =========================================================
-- 4. leads
-- =========================================================

create policy "Buyers can view their own leads"
on public.leads for select
using (buyer_id = auth.uid());

create policy "Owners can view leads on their listings"
on public.leads for select
using (
  exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = leads.listing_id and lg.owner_id = auth.uid()
  )
);

create policy "Admins can view all leads"
on public.leads for select
using (public.is_admin());

-- Cualquier usuario autenticado puede registrar un lead sobre sí mismo,
-- sin importar su role.
create policy "Authenticated users can create leads about themselves"
on public.leads for insert
with check (buyer_id = auth.uid());

-- =========================================================
-- 5. verifications
-- =========================================================

create policy "Owners can view verifications on their listings"
on public.verifications for select
using (
  exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = verifications.listing_id and lg.owner_id = auth.uid()
  )
);

create policy "Admins can view all verifications"
on public.verifications for select
using (public.is_admin());

create policy "Owners can submit verifications for their listings"
on public.verifications for insert
with check (
  exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = listing_id and lg.owner_id = auth.uid()
  )
);

-- Solo admin aprueba/rechaza. El dueño nunca puede tocar el estatus de
-- su propio documento (evita auto-aprobación).
create policy "Admins can review verifications"
on public.verifications for update
using (public.is_admin())
with check (public.is_admin());

-- =========================================================
-- 6. listing_status_history
-- =========================================================
-- Solo lectura por ahora: el llenado automático llega con el trigger
-- de cambio de estatus (paso futuro).

create policy "Owners can view status history of their listings"
on public.listing_status_history for select
using (
  exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = listing_status_history.listing_id and lg.owner_id = auth.uid()
  )
);

create policy "Admins can view all status history"
on public.listing_status_history for select
using (public.is_admin());
