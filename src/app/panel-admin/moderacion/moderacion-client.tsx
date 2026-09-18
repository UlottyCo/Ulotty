"use client";
import { useEffect, useState } from "react";
import { getModerationReports, getModerationStats } from "@/app/actions/moderation";

export function ModeracionClient() {
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0, pending: 0 });
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, reportsData] = await Promise.all([
          getModerationStats(),
          getModerationReports(),
        ]);
        setStats(statsData);
        setReports(reportsData || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    loadData();
  }, []);

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total reportes</div>
          <div className="text-2xl font-bold text-brand">{stats.total}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Abiertos</div>
          <div className="text-2xl font-bold text-red-600">{stats.open}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Resueltos</div>
          <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Pendientes</div>
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
        </div>
      </div>
      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Razón</th>
              <th className="text-left py-3 px-4 font-semibold">Usuario reportado</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reports.slice(0, 10).map((report) => (
              <tr key={report.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">{report.reason}</td>
                <td className="py-3 px-4">{report.reported_user?.full_name || "—"}</td>
                <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700">{report.status}</span></td>
                <td className="py-3 px-4 text-muted text-sm">{new Date(report.created_at).toLocaleDateString('es-MX')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
