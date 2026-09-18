-- Crear tipo ENUM para amenities (lista fija de 10)
CREATE TYPE amenity_type AS ENUM (
  'alberca',
  'vista_mar',
  'acceso_playa',
  'estacionamiento',
  'seguridad_24h',
  'amueblado',
  'aire_acondicionado',
  'jardin',
  'terraza',
  'acepta_mascotas'
);

-- Agregar columnas a listings
ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS bathrooms NUMERIC CHECK (bathrooms > 0 OR bathrooms IS NULL),
  ADD COLUMN IF NOT EXISTS parking_spots INTEGER CHECK (parking_spots >= 0 OR parking_spots IS NULL),
  ADD COLUMN IF NOT EXISTS amenities amenity_type[] 
    CHECK (amenities IS NULL OR array_length(amenities, 1) <= 10);

-- Crear índice GIN para búsquedas rápidas de amenities
CREATE INDEX IF NOT EXISTS idx_listings_amenities ON public.listings USING GIN (amenities);
