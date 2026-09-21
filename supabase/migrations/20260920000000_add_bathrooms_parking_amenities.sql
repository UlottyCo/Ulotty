-- Agregar columnas de baños, estacionamiento y amenidades a listings
-- Amenidades aprobadas: alberca, vista_mar, acceso_playa, estacionamiento,
-- seguridad_24h, amueblado, aire_acondicionado, jardin, terraza, acepta_mascotas

ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS bathrooms numeric(5, 2),
  ADD COLUMN IF NOT EXISTS parking_spots integer,
  ADD COLUMN IF NOT EXISTS amenities text[];

-- ✅ CHECK CONSTRAINTS para validación de valores
ALTER TABLE public.listings
  ADD CONSTRAINT check_valid_bathrooms
    CHECK (bathrooms IS NULL OR bathrooms >= 0),
  ADD CONSTRAINT check_valid_parking_spots
    CHECK (parking_spots IS NULL OR parking_spots >= 0),
  ADD CONSTRAINT check_valid_amenities
    CHECK (
      amenities IS NULL OR amenities <@ ARRAY[
        'alberca','vista_mar','acceso_playa','estacionamiento',
        'seguridad_24h','amueblado','aire_acondicionado','jardin',
        'terraza','acepta_mascotas'
      ]::text[]
    );

-- ✅ ÍNDICE GIN para búsquedas rápidas de amenidades (contiene TODAS)
CREATE INDEX IF NOT EXISTS idx_listings_amenities_gin
  ON public.listings USING GIN (amenities);

-- Índices para filtros por número de baños y estacionamiento
CREATE INDEX IF NOT EXISTS idx_listings_bathrooms
  ON public.listings (bathrooms);
CREATE INDEX IF NOT EXISTS idx_listings_parking_spots
  ON public.listings (parking_spots);
