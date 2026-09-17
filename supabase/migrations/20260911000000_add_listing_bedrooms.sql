-- Filtro de "mínimo de habitaciones". Nullable: un predio/terreno no
-- tiene recámaras, así que se queda en null y simplemente no aparece
-- si alguien filtra por "3+ habitaciones" (comportamiento correcto).
alter table public.listings
  add column if not exists bedrooms integer;
