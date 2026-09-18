"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { MiCuentaPerfil } from "./tabs/perfil";
import { MiCuentaVerificacion } from "./tabs/verificacion";
import { MiCuentaNotificaciones } from "./tabs/notificaciones";
import { MiCuentaSeguridad } from "./tabs/seguridad";
import { MiCuentaContacto } from "./tabs/contacto";
import { MiCuentaPreferencias } from "./tabs/preferencias";

interface MiCuentaTabsProps {
  user: User;
  profile: any;
}

export function MiCuentaTabs({ user, profile }: MiCuentaTabsProps) {
  const [activeTab, setActiveTab] = useState("perfil");

  const tabs = [
    { id: "perfil", label: "Perfil" },
    { id: "verificacion", label: "Verificación" },
    { id: "notificaciones", label: "Notificaciones" },
    { id: "seguridad", label: "Seguridad" },
    { id: "contacto", label: "Métodos de contacto" },
    { id: "preferencias", label: "Preferencias" },
  ];

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="flex gap-6 border-b border-border mb-8 overflow-x-auto">
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
      <div>
        {activeTab === "perfil" && <MiCuentaPerfil user={user} profile={profile} />}
        {activeTab === "verificacion" && <MiCuentaVerificacion />}
        {activeTab === "notificaciones" && <MiCuentaNotificaciones />}
        {activeTab === "seguridad" && <MiCuentaSeguridad />}
        {activeTab === "contacto" && <MiCuentaContacto />}
        {activeTab === "preferencias" && <MiCuentaPreferencias />}
      </div>
    </div>
  );
}
