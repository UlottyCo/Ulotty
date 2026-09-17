import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/home/hero";
import { FeaturedListings, getZoneCounts } from "@/components/home/featured-listings";
import { ZoneExplorer } from "@/components/home/zone-explorer";
import { PropertyTypeNav } from "@/components/home/property-type-nav";
import { SellBanner } from "@/components/home/sell-banner";

export default async function HomePage() {
  const supabase = await createClient();
  const zones = await getZoneCounts(supabase);

  return (
    <div>
      <Hero />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        <FeaturedListings supabase={supabase} />

        {zones.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold">Explora por zona</h2>
            <div className="mt-4">
              <ZoneExplorer zones={zones} />
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold">Tipo de propiedad</h2>
          <div className="mt-4">
            <PropertyTypeNav />
          </div>
        </section>

        <SellBanner />
      </div>
    </div>
  );
}
