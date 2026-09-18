import { AdminHeader } from "@/components/admin/admin-header";

export default async function WebhooksPage() {
  const webhooks = [
    { id: "WH001", nombre: "Propiedad creada", url: "https://api.example.com/property-created", evento: "property.created", estado: "Activo", entregas: 234, tasa_exito: "99.8%" },
    { id: "WH002", nombre: "Usuario registrado", url: "https://api.example.com/user-registered", evento: "user.registered", estado: "Activo", entregas: 567, tasa_exito: "100%" },
    { id: "WH003", nombre: "Transacción completada", url: "https://api.example.com/transaction", evento: "transaction.completed", estado: "Activo", entregas: 123, tasa_exito: "98.5%" },
    { id: "WH004", nombre: "Propiedad actualizada", url: "https://api.example.com/property-updated", evento: "property.updated", estado: "Inactivo", entregas: 0, tasa_exito: "N/A" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Webhooks</h1>
            <p className="text-muted mt-2">Configura webhooks para eventos del sistema.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Nuevo webhook
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Webhooks activos</div>
            <div className="text-2xl font-bold text-brand">3</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Entregas totales</div>
            <div className="text-2xl font-bold text-blue-600">924</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Tasa promedio éxito</div>
            <div className="text-2xl font-bold text-green-600">99.4%</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Fallos últimas 24h</div>
            <div className="text-2xl font-bold text-red-600">3</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold">URL</th>
                <th className="text-left py-3 px-4 font-semibold">Evento</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-center py-3 px-4 font-semibold">Entregas</th>
                <th className="text-center py-3 px-4 font-semibold">Tasa Éxito</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((wh) => (
                <tr key={wh.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{wh.nombre}</td>
                  <td className="py-3 px-4 text-xs text-muted">{wh.url}</td>
                  <td className="py-3 px-4">{wh.evento}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${wh.estado === "Activo" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"}`}>
                      {wh.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{wh.entregas}</td>
                  <td className="py-3 px-4 text-center font-bold">{wh.tasa_exito}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
