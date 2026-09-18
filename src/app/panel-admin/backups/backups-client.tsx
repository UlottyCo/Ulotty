"use client";
import { useEffect, useState } from "react";
import { getBackups, getBackupStats } from "@/app/actions/backups";

export function BackupsClient() {
  const [stats, setStats] = useState({ total: 0, completed: 0, totalSizeGB: "0", lastBackupDate: null });
  const [backups, setBackups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, backupsData] = await Promise.all([
          getBackupStats(),
          getBackups(),
        ]);
        setStats(statsData);
        setBackups(backupsData || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    loadData();
  }, []);

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Respaldos totales</div>
          <div className="text-2xl font-bold text-brand">{stats.total}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Completados</div>
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Espacio usado</div>
          <div className="text-2xl font-bold text-blue-600">{stats.totalSizeGB} GB</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Último respaldo</div>
          <div className="text-2xl font-bold text-purple-600">{stats.lastBackupDate ? new Date(stats.lastBackupDate).toLocaleDateString('es-MX') : '—'}</div>
        </div>
      </div>
      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Fecha</th>
              <th className="text-left py-3 px-4 font-semibold">Tamaño</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 font-semibold">Duración</th>
              <th className="text-left py-3 px-4 font-semibold">Tipo</th>
              <th className="text-left py-3 px-4 font-semibold">Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {backups.slice(0, 10).map((backup) => (
              <tr key={backup.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">{new Date(backup.backup_date).toLocaleDateString('es-MX')}</td>
                <td className="py-3 px-4">{backup.size_gb} GB</td>
                <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${backup.status === 'completado' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{backup.status}</span></td>
                <td className="py-3 px-4">{backup.duration_minutes} min</td>
                <td className="py-3 px-4 capitalize">{backup.backup_type}</td>
                <td className="py-3 px-4">{backup.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
