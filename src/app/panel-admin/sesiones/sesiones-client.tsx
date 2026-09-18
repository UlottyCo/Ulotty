"use client";
import { useEffect, useState } from "react";
import { getSessions, getSessionStats } from "@/app/actions/sessions";

export function SesionesClient() {
  const [stats, setStats] = useState({ activeSessions: 0, activeUsers: 0, uniqueDevices: 0 });
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, sessionsData] = await Promise.all([
          getSessionStats(),
          getSessions(),
        ]);
        setStats(statsData);
        setSessions(sessionsData || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    loadData();
  }, []);

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Sesiones activas</div>
          <div className="text-2xl font-bold text-green-600">{stats.activeSessions}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Usuarios conectados</div>
          <div className="text-2xl font-bold text-blue-600">{stats.activeUsers}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Dispositivos únicos</div>
          <div className="text-2xl font-bold text-purple-600">{stats.uniqueDevices}</div>
        </div>
      </div>
      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Usuario</th>
              <th className="text-left py-3 px-4 font-semibold">Dispositivo</th>
              <th className="text-left py-3 px-4 font-semibold">IP</th>
              <th className="text-left py-3 px-4 font-semibold">Ubicación</th>
              <th className="text-left py-3 px-4 font-semibold">Conectado desde</th>
            </tr>
          </thead>
          <tbody>
            {sessions.slice(0, 10).map((session) => (
              <tr key={session.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">{session.user?.full_name || "—"}</td>
                <td className="py-3 px-4">{session.device || "—"}</td>
                <td className="py-3 px-4 text-muted text-sm">{session.ip_address || "—"}</td>
                <td className="py-3 px-4">{session.location || "—"}</td>
                <td className="py-3 px-4 text-muted text-sm">{new Date(session.created_at).toLocaleDateString('es-MX')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
