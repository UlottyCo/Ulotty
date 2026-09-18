"use client";
import { useEffect, useState } from "react";
import { getAuditLogs, getAuditLogStats } from "@/app/actions/audit";

export function AuditoriaClient() {
  const [stats, setStats] = useState({ totalToday: 0, totalAll: 0, actionBreakdown: {} });
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, logsData] = await Promise.all([
          getAuditLogStats(),
          getAuditLogs(),
        ]);
        setStats(statsData);
        setLogs(logsData || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total eventos hoy</div>
          <div className="text-2xl font-bold text-brand">{stats.totalToday}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total eventos</div>
          <div className="text-2xl font-bold text-blue-600">{stats.totalAll}</div>
        </div>
      </div>
      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Usuario</th>
              <th className="text-left py-3 px-4 font-semibold">Acción</th>
              <th className="text-left py-3 px-4 font-semibold">Entidad</th>
              <th className="text-left py-3 px-4 font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(0, 10).map((log) => (
              <tr key={log.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">{log.user?.full_name || "—"}</td>
                <td className="py-3 px-4 capitalize">{log.action}</td>
                <td className="py-3 px-4 capitalize">{log.entity_type || "—"}</td>
                <td className="py-3 px-4 text-muted text-sm">
                  {new Date(log.created_at).toLocaleDateString('es-MX')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
