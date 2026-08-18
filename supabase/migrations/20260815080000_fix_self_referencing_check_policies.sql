-- Corrección preventiva: users, listing_groups y listings tienen
-- políticas de UPDATE cuyo WITH CHECK consulta la MISMA tabla para
-- comparar el valor nuevo contra el guardado (protegiendo role/
-- is_verified, owner_id, y requires_verification respectivamente). Es
-- el mismo patrón estructural que causó la recursión infinita entre
-- listings y verifications — no confirmado que esté fallando aquí
-- todavía, pero es el mismo riesgo, así que se corrige con el mismo
-- patrón (función security definer) antes de que también falle.

create or replace function public.get_user_role(p_user_id uuid)
returns text
language sql
security definer
set search_path = public, pg_temp
stable
as $$
  select role from public.users where id = p_user_id;
$$;

create or replace function public.get_user_is_verified(p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public, pg_temp
stable
as $$
  select is_verified from public.users where id = p_user_id;
$$;

create or replace function public.get_listing_group_owner_id(p_group_id uuid)
returns uuid
language sql
security definer
set search_path = public, pg_temp
stable
as $$
  select owner_id from public.listing_groups where id = p_group_id;
$$;

create or replace function public.get_listing_requires_verification(p_listing_id uuid)
returns boolean
language sql
security definer
set search_path = public, pg_temp
stable
as $$
  select requires_verification from public.listings where id = p_listing_id;
$$;

drop policy "Users can update their own basic info" on public.users;
create policy "Users can update their own basic info"
on public.users for update
using (auth.uid() = id)
with check (
  auth.uid() = id
  and role = public.get_user_role(auth.uid())
  and is_verified = public.get_user_is_verified(auth.uid())
);

drop policy "Owners can update their own listing groups" on public.listing_groups;
create policy "Owners can update their own listing groups"
on public.listing_groups for update
using (owner_id = auth.uid())
with check (
  owner_id = public.get_listing_group_owner_id(listing_groups.id)
);

drop policy "Owners can update their own listings" on public.listings;
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
  and requires_verification = public.get_listing_requires_verification(listings.id)
);
