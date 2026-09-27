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
    bedrooms?: string;
    bathrooms?: string;
    parking?: string;
    amenities?: string | string[];
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
    bedrooms,
    bathrooms,
    parking,
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
  const bedroomsNum = bedrooms ? Number(bedrooms) : null;
  const bathroomsNum = bathrooms ? Number(bathrooms) : null;
  const parkingNum = parking ? Number(parking) : null;

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
  if (bedroomsNum !== null && Number.isFinite(bedroomsNum)) {
    query = query.gte("bedrooms", bedroomsNum);
  }
  if (bathroomsNum !== null && Number.isFinite(bathroomsNum)) {
    query = query.gte("bathrooms", bathroomsNum);
  }
  if (parkingNum !== null && Number.isFinite(parkingNum)) {
    query = query.gte("parking_spots", parkingNum);
  }

  const { data, error } = await query.returns<ListingRow[]>();

  if (error) {
    console.error("Error al cargar propiedades:", error);
  }

  const zonaLower = zona?.trim().toLowerCase();

  // Manejo robusto de amenities: puede llegar como string (comas) o array (múltiples parámetros GET)
  let amenitiesFilter: string[] = [];
  if (amenities) {
    if (typeof amenities === "string") {
      amenitiesFilter = amenities.split(",").filter(Boolean);
    } else if (Array.isArray(amenities)) {
      amenitiesFilter = amenities.filter(Boolean);
    }
  }

  const listings = (data ?? [])
    .filter((listing) => {
      // Filtro de zona
      if (zonaLower) {
        const hasZona = listing.listing_groups?.zone.toLowerCase().includes(zonaLower) ?? false;
        if (!hasZona) return false;
      }

      // Filtro de amenidades: "contiene TODAS"
      if (amenitiesFilter.length > 0) {
        const listingAmenities = listing.amenities ?? [];
        const hasAllAmenities = amenitiesFilter.every((a) =>
          listingAmenities.includes(a)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    })
    .sort((a, b) => Number(isCurrentlyExclusive(b)) - Number(isCurrentlyExclusive(a)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16">
      <h1 className="text-2xl font-bold sm:text-3xl">Propiedades</h1>
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
          defaultBedrooms={bedrooms ?? ""}
          defaultBathrooms={bathrooms ?? ""}
          defaultParking={parking ?? ""}
          defaultAmenities={
            Array.isArray(amenities) ? amenities.join(",") : amenities ?? ""
          }
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
