"use client";

import { useState, useEffect } from "react";
import { PropiedadesTabla } from "./tabs/propiedades-tabla";
import { PropiedadesEstadisticas } from "./tabs/propiedades-estadisticas";
import { PropiedadesMapeo } from "./tabs/propiedades-mapeo";
import { PropiedadesReporteria } from "./tabs/propiedades-reporteria";
import { getPropertyStats } from "@/app/actions/properties";

export function PropiedadesContent() {
  const [activeTab, setActiveTab] = useState("tabla");
  const [filterStatus, setFilterStatus] = useState("todas");
  const [filterType, setFilterType] = useState("todas");
  const [stats, setStats] = useState({ total: 0, published: 0, pending: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getPropertyStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading property stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const tabs = [
    { id: "tabla", label: "Tabla" },
    { id: "estadisticas", label: "Estadísticas" },
    { id: "mapeo", label: "Mapeo" },
    { id: "reporteria", label: "Reportería" },
  ];

  return (
    <div>
      {/* Key Metrics */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total propiedades</div>
          <div className="text-2xl font-bold text-brand">{stats.total}</div>
          <div className="text-xs text-muted mt-2">En el sistema</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Activas</div>
          <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          <div className="text-xs text-muted mt-2">{stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0}% del total</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Pendientes de revisión</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-xs text-muted mt-2">{stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}% del total</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Rechazadas</div>
          <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-xs text-muted mt-2">{stats.total > 0 ? Math.round((stats.rejected / stats.total) * 100) : 0}% del total</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Estado</div>
          <div className="text-2xl font-bold text-blue-600">{loading ? "..." : "Activo"}</div>
          <div className="text-xs text-muted mt-2">Sistema</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-lg border border-border p-4 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Estado</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
            >
              <option value="todas">Todas</option>
              <option value="activa">Activas</option>
              <option value="pendiente">Pendientes</option>
              <option value="rechazada">Rechazadas</option>
              <option value="draft">Borrador</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Tipo de propiedad</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
            >
              <option value="todas">Todas</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
              <option value="industriales">Industrial</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Ordenar por</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm">
              <option>Más recientes</option>
              <option>Precio (menor)</option>
              <option>Precio (mayor)</option>
              <option>Más vistas</option>
              <option>Más contactos</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Búsqueda rápida</label>
            <input
              type="text"
              placeholder="ID, dirección, agente..."
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
        {activeTab === "tabla" && <PropiedadesTabla filterStatus={filterStatus} filterType={filterType} />}
        {activeTab === "estadisticas" && <PropiedadesEstadisticas />}
        {activeTab === "mapeo" && <PropiedadesMapeo />}
        {activeTab === "reporteria" && <PropiedadesReporteria />}
      </div>
    </div>
  );
}
