"use client";

import { useEffect, useState } from "react";
import { getNotificationStats } from "@/app/actions/notifications";
import { getNotifications, markNotificationAsRead } from "@/app/actions/notifications";

export function NotificacionesClient() {
  const [stats, setStats] = useState({ total: 0, unread: 0, highPriority: 0 });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, notifData] = await Promise.all([
          getNotificationStats(),
          getNotifications(),
        ]);
        setStats(statsData);
        setNotifications(notifData || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-700 border-red-300";
      case "media":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "baja":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total notificaciones</div>
          <div className="text-2xl font-bold text-brand">{stats.total}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Sin leer</div>
          <div className="text-2xl font-bold text-red-600">{stats.unread}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Alta prioridad</div>
          <div className="text-2xl font-bold text-orange-600">{stats.highPriority}</div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6 space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className={`border rounded-lg p-4 ${getPriorityColor(notif.priority)}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{notif.title}</p>
                <p className="text-sm mt-1">{notif.message}</p>
              </div>
              {!notif.read && (
                <button
                  onClick={() => handleMarkAsRead(notif.id)}
                  className="text-xs px-2 py-1 bg-white/50 rounded hover:bg-white/80 transition"
                >
                  Marcar leído
                </button>
              )}
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center py-8 text-muted">Sin notificaciones</div>
        )}
      </div>
    </div>
  );
}
