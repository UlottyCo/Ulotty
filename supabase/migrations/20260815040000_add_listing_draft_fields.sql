-- Soporta el flujo de "publicar predio" padre-hijos:
-- - description, latitude, longitude para cada predio.
-- - folio/type/operation/price_mxn/area_m2 pasan a ser opcionales, para
--   poder crear "slots" vacíos cuando el dueño declara su total de
--   predios en la zona.
-- - nuevo estatus 'borrador': slot creado, todavía sin llenar. Ya queda
--   oculto al público por la regla existente (requires_verification +
--   sin verificación aprobada), sin necesidad de tocar RLS.

alter table public.listings
  add column description text,
  add column latitude numeric(9, 6),
  add column longitude numeric(9, 6);

alter table public.listings
  alter column folio drop not null,
  alter column type drop not null,
  alter column operation drop not null,
  alter column price_mxn drop not null,
  alter column area_m2 drop not null;

alter table public.listings drop constraint listings_status_check;
alter table public.listings add constraint listings_status_check
  check (status in ('borrador', 'disponible', 'apartado', 'vendido', 'vendido_fuera'));

alter table public.listings alter column status set default 'borrador';

-- Candado de integridad: un listing que ya salió de 'borrador' debe
-- tener sus datos básicos completos. Evita que un bug en la app deje un
-- predio "publicado" pero incompleto.
alter table public.listings add constraint listings_complete_when_published
  check (
    status = 'borrador'
    or (
      folio is not null
      and type is not null
      and operation is not null
      and price_mxn is not null
      and area_m2 is not null
    )
  );
