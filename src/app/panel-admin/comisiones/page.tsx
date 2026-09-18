import { AdminHeader } from "@/components/admin/admin-header";

export default async function ComisionesPage() {
  const comisiones = [
    { agente: "Juan Pérez Morales", propiedades: 28, comision_total: "$482,500", pago_pendiente: "$48,250", porcentaje: "5%", estado: "Activo" },
    { agente: "Ana Martínez Ruiz", propiedades: 42, comision_total: "$625,800", pago_pendiente: "$0", porcentaje: "5%", estado: "Pagado" },
    { agente: "María García López", propiedades: 15, comision_total: "$298,700", pago_pendiente: "$29,870", porcentaje: "5%", estado: "Parcial" },
    { agente: "Carlos López Torres", propiedades: 8, comision_total: "$156,400", pago_pendiente: "$15,640", porcentaje: "5%", estado: "Pendiente" },
    { agente: "Patricia López Flores", propiedades: 12, comision_total: "$234,900", pago_pendiente: "$0", porcentaje: "5%", estado: "Pagado" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Comisiones de agentes</h1>
          <p className="text-muted mt-2">Gestiona y monitorea las comisiones de los agentes.</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Comisión total</div>
            <div className="text-2xl font-bold text-green-600">$1.8M</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Pagado este mes</div>
            <div className="text-2xl font-bold text-blue-600">$625K</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Pendiente de pago</div>
            <div className="text-2xl font-bold text-red-600">$194K</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Promedio por agente</div>
            <div className="text-2xl font-bold text-purple-600">$359K</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Agente</th>
                <th className="text-center py-3 px-4 font-semibold">Propiedades</th>
                <th className="text-right py-3 px-4 font-semibold">Comisión Total</th>
                <th className="text-right py-3 px-4 font-semibold">Pago Pendiente</th>
                <th className="text-center py-3 px-4 font-semibold">%</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-center py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {comisiones.map((com) => (
                <tr key={com.agente} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{com.agente}</td>
                  <td className="py-3 px-4 text-center">{com.propiedades}</td>
                  <td className="py-3 px-4 text-right font-bold text-green-600">{com.comision_total}</td>
                  <td className="py-3 px-4 text-right font-bold text-red-600">{com.pago_pendiente}</td>
                  <td className="py-3 px-4 text-center">{com.porcentaje}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${com.estado === "Pagado" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : com.estado === "Activo" ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"}`}>
                      {com.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-xs text-brand hover:underline font-semibold">Pagar</button>
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
