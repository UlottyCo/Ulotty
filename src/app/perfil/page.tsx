import { createClient } from "@/lib/supabase/server";
import { PerfilForm } from "./perfil-form";

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // La ruta ya exige sesión (proxy.ts). Si por algún motivo llegamos
  // aquí sin usuario, no hay nada que mostrar.
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("users")
    .select("full_name, email, phone, role, is_verified, created_at")
    .eq("id", user.id)
    .single();

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Mi perfil</h1>

      {error || !profile ? (
        <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
          No se pudo cargar tu perfil{error ? `: ${error.message}` : "."}
        </p>
      ) : (
        <PerfilForm
          fullName={profile.full_name}
          email={profile.email}
          phone={profile.phone}
          role={profile.role}
          isVerified={profile.is_verified}
          createdAt={profile.created_at}
        />
      )}
    </div>
  );
}
