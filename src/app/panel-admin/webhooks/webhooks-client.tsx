"use client";
import { useEffect, useState } from "react";
import { getWebhooks, getWebhookStats } from "@/app/actions/webhooks";

export function WebhooksClient() {
  const [stats, setStats] = useState({ total: 0, active: 0, totalDeliveries: 0, avgSuccessRate: 0 });
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, webhooksData] = await Promise.all([
          getWebhookStats(),
          getWebhooks(),
        ]);
        setStats(statsData);
        setWebhooks(webhooksData || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    loadData();
  }, []);

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Webhooks activos</div>
          <div className="text-2xl font-bold text-brand">{stats.active}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total webhooks</div>
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Entregas totales</div>
          <div className="text-2xl font-bold text-green-600">{stats.totalDeliveries}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Tasa éxito promedio</div>
          <div className="text-2xl font-bold text-purple-600">{stats.avgSuccessRate}%</div>
        </div>
      </div>
      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Nombre</th>
              <th className="text-left py-3 px-4 font-semibold">URL</th>
              <th className="text-left py-3 px-4 font-semibold">Evento</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 font-semibold">Entregas</th>
            </tr>
          </thead>
          <tbody>
            {webhooks.slice(0, 10).map((webhook) => (
              <tr key={webhook.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4 font-semibold">{webhook.name}</td>
                <td className="py-3 px-4 text-muted text-xs">{webhook.url?.substring(0, 30)}...</td>
                <td className="py-3 px-4">{webhook.event_type}</td>
                <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${webhook.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{webhook.active ? 'Activo' : 'Inactivo'}</span></td>
                <td className="py-3 px-4">{webhook.delivery_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
