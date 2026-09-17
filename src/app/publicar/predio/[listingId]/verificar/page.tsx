import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VerificacionForm } from "./verificacion-form";

interface VerificarPageProps {
  params: Promise<{ listingId: string }>;
}

export default async function VerificarPredioPage({
  params,
}: VerificarPageProps) {
  const { listingId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: listing } = await supabase
    .from("listings")
    .select("id, folio")
    .eq("id", listingId)
    .single();

  if (!listing) {
    notFound();
  }

  const { data: verifications } = await supabase
    .from("verifications")
    .select("id, status, submitted_at, rejection_reason")
    .eq("listing_id", listingId)
    .order("submitted_at", { ascending: false });

  const hasApproved = verifications?.some((v) => v.status === "aprobado");
  const latest = verifications?.[0] ?? null;

  type EstadoVerificacion = "sin_enviar" | "pendiente" | "rechazado" | "aprobado";
  let estado: EstadoVerificacion;
  if (hasApproved) {
    estado = "aprobado";
  } else if (!latest) {
    estado = "sin_enviar";
  } else if (latest.status === "pendiente") {
    estado = "pendiente";
  } else {
    estado = "rechazado";
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold">Verificación de propiedad</h1>
      <p className="mt-2 text-muted">
        Predio {listing.folio ?? listingId}
      </p>

      {estado === "aprobado" && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400">
          ¡Tu predio ya fue aprobado y es visible al público!
        </div>
      )}

      {estado === "pendiente" && (
        <div className="mt-6 rounded-lg border border-border p-4 text-sm">
          Tu documento está en revisión. Te avisaremos cuando nuestro
          equipo lo revise — no necesitas hacer nada más por ahora.
        </div>
      )}

      {estado === "rechazado" && (
        <>
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            Tu documento fue rechazado
            {latest?.rejection_reason
              ? `: ${latest.rejection_reason}`
              : "."}{" "}
            Sube uno nuevo para volver a intentarlo.
          </div>
          <VerificacionForm listingId={listingId} />
        </>
      )}

      {estado === "sin_enviar" && <VerificacionForm listingId={listingId} />}
    </div>
  );
}
