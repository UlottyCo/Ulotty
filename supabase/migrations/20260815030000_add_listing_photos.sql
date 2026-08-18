-- Fotos de propiedades: tabla de metadata + bucket de Storage + políticas.

-- =========================================================
-- 1. Tabla listing_photos
-- =========================================================

create table public.listing_photos (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  storage_path text not null unique,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index listing_photos_listing_id_idx on public.listing_photos (listing_id);

alter table public.listing_photos enable row level security;

-- Mismo criterio de visibilidad que listings: público si el listing no
-- requiere verificación o ya tiene una aprobada; el dueño ve las suyas
-- siempre; admin ve todas.
create policy "Public can view photos of visible listings"
on public.listing_photos for select
using (
  exists (
    select 1 from public.listings l
    where l.id = listing_photos.listing_id
      and (
        not l.requires_verification
        or exists (
          select 1 from public.verifications v
          where v.listing_id = l.id and v.status = 'aprobado'
        )
      )
  )
);

create policy "Owners can view photos of their own listings"
on public.listing_photos for select
using (
  exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = listing_photos.listing_id and lg.owner_id = auth.uid()
  )
);

create policy "Admins can view all listing photos"
on public.listing_photos for select
using (public.is_admin());

create policy "Owners can add photos to their own listings"
on public.listing_photos for insert
with check (
  exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = listing_id and lg.owner_id = auth.uid()
  )
);

-- Editar = reordenar (position). El listing_id no se puede reasignar a
-- uno ajeno (mismo patrón que ya usamos en listings/listing_groups).
create policy "Owners can reorder photos of their own listings"
on public.listing_photos for update
using (
  exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = listing_photos.listing_id and lg.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = listing_id and lg.owner_id = auth.uid()
  )
);

create policy "Admins can update any listing photo"
on public.listing_photos for update
using (public.is_admin())
with check (public.is_admin());

-- Excepción a la regla de "nadie borra": una foto es un archivo de
-- presentación, no un registro de auditoría del negocio. El dueño puede
-- borrar/reemplazar sus propias fotos sin depender de un admin.
create policy "Owners can delete photos of their own listings"
on public.listing_photos for delete
using (
  exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id = listing_photos.listing_id and lg.owner_id = auth.uid()
  )
);

create policy "Admins can delete any listing photo"
on public.listing_photos for delete
using (public.is_admin());

-- =========================================================
-- 2. Bucket de Storage
-- =========================================================
-- Público para lectura (cualquiera con la ruta exacta puede descargar),
-- pero la ruta solo se descubre a través de listing_photos, que tiene
-- las mismas reglas de visibilidad que listings. 5MB máximo, solo
-- imágenes.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-photos',
  'listing-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- =========================================================
-- 3. Políticas de Storage (storage.objects)
-- =========================================================
-- Convención de ruta: {listing_id}/{uuid}.{ext}
-- storage.foldername(name) da el/los segmentos de carpeta del path;
-- el primero es el listing_id.

create policy "Owners can upload photos for their own listings"
on storage.objects for insert
with check (
  bucket_id = 'listing-photos'
  and exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id::text = (storage.foldername(name))[1]
      and lg.owner_id = auth.uid()
  )
);

create policy "Owners can list their own listing photo files"
on storage.objects for select
using (
  bucket_id = 'listing-photos'
  and exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id::text = (storage.foldername(name))[1]
      and lg.owner_id = auth.uid()
  )
);

create policy "Admins can list all listing photo files"
on storage.objects for select
using (
  bucket_id = 'listing-photos'
  and public.is_admin()
);

create policy "Owners can delete their own listing photo files"
on storage.objects for delete
using (
  bucket_id = 'listing-photos'
  and exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id::text = (storage.foldername(name))[1]
      and lg.owner_id = auth.uid()
  )
);

create policy "Admins can delete any listing photo file"
on storage.objects for delete
using (
  bucket_id = 'listing-photos'
  and public.is_admin()
);
