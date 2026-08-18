import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createLead } from "@/app/actions/leads";
import { ListingMapClient } from "./listing-map-client";

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
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  status: string;
  listing_groups: { title: string; zone: string } | null;
  listing_photos: { id: string; storage_path: string; position: number }[];
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
      description, latitude, longitude, status,
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

  const contactAction = createLead.bind(null, id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {photoUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photoUrls.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={photos[i].id}
              src={url}
              alt={listing.folio ?? "Propiedad"}
              className={`h-48 w-full rounded-lg object-cover ${
                i === 0 ? "col-span-2 h-72 sm:col-span-3" : ""
              }`}
            />
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-1">
        <h1 className="text-3xl font-bold">
          {formatMxn(listing.price_mxn)}
          {listing.price_usd && (
            <span className="ml-2 text-lg font-normal text-black/50 dark:text-white/50">
              (≈ {formatUsd(listing.price_usd)})
            </span>
          )}
        </h1>
        <p className="text-black/60 dark:text-white/60">
          {listing.type} · {listing.operation} ·{" "}
          {listing.area_m2 ? `${listing.area_m2} m²` : ""}
        </p>
        <p className="text-black/60 dark:text-white/60">
          {listing.listing_groups?.title} — {listing.listing_groups?.zone}
        </p>
      </div>

      {listing.description && (
        <p className="mt-6 whitespace-pre-line text-black/80 dark:text-white/80">
          {listing.description}
        </p>
      )}

      {listing.latitude !== null && listing.longitude !== null && (
        <div className="mt-8">
          <h2 className="mb-2 text-lg font-semibold">Ubicación</h2>
          <ListingMapClient
            latitude={listing.latitude}
            longitude={listing.longitude}
          />
        </div>
      )}

      {listing.status !== "vendido" && (
        <div className="mt-8">
          {alreadyContacted ? (
            <p className="rounded-md bg-black/5 p-3 text-sm text-black/60 dark:bg-white/5 dark:text-white/60">
              Ya enviaste tu interés por esta propiedad.
            </p>
          ) : (
            <form action={contactAction}>
              <button
                type="submit"
                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
              >
                Contactar
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
