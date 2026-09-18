import { createClient } from "@/lib/supabase/server";
import { PillSearchForm } from "@/components/search/pill-search-form";
import {
  PropertyCard,
  isCurrentlyExclusive,
  type PropertyCardListing,
} from "@/components/listings/property-card";

interface PropiedadesPageProps {
  searchParams: Promise<{
    operacion?: string;
    tipo?: string;
    zona?: string;
    precioMin?: string;
    precioMax?: string;
    areaMin?: string;
    areaMax?: string;
    habitacionesMin?: string;
    baniosMin?: string;
    estacionamientosMin?: string;
    amenities?: string;
  }>;
}

interface ListingRow extends PropertyCardListing {
  listing_photos: { storage_path: string; position: number }[];
}

export default async function PropiedadesPage({
  searchParams,
}: PropiedadesPageProps) {
  const {
    operacion,
    tipo,
    zona,
    precioMin,
    precioMax,
    areaMin,
    areaMax,
    habitacionesMin,
    baniosMin,
    estacionamientosMin,
    amenities,
  } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("listings")
    .select(
      `
      id, folio, type, operation, price_mxn, price_usd, area_m2,
      bedrooms, bathrooms, parking_spots, amenities,
      is_exclusive, exclusive_until, created_at,
      listing_groups ( title, zone ),
      listing_photos ( storage_path, position )
    `,
    )
    .order("created_at", { ascending: false });

  if (operacion) query = query.eq("operation", operacion);
  if (tipo) query = query.eq("type", tipo);

  const precioMinNum = precioMin ? Number(precioMin) : null;
  const precioMaxNum = precioMax ? Number(precioMax) : null;
  const areaMinNum = areaMin ? Number(areaMin) : null;
  const areaMaxNum = areaMax ? Number(areaMax) : null;
  const habitacionesMinNum = habitacionesMin ? Number(habitacionesMin) : null;
  const baniosMinNum = baniosMin ? Number(baniosMin) : null;
  const estacionamientosMinNum = estacionamientosMin ? Number(estacionamientosMin) : null;

  if (precioMinNum !== null && Number.isFinite(precioMinNum)) {
    query = query.gte("price_mxn", precioMinNum);
  }
  if (precioMaxNum !== null && Number.isFinite(precioMaxNum)) {
    query = query.lte("price_mxn", precioMaxNum);
  }
  if (areaMinNum !== null && Number.isFinite(areaMinNum)) {
    query = query.gte("area_m2", areaMinNum);
  }
  if (areaMaxNum !== null && Number.isFinite(areaMaxNum)) {
    query = query.lte("area_m2", areaMaxNum);
  }
  if (habitacionesMinNum !== null && Number.isFinite(habitacionesMinNum)) {
    query = query.gte("bedrooms", habitacionesMinNum);
  }
  if (baniosMinNum !== null && Number.isFinite(baniosMinNum)) {
    query = query.gte("bathrooms", baniosMinNum);
  }
  if (estacionamientosMinNum !== null && Number.isFinite(estacionamientosMinNum)) {
    query = query.gte("parking_spots", estacionamientosMinNum);
  }
  if (amenities) {
    const amenitiesArray = amenities.split(",").filter(Boolean);
    if (amenitiesArray.length > 0) {
      query = query.contains("amenities", amenitiesArray);
    }
  }

  const { data, error } = await query.returns<ListingRow[]>();

  if (error) {
    console.error("Error al cargar propiedades:", error);
  }

  const zonaLower = zona?.trim().toLowerCase();
  const listings = (data ?? [])
    .filter((listing) =>
      zonaLower
        ? (listing.listing_groups?.zone.toLowerCase().includes(zonaLower) ??
          false)
        : true,
    )
    .sort((a, b) => Number(isCurrentlyExclusive(b)) - Number(isCurrentlyExclusive(a)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Propiedades</h1>
      <p className="mt-2 text-muted">
        Predios, casas y departamentos disponibles en Rosarito.
      </p>

      <div className="mt-6">
        <PillSearchForm
          defaultZona={zona ?? ""}
          defaultOperacion={operacion ?? ""}
          defaultTipo={tipo ?? ""}
          defaultPrecioMin={precioMin ?? ""}
          defaultPrecioMax={precioMax ?? ""}
          defaultAreaMin={areaMin ?? ""}
          defaultAreaMax={areaMax ?? ""}
          defaultHabitacionesMin={habitacionesMin ?? ""}
          defaultBaniosMin={baniosMin ?? ""}
          defaultEstacionamientosMin={estacionamientosMin ?? ""}
          defaultAmenities={amenities ?? ""}
        />
      </div>

      {error && (
        <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
          No se pudieron cargar las propiedades: {error.message}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => {
          const cover = [...listing.listing_photos].sort(
            (a, b) => a.position - b.position,
          )[0];
          const coverUrl = cover
            ? supabase.storage
                .from("listing-photos")
                .getPublicUrl(cover.storage_path).data.publicUrl
            : null;

          return (
            <PropertyCard key={listing.id} listing={listing} coverUrl={coverUrl} />
          );
        })}

        {listings.length === 0 && !error && (
          <p className="text-sm text-muted">
            No hay propiedades que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}
