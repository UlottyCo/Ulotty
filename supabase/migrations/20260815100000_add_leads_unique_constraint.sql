-- Evita que el mismo comprador cree varios leads sobre el mismo listing
-- (protección de datos consistente con el botón "Contactar", que
-- revisa si ya existe un lead antes de mostrar el formulario).
alter table public.leads
  add constraint leads_listing_buyer_unique unique (listing_id, buyer_id);
