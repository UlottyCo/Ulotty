import { AdminHeader } from "@/components/admin/admin-header";

export default async function AuditoriaPage() {
  const logs = [
    { id: 1, usuario: "Juan Pérez", accion: "Crear propiedad", recurso: "P001", fecha: "17 sep 2026 10:45 AM", estado: "Exitoso", detalles: "Casa Rosarito" },
    { id: 2, usuario: "María García", accion: "Editar propiedad", recurso: "P045", fecha: "17 sep 2026 10:30 AM", estado: "Exitoso", detalles: "Precio actualizado" },
    { id: 3, usuario: "Admin", accion: "Suspender usuario", recurso: "U4521", fecha: "17 sep 2026 09:15 AM", estado: "Exitoso", detalles: "Spam" },
    { id: 4, usuario: "Carlos López", accion: "Descargar reporte", recurso: "RPT001", fecha: "16 sep 2026 4:20 PM", estado: "Exitoso", detalles: "Reporte de ventas" },
    { id: 5, usuario: "Admin", accion: "Cambiar configuración", recurso: "CONFIG", fecha: "16 sep 2026 2:10 PM", estado: "Exitoso", detalles: "Comisión 5%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Auditoría</h1>
          <p className="text-muted mt-2">Registro de todas las acciones en el sistema.</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Total eventos</div>
            <div className="text-2xl font-bold text-brand">12,847</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Esta semana</div>
            <div className="text-2xl font-bold text-blue-600">1,234</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Hoy</div>
            <div className="text-2xl font-bold text-green-600">287</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Errores</div>
            <div className="text-2xl font-bold text-red-600">12</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Usuario</th>
                <th className="text-left py-3 px-4 font-semibold">Acción</th>
                <th className="text-left py-3 px-4 font-semibold">Recurso</th>
                <th className="text-left py-3 px-4 font-semibold">Detalles</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{log.usuario}</td>
                  <td className="py-3 px-4">{log.accion}</td>
                  <td className="py-3 px-4">{log.recurso}</td>
                  <td className="py-3 px-4 text-muted">{log.detalles}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      {log.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted">{log.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
