import { AdminHeader } from "@/components/admin/admin-header";

export default async function OperacionesPage() {
  const operaciones = [
    { id: "OP001", tipo: "Venta", propiedad: "Casa Rosarito #P001", agente: "Juan Pérez", comprador: "Carlos Ramírez", monto: "$850,000", estado: "Completado", fecha: "17 sep 2026", comision: "$42,500" },
    { id: "OP002", tipo: "Arrendamiento", propiedad: "Depto Tijuana #P045", agente: "María García", comprador: "Ana López", monto: "$1,200/mes", estado: "Activo", fecha: "15 sep 2026", comision: "$180" },
    { id: "OP003", tipo: "Promesa", propiedad: "Terreno Ensenada #P123", agente: "Carlos López", comprador: "Luis González", monto: "$500,000", estado: "Pendiente", fecha: "14 sep 2026", comision: "$25,000" },
    { id: "OP004", tipo: "Venta", propiedad: "Oficinas Tijuana #P234", agente: "Ana Martínez", comprador: "Empresa XYZ", monto: "$2,500,000", estado: "Completado", fecha: "10 sep 2026", comision: "$125,000" },
    { id: "OP005", tipo: "Arrendamiento", propiedad: "Local Comercial #P289", agente: "Juan Pérez", comprador: "Negocio ABC", monto: "$3,500/mes", estado: "Activo", fecha: "8 sep 2026", comision: "$525" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Operaciones</h1>
            <p className="text-muted mt-2">Gestiona todas las transacciones y operaciones del sistema.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Nueva operación
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Total operaciones</div>
            <div className="text-2xl font-bold text-brand">1.248</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Completadas</div>
            <div className="text-2xl font-bold text-green-600">982</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">En progreso</div>
            <div className="text-2xl font-bold text-blue-600">187</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Valor total</div>
            <div className="text-2xl font-bold text-purple-600">$3.2B</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">ID</th>
                <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold">Propiedad</th>
                <th className="text-left py-3 px-4 font-semibold">Agente</th>
                <th className="text-left py-3 px-4 font-semibold">Monto</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 font-semibold">Comisión</th>
                <th className="text-left py-3 px-4 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {operaciones.map((op) => (
                <tr key={op.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{op.id}</td>
                  <td className="py-3 px-4">{op.tipo}</td>
                  <td className="py-3 px-4">{op.propiedad}</td>
                  <td className="py-3 px-4">{op.agente}</td>
                  <td className="py-3 px-4 font-semibold">{op.monto}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${op.estado === "Completado" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : op.estado === "Activo" ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"}`}>
                      {op.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">{op.comision}</td>
                  <td className="py-3 px-4 text-muted">{op.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
