import { getAdminListings } from "@/app/actions/dashboard";
import { PropertyAdminTableClient } from "./property-admin-table-client";

export async function AdminPropertiesContainer() {
  const listings = await getAdminListings();

  return (
    <PropertyAdminTableClient
      listings={listings.map((l) => ({
        id: l.id,
        folio: l.folio || "—",
        type: l.type || "—",
        zona: l.listing_groups?.zone || "—",
        price_mxn: l.price_mxn || 0,
        status: l.status,
        created_at: l.created_at,
      }))}
    />
  );
}
