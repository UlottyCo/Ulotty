"use client";

import { useState, useEffect } from "react";
import { UsuariosTabla } from "./tabs/usuarios-tabla";
import { UsuariosEstadisticas } from "./tabs/usuarios-estadisticas";
import { UsuariosRoles } from "./tabs/usuarios-roles";
import { UsuariosActividad } from "./tabs/usuarios-actividad";
import { getUserStats } from "@/app/actions/users";

export function UsuariosContent() {
  const [activeTab, setActiveTab] = useState("tabla");
  const [filterRole, setFilterRole] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [stats, setStats] = useState({ total: 0, verified: 0, agents: 0, unverified: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getUserStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading user stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const tabs = [
    { id: "tabla", label: "Tabla" },
    { id: "estadisticas", label: "Estadísticas" },
    { id: "roles", label: "Roles y permisos" },
    { id: "actividad", label: "Actividad" },
  ];

  return (
    <div>
      {/* Key Metrics */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total usuarios</div>
          <div className="text-2xl font-bold text-brand">{stats.total}</div>
          <div className="text-xs text-muted mt-2">En el sistema</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Verificados</div>
          <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
          <div className="text-xs text-muted mt-2">{stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0}% del total</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Agentes</div>
          <div className="text-2xl font-bold text-blue-600">{stats.agents}</div>
          <div className="text-xs text-muted mt-2">{stats.total > 0 ? Math.round((stats.agents / stats.total) * 100) : 0}% del total</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">No verificados</div>
          <div className="text-2xl font-bold text-red-600">{stats.unverified}</div>
          <div className="text-xs text-muted mt-2">Requieren revisión</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Estado</div>
          <div className="text-2xl font-bold text-green-600">{loading ? "..." : "Activo"}</div>
          <div className="text-xs text-muted mt-2">Sistema</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-lg border border-border p-4 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Tipo de usuario</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
            >
              <option value="todos">Todos</option>
              <option value="agente">Agente</option>
              <option value="comprador">Comprador</option>
              <option value="admin">Administrador</option>
              <option value="moderador">Moderador</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Estado</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
            >
              <option value="todos">Todos</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="suspendido">Suspendido</option>
              <option value="verificacion">Pendiente verificación</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Ordenar por</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm">
              <option>Más recientes</option>
              <option>Más activos</option>
              <option>Más transacciones</option>
              <option>Por nombre</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Búsqueda rápida</label>
            <input
              type="text"
              placeholder="Nombre, email, teléfono..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-6 border-b border-border mb-8 overflow-x-auto bg-surface rounded-t-lg px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-1 text-sm font-medium transition whitespace-nowrap ${
              activeTab === tab.id
                ? "border-b-2 border-brand text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="bg-surface rounded-b-lg border border-border border-t-0 p-6">
        {activeTab === "tabla" && <UsuariosTabla filterRole={filterRole} filterStatus={filterStatus} />}
        {activeTab === "estadisticas" && <UsuariosEstadisticas />}
        {activeTab === "roles" && <UsuariosRoles />}
        {activeTab === "actividad" && <UsuariosActividad />}
      </div>
    </div>
  );
}
