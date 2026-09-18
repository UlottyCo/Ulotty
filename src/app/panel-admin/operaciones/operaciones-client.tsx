"use client";

import { useEffect, useState } from "react";
import { getOperations, getOperationStats } from "@/app/actions/operations";

export function OperacionesClient() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    totalAmount: 0,
    completedAmount: 0,
  });
  const [operations, setOperations] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState("todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, opsData] = await Promise.all([
          getOperationStats(),
          getOperations(filterStatus !== "todas" ? { status: filterStatus } : undefined),
        ]);
        setStats(statsData);
        setOperations(opsData || []);
      } catch (error) {
        console.error("Error loading operations:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completada":
        return "bg-green-100 text-green-700";
      case "en_proceso":
        return "bg-blue-100 text-blue-700";
      case "pendiente":
        return "bg-yellow-100 text-yellow-700";
      case "cancelada":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando operaciones...</div>;
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total operaciones</div>
          <div className="text-2xl font-bold text-brand">{stats.total}</div>
          <div className="text-xs text-muted mt-2">En el sistema</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Completadas</div>
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-xs text-muted mt-2">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Monto total</div>
          <div className="text-2xl font-bold text-blue-600">
            ${(stats.totalAmount / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-muted mt-2">MXN</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Monto completado</div>
          <div className="text-2xl font-bold text-purple-600">
            ${(stats.completedAmount / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-muted mt-2">MXN</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
        >
          <option value="todas">Todas las operaciones</option>
          <option value="pendiente">Pendientes</option>
          <option value="en_proceso">En proceso</option>
          <option value="completada">Completadas</option>
          <option value="cancelada">Canceladas</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Propiedad</th>
              <th className="text-left py-3 px-4 font-semibold">Tipo</th>
              <th className="text-left py-3 px-4 font-semibold">Monto</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 font-semibold">Fecha</th>
              <th className="text-left py-3 px-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op) => (
              <tr key={op.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">
                  <p className="font-semibold">{op.property?.title || "—"}</p>
                </td>
                <td className="py-3 px-4 text-sm capitalize">{op.transaction_type || "—"}</td>
                <td className="py-3 px-4 font-semibold">${op.amount?.toLocaleString() || "—"}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(op.status)}`}>
                    {op.status || "—"}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-muted">
                  {op.payment_date ? new Date(op.payment_date).toLocaleDateString('es-MX') : "—"}
                </td>
                <td className="py-3 px-4">
                  <button className="text-xs text-brand hover:underline font-semibold">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {operations.length === 0 && (
          <div className="text-center py-8 text-muted">No hay operaciones</div>
        )}
      </div>
    </div>
  );
}
