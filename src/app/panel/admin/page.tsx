import { createClient } from "@/lib/supabase/server";
import { VerificationReviewCard } from "./verification-review-card";

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

export default async function PanelAdminPage() {
  const supabase = await createClient();

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
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">Verificaciones pendientes</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Revisa el documento de propiedad y aprueba o rechaza. Si el
        predio tiene varios documentos, la decisión aplica a todos
        juntos.
      </p>

      {error && (
        <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
          No se pudo cargar la lista: {error.message}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4">
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
    </div>
  );
}
