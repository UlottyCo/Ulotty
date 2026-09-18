"use client";
import { useEffect, useState } from "react";
import { getInvoices, getInvoiceStats } from "@/app/actions/invoices";

export function FacturacionClient() {
  const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0, totalAmount: 0, paidAmount: 0, pendingAmount: 0 });
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, invoicesData] = await Promise.all([
          getInvoiceStats(),
          getInvoices(),
        ]);
        setStats(statsData);
        setInvoices(invoicesData || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    loadData();
  }, []);

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Facturas este mes</div>
          <div className="text-2xl font-bold text-brand">{stats.total}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Ingresos</div>
          <div className="text-2xl font-bold text-green-600">${(stats.totalAmount/1000000).toFixed(1)}M</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Pagadas</div>
          <div className="text-2xl font-bold text-blue-600">{stats.paid}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Pendientes</div>
          <div className="text-2xl font-bold text-red-600">{stats.pending}</div>
        </div>
      </div>
      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Usuario</th>
              <th className="text-left py-3 px-4 font-semibold">Concepto</th>
              <th className="text-left py-3 px-4 font-semibold">Monto</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {invoices.slice(0, 10).map((inv) => (
              <tr key={inv.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">{inv.user?.full_name || "—"}</td>
                <td className="py-3 px-4">{inv.concept}</td>
                <td className="py-3 px-4 font-semibold">${inv.amount?.toLocaleString()}</td>
                <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${inv.status === 'pagada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{inv.status}</span></td>
                <td className="py-3 px-4 text-muted text-sm">{new Date(inv.created_at).toLocaleDateString('es-MX')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
