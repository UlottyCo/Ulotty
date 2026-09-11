import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RoleForm } from "./role-form";

interface RolePageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function RegistroRolPage({ searchParams }: RolePageProps) {
  const { next } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  // Ya eligió su rol antes — esta pantalla es de una sola vez, no se
  // puede volver a entrar para cambiarlo.
  if (profile?.role) {
    redirect(next || "/");
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-2xl border border-border p-8">
        <h1 className="text-center text-2xl font-bold">¿Cómo vas a usar Ulotty?</h1>
        <p className="mt-1 text-center text-sm text-muted">
          Elige con cuidado: por ahora no se puede cambiar después
        </p>
        <RoleForm next={next || "/"} />
      </div>
    </div>
  );
}
