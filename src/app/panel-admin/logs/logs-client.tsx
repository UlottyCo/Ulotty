"use client";
import { useEffect, useState } from "react";
import { getAuditLogs } from "@/app/actions/audit";

export function LogsClient() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAuditLogs();
        setLogs(data?.slice(0, 50) || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    load();
  }, []);

  if (loading) return <div className="py-8">Cargando...</div>;

  return (
    <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Timestamp</th>
            <th className="text-left py-3 px-4 font-semibold">Acción</th>
            <th className="text-left py-3 px-4 font-semibold">Usuario</th>
            <th className="text-left py-3 px-4 font-semibold">IP</th>
            <th className="text-left py-3 px-4 font-semibold">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b border-border hover:bg-background transition">
              <td className="py-3 px-4 text-muted text-xs">{new Date(log.created_at).toLocaleString('es-MX')}</td>
              <td className="py-3 px-4 capitalize font-semibold">{log.action}</td>
              <td className="py-3 px-4">{log.user?.full_name || "Sistema"}</td>
              <td className="py-3 px-4 text-muted text-xs">{log.ip_address || "—"}</td>
              <td className="py-3 px-4 text-muted text-xs capitalize">{log.entity_type || "general"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
