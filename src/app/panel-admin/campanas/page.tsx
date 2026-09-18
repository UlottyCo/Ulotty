import { AdminHeader } from "@/components/admin/admin-header";

export default async function CampanasPage() {
  const campanas = [
    { id: "CAMP001", nombre: "Black Friday 2026", estado: "Activa", impresiones: 45234, clicks: 3421, tasa: "7.6%", presupuesto: "$5,000", gasto: "$3,245" },
    { id: "CAMP002", nombre: "Propiedades de lujo", estado: "Activa", impresiones: 28932, clicks: 2156, tasa: "7.4%", presupuesto: "$3,000", gasto: "$2,891" },
    { id: "CAMP003", nombre: "Nuevos agentes", estado: "Pausada", impresiones: 15234, clicks: 982, tasa: "6.4%", presupuesto: "$2,000", gasto: "$1,245" },
    { id: "CAMP004", nombre: "Rebajas de primavera", estado: "Finalizada", impresiones: 82345, clicks: 5678, tasa: "6.9%", presupuesto: "$7,500", gasto: "$7,500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Campañas de Marketing</h1>
            <p className="text-muted mt-2">Gestiona campañas publicitarias y promociones.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Nueva campaña
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Campañas activas</div>
            <div className="text-2xl font-bold text-brand">2</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Impresiones totales</div>
            <div className="text-2xl font-bold text-blue-600">172K</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Clicks totales</div>
            <div className="text-2xl font-bold text-green-600">11.2K</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Presupuesto usado</div>
            <div className="text-2xl font-bold text-orange-600">$14.4K</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-center py-3 px-4 font-semibold">Impresiones</th>
                <th className="text-center py-3 px-4 font-semibold">Clicks</th>
                <th className="text-center py-3 px-4 font-semibold">CTR</th>
                <th className="text-right py-3 px-4 font-semibold">Presupuesto</th>
                <th className="text-right py-3 px-4 font-semibold">Gasto</th>
              </tr>
            </thead>
            <tbody>
              {campanas.map((camp) => (
                <tr key={camp.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{camp.nombre}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${camp.estado === "Activa" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : camp.estado === "Pausada" ? "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"}`}>
                      {camp.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{camp.impresiones.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">{camp.clicks.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center font-bold">{camp.tasa}</td>
                  <td className="py-3 px-4 text-right font-semibold">{camp.presupuesto}</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">{camp.gasto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
