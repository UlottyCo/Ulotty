import { ActivityFeed } from "@/components/dashboards/activity-feed";
import { ActivityStats } from "@/components/dashboards/activity-stats";
import { getActivityStats } from "@/app/actions/dashboard";

function formatCurrency(value: number) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
}

export default async function ActivityPage() {
  const stats = await getActivityStats();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Centro de Actividad</h1>
        <p className="mt-2 text-muted">Monitorea todas las actividades del sistema</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ActivityStats
          label="Actividad Hoy"
          value={stats.activityToday.toString()}
          icon="📊"
          trend="+12 vs ayer"
        />
        <ActivityStats
          label="Usuarios Activos"
          value={stats.activeUsers.toString()}
          icon="👥"
          trend="+8 en línea"
        />
        <ActivityStats
          label="Nuevas Propiedades"
          value={stats.newProperties.toString()}
          icon="🏠"
          trend="+3 esta hora"
        />
        <ActivityStats
          label="Transacciones"
          value={formatCurrency(stats.transactions)}
          icon="💰"
          trend="+$150K esta hora"
        />
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}
