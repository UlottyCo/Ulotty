"use client";

import { useEffect, useState } from "react";
import { getCommissionStats, getCommissions } from "@/app/actions/commissions";

export function ComisionesClient() {
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0,
  });
  const [commissions, setCommissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, commissionsData] = await Promise.all([
          getCommissionStats(),
          getCommissions(),
        ]);
        setStats(statsData);
        setCommissions(commissionsData || []);
      } catch (error) {
        console.error("Error loading commissions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pagada":
        return "bg-green-100 text-green-700";
      case "pendiente":
        return "bg-red-100 text-red-700";
      case "parcial":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando comisiones...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Comisión total</div>
          <div className="text-2xl font-bold text-green-600">
            ${(stats.totalAmount / 1000000).toFixed(1)}M
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Pagado este mes</div>
          <div className="text-2xl font-bold text-blue-600">
            ${(stats.paidAmount / 1000).toFixed(0)}K
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Pendiente de pago</div>
          <div className="text-2xl font-bold text-red-600">
            ${(stats.pendingAmount / 1000).toFixed(0)}K
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Promedio por agente</div>
          <div className="text-2xl font-bold text-purple-600">
            ${stats.total > 0 ? (stats.totalAmount / stats.total / 1000).toFixed(0) : 0}K
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Agente</th>
              <th className="text-left py-3 px-4 font-semibold">Operaciones</th>
              <th className="text-left py-3 px-4 font-semibold">Comisión total</th>
              <th className="text-left py-3 px-4 font-semibold">Pagado</th>
              <th className="text-left py-3 px-4 font-semibold">Pendiente</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((commission) => (
              <tr key={commission.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">
                  <p className="font-semibold">{commission.agent?.full_name || "—"}</p>
                </td>
                <td className="py-3 px-4">{commission.operation_id ? "1" : "0"}</td>
                <td className="py-3 px-4 font-semibold">${commission.amount?.toLocaleString() || "—"}</td>
                <td className="py-3 px-4">${commission.status === "pagada" ? commission.amount?.toLocaleString() : "0"}</td>
                <td className="py-3 px-4">${commission.status === "pendiente" ? commission.amount?.toLocaleString() : "0"}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(commission.status)}`}>
                    {commission.status || "—"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-xs text-brand hover:underline font-semibold">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {commissions.length === 0 && (
          <div className="text-center py-8 text-muted">No hay comisiones que mostrar</div>
        )}
      </div>
    </div>
  );
}
