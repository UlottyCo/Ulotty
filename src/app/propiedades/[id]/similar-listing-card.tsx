import Link from "next/link";

export interface SimilarListing {
  id: string;
  folio: string | null;
  type: string | null;
  operation: string | null;
  price_mxn: number | null;
  price_usd: number | null;
  area_m2: number | null;
  listing_groups: { title: string; zone: string } | null;
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

export function SimilarListingCard({
  listing,
  coverUrl,
}: {
  listing: SimilarListing;
  coverUrl: string | null;
}) {
  return (
    <Link
      href={`/propiedades/${listing.id}`}
      className="overflow-hidden rounded-lg border border-border"
    >
      <div className="relative aspect-[2/1] bg-subtle">
        {coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt={listing.folio ?? "Propiedad"}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="p-2.5">
        <p className="text-sm font-semibold">
          {formatMxn(listing.price_mxn)}
          {listing.price_usd && (
            <span className="ml-1 text-xs font-normal text-muted">
              (≈ {formatUsd(listing.price_usd)})
            </span>
          )}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {listing.type} · {listing.operation} ·{" "}
          {listing.area_m2 ? `${listing.area_m2} m²` : ""}
        </p>
        <p className="text-xs text-muted">{listing.listing_groups?.zone}</p>
      </div>
    </Link>
  );
}
