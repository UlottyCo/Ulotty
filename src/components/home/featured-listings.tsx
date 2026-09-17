import Link from "next/link";
import type { createClient } from "@/lib/supabase/server";
import {
  PropertyCard,
  isCurrentlyExclusive,
  type PropertyCardListing,
} from "@/components/listings/property-card";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

interface FeaturedListingRow extends PropertyCardListing {
  listing_photos: { storage_path: string; position: number }[];
}

export async function FeaturedListings({
  supabase,
}: {
  supabase: SupabaseServerClient;
}) {
  const { data, error } = await supabase
    .from("listings")
    .select(
      `
      id, folio, type, operation, price_mxn, price_usd, area_m2,
      is_exclusive, exclusive_until, created_at,
      listing_groups ( title, zone ),
      listing_photos ( storage_path, position )
    `,
    )
    .eq("status", "disponible")
    .order("created_at", { ascending: false })
    .limit(24)
    .returns<FeaturedListingRow[]>();

  if (error) {
    console.error("Error al cargar propiedades destacadas:", error);
    return null;
  }

  if (!data || data.length === 0) return null;

  const featured = [...data]
    .sort((a, b) => Number(isCurrentlyExclusive(b)) - Number(isCurrentlyExclusive(a)))
    .slice(0, 8);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Propiedades destacadas</h2>
        <Link href="/propiedades" className="text-sm text-muted hover:underline">
          Ver todas →
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((listing) => {
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
      </div>
    </section>
  );
}

export async function getZoneCounts(supabase: SupabaseServerClient) {
  const { data, error } = await supabase
    .from("listings")
    .select("listing_groups ( zone )")
    .eq("status", "disponible")
    .returns<{ listing_groups: { zone: string } | null }[]>();

  if (error || !data) {
    if (error) console.error("Error al cargar zonas:", error);
    return [];
  }

  const counts = new Map<string, number>();
  for (const row of data) {
    const zone = row.listing_groups?.zone;
    if (!zone) continue;
    counts.set(zone, (counts.get(zone) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([zone, count]) => ({ zone, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
}
