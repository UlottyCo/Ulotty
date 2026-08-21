import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface PropiedadesPageProps {
  searchParams: Promise<{
    operacion?: string;
    tipo?: string;
    zona?: string;
  }>;
}

interface ListingRow {
  id: string;
  folio: string | null;
  type: string | null;
  operation: string | null;
  price_mxn: number | null;
  price_usd: number | null;
  area_m2: number | null;
  is_exclusive: boolean;
  exclusive_until: string | null;
  listing_groups: { title: string; zone: string } | null;
  listing_photos: { storage_path: string; position: number }[];
}

function isCurrentlyExclusive(listing: ListingRow): boolean {
  if (!listing.is_exclusive || !listing.exclusive_until) return false;
  return listing.exclusive_until >= new Date().toISOString().slice(0, 10);
}

function formatMxn(value: number | null) {
  if (value === null) return null;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatUsd(value: number | null) {
  if (value === null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function PropiedadesPage({
  searchParams,
}: PropiedadesPageProps) {
  const { operacion, tipo, zona } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("listings")
    .select(
      `
      id, folio, type, operation, price_mxn, price_usd, area_m2,
      is_exclusive, exclusive_until,
      listing_groups ( title, zone ),
      listing_photos ( storage_path, position )
    `,
    )
    .order("created_at", { ascending: false });

  if (operacion) query = query.eq("operation", operacion);
  if (tipo) query = query.eq("type", tipo);

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
      <p className="mt-2 text-black/60 dark:text-white/60">
        Predios, casas y departamentos disponibles en Rosarito.
      </p>

      <form
        method="GET"
        className="mt-6 flex flex-wrap gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10"
      >
        <input
          type="text"
          name="zona"
          defaultValue={zona ?? ""}
          placeholder="Zona"
          className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
        />
        <select
          name="operacion"
          defaultValue={operacion ?? ""}
          className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
        >
          <option value="">Venta o renta</option>
          <option value="venta">Venta</option>
          <option value="renta">Renta</option>
        </select>
        <select
          name="tipo"
          defaultValue={tipo ?? ""}
          className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
        >
          <option value="">Cualquier tipo</option>
          <option value="predio">Predio</option>
          <option value="casa">Casa</option>
          <option value="depto">Depto</option>
        </select>
        <button
          type="submit"
          className="rounded-md bg-black px-6 py-2 text-sm text-white dark:bg-white dark:text-black"
        >
          Buscar
        </button>
      </form>

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
            <Link
              key={listing.id}
              href={`/propiedades/${listing.id}`}
              className="overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
            >
              <div className="relative aspect-video bg-black/5 dark:bg-white/5">
                {coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverUrl}
                    alt={listing.folio ?? "Propiedad"}
                    className="h-full w-full object-cover"
                  />
                )}
                {isCurrentlyExclusive(listing) && (
                  <span className="absolute left-2 top-2 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white dark:bg-white dark:text-black">
                    Destacado
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="font-medium">
                  {formatMxn(listing.price_mxn)}
                  {listing.price_usd && (
                    <span className="ml-1 text-sm text-black/50 dark:text-white/50">
                      (≈ {formatUsd(listing.price_usd)})
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                  {listing.type} · {listing.operation} ·{" "}
                  {listing.area_m2 ? `${listing.area_m2} m²` : ""}
                </p>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {listing.listing_groups?.zone}
                </p>
              </div>
            </Link>
          );
        })}

        {listings.length === 0 && !error && (
          <p className="text-sm text-black/60 dark:text-white/60">
            No hay propiedades que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}
