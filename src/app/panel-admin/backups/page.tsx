import { AdminHeader } from "@/components/admin/admin-header";

export default async function BackupsPage() {
  const backups = [
    { id: 1, fecha: "17 sep 2026 2:30 AM", tamaño: "12.4 GB", estado: "Completado", duracion: "45 min", datos: "Automático", ubicacion: "AWS S3" },
    { id: 2, fecha: "16 sep 2026 2:30 AM", tamaño: "12.2 GB", estado: "Completado", duracion: "42 min", datos: "Automático", ubicacion: "AWS S3" },
    { id: 3, fecha: "15 sep 2026 2:30 AM", tamaño: "12.1 GB", estado: "Completado", duracion: "44 min", datos: "Automático", ubicacion: "AWS S3" },
    { id: 4, fecha: "14 sep 2026 2:30 AM", tamaño: "12.0 GB", estado: "Completado", duracion: "43 min", datos: "Automático", ubicacion: "AWS S3" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Backups</h1>
            <p className="text-muted mt-2">Gestiona respaldos y recuperación de datos.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Crear respaldo ahora
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Respaldos totales</div>
            <div className="text-2xl font-bold text-brand">247</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Espacio usado</div>
            <div className="text-2xl font-bold text-blue-600">3.2 TB</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Último respaldo</div>
            <div className="text-2xl font-bold text-green-600">Hace 8h</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Tasa éxito</div>
            <div className="text-2xl font-bold text-green-600">100%</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                <th className="text-right py-3 px-4 font-semibold">Tamaño</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 font-semibold">Duración</th>
                <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold">Ubicación</th>
                <th className="text-center py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((backup) => (
                <tr key={backup.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4">{backup.fecha}</td>
                  <td className="py-3 px-4 text-right font-bold">{backup.tamaño}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      {backup.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">{backup.duracion}</td>
                  <td className="py-3 px-4">{backup.datos}</td>
                  <td className="py-3 px-4">{backup.ubicacion}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-xs text-brand hover:underline font-semibold">Restaurar</button>
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
