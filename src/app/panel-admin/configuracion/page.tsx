import { AdminHeader } from "@/components/admin/admin-header";

export default async function ConfiguracionPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Configuración del sistema</h1>
          <p className="text-muted mt-2">Administra la configuración general de la plataforma.</p>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Configuración general</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Nombre de la plataforma</label>
                <input type="text" value="Ulotty" className="w-full px-3 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Email de soporte</label>
                <input type="email" value="soporte@ulotty.com" className="w-full px-3 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Teléfono de soporte</label>
                <input type="tel" value="+52 661 123 4567" className="w-full px-3 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Idioma por defecto</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                  <option>Español</option>
                  <option>Inglés</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Configuración de pagos</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Stripe</p>
                  <p className="text-sm text-muted">Procesador de pagos</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600">Conectado</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold">Comisión de plataforma</p>
                  <p className="text-sm text-muted">Porcentaje por transacción</p>
                </div>
                <input type="number" value="5" className="w-20 px-3 py-2 border border-border rounded-lg bg-background text-right" />
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Configuración de emails</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">SendGrid</p>
                  <p className="text-sm text-muted">Servicio de email</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-yellow-600">Degradado</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold">Emails enviados este mes</p>
                  <p className="text-sm text-muted">Contador de emails</p>
                </div>
                <span className="text-lg font-bold">12,450</span>
              </div>
            </div>
          </div>

          {/* SMS Settings */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Configuración de SMS</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Twilio</p>
                  <p className="text-sm text-muted">Servicio de SMS</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600">Conectado</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold">SMS enviados este mes</p>
                  <p className="text-sm text-muted">Contador de SMS</p>
                </div>
                <span className="text-lg font-bold">3,287</span>
              </div>
            </div>
          </div>

          {/* Backup Settings */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Configuración de respaldos</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Respaldo automático</p>
                  <p className="text-sm text-muted">Cada 24 horas</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold">Último respaldo</p>
                  <p className="text-sm text-muted">17 sep 2026 a las 2:30 AM</p>
                </div>
                <button className="text-xs text-brand hover:underline font-semibold">Respaldar ahora</button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
              Guardar cambios
            </button>
            <button className="px-6 py-2 border border-border rounded-lg font-semibold hover:bg-background transition">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
