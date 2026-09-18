import { createClient } from "@/lib/supabase/server";
import { PropertyStatsCard } from "@/components/dashboards/property-stats-card";
import { VisitsSection } from "@/components/dashboards/visits-section";
import { MessagesSection } from "@/components/dashboards/messages-section";
import { TasksSection } from "@/components/dashboards/tasks-section";

export default async function PanelPropietarioPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p>Por favor inicia sesión para acceder al panel.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Panel de Propietario</h1>
        <p className="mt-2 text-muted">Gestiona tus propiedades, visitas y mensajes</p>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PropertyStatsCard
          label="Propiedades Activas"
          value="8"
          icon="🏠"
          trend="+2 este mes"
        />
        <PropertyStatsCard
          label="Visitas Pendientes"
          value="5"
          icon="📅"
          trend="2 hoy"
          highlight
        />
        <PropertyStatsCard
          label="Mensajes Nuevos"
          value="12"
          icon="💬"
          trend="3 sin leer"
          highlight
        />
        <PropertyStatsCard
          label="Ingresos Este Mes"
          value="$45,200"
          icon="💰"
          trend="+15% vs mes anterior"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Visitas y Tareas */}
        <div className="lg:col-span-2 space-y-8">
          <VisitsSection />
          <TasksSection />
        </div>

        {/* Right Column - Mensajes */}
        <div>
          <MessagesSection />
        </div>
      </div>
    </div>
  );
}
