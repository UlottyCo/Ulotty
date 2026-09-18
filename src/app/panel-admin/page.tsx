import { PropertyAdminStats } from "@/components/dashboards/property-admin-stats";
import { AdminPropertiesSection } from "@/components/dashboards/admin-properties-section";
import { getAdminStats } from "@/app/actions/dashboard";

export default async function PanelAdminPage() {
  const stats = await getAdminStats();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Administración de Propiedades</h1>
        <p className="mt-2 text-muted">
          Gestión, verificación y auditoría de propiedades
        </p>
      </div>

      {/* KPIs */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <PropertyAdminStats
          label="Total Propiedades"
          value={stats.total.toString()}
          icon="📊"
          subtext="Todas las épocas"
        />
        <PropertyAdminStats
          label="Pendiente Verificación"
          value={stats.pendiente.toString()}
          icon="⏳"
          subtext="Requiere acción"
          highlight
        />
        <PropertyAdminStats
          label="Verificadas"
          value={stats.verificada.toString()}
          icon="✅"
          subtext="Listas para publicar"
        />
        <PropertyAdminStats
          label="Rechazadas"
          value={stats.rechazada.toString()}
          icon="❌"
          subtext="Requieren corrección"
        />
        <PropertyAdminStats
          label="Pausadas"
          value={stats.pausada.toString()}
          icon="⏸️"
          subtext="Sin actividad"
        />
      </div>

      {/* Filters & Table */}
      <AdminPropertiesSection />
    </div>
  );
}
