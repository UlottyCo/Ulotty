import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PerfilForm } from "./perfil-form";
import { PhoneVerification } from "./phone-verification";

interface PerfilPageProps {
  searchParams: Promise<{ verificar?: string }>;
}

export default async function PerfilPage({ searchParams }: PerfilPageProps) {
  const { verificar } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // La ruta ya exige sesión (proxy.ts). Si por algún motivo llegamos
  // aquí sin usuario, no hay nada que mostrar.
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("users")
    .select(
      "full_name, email, phone, role, is_verified, created_at, phone_verified",
    )
    .eq("id", user.id)
    .single();

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Mi perfil</h1>

      {verificar === "telefono" && (
        <p className="mt-4 rounded-md bg-subtle p-3 text-sm">
          Verifica tu teléfono para poder contactar a un dueño.
        </p>
      )}

      {error || !profile ? (
        <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
          No se pudo cargar tu perfil{error ? `: ${error.message}` : "."}
        </p>
      ) : (
        <>
          <PerfilForm
            fullName={profile.full_name}
            email={profile.email}
            phone={profile.phone}
            role={profile.role}
            isVerified={profile.is_verified}
            createdAt={profile.created_at}
          />
          <div className="mt-6">
            <PhoneVerification
              phone={profile.phone}
              phoneVerified={profile.phone_verified}
            />
          </div>
          <Link
            href="/perfil/verificar-identidad"
            className="mt-4 inline-block text-sm underline text-muted"
          >
            Verificar identificación oficial (necesaria para agendar visitas)
          </Link>
        </>
      )}
    </div>
  );
}
