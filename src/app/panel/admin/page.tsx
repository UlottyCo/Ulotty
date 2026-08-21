import { createClient } from "@/lib/supabase/server";
import { VerificationReviewCard } from "./verification-review-card";
import { ExchangeRateForm } from "./exchange-rate-form";
import { AdminListingsTable, type AdminListingRow } from "./listings-table";

interface PendingRow {
  id: string;
  listing_id: string;
  document_path: string;
  submitted_at: string;
  listings: {
    id: string;
    folio: string | null;
    type: string | null;
    listing_groups: {
      title: string;
      zone: string;
      users: { full_name: string; email: string } | null;
    } | null;
  } | null;
}

interface GroupedVerification {
  listingId: string;
  folio: string | null;
  type: string | null;
  zoneTitle: string;
  zone: string;
  ownerName: string;
  ownerEmail: string;
  submittedAt: string;
  documents: { id: string; documentPath: string; signedUrl: string | null }[];
}

interface AdminListingQueryRow {
  id: string;
  folio: string | null;
  status: string;
  price_mxn: number | null;
  commission_rate_pct: number | null;
  commission_amount_mxn: number | null;
  listing_groups: {
    title: string;
    zone: string;
    users: { full_name: string } | null;
  } | null;
  listing_status_history: {
    id: string;
    status: string;
    changed_at: string;
    penalty_amount_mxn: number | null;
    penalty_status: "pendiente" | "cobrado" | null;
  }[];
}

export default async function PanelAdminPage() {
  const supabase = await createClient();

  const { data: latestRate } = await supabase
    .from("daily_exchange_rate")
    .select("rate, set_at")
    .order("set_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: listingRows, error: listingsError } = await supabase
    .from("listings")
    .select(
      `
      id, folio, status, price_mxn, commission_rate_pct, commission_amount_mxn,
      listing_groups ( title, zone, users ( full_name ) ),
      listing_status_history ( id, status, changed_at, penalty_amount_mxn, penalty_status )
    `,
    )
    .neq("status", "borrador")
    .order("created_at", { ascending: false })
    .returns<AdminListingQueryRow[]>();

  if (listingsError) {
    console.error("Error al cargar predios para admin:", listingsError);
  }

  const adminListings: AdminListingRow[] = (listingRows ?? []).map((row) => {
    const latestVendidoFuera = [...row.listing_status_history]
      .filter((h) => h.status === "vendido_fuera" && h.penalty_status !== null)
      .sort((a, b) => b.changed_at.localeCompare(a.changed_at))[0];

    return {
      id: row.id,
      folio: row.folio,
      status: row.status,
      priceMxn: row.price_mxn,
      zoneTitle: row.listing_groups?.title ?? "",
      zone: row.listing_groups?.zone ?? "",
      ownerName: row.listing_groups?.users?.full_name ?? "—",
      commissionRatePct: row.commission_rate_pct,
      commissionAmountMxn: row.commission_amount_mxn,
      penaltyHistoryId: latestVendidoFuera?.id ?? null,
      penaltyAmountMxn: latestVendidoFuera?.penalty_amount_mxn ?? null,
      penaltyStatus: latestVendidoFuera?.penalty_status ?? null,
    };
  });

  const { data: pending, error } = await supabase
    .from("verifications")
    .select(
      `
      id,
      listing_id,
      document_path,
      submitted_at,
      listings (
        id,
        folio,
        type,
        listing_groups (
          title,
          zone,
          users ( full_name, email )
        )
      )
    `,
    )
    .eq("status", "pendiente")
    .order("submitted_at", { ascending: true })
    .returns<PendingRow[]>();

  if (error) {
    console.error("Error al cargar verificaciones pendientes:", error);
  }

  const grouped = new Map<string, GroupedVerification>();

  for (const row of pending ?? []) {
    if (!grouped.has(row.listing_id)) {
      grouped.set(row.listing_id, {
        listingId: row.listing_id,
        folio: row.listings?.folio ?? null,
        type: row.listings?.type ?? null,
        zoneTitle: row.listings?.listing_groups?.title ?? "",
        zone: row.listings?.listing_groups?.zone ?? "",
        ownerName: row.listings?.listing_groups?.users?.full_name ?? "—",
        ownerEmail: row.listings?.listing_groups?.users?.email ?? "—",
        submittedAt: row.submitted_at,
        documents: [],
      });
    }
    grouped.get(row.listing_id)!.documents.push({
      id: row.id,
      documentPath: row.document_path,
      signedUrl: null,
    });
  }

  for (const group of grouped.values()) {
    for (const doc of group.documents) {
      const { data: signed } = await supabase.storage
        .from("verification-documents")
        .createSignedUrl(doc.documentPath, 600);
      doc.signedUrl = signed?.signedUrl ?? null;
    }
  }

  const groups = Array.from(grouped.values());

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-bold">Panel de administrador</h1>

      <section className="mt-8">
        <ExchangeRateForm
          currentRate={latestRate?.rate ?? null}
          setAt={latestRate?.set_at ?? null}
        />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Predios activos</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Comisión pactada y penalizaciones por "vendido fuera de la
          plataforma" de todos los predios no borrador.
        </p>
        {listingsError && (
          <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
            No se pudo cargar la lista: {listingsError.message}
          </p>
        )}
        <div className="mt-4">
          <AdminListingsTable rows={adminListings} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Verificaciones pendientes</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Revisa el documento de propiedad y aprueba o rechaza. Si el
          predio tiene varios documentos, la decisión aplica a todos
          juntos.
        </p>

        {error && (
          <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
            No se pudo cargar la lista: {error.message}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-4">
        {groups.map((group) => (
          <VerificationReviewCard
            key={group.listingId}
            listingId={group.listingId}
            folio={group.folio}
            type={group.type}
            zoneTitle={group.zoneTitle}
            zone={group.zone}
            ownerName={group.ownerName}
            ownerEmail={group.ownerEmail}
            submittedAt={group.submittedAt}
            documents={group.documents}
          />
        ))}

        {groups.length === 0 && !error && (
          <p className="text-sm text-black/60 dark:text-white/60">
            No hay verificaciones pendientes por ahora.
          </p>
        )}
        </div>
      </section>
    </div>
  );
}
