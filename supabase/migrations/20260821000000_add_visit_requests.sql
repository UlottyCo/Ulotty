-- "Agendar visita" — versión simple confirmada: el comprador propone
-- fecha/hora, el dueño la ve en su panel y coordina por su cuenta. Sin
-- flujo de confirmar/rechazar por ahora, y sin el candado de
-- identificación oficial (esa verificación de comprador todavía no
-- existe — se agrega en una fase futura sin tocar esta tabla).

-- Cada solicitud de visita cuelga de un lead ya existente — agendar
-- visita también cuenta como "contactar" si el comprador no lo había
-- hecho antes (la Server Action crea el lead primero si hace falta).
-- No se duplican listing_id/buyer_id aquí: se obtienen a través de
-- lead_id, igual que ya hacemos con verifications.
create table public.visit_requests (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  preferred_datetime timestamptz not null,
  message text,
  created_at timestamptz not null default now()
);

create index visit_requests_lead_id_idx on public.visit_requests (lead_id);

alter table public.visit_requests enable row level security;

create policy "Buyers can request visits for their own leads"
on public.visit_requests for insert
with check (
  exists (
    select 1 from public.leads le
    where le.id = lead_id and le.buyer_id = auth.uid()
  )
);

create policy "Buyers can view their own visit requests"
on public.visit_requests for select
using (
  exists (
    select 1 from public.leads le
    where le.id = lead_id and le.buyer_id = auth.uid()
  )
);

create policy "Owners can view visit requests on their listings"
on public.visit_requests for select
using (
  exists (
    select 1 from public.leads le
    join public.listings l on l.id = le.listing_id
    join public.listing_groups lg on lg.id = l.listing_group_id
    where le.id = lead_id and lg.owner_id = auth.uid()
  )
);

create policy "Admins can view all visit requests"
on public.visit_requests for select
using (public.is_admin());

-- Sin política de UPDATE/DELETE: nadie edita ni borra, igual que
-- leads y el resto de la bitácora del proyecto.
