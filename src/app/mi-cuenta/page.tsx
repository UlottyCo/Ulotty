import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { MiCuentaTabs } from "@/components/account/mi-cuenta-tabs";
import { MiCuentaSidebar } from "@/components/account/mi-cuenta-sidebar";

export default async function MiCuentaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  // Fetch user profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <MiCuentaSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Mi cuenta</h1>
            <p className="text-muted mt-2">
              Administra tu información personal, configuración y preferencias.
            </p>
          </div>

          {/* Tabs & Content */}
          <MiCuentaTabs user={user} profile={profile} />
        </div>
      </div>
    </div>
  );
}
