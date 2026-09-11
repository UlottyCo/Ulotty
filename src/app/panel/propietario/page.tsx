import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { OwnerListingRow } from "./owner-listing-row";

interface OwnerListingGroupRow {
  id: string;
  title: string;
  zone: string;
  listings: {
    id: string;
    folio: string | null;
    type: string | null;
    operation: string | null;
    price_mxn: number | null;
    status: string;
    commission_rate_pct: number | null;
    commission_amount_mxn: number | null;
    requires_ulot: boolean;
    next_renewal_at: string | null;
    is_exclusive: boolean;
    exclusive_until: string | null;
    verifications: { status: string }[];
    leads: {
      id: string;
      contacted_at: string;
      buyer: { id: string; full_name: string; email: string; phone: string | null } | null;
      visit_requests: {
        id: string;
        preferred_datetime: string;
        message: string | null;
        created_at: string;
      }[];
    }[];
    listing_status_history: {
      id: string;
      status: string;
      changed_at: string;
      reason: string | null;
      penalty_amount_mxn: number | null;
      penalty_status: "pendiente" | "cobrado" | null;
    }[];
  }[];
}

type VerificacionEstado = "sin_enviar" | "pendiente" | "rechazado" | "aprobado";

function verificacionEstado(
  verifications: { status: string }[],
): VerificacionEstado {
  if (verifications.some((v) => v.status === "aprobado")) return "aprobado";
  if (verifications.length === 0) return "sin_enviar";
  if (verifications.some((v) => v.status === "pendiente")) return "pendiente";
  return "rechazado";
}

// El teléfono completo nunca debe llegar al navegador en esta carga —
// solo esta versión enmascarada. El botón "Ver teléfono completo" en
// LeadContact lo pide aparte, bajo demanda, vía revealBuyerPhone().
function maskPhone(phone: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return "••• oculto";
  return `${digits.slice(0, 3)}-***-${digits.slice(-4)}`;
}

export default async function PanelPropietarioPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // La ruta ya exige sesión (proxy.ts). Si por algún motivo llegamos
  // aquí sin usuario, no hay nada que mostrar.
  if (!user) return null;

  const { data: ulotRows } = await supabase
    .from("ulot_transactions")
    .select("delta")
    .eq("user_id", user.id);

  const ulotBalance = (ulotRows ?? []).reduce((sum, row) => sum + row.delta, 0);

  const { data: groups, error } = await supabase
    .from("listing_groups")
    .select(
      `
      id, title, zone,
      listings (
        id, folio, type, operation, price_mxn, status,
        commission_rate_pct, commission_amount_mxn,
        requires_ulot, next_renewal_at, is_exclusive, exclusive_until,
        verifications ( status ),
        leads (
          id, contacted_at, buyer:users ( id, full_name, email, phone ),
          visit_requests ( id, preferred_datetime, message, created_at )
        ),
        listing_status_history ( id, status, changed_at, reason, penalty_amount_mxn, penalty_status )
      )
    `,
    )
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .returns<OwnerListingGroupRow[]>();

  if (error) {
    console.error("Error al cargar panel de propietario:", error);
  }

  const rows = (groups ?? []).flatMap((group) =>
    group.listings.map((listing) => ({
      ...listing,
      zoneTitle: group.title,
      zone: group.zone,
      contacts: listing.leads
        .filter((lead) => lead.buyer !== null)
        .map((lead) => ({
          leadId: lead.id,
          contactedAt: lead.contacted_at,
          buyerId: lead.buyer!.id,
          buyerName: lead.buyer!.full_name,
          buyerEmail: lead.buyer!.email,
          maskedPhone: maskPhone(lead.buyer!.phone),
        }))
        .sort((a, b) => b.contactedAt.localeCompare(a.contactedAt)),
      visits: listing.leads
        .filter((lead) => lead.buyer !== null)
        .flatMap((lead) =>
          lead.visit_requests.map((visit) => ({
            id: visit.id,
            buyerName: lead.buyer!.full_name,
            buyerEmail: lead.buyer!.email,
            preferredDatetime: visit.preferred_datetime,
            message: visit.message,
            createdAt: visit.created_at,
          })),
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      history: listing.listing_status_history
        .map((entry) => ({
          id: entry.id,
          status: entry.status,
          changedAt: entry.changed_at,
          reason: entry.reason,
          penaltyAmountMxn: entry.penalty_amount_mxn,
          penaltyStatus: entry.penalty_status,
        }))
        .sort((a, b) => b.changedAt.localeCompare(a.changedAt)),
    })),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold">Panel de propietario</h1>
      <p className="mt-2 text-muted">
        Todos tus predios, en todas tus zonas, en un solo lugar.
      </p>

      <div className="mt-4 inline-block rounded-md border border-border px-4 py-2 text-sm">
        Saldo de Ulots: <span className="font-semibold">{ulotBalance}</span>
        {ulotBalance < 1 && (
          <span className="ml-2 text-muted">
            (contacta al administrador para recargar)
          </span>
        )}
      </div>

      {error && (
        <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
          No se pudo cargar tu información: {error.message}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4">
        {rows.map((listing) => (
          <OwnerListingRow
            key={`${listing.id}-${listing.status}`}
            listingId={listing.id}
            folio={listing.folio}
            type={listing.type}
            zoneTitle={listing.zoneTitle}
            zone={listing.zone}
            priceMxn={listing.price_mxn}
            status={listing.status}
            verificacion={verificacionEstado(listing.verifications)}
            contacts={listing.contacts}
            visits={listing.visits}
            history={listing.history}
            commissionRatePct={listing.commission_rate_pct}
            commissionAmountMxn={listing.commission_amount_mxn}
            requiresUlot={listing.requires_ulot}
            nextRenewalAt={listing.next_renewal_at}
            isExclusive={listing.is_exclusive}
            exclusiveUntil={listing.exclusive_until}
          />
        ))}

        {rows.length === 0 && !error && (
          <p className="text-sm text-muted">
            Todavía no tienes ningún predio. Ve a{" "}
            <Link href="/publicar" className="underline">
              Publicar
            </Link>{" "}
            para crear tu primera zona.
          </p>
        )}
      </div>
    </div>
  );
}
