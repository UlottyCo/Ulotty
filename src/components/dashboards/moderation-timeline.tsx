export function ModerationTimeline() {
  const events = [
    {
      id: 1,
      action: "Enviado para revisión",
      actor: "Propietario",
      date: "Hoy, 10:30",
      type: "submit",
    },
    {
      id: 2,
      action: "Revisión iniciada",
      actor: "Admin",
      date: "Hoy, 10:45",
      type: "start",
    },
    {
      id: 3,
      action: "Solicitado información adicional",
      actor: "Revisor",
      date: "Hoy, 11:20",
      type: "request",
    },
    {
      id: 4,
      action: "Información actualizada",
      actor: "Propietario",
      date: "Hoy, 13:00",
      type: "update",
    },
    {
      id: 5,
      action: "Propiedad creada",
      actor: "Sistema",
      date: "15 sep, 14:30",
      type: "create",
    },
  ];

  const typeColors: Record<string, string> = {
    submit: "bg-blue-100",
    start: "bg-yellow-100",
    request: "bg-orange-100",
    update: "bg-green-100",
    create: "bg-gray-100",
  };

  const typeIcons: Record<string, string> = {
    submit: "📤",
    start: "▶️",
    request: "❓",
    update: "🔄",
    create: "✨",
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-6 text-xl font-semibold">Historial de Cambios</h2>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  typeColors[event.type]
                }`}
              >
                {typeIcons[event.type]}
              </div>
              {index < events.length - 1 && (
                <div className="h-6 w-0.5 bg-border" />
              )}
            </div>

            <div className="flex-1 pt-1">
              <p className="font-medium text-foreground">{event.action}</p>
              <p className="mt-0.5 text-xs text-muted">
                {event.actor} · {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
