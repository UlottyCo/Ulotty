-- Panel de propietario: sección de contactos (leads) por predio.
--
-- Hasta ahora un dueño podía ver que existía un lead (fila en `leads`),
-- pero no el perfil del comprador que lo generó: la única política de
-- SELECT en `users` es "cada quien ve su propio perfil" (o admin).
--
-- Esta política es más estrecha que "cualquier dueño ve cualquier
-- usuario": solo deja ver el perfil de un comprador si ese comprador ya
-- generó un lead en uno de los predios del dueño que consulta. No abre
-- visibilidad general de usuarios.
create policy "Owners can view buyers who contacted their listings"
on public.users for select
using (
  exists (
    select 1 from public.leads le
    join public.listings l on l.id = le.listing_id
    join public.listing_groups lg on lg.id = l.listing_group_id
    where le.buyer_id = users.id and lg.owner_id = auth.uid()
  )
);
