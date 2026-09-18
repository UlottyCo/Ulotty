export function VisitsSection() {
  const visits = [
    {
      id: 1,
      property: "Casa Moderna - Rosarito",
      visitor: "Juan López",
      date: "Hoy, 14:30",
      status: "confirmada",
    },
    {
      id: 2,
      property: "Departamento Centro",
      visitor: "María García",
      date: "Mañana, 10:00",
      status: "pendiente",
    },
    {
      id: 3,
      property: "Predio Oceanfront",
      visitor: "Carlos Ruiz",
      date: "20 sep, 16:00",
      status: "confirmada",
    },
    {
      id: 4,
      property: "Casa Moderna - Rosarito",
      visitor: "Ana Martínez",
      date: "21 sep, 11:00",
      status: "pendiente",
    },
    {
      id: 5,
      property: "Departamento Centro",
      visitor: "Roberto Díaz",
      date: "22 sep, 15:30",
      status: "completada",
    },
  ];

  const statusColors: Record<string, string> = {
    confirmada: "bg-green-100 text-green-700",
    pendiente: "bg-yellow-100 text-yellow-700",
    completada: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Visitas Agendadas</h2>
        <a href="#" className="text-sm text-brand hover:underline">
          Ver todas →
        </a>
      </div>

      <div className="space-y-3">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="flex items-center justify-between rounded-lg border border-border/50 p-3 hover:bg-subtle/50"
          >
            <div className="flex-1">
              <p className="font-medium text-sm">{visit.property}</p>
              <p className="mt-0.5 text-xs text-muted">{visit.visitor}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">{visit.date}</span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  statusColors[visit.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {visit.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
