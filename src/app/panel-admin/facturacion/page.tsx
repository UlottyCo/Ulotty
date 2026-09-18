import { AdminHeader } from "@/components/admin/admin-header";

export default async function FacturacionPage() {
  const facturas = [
    { id: "INV-2026-001", usuario: "Juan Pérez", concepto: "Suscripción Premium", monto: "$99.00", fecha: "17 sep 2026", estado: "Pagada", metodo: "Tarjeta" },
    { id: "INV-2026-002", usuario: "María García", concepto: "Suscripción Professional", monto: "$299.00", fecha: "16 sep 2026", estado: "Pagada", metodo: "Transferencia" },
    { id: "INV-2026-003", usuario: "Carlos López", concepto: "Comisión venta", monto: "$2,450.50", fecha: "15 sep 2026", estado: "Pendiente", metodo: "Transferencia" },
    { id: "INV-2026-004", usuario: "Ana Martínez", concepto: "Suscripción Premium", monto: "$99.00", fecha: "14 sep 2026", estado: "Pagada", metodo: "PayPal" },
    { id: "INV-2026-005", usuario: "Patricia López", concepto: "Comisión venta", monto: "$1,234.75", fecha: "12 sep 2026", estado: "Pagada", metodo: "Transferencia" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Facturación</h1>
            <p className="text-muted mt-2">Gestiona facturas e invoices.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Nueva factura
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Facturas este mes</div>
            <div className="text-2xl font-bold text-brand">156</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Ingresos</div>
            <div className="text-2xl font-bold text-green-600">$45,234</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Pagadas</div>
            <div className="text-2xl font-bold text-blue-600">152</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Pendientes</div>
            <div className="text-2xl font-bold text-red-600">4</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Invoice</th>
                <th className="text-left py-3 px-4 font-semibold">Usuario</th>
                <th className="text-left py-3 px-4 font-semibold">Concepto</th>
                <th className="text-right py-3 px-4 font-semibold">Monto</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 font-semibold">Método</th>
                <th className="text-left py-3 px-4 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((fac) => (
                <tr key={fac.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{fac.id}</td>
                  <td className="py-3 px-4">{fac.usuario}</td>
                  <td className="py-3 px-4">{fac.concepto}</td>
                  <td className="py-3 px-4 text-right font-bold">{fac.monto}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${fac.estado === "Pagada" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"}`}>
                      {fac.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">{fac.metodo}</td>
                  <td className="py-3 px-4 text-xs text-muted">{fac.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
