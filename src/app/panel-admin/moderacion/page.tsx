import { AdminHeader } from "@/components/admin/admin-header";

export default async function ModeracionPage() {
  const reportes = [
    { id: 1, tipo: "Propiedad", recurso: "P001", reportante: "Usuario #3421", razon: "Información falsa", fecha: "17 sep 2026", estado: "Abierto", acciones: "Revisar" },
    { id: 2, tipo: "Usuario", recurso: "U4521", reportante: "Moderador", razon: "Spam", fecha: "17 sep 2026", estado: "Resuelto", acciones: "Suspendido" },
    { id: 3, tipo: "Propiedad", recurso: "P234", reportante: "Usuario #5678", razon: "Contenido inapropiado", fecha: "16 sep 2026", estado: "En revisión", acciones: "Revisar" },
    { id: 4, tipo: "Usuario", recurso: "U7834", reportante: "Usuario #2341", razon: "Acoso", fecha: "15 sep 2026", estado: "Resuelto", acciones: "Advertencia" },
    { id: 5, tipo: "Propiedad", recurso: "P567", reportante: "Usuario #9876", razon: "Precio engañoso", fecha: "14 sep 2026", estado: "Desestimado", acciones: "Cerrado" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Moderación</h1>
            <p className="text-muted mt-2">Gestiona reportes y moderación de contenido.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Nuevo reporte
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Reportes totales</div>
            <div className="text-2xl font-bold text-brand">487</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Abiertos</div>
            <div className="text-2xl font-bold text-red-600">23</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">En revisión</div>
            <div className="text-2xl font-bold text-orange-600">12</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Resueltos</div>
            <div className="text-2xl font-bold text-green-600">452</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">ID</th>
                <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold">Recurso</th>
                <th className="text-left py-3 px-4 font-semibold">Razón</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                <th className="text-center py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((rep) => (
                <tr key={rep.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{rep.id}</td>
                  <td className="py-3 px-4">{rep.tipo}</td>
                  <td className="py-3 px-4">{rep.recurso}</td>
                  <td className="py-3 px-4">{rep.razon}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${rep.estado === "Abierto" ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" : rep.estado === "En revisión" ? "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" : rep.estado === "Resuelto" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"}`}>
                      {rep.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted">{rep.fecha}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-xs text-brand hover:underline font-semibold">{rep.acciones}</button>
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
