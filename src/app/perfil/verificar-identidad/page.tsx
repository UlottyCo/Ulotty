import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { IdVerificationForm } from "./id-verification-form";

export default async function VerificarIdentidadPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: verifications } = await supabase
    .from("buyer_id_verifications")
    .select("id, status, submitted_at, rejection_reason")
    .eq("buyer_id", user.id)
    .order("submitted_at", { ascending: false });

  const hasApproved = verifications?.some((v) => v.status === "aprobado");
  const latest = verifications?.[0] ?? null;

  type Estado = "sin_enviar" | "pendiente" | "rechazado" | "aprobado";
  let estado: Estado;
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
      <Link
        href="/perfil"
        className="text-sm underline text-black/60 dark:text-white/60"
      >
        ← Volver a mi perfil
      </Link>
      <h1 className="mt-4 text-2xl font-bold">
        Verificación de identificación
      </h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Necesaria para poder agendar visitas presenciales.
      </p>

      {estado === "aprobado" && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400">
          Tu identificación ya fue aprobada — puedes agendar visitas.
        </div>
      )}

      {estado === "pendiente" && (
        <div className="mt-6 rounded-lg border border-black/10 p-4 text-sm dark:border-white/10">
          Tu documento está en revisión. Te avisaremos cuando nuestro
          equipo lo revise.
        </div>
      )}

      {estado === "rechazado" && (
        <>
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            Tu documento fue rechazado
            {latest?.rejection_reason ? `: ${latest.rejection_reason}` : "."}{" "}
            Sube uno nuevo para volver a intentarlo.
          </div>
          <IdVerificationForm />
        </>
      )}

      {estado === "sin_enviar" && <IdVerificationForm />}
    </div>
  );
}
