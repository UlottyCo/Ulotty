-- Fase 5 del modelo de negocio: verificación de compradores.
-- - Teléfono verificado (SMS vía Twilio Verify) obligatorio antes de
--   poder contactar a un dueño (createLead).
-- - Identificación oficial aprobada, ADEMÁS del teléfono, obligatoria
--   antes de poder agendar una visita (requestVisit).

-- =========================================================
-- 1. Teléfono verificado — no hace falta tabla nueva. Twilio Verify
--    guarda y valida el código por su cuenta; nosotros solo guardamos
--    el resultado. Se verifica el número que ya vive en users.phone.
-- =========================================================

alter table public.users
  add column phone_verified boolean not null default false,
  add column phone_verified_at timestamptz;

-- =========================================================
-- 2. Identificación oficial — mismo patrón que ya usamos para
--    verificar predios (tabla + bucket privado + revisión de admin),
--    pero del lado del comprador.
-- =========================================================

create table public.buyer_id_verifications (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.users (id) on delete cascade,
  document_path text not null,
  status text not null default 'pendiente' check (status in ('pendiente', 'aprobado', 'rechazado')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.users (id) on delete set null,
  rejection_reason text
);

create index buyer_id_verifications_buyer_id_idx on public.buyer_id_verifications (buyer_id);

alter table public.buyer_id_verifications enable row level security;

create policy "Buyers can submit their own id verifications"
on public.buyer_id_verifications for insert
with check (buyer_id = auth.uid());

create policy "Buyers can view their own id verifications"
on public.buyer_id_verifications for select
using (buyer_id = auth.uid());

create policy "Admins can view all id verifications"
on public.buyer_id_verifications for select
using (public.is_admin());

create policy "Admins can review id verifications"
on public.buyer_id_verifications for update
using (public.is_admin())
with check (public.is_admin());

-- Sin política de DELETE — mismo criterio que verifications de
-- predios: un documento rechazado se reemplaza con uno nuevo, no se
-- borra el anterior.

-- Bucket privado. Convención de ruta: {buyer_id}/{uuid}.{ext}
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'buyer-id-documents',
  'buyer-id-documents',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do nothing;

create policy "Buyers can upload their own id documents"
on storage.objects for insert
with check (
  bucket_id = 'buyer-id-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Buyers can view their own id document files"
on storage.objects for select
using (
  bucket_id = 'buyer-id-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Admins can view all buyer id document files"
on storage.objects for select
using (
  bucket_id = 'buyer-id-documents'
  and public.is_admin()
);
