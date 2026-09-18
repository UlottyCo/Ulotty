"use client";

import { useEffect, useState } from "react";
import { getPropertyStats } from "@/app/actions/properties";
import { getUserStats } from "@/app/actions/users";
import { getOperationStats } from "@/app/actions/operations";
import { getAnalyticsStats } from "@/app/actions/analytics";
import { getNotificationStats } from "@/app/actions/notifications";
import { getAuditLogStats } from "@/app/actions/audit";
import { TransactionsChart } from "@/components/admin/charts/transactions-chart";
import { PropertiesDistributionChart } from "@/components/admin/charts/properties-distribution-chart";
import { RecentTransactions } from "@/components/admin/charts/recent-transactions";
import { QuickActions } from "@/components/admin/charts/quick-actions";
import { SystemStatus } from "@/components/admin/charts/system-status";
import { EventsTimeline } from "@/components/admin/charts/events-timeline";

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

      {/* Acciones Rápidas */}
      <div>
        <div className="text-lg font-bold mb-4">Acciones Rápidas</div>
        <QuickActions />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-lg font-bold mb-4">Transacciones últimos 30 días</div>
          <TransactionsChart />
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-lg font-bold mb-4">Distribución de propiedades</div>
          <PropertiesDistributionChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-lg font-bold mb-4">Transacciones Recientes</div>
        <RecentTransactions />
      </div>

      {/* System Status */}
      <div>
        <div className="text-lg font-bold mb-4">Estado del Sistema</div>
        <SystemStatus />
      </div>

      {/* Events Timeline */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-lg font-bold mb-6">Eventos Recientes</div>
        <EventsTimeline />
      </div>
    </div>
  );
}
