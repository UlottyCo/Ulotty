-- Corrige "infinite recursion detected in policy for relation 'listings'"
-- (código 42P17).
--
-- Causa: la política "Public can view verified listings" (en listings)
-- consulta verifications; la política "Owners can view verifications on
-- their listings" (en verifications) consulta de vuelta listings. Cada
-- una depende de la otra → ciclo infinito al planear la consulta.
--
-- Arreglo: mismo patrón que is_admin() — una función security definer
-- rompe el ciclo, porque al correr con los permisos del dueño de la
-- tabla (no los del usuario que hace la consulta) no vuelve a disparar
-- las políticas de RLS de verifications.

create or replace function public.listing_has_approved_verification(p_listing_id uuid)
returns boolean
language sql
security definer
set search_path = public, pg_temp
stable
as $$
  select exists (
    select 1 from public.verifications v
    where v.listing_id = p_listing_id and v.status = 'aprobado'
  );
$$;

drop policy "Public can view verified listings" on public.listings;
create policy "Public can view verified listings"
on public.listings for select
using (
  not requires_verification
  or public.listing_has_approved_verification(listings.id)
);

-- listing_photos tenía la misma lógica duplicada a mano (mismo riesgo).
-- La reescribo usando la función para que quede consistente.
drop policy "Public can view photos of visible listings" on public.listing_photos;
create policy "Public can view photos of visible listings"
on public.listing_photos for select
using (
  exists (
    select 1 from public.listings l
    where l.id = listing_photos.listing_id
      and (
        not l.requires_verification
        or public.listing_has_approved_verification(l.id)
      )
  )
);
