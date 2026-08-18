-- Corrige un descuido: el candado de integridad "listings_complete_when_published"
-- no exigía description/latitude/longitude, aunque son parte de los
-- datos obligatorios para publicar un predio (Paso 2 del formulario).

alter table public.listings drop constraint listings_complete_when_published;
alter table public.listings add constraint listings_complete_when_published
  check (
    status = 'borrador'
    or (
      folio is not null
      and type is not null
      and operation is not null
      and price_mxn is not null
      and area_m2 is not null
      and description is not null
      and latitude is not null
      and longitude is not null
    )
  );
