export function PropertyAdminTable() {
  const properties = [
    {
      id: "LP-001",
      title: "Casa Moderna Rosarito",
      type: "Casa",
      zona: "Rosarito",
      status: "pendiente",
      price: "$250,000",
      daysAgo: 2,
    },
    {
      id: "LP-002",
      title: "Departamento Centro",
      type: "Depto",
      zona: "Centro",
      status: "verificada",
      price: "$120,000",
      daysAgo: 5,
    },
    {
      id: "LP-003",
      title: "Predio Oceanfront",
      type: "Predio",
      zona: "Playas",
      status: "rechazada",
      price: "$450,000",
      daysAgo: 8,
    },
    {
      id: "LP-004",
      title: "Casa Colonial",
      type: "Casa",
      zona: "Centro",
      status: "verificada",
      price: "$185,000",
      daysAgo: 12,
    },
    {
      id: "LP-005",
      title: "Terreno Residencial",
      type: "Predio",
      zona: "Rosarito",
      status: "pausada",
      price: "$95,000",
      daysAgo: 15,
    },
  ];

  const statusBadges: Record<string, string> = {
    pendiente: "bg-yellow-100 text-yellow-700",
    verificada: "bg-green-100 text-green-700",
    rechazada: "bg-red-100 text-red-700",
    pausada: "bg-gray-100 text-gray-700",
    publicada: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead className="bg-surface border-b border-border">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Propiedad</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Zona</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Hace</th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-muted">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {properties.map((prop) => (
            <tr key={prop.id} className="hover:bg-subtle/50">
              <td className="px-6 py-4 text-sm font-mono text-foreground">{prop.id}</td>
              <td className="px-6 py-4 text-sm font-medium text-foreground">{prop.title}</td>
              <td className="px-6 py-4 text-sm text-muted">{prop.type}</td>
              <td className="px-6 py-4 text-sm text-muted">{prop.zona}</td>
              <td className="px-6 py-4 text-sm font-medium text-foreground">{prop.price}</td>
              <td className="px-6 py-4">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusBadges[prop.status]}`}>
                  {prop.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-muted">{prop.daysAgo}d</td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  <button className="rounded px-2 py-1 text-xs font-semibold text-brand hover:bg-brand/10">
                    Ver
                  </button>
                  <button className="rounded px-2 py-1 text-xs font-semibold text-muted hover:bg-subtle">
                    ⋮
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-surface border-t border-border px-6 py-4 text-sm text-muted">
        Mostrando 1-5 de 245 propiedades
      </div>
    </div>
  );
}
