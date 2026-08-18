-- Renombra document_url a document_path: guardamos la ruta dentro del
-- bucket, no una URL pública (el bucket de abajo es privado).
alter table public.verifications rename column document_url to document_path;

-- Bucket privado para documentos de verificación (escrituras,
-- identificación). A diferencia de listing-photos, NO es público: solo
-- el dueño del predio y un admin pueden acceder, y solo vía su propia
-- sesión autenticada.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'verification-documents',
  'verification-documents',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do nothing;

-- Políticas de storage.objects para este bucket.
-- Convención de ruta: {listing_id}/{uuid}.{ext}
-- Nota: no hay política de delete — mismo criterio que verifications
-- (nadie borra desde la app; un documento rechazado se reemplaza con
-- una fila/archivo nuevo, no se elimina el viejo).

create policy "Owners can upload verification documents for their own listings"
on storage.objects for insert
with check (
  bucket_id = 'verification-documents'
  and exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id::text = (storage.foldername(name))[1]
      and lg.owner_id = auth.uid()
  )
);

create policy "Owners can view their own verification document files"
on storage.objects for select
using (
  bucket_id = 'verification-documents'
  and exists (
    select 1 from public.listings l
    join public.listing_groups lg on lg.id = l.listing_group_id
    where l.id::text = (storage.foldername(name))[1]
      and lg.owner_id = auth.uid()
  )
);

create policy "Admins can view all verification document files"
on storage.objects for select
using (
  bucket_id = 'verification-documents'
  and public.is_admin()
);
