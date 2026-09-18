"use client";

import { useEffect, useState } from "react";
import { getSupportTickets, getSupportTicketStats } from "@/app/actions/support";

export function SoporteClient() {
  const [stats, setStats] = useState({ total: 0, open: 0, highPriority: 0, closed: 0 });
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, ticketsData] = await Promise.all([
          getSupportTicketStats(),
          getSupportTickets(),
        ]);
        setStats(statsData);
        setTickets(ticketsData || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-700";
      case "media":
        return "bg-yellow-100 text-yellow-700";
      case "baja":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "abierto":
        return "bg-blue-100 text-blue-700";
      case "en_proceso":
        return "bg-orange-100 text-orange-700";
      case "resuelto":
        return "bg-green-100 text-green-700";
      case "cerrado":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total tickets</div>
          <div className="text-2xl font-bold text-brand">{stats.total}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Abiertos</div>
          <div className="text-2xl font-bold text-orange-600">{stats.open}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Alta prioridad</div>
          <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Cerrados</div>
          <div className="text-2xl font-bold text-green-600">{stats.closed}</div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Asunto</th>
              <th className="text-left py-3 px-4 font-semibold">Usuario</th>
              <th className="text-left py-3 px-4 font-semibold">Prioridad</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 font-semibold">Asignado a</th>
              <th className="text-left py-3 px-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4 font-semibold">{ticket.subject}</td>
                <td className="py-3 px-4 text-sm">{ticket.user?.full_name || "—"}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{ticket.assigned_to_user?.full_name || "—"}</td>
                <td className="py-3 px-4">
                  <button className="text-xs text-brand hover:underline">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <div className="text-center py-8 text-muted">Sin tickets</div>
        )}
      </div>
    </div>
  );
}
