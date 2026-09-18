import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { MiCuentaSidebar } from "@/components/account/mi-cuenta-sidebar";
import { BusquedasGuardadasContent } from "@/components/account/busquedas-guardadas-content";

export default async function BusquedasGuardasPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <MiCuentaSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Búsquedas guardadas</h1>
              <p className="text-muted mt-2">
                Guarda tus búsquedas y recibe alertas cuando haya nuevas propiedades que coincidan.
              </p>
            </div>
            <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
              + Nueva búsqueda
            </button>
          </div>

          {/* Content */}
          <BusquedasGuardadasContent />
        </div>
      </div>
    </div>
  );
}
