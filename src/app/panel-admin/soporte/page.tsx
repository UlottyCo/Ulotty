import { AdminHeader } from "@/components/admin/admin-header";

export default async function SoportePage() {
  const tickets = [
    { id: "TK001", asunto: "No puedo crear propiedad", usuario: "Juan Pérez", estado: "Abierto", prioridad: "Alta", fecha: "17 sep 2026", respuestas: 2 },
    { id: "TK002", asunto: "Error al descargar reporte", usuario: "María García", estado: "En progreso", prioridad: "Media", fecha: "16 sep 2026", respuestas: 5 },
    { id: "TK003", asunto: "Cambiar contraseña", usuario: "Carlos López", estado: "Resuelto", prioridad: "Baja", fecha: "15 sep 2026", respuestas: 1 },
    { id: "TK004", asunto: "Facturación incorrecta", usuario: "Ana Martínez", estado: "Abierto", prioridad: "Alta", fecha: "14 sep 2026", respuestas: 3 },
    { id: "TK005", asunto: "Solicitud de datos", usuario: "User #5678", estado: "Resuelto", prioridad: "Media", fecha: "12 sep 2026", respuestas: 8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Soporte</h1>
            <p className="text-muted mt-2">Gestiona tickets y solicitudes de soporte.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Nuevo ticket
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Total tickets</div>
            <div className="text-2xl font-bold text-brand">1,247</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Abiertos</div>
            <div className="text-2xl font-bold text-red-600">87</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">En progreso</div>
            <div className="text-2xl font-bold text-orange-600">23</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Resueltos</div>
            <div className="text-2xl font-bold text-green-600">1,137</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">ID</th>
                <th className="text-left py-3 px-4 font-semibold">Asunto</th>
                <th className="text-left py-3 px-4 font-semibold">Usuario</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 font-semibold">Prioridad</th>
                <th className="text-center py-3 px-4 font-semibold">Respuestas</th>
                <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                <th className="text-center py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{ticket.id}</td>
                  <td className="py-3 px-4">{ticket.asunto}</td>
                  <td className="py-3 px-4">{ticket.usuario}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${ticket.estado === "Abierto" ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" : ticket.estado === "En progreso" ? "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"}`}>
                      {ticket.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${ticket.prioridad === "Alta" ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" : ticket.prioridad === "Media" ? "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"}`}>
                      {ticket.prioridad}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{ticket.respuestas}</td>
                  <td className="py-3 px-4 text-xs text-muted">{ticket.fecha}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-xs text-brand hover:underline font-semibold">Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
