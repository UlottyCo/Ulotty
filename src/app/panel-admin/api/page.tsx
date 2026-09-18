import { AdminHeader } from "@/components/admin/admin-header";

export default async function APIPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">API Keys</h1>
            <p className="text-muted mt-2">Gestiona acceso a API e integraciones.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Generar nueva key
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">API Keys activas</div>
            <div className="text-2xl font-bold text-brand">12</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Solicitudes este mes</div>
            <div className="text-2xl font-bold text-blue-600">847,234</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Límite de solicitudes</div>
            <div className="text-2xl font-bold text-green-600">10M/mes</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">sk_live_abc123def456</h3>
                <p className="text-sm text-muted">Producción - Creada hace 6 meses</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs text-brand hover:underline font-semibold">Copiar</button>
                <button className="text-xs text-red-600 hover:underline font-semibold">Revocar</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted mb-1">Solicitudes</p>
                <p className="font-bold">234,567</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Última solicitud</p>
                <p className="font-bold">Hace 5 min</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Estado</p>
                <p className="font-bold text-green-600">Activa</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">sk_test_xyz789uvw012</h3>
                <p className="text-sm text-muted">Testing - Creada hace 3 meses</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs text-brand hover:underline font-semibold">Copiar</button>
                <button className="text-xs text-red-600 hover:underline font-semibold">Revocar</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted mb-1">Solicitudes</p>
                <p className="font-bold">45,234</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Última solicitud</p>
                <p className="font-bold">Hace 2 días</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Estado</p>
                <p className="font-bold text-green-600">Activa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
