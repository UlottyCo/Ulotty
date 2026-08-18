-- Esquema inicial del marketplace inmobiliario
-- Tablas: users, listing_groups, listings, leads, verifications, listing_status_history

create extension if not exists pgcrypto;

-- 1. users: perfil de cada persona registrada, extiende auth.users
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  role text not null check (role in ('particular', 'desarrolladora', 'agente', 'comprador')),
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

-- 2. listing_groups: zona/fraccionamiento declarado por un dueño
create table public.listing_groups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  zone text not null,
  declared_lots_total integer not null,
  created_at timestamptz not null default now()
);

create index listing_groups_owner_id_idx on public.listing_groups (owner_id);

alter table public.listing_groups enable row level security;

-- 3. listings: predios individuales dentro de un listing_group
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  listing_group_id uuid not null references public.listing_groups (id) on delete cascade,
  folio text not null unique,
  type text not null check (type in ('predio', 'casa', 'depto')),
  operation text not null check (operation in ('venta', 'renta')),
  price_mxn numeric(12, 2) not null,
  price_usd numeric(12, 2),
  exchange_rate_used numeric(8, 4),
  area_m2 numeric(10, 2) not null,
  status text not null default 'disponible' check (status in ('disponible', 'apartado', 'vendido', 'vendido_fuera')),
  status_changed_at timestamptz not null default now(),
  requires_verification boolean not null default true,
  created_at timestamptz not null default now()
);

create index listings_listing_group_id_idx on public.listings (listing_group_id);
create index listings_status_idx on public.listings (status);

alter table public.listings enable row level security;

-- 4. leads: contacto de un comprador hacia un listing
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  buyer_id uuid not null references public.users (id) on delete cascade,
  contacted_at timestamptz not null default now()
);

create index leads_listing_id_idx on public.leads (listing_id);
create index leads_buyer_id_idx on public.leads (buyer_id);

alter table public.leads enable row level security;

-- 5. verifications: documentos de propiedad subidos para activar un listing
create table public.verifications (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  document_url text not null,
  status text not null default 'pendiente' check (status in ('pendiente', 'aprobado', 'rechazado')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.users (id) on delete set null,
  rejection_reason text
);

create index verifications_listing_id_idx on public.verifications (listing_id);

alter table public.verifications enable row level security;

-- 6. listing_status_history: bitácora de cada cambio de estatus de un listing
create table public.listing_status_history (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  status text not null,
  changed_at timestamptz not null default now(),
  changed_by uuid references public.users (id) on delete set null
);

create index listing_status_history_listing_id_idx on public.listing_status_history (listing_id);

alter table public.listing_status_history enable row level security;
