-- Perímetro del predio (polígono opcional).
--
-- No reemplaza latitude/longitude (el pin sigue existiendo tal cual).
-- boundary_points guarda el contorno del terreno como un array jsonb
-- de pares [lat, lng], ej: [[32.361,-117.069],[32.362,-117.070],...].
--
-- Nullable, sin default: los predios ya existentes se quedan en null
-- y siguen mostrando solo su pin — no es retroactivo.

alter table public.listings
  add column if not exists boundary_points jsonb;
