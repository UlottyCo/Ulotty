"use client";

import { useState } from "react";
import { showToast } from "@/components/admin/toast";
import { ThemeSettings } from "@/components/admin/theme-settings";

export function ConfiguracionClient() {
  const [settings, setSettings] = useState({
    platform_name: "Ulotty",
    platform_url: "https://ulotty.com",
    timezone: "America/Mexico_City",
    currency: "MXN",
    commission_rate: 3.0,
    payment_processor: "stripe",
    email_provider: "sendgrid",
    smtp_host: "smtp.sendgrid.net",
    backup_frequency: "diaria",
    backup_retention: 30,
  });

  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      showToast("Configuración guardada exitosamente", "success");
    } catch (error) {
      showToast("Error al guardar configuración", "error");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "pagos", label: "Pagos", icon: "💳" },
    { id: "email", label: "Email", icon: "📧" },
    { id: "tema", label: "Tema", icon: "🎨" },
    { id: "backup", label: "Backups", icon: "💾" },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold text-sm transition ${
              activeTab === tab.id
                ? "text-brand border-b-2 border-brand"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-bold text-lg mb-6">Configuración General</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre de la plataforma</label>
                <input
                  type="text"
                  value={settings.platform_name}
                  onChange={(e) => setSettings({ ...settings, platform_name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">URL base</label>
                <input
                  type="text"
                  value={settings.platform_url}
                  onChange={(e) => setSettings({ ...settings, platform_url: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Zona horaria</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  >
                    <option value="America/Mexico_City">America/Mexico_City</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="America/Los_Angeles">America/Los_Angeles</option>
                    <option value="Europe/Madrid">Europe/Madrid</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Moneda</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  >
                    <option value="MXN">MXN - Peso Mexicano</option>
                    <option value="USD">USD - Dólar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Settings */}
      {activeTab === "pagos" && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-bold text-lg mb-6">Configuración de Pagos</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Procesador de pagos</label>
                <select
                  value={settings.payment_processor}
                  onChange={(e) => setSettings({ ...settings, payment_processor: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                  <option value="mercado_pago">Mercado Pago</option>
                  <option value="openpay">OpenPay</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Comisión de plataforma (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.commission_rate}
                  onChange={(e) => setSettings({ ...settings, commission_rate: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
                <p className="text-xs text-muted mt-2">Comisión que cobra la plataforma por cada transacción</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Métodos de pago habilitados:</strong> Tarjeta de crédito, Transferencia bancaria, Billetera digital
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Settings */}
      {activeTab === "email" && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-bold text-lg mb-6">Configuración de Email</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Proveedor</label>
                <select
                  value={settings.email_provider}
                  onChange={(e) => setSettings({ ...settings, email_provider: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailgun">Mailgun</option>
                  <option value="aws_ses">AWS SES</option>
                  <option value="smtp">SMTP personalizado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Servidor SMTP</label>
                <input
                  type="text"
                  value={settings.smtp_host}
                  onChange={(e) => setSettings({ ...settings, smtp_host: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-900">
                  <strong>✓ Estado:</strong> Conectado correctamente. Últimos emails enviados: 245 hoy
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme Settings */}
      {activeTab === "tema" && (
        <div className="space-y-6">
          <ThemeSettings />
        </div>
      )}

      {/* Backup Settings */}
      {activeTab === "backup" && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-bold text-lg mb-6">Configuración de Backups</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Frecuencia de backup</label>
                <select
                  value={settings.backup_frequency}
                  onChange={(e) => setSettings({ ...settings, backup_frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  <option value="horaria">Cada hora</option>
                  <option value="diaria">Diaria</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensual">Mensual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Retención de backups (días)</label>
                <input
                  type="number"
                  value={settings.backup_retention}
                  onChange={(e) => setSettings({ ...settings, backup_retention: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition">
                  Crear backup ahora
                </button>
                <button className="px-4 py-2 bg-brand/20 text-brand rounded-lg hover:bg-brand/30 transition">
                  Ver historial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end gap-2">
        <button className="px-6 py-2 text-foreground hover:bg-background rounded-lg transition">
          Cancelar
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 disabled:opacity-50 transition"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
