"use client";

import { useState } from "react";

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  verification: string;
  company: string;
  location: string;
  rating: number;
  reviews: number;
  properties: {
    published: number;
    pending: number;
    rejected: number;
  };
  operations: {
    total: number;
    completed: number;
  };
  commissions: {
    total: string;
    pending: number;
  };
  verified: boolean;
}

interface AgentePerfilContentProps {
  agent: Agent;
}

export function AgentePerfilContent({ agent }: AgentePerfilContentProps) {
  const [activeTab, setActiveTab] = useState("resumen");

  const tabs = [
    { id: "resumen", label: "Resumen" },
    { id: "informacion", label: "Información" },
    { id: "documentos", label: "Documentos" },
    { id: "propiedades", label: "Propiedades" },
    { id: "operaciones", label: "Operaciones" },
    { id: "comisiones", label: "Comisiones" },
    { id: "utiles", label: "Útiles" },
    { id: "reportes", label: "Reportes" },
    { id: "soporte", label: "Soporte" },
    { id: "actividad", label: "Actividad" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Column - Agent Card */}
      <div className="lg:col-span-1">
        <div className="bg-surface rounded-lg border border-border p-6 sticky top-24">
          {/* Avatar */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-brand text-white flex items-center justify-center font-bold text-2xl mx-auto mb-3">
              JP
            </div>
            <p className="font-bold text-lg">{agent.name}</p>
            <p className="text-sm text-muted">{agent.verification}</p>
          </div>

          {/* Verification Badge */}
          {agent.verified && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center mb-6">
              <div className="text-2xl mb-2">✓</div>
              <p className="text-xs font-semibold text-green-700 dark:text-green-400">Agente verificado</p>
            </div>
          )}

          {/* Rating */}
          <div className="p-4 bg-background rounded-lg mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-lg">⭐</span>
              <span className="font-bold">{agent.rating}</span>
            </div>
            <p className="text-xs text-muted text-center">{agent.reviews} reseñas</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-background rounded-lg">
            <div>
              <p className="text-2xl font-bold text-brand">{agent.properties.published}</p>
              <p className="text-xs text-muted">Propiedades publicadas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand">{agent.operations.completed}</p>
              <p className="text-xs text-muted">Operaciones completadas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand">{agent.commissions.pending}</p>
              <p className="text-xs text-muted">Comisiones pendientes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand">4.8</p>
              <p className="text-xs text-muted">Calificación</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 p-4 bg-background rounded-lg space-y-2">
            <div className="text-sm">
              <p className="text-xs text-muted">Email</p>
              <p className="font-semibold text-foreground">{agent.email}</p>
            </div>
            <div className="text-sm">
              <p className="text-xs text-muted">Teléfono</p>
              <p className="font-semibold text-foreground">{agent.phone}</p>
            </div>
            <div className="text-sm">
              <p className="text-xs text-muted">Empresa</p>
              <p className="font-semibold text-foreground">{agent.company}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Content */}
      <div className="lg:col-span-3">
        {/* Tabs Navigation */}
        <div className="flex gap-4 border-b border-border mb-6 overflow-x-auto pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-medium pb-3 px-1 whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "border-b-2 border-brand text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-surface rounded-lg border border-border p-6">
          {activeTab === "resumen" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold mb-4">Resumen del Agente</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-xs text-muted mb-1">Propiedades Totales</p>
                    <p className="text-2xl font-bold">{agent.properties.published + agent.properties.pending + agent.properties.rejected}</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-xs text-muted mb-1">Operaciones</p>
                    <p className="text-2xl font-bold">{agent.operations.total}</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-xs text-muted mb-1">Comisiones Totales</p>
                    <p className="text-lg font-bold text-brand">{agent.commissions.total}</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-xs text-muted mb-1">Calificación</p>
                    <p className="text-2xl font-bold">⭐ {agent.rating}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Estado de Propiedades</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-background rounded-lg">
                    <span>Publicadas</span>
                    <span className="font-bold text-green-600">{agent.properties.published}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-background rounded-lg">
                    <span>Pendientes</span>
                    <span className="font-bold text-yellow-600">{agent.properties.pending}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-background rounded-lg">
                    <span>Rechazadas</span>
                    <span className="font-bold text-red-600">{agent.properties.rejected}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "informacion" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">Información del Agente</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-xs text-muted mb-1">Nombre Completo</p>
                  <p className="font-semibold">{agent.name}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-xs text-muted mb-1">Email</p>
                  <p className="font-semibold">{agent.email}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-xs text-muted mb-1">Teléfono</p>
                  <p className="font-semibold">{agent.phone}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-xs text-muted mb-1">Empresa</p>
                  <p className="font-semibold">{agent.company}</p>
                </div>
                <div className="p-4 bg-background rounded-lg col-span-2">
                  <p className="text-xs text-muted mb-1">Ubicación</p>
                  <p className="font-semibold">{agent.location}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "documentos" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">Documentos</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="font-semibold">INE / Pasaporte</p>
                      <p className="text-xs text-green-600">Verificado</p>
                    </div>
                  </div>
                  <span>12 mar 2024</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="font-semibold">Comprobante de domicilio</p>
                      <p className="text-xs text-green-600">Verificado</p>
                    </div>
                  </div>
                  <span>12 mar 2024</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <p className="font-semibold">Cédula profesional</p>
                      <p className="text-xs text-green-600">Verificado</p>
                    </div>
                  </div>
                  <span>12 mar 2024</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "propiedades" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">Propiedades del Agente</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">{agent.properties.published}</p>
                  <p className="text-sm text-muted mt-2">Publicadas</p>
                </div>
                <div className="p-4 bg-background rounded-lg text-center">
                  <p className="text-3xl font-bold text-yellow-600">{agent.properties.pending}</p>
                  <p className="text-sm text-muted mt-2">Pendientes</p>
                </div>
                <div className="p-4 bg-background rounded-lg text-center">
                  <p className="text-3xl font-bold text-red-600">{agent.properties.rejected}</p>
                  <p className="text-sm text-muted mt-2">Rechazadas</p>
                </div>
                <div className="p-4 bg-background rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-muted mt-2">En Revisión</p>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
                Ver todas las propiedades
              </button>
            </div>
          )}

          {activeTab === "operaciones" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">Operaciones</h2>
              <div className="space-y-2">
                <div className="flex justify-between p-4 bg-background rounded-lg">
                  <span>Operaciones Totales</span>
                  <span className="font-bold text-brand">{agent.operations.total}</span>
                </div>
                <div className="flex justify-between p-4 bg-background rounded-lg">
                  <span>Completadas</span>
                  <span className="font-bold text-green-600">{agent.operations.completed}</span>
                </div>
                <div className="flex justify-between p-4 bg-background rounded-lg">
                  <span>En Progreso</span>
                  <span className="font-bold text-yellow-600">4</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "comisiones" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">Comisiones</h2>
              <div className="p-4 bg-background rounded-lg">
                <p className="text-xs text-muted mb-1">Total de Comisiones</p>
                <p className="text-3xl font-bold text-brand">{agent.commissions.total}</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <p className="text-xs text-muted mb-1">Comisiones Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600">{agent.commissions.pending}</p>
              </div>
              <button className="w-full px-4 py-2 border border-brand text-brand rounded-lg font-semibold hover:bg-brand/10 transition">
                Ver historial de comisiones
              </button>
            </div>
          )}

          {(activeTab === "utiles" || activeTab === "reportes" || activeTab === "soporte" || activeTab === "actividad") && (
            <div className="text-center py-12">
              <p className="text-muted">Contenido del tab "{tabs.find(t => t.id === activeTab)?.label}" próximamente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
