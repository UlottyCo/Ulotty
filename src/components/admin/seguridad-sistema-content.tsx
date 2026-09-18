"use client";

import { useState } from "react";
import { SeguridadGeneral } from "./tabs/seguridad-general";
import { SeguridadAccesos } from "./tabs/seguridad-accesos";
import { SeguridadAutenticacion } from "./tabs/seguridad-autenticacion";
import { SeguridadMonitoreo } from "./tabs/seguridad-monitoreo";
import { SeguridadDatos } from "./tabs/seguridad-datos";
import { SeguridadIntegraciones } from "./tabs/seguridad-integraciones";
import { SeguridadPoliticas } from "./tabs/seguridad-politicas";
import { SeguridadAlertas } from "./tabs/seguridad-alertas";

export function SeguridadSistemaContent() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General" },
    { id: "accesos", label: "Accesos" },
    { id: "autenticacion", label: "Autenticación" },
    { id: "monitoreo", label: "Monitoreo" },
    { id: "datos", label: "Datos y respaldos" },
    { id: "integraciones", label: "Integraciones" },
    { id: "politicas", label: "Políticas" },
    { id: "alertas", label: "Alertas" },
  ];

  return (
    <div>
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Estado del sistema</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="text-lg font-bold">Operativo</div>
          </div>
          <div className="text-xs text-muted mt-2">100% uptime</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Autenticación 2FA</div>
          <div className="text-2xl font-bold text-brand">98%</div>
          <div className="text-xs text-muted mt-2">Usuarios con 2FA habilitada</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Monitoreo en tiempo real</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <div className="text-lg font-bold">Activo</div>
          </div>
          <div className="text-xs text-muted mt-2">Monitoreando 24/7</div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Último respaldo</div>
          <div className="text-lg font-bold">Hoy 2:30 AM</div>
          <div className="text-xs text-muted mt-2">Respaldo completado</div>
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
        {activeTab === "general" && <SeguridadGeneral />}
        {activeTab === "accesos" && <SeguridadAccesos />}
        {activeTab === "autenticacion" && <SeguridadAutenticacion />}
        {activeTab === "monitoreo" && <SeguridadMonitoreo />}
        {activeTab === "datos" && <SeguridadDatos />}
        {activeTab === "integraciones" && <SeguridadIntegraciones />}
        {activeTab === "politicas" && <SeguridadPoliticas />}
        {activeTab === "alertas" && <SeguridadAlertas />}
      </div>
    </div>
  );
}
