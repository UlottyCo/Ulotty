import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PredioForm } from "./predio-form";
import type { Listing } from "@/types";

interface PredioPageProps {
  params: Promise<{ listingId: string }>;
}

export default async function PredioPage({ params }: PredioPageProps) {
  const { listingId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: row } = await supabase
    .from("listings")
    .select(
      "id, listing_group_id, folio, type, operation, price_mxn, price_usd, exchange_rate_used, area_m2, description, latitude, longitude, status, status_changed_at, requires_verification, created_at, commission_rate_pct, commission_amount_mxn, requires_ulot, next_renewal_at, delisted_at, is_exclusive, exclusive_until, boundary_points",
    )
    .eq("id", listingId)
    .single();

  // Si no existe, o RLS lo esconde porque no es tuyo, no hay nada que
  // mostrar aquí.
  if (!row) {
    notFound();
  }

  const { count: photoCount } = await supabase
    .from("listing_photos")
    .select("id", { count: "exact", head: true })
    .eq("listing_id", listingId);

  const { data: latestRate } = await supabase
    .from("daily_exchange_rate")
    .select("rate")
    .order("set_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const suggestedExchangeRate = latestRate ? latestRate.rate - 0.3 : null;

  const listing: Listing = {
    id: row.id,
    listingGroupId: row.listing_group_id,
    folio: row.folio,
    type: row.type,
    operation: row.operation,
    priceMxn: row.price_mxn,
    priceUsd: row.price_usd,
    exchangeRateUsed: row.exchange_rate_used,
    areaM2: row.area_m2,
    description: row.description,
    latitude: row.latitude,
    longitude: row.longitude,
    status: row.status,
    statusChangedAt: row.status_changed_at,
    requiresVerification: row.requires_verification,
    createdAt: row.created_at,
    commissionRatePct: row.commission_rate_pct,
    commissionAmountMxn: row.commission_amount_mxn,
    requiresUlot: row.requires_ulot,
    nextRenewalAt: row.next_renewal_at,
    delistedAt: row.delisted_at,
    isExclusive: row.is_exclusive,
    exclusiveUntil: row.exclusive_until,
    boundaryPoints: row.boundary_points,
  };

  const esBorrador = listing.status === "borrador";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold">
        {esBorrador ? "Completa este predio" : "Editar predio"}
      </h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        {esBorrador
          ? "Este predio no será visible al público hasta que subas tu verificación de propiedad y nuestro equipo la apruebe."
          : "Los cambios se guardan de inmediato. Si el predio ya es público, seguirá siéndolo — editar aquí no cambia su estatus."}
      </p>
      <PredioForm
        listing={listing}
        hasPhotos={(photoCount ?? 0) > 0}
        suggestedExchangeRate={suggestedExchangeRate}
      />
    </div>
  );
}
