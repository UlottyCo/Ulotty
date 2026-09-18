"use client";

import { useEffect, useState } from "react";
import { getPropertyStats } from "@/app/actions/properties";
import { getUserStats } from "@/app/actions/users";
import { getOperationStats } from "@/app/actions/operations";
import { getAnalyticsStats } from "@/app/actions/analytics";
import { getNotificationStats } from "@/app/actions/notifications";
import { getAuditLogStats } from "@/app/actions/audit";

export function DashboardClient() {
  const [stats, setStats] = useState({
    properties: { total: 0, published: 0, pending: 0, rejected: 0 },
    users: { total: 0, verified: 0, agents: 0, unverified: 0 },
    operations: { total: 0, completed: 0, totalAmount: 0, completedAmount: 0 },
    analytics: { activeSessions: 0, pageViews: 0, transactions: 0, avgSessionDuration: 0 },
    notifications: { total: 0, unread: 0, highPriority: 0 },
    audit: { totalToday: 0, totalAll: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [propStats, userStats, opStats, analyticsData, notifStats, auditStats] =
          await Promise.all([
            getPropertyStats(),
            getUserStats(),
            getOperationStats(),
            getAnalyticsStats(),
            getNotificationStats(),
            getAuditLogStats(),
          ]);

        setStats({
          properties: propStats,
          users: userStats,
          operations: opStats,
          analytics: analyticsData,
          notifications: notifStats,
          audit: auditStats,
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Propiedades</div>
          <div className="text-2xl font-bold text-brand">{stats.properties.total}</div>
          <div className="text-xs text-green-600 mt-2">📈 {stats.properties.published} activas</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Usuarios</div>
          <div className="text-2xl font-bold text-blue-600">{stats.users.total}</div>
          <div className="text-xs text-green-600 mt-2">✓ {stats.users.verified} verificados</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Operaciones</div>
          <div className="text-2xl font-bold text-purple-600">{stats.operations.total}</div>
          <div className="text-xs text-green-600 mt-2">✓ {stats.operations.completed} completadas</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Sesiones Activas</div>
          <div className="text-2xl font-bold text-green-600">{stats.analytics.activeSessions}</div>
          <div className="text-xs text-muted mt-2">Usuarios conectados</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Notificaciones</div>
          <div className="text-2xl font-bold text-red-600">{stats.notifications.unread}</div>
          <div className="text-xs text-yellow-600 mt-2">⚠ {stats.notifications.highPriority} alta prioridad</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Eventos Hoy</div>
          <div className="text-2xl font-bold text-orange-600">{stats.audit.totalToday}</div>
          <div className="text-xs text-muted mt-2">En el sistema</div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-lg font-bold mb-4">Transacciones últimos 30 días</div>
          <div className="h-64 flex items-center justify-center text-muted">Gráfico de líneas</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-lg font-bold mb-4">Distribución de propiedades</div>
          <div className="h-64 flex items-center justify-center text-muted">Gráfico de pie</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-lg font-bold mb-4">Transacciones Recientes</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Propiedad</th>
                <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold">Monto</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">Casa Rosarito</td>
                <td className="py-3 px-4 text-sm">Venta</td>
                <td className="py-3 px-4 font-bold">$850,000</td>
                <td className="py-3 px-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Completada</span></td>
                <td className="py-3 px-4 text-muted text-sm">Hoy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-lg font-bold mb-4">Estado del Sistema</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>API Status</span>
            <span className="text-green-600">● Activo</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Database</span>
            <span className="text-green-600">● Activo</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Storage</span>
            <span className="text-green-600">● Activo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
