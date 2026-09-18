import { AdminHeader } from "@/components/admin/admin-header";

export default async function ReportesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Reportes</h1>
          <p className="text-muted mt-2">Genera y descarga reportes del sistema.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Reportes generados</div>
            <div className="text-2xl font-bold text-brand">156</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Este mes</div>
            <div className="text-2xl font-bold text-blue-600">34</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Usuarios activos</div>
            <div className="text-2xl font-bold text-purple-600">4.678</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">Reporte de ventas</h3>
                <p className="text-sm text-muted">Análisis detallado de todas las ventas</p>
              </div>
              <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand/90">Generar</button>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">Reporte de usuarios</h3>
                <p className="text-sm text-muted">Estadísticas de actividad y registro de usuarios</p>
              </div>
              <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand/90">Generar</button>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">Reporte de propiedades</h3>
                <p className="text-sm text-muted">Inventario y estado de todas las propiedades</p>
              </div>
              <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand/90">Generar</button>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">Reporte financiero</h3>
                <p className="text-sm text-muted">Ingresos, gastos y comisiones</p>
              </div>
              <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand/90">Generar</button>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">Reporte de auditoría</h3>
                <p className="text-sm text-muted">Registro de cambios y acciones del sistema</p>
              </div>
              <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand/90">Generar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
