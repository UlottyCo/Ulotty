export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      action: "Propiedad verificada",
      actor: "Admin",
      property: "Casa Moderna - Rosarito",
      timestamp: "Hace 5 min",
      type: "approve",
    },
    {
      id: 2,
      action: "Nueva propiedad enviada",
      actor: "Juan López",
      property: "Departamento Centro",
      timestamp: "Hace 15 min",
      type: "create",
    },
    {
      id: 3,
      action: "Propiedad rechazada",
      actor: "Admin",
      property: "Predio Oceanfront",
      timestamp: "Hace 1h",
      type: "reject",
    },
    {
      id: 4,
      action: "Solicitud de corrección",
      actor: "Revisor",
      property: "Casa Colonial",
      timestamp: "Hace 2h",
      type: "request",
    },
    {
      id: 5,
      action: "Propiedad publicada",
      actor: "Sistema",
      property: "Terreno Residencial",
      timestamp: "Hace 3h",
      type: "publish",
    },
  ];

  const typeStyles: Record<string, string> = {
    approve: "bg-green-100 text-green-700",
    reject: "bg-red-100 text-red-700",
    create: "bg-blue-100 text-blue-700",
    request: "bg-yellow-100 text-yellow-700",
    publish: "bg-purple-100 text-purple-700",
  };

  const typeEmojis: Record<string, string> = {
    approve: "✅",
    reject: "❌",
    create: "✨",
    request: "❓",
    publish: "🚀",
  };

  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-xl font-semibold">Feed de Actividad Reciente</h2>
      </div>

      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 px-6 py-4 hover:bg-subtle/30">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${typeStyles[activity.type]}`}>
              {typeEmojis[activity.type]}
            </div>

            <div className="flex-1">
              <p className="font-medium text-foreground">{activity.action}</p>
              <p className="mt-1 text-sm text-muted">{activity.property}</p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{activity.actor}</p>
              <p className="text-xs text-muted">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-6 py-4 text-center">
        <a href="#" className="text-sm font-semibold text-brand hover:underline">
          Ver todo el historial →
        </a>
      </div>
    </div>
  );
}
