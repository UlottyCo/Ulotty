import { PropertyAdminStats } from "@/components/dashboards/property-admin-stats";
import { PropertyAdminTable } from "@/components/dashboards/property-admin-table";
import { PropertyAdminFilters } from "@/components/dashboards/property-admin-filters";

export default async function PanelAdminPage() {
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
          value="245"
          icon="📊"
          subtext="Todas las épocas"
        />
        <PropertyAdminStats
          label="Pendiente Verificación"
          value="18"
          icon="⏳"
          subtext="Requiere acción"
          highlight
        />
        <PropertyAdminStats
          label="Verificadas"
          value="189"
          icon="✅"
          subtext="Listas para publicar"
        />
        <PropertyAdminStats
          label="Rechazadas"
          value="28"
          icon="❌"
          subtext="Requieren corrección"
        />
        <PropertyAdminStats
          label="Pausadas"
          value="10"
          icon="⏸️"
          subtext="Sin actividad"
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <PropertyAdminFilters />
      </div>

      {/* Table */}
      <div>
        <PropertyAdminTable />
      </div>
    </div>
  );
}
