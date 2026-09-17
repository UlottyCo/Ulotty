import Link from "next/link";
import { formatMxn, formatUsd } from "@/lib/format";

export interface PropertyCardListing {
  id: string;
  folio: string | null;
  type: string | null;
  operation: string | null;
  price_mxn: number | null;
  price_usd: number | null;
  area_m2: number | null;
  is_exclusive: boolean;
  exclusive_until: string | null;
  created_at: string;
  listing_groups: { title: string; zone: string } | null;
}

export function isCurrentlyExclusive(listing: PropertyCardListing): boolean {
  if (!listing.is_exclusive || !listing.exclusive_until) return false;
  return listing.exclusive_until >= new Date().toISOString().slice(0, 10);
}

function isRecentlyPublished(listing: PropertyCardListing): boolean {
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  return new Date(listing.created_at) >= fourteenDaysAgo;
}

export function PropertyCard({
  listing,
  coverUrl,
}: {
  listing: PropertyCardListing;
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
        <div className="absolute left-2 top-2 flex gap-1">
          {isCurrentlyExclusive(listing) && (
            <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-brand-foreground">
              Destacado
            </span>
          )}
          {isRecentlyPublished(listing) && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-foreground">
              Nuevo
            </span>
          )}
        </div>
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
