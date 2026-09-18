"use client";

import { useEffect, useState } from "react";
import { getAuditLogs } from "@/app/actions/audit";

export function EventsTimeline() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getAuditLogs();
        setEvents((data || []).slice(0, 5));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando eventos...</div>;
  }

  const getEventIcon = (action: string) => {
    switch (action) {
      case "create":
        return "➕";
      case "update":
        return "✏️";
      case "delete":
        return "🗑️";
      case "login":
        return "🔓";
      case "logout":
        return "🔒";
      default:
        return "📝";
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="text-2xl">{getEventIcon(event.action)}</div>
            {index < events.length - 1 && (
              <div className="w-0.5 h-8 bg-border mt-2" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-foreground capitalize">{event.action}</div>
            <div className="text-sm text-muted">{event.description}</div>
            <div className="text-xs text-muted mt-1">
              {event.created_at ? new Date(event.created_at).toLocaleString('es-MX') : "—"}
            </div>
          </div>
        </div>
      ))}
      {events.length === 0 && (
        <div className="text-center py-8 text-muted">Sin eventos recientes</div>
      )}
    </div>
  );
}
