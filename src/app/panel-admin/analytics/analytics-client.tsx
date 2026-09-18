"use client";

import { useEffect, useState } from "react";
import { getAnalyticsStats, getDeviceBreakdown, getTopPages, getTrafficSources } from "@/app/actions/analytics";

export function AnalyticsClient() {
  const [stats, setStats] = useState({ activeSessions: 0, pageViews: 0, transactions: 0, avgSessionDuration: 0 });
  const [devices, setDevices] = useState<any>({});
  const [pages, setPages] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, devicesData, pagesData, sourcesData] = await Promise.all([
          getAnalyticsStats(),
          getDeviceBreakdown(),
          getTopPages(),
          getTrafficSources(),
        ]);
        setStats(statsData);
        setDevices(devicesData || {});
        setPages(pagesData || []);
        setSources(sourcesData || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Sesiones activas</div>
          <div className="text-2xl font-bold text-brand">{stats.activeSessions}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Page views</div>
          <div className="text-2xl font-bold text-blue-600">{stats.pageViews}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Transacciones</div>
          <div className="text-2xl font-bold text-green-600">{stats.transactions}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Sesión promedio</div>
          <div className="text-2xl font-bold text-purple-600">5m 32s</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="font-bold mb-4">Dispositivos</h3>
          <div className="space-y-2">
            {Object.entries(devices).map(([device, count]) => (
              <div key={device} className="flex justify-between">
                <span>{device}</span>
                <span className="font-bold">{count as number}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="font-bold mb-4">Páginas top</h3>
          <div className="space-y-2">
            {pages.map((page) => (
              <div key={page.page} className="flex justify-between text-sm">
                <span>{page.page}</span>
                <span className="font-bold">{page.visits} vistas</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="font-bold mb-4">Fuentes de tráfico</h3>
        <div className="space-y-2">
          {sources.map((source) => (
            <div key={source.location} className="flex justify-between">
              <span>{source.location}</span>
              <span className="font-bold">{source.count} usuarios</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
