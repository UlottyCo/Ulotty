import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createLead } from "@/app/actions/leads";
import { AMENITIES_OPTIONS } from "@/types";
import { ListingMapClient } from "./listing-map-client";
import { VisitRequestForm } from "./visit-request-form";
import { PropertyGallery } from "./property-gallery";
import { SimilarListingCard, type SimilarListing } from "./similar-listing-card";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

interface ListingDetailRow {
  id: string;
  folio: string | null;
  type: string | null;
  operation: string | null;
  price_mxn: number | null;
  price_usd: number | null;
  area_m2: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking_spots: number | null;
  amenities: string[] | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  boundary_points: [number, number][] | null;
  status: string;
  created_at: string;
  listing_groups: { title: string; zone: string } | null;
  listing_photos: { id: string; storage_path: string; position: number }[];
}

const STATUS_LABELS: Record<string, string> = {
  disponible: "Disponible",
  apartado: "Apartado",
  vendido: "Vendido",
  vendido_fuera: "Vendido (fuera de Ulotty)",
  pausado_por_falta_de_credito: "Pausado",
  borrador: "Borrador",
};

const TYPE_LABELS: Record<string, string> = {
  predio: "Predio",
  casa: "Casa",
  depto: "Departamento",
};

const OPERATION_LABELS: Record<string, string> = {
  venta: "Venta",
  renta: "Renta",
};

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

export default async function PropiedadDetallePage({
  params,
}: PropertyPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: listing } = await supabase
    .from("listings")
    .select(
      `
      id, folio, type, operation, price_mxn, price_usd, area_m2,
      bedrooms, bathrooms, parking_spots, amenities,
      description, latitude, longitude, boundary_points, status,
      created_at,
      listing_groups ( title, zone ),
      listing_photos ( id, storage_path, position )
    `,
    )
    .eq("id", id)
    .single<ListingDetailRow>();

  if (!listing) {
    notFound();
  }

  const photos = [...listing.listing_photos].sort(
    (a, b) => a.position - b.position,
  );
  const photoUrls = photos.map(
    (p) =>
      supabase.storage.from("listing-photos").getPublicUrl(p.storage_path)
        .data.publicUrl,
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let alreadyContacted = false;
  if (user) {
    const { data: existingLead } = await supabase
      .from("leads")
      .select("id")
      .eq("listing_id", id)
      .eq("buyer_id", user.id)
      .maybeSingle();
    alreadyContacted = !!existingLead;
  }

  interface SimilarListingRow extends SimilarListing {
    listing_photos: { storage_path: string; position: number }[];
  }

  const { data: similarData, error: similarError } = await supabase
    .from("listings")
    .select(
      `
      id, folio, type, operation, price_mxn, price_usd, area_m2,
      listing_groups ( title, zone ),
      listing_photos ( storage_path, position )
    `,
    )
    .eq("status", "disponible")
    .eq("type", listing.type ?? "")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(4)
    .returns<SimilarListingRow[]>();

  if (similarError) {
    console.error("Error al cargar propiedades similares:", similarError);
  }

  const similarListings = similarData ?? [];

  const contactAction = createLead.bind(null, id);
  const googleMapsUrl =
    listing.latitude !== null && listing.longitude !== null
      ? `https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`
      : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/propiedades" className="text-sm text-muted hover:underline">
        ← Volver a resultados
      </Link>

      <div className="mt-4">
        <PropertyGallery
          photoUrls={photoUrls}
          alt={listing.folio ?? "Propiedad"}
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {listing.listing_groups?.title}
            {listing.listing_groups?.zone
              ? ` — ${listing.listing_groups.zone}`
              : ""}
          </h1>
          <p className="mt-1 text-2xl font-semibold">
            {formatMxn(listing.price_mxn)}
            {listing.price_usd && (
              <span className="ml-2 text-base font-normal text-muted">
                (≈ {formatUsd(listing.price_usd)})
              </span>
            )}
          </p>

          <div className="mt-6 flex flex-wrap gap-6 rounded-lg border border-border p-4">
            {listing.type && (
              <div>
                <p className="text-xs font-semibold text-muted">Tipo</p>
                <p className="text-sm">{TYPE_LABELS[listing.type] ?? listing.type}</p>
              </div>
            )}
            {listing.operation && (
              <div>
                <p className="text-xs font-semibold text-muted">Operación</p>
                <p className="text-sm">
                  {OPERATION_LABELS[listing.operation] ?? listing.operation}
                </p>
              </div>
            )}
            {listing.area_m2 && (
              <div>
                <p className="text-xs font-semibold text-muted">Superficie</p>
                <p className="text-sm">{listing.area_m2} m²</p>
              </div>
            )}
            {listing.bedrooms !== null && (
              <div>
                <p className="text-xs font-semibold text-muted">Habitaciones</p>
                <p className="text-sm">{listing.bedrooms}</p>
              </div>
            )}
            {listing.bathrooms !== null && (
              <div>
                <p className="text-xs font-semibold text-muted">Baños</p>
                <p className="text-sm">{listing.bathrooms}</p>
              </div>
            )}
            {listing.parking_spots !== null && (
              <div>
                <p className="text-xs font-semibold text-muted">Estacionamientos</p>
                <p className="text-sm">{listing.parking_spots}</p>
              </div>
            )}
          </div>

          {listing.amenities && listing.amenities.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-3 text-lg font-semibold">Amenidades</h2>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((amenity) => {
                  const label = AMENITIES_OPTIONS.find((opt) => opt.value === amenity)?.label;
                  return (
                    <span
                      key={amenity}
                      className="rounded-full bg-subtle px-3 py-1 text-sm text-foreground"
                    >
                      {label || amenity}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {listing.description && (
            <div className="mt-8">
              <h2 className="mb-2 text-lg font-semibold">Descripción</h2>
              <p className="whitespace-pre-line text-foreground">
                {listing.description}
              </p>
            </div>
          )}

          {listing.latitude !== null && listing.longitude !== null && (
            <div className="mt-8">
              <h2 className="mb-2 text-lg font-semibold">Ubicación</h2>
              <ListingMapClient
                latitude={listing.latitude}
                longitude={listing.longitude}
                boundaryPoints={listing.boundary_points}
              />
              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-muted hover:underline"
                >
                  Ver en Google Maps ↗
                </a>
              )}
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          {listing.status !== "vendido" && (
            <div className="rounded-lg border border-border p-5">
              <h2 className="text-sm font-semibold">Contacta al anunciante</h2>
              <p className="mt-1 text-sm text-muted">
                Publicado a través de Ulotty.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                {alreadyContacted ? (
                  <p className="rounded-md bg-subtle p-3 text-sm text-muted">
                    Ya enviaste tu interés por esta propiedad.
                  </p>
                ) : (
                  <form action={contactAction}>
                    <button
                      type="submit"
                      className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
                    >
                      Contactar
                    </button>
                  </form>
                )}
                <VisitRequestForm listingId={id} />
              </div>
            </div>
          )}

          <div className="rounded-lg border border-border p-5 text-sm">
            <dl className="flex flex-col gap-3">
              <div className="flex justify-between gap-2">
                <dt className="text-muted">ID de propiedad</dt>
                <dd>{listing.folio ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Tipo de operación</dt>
                <dd>
                  {listing.operation
                    ? (OPERATION_LABELS[listing.operation] ?? listing.operation)
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Tipo de propiedad</dt>
                <dd>{listing.type ? (TYPE_LABELS[listing.type] ?? listing.type) : "—"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Estado</dt>
                <dd>{STATUS_LABELS[listing.status] ?? listing.status}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Publicado el</dt>
                <dd>
                  {new Date(listing.created_at).toLocaleDateString("es-MX")}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {similarError && (
        <p className="mt-16 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
          No se pudieron cargar propiedades similares: {similarError.message}
        </p>
      )}

      {similarListings.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold">Propiedades similares</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarListings.map((item) => {
              const cover = [...item.listing_photos].sort(
                (a, b) => a.position - b.position,
              )[0];
              const coverUrl = cover
                ? supabase.storage
                    .from("listing-photos")
                    .getPublicUrl(cover.storage_path).data.publicUrl
                : null;

              return (
                <SimilarListingCard key={item.id} listing={item} coverUrl={coverUrl} />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
