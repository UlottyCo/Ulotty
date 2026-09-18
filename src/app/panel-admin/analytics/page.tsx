import { AdminHeader } from "@/components/admin/admin-header";

export default async function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Analytics</h1>
          <p className="text-muted mt-2">Análisis detallado del desempeño de la plataforma.</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Visitantes únicos</div>
            <div className="text-2xl font-bold text-brand">45,234</div>
            <div className="text-xs text-muted mt-2">↑ 12% vs semana anterior</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Tiempo promedio</div>
            <div className="text-2xl font-bold text-blue-600">5:42</div>
            <div className="text-xs text-muted mt-2">minutos en sitio</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Tasa de rebote</div>
            <div className="text-2xl font-bold text-green-600">32%</div>
            <div className="text-xs text-muted mt-2">↓ 5% vs semana anterior</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Conversión</div>
            <div className="text-2xl font-bold text-purple-600">4.2%</div>
            <div className="text-xs text-muted mt-2">↑ 0.8% vs mes anterior</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Tráfico por dispositivo</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Desktop</span>
                <span className="font-bold">58%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-brand h-2 rounded-full" style={{ width: "58%" }}></div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm">Mobile</span>
                <span className="font-bold">38%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "38%" }}></div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm">Tablet</span>
                <span className="font-bold">4%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "4%" }}></div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Principales páginas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-background rounded-lg p-3">
                <span className="text-sm">/propiedades</span>
                <span className="font-bold">12,847 vistas</span>
              </div>
              <div className="flex items-center justify-between bg-background rounded-lg p-3">
                <span className="text-sm">/agentes</span>
                <span className="font-bold">8,234 vistas</span>
              </div>
              <div className="flex items-center justify-between bg-background rounded-lg p-3">
                <span className="text-sm">/mi-cuenta</span>
                <span className="font-bold">6,521 vistas</span>
              </div>
              <div className="flex items-center justify-between bg-background rounded-lg p-3">
                <span className="text-sm">/buscar</span>
                <span className="font-bold">5,234 vistas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-bold mb-4">Fuentes de tráfico</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-background rounded-lg p-4">
              <div>
                <p className="font-semibold">Búsqueda orgánica</p>
                <p className="text-xs text-muted">Google, Bing, otros motores de búsqueda</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl">18,547</p>
                <p className="text-xs text-muted">41%</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-4">
              <div>
                <p className="font-semibold">Directo</p>
                <p className="text-xs text-muted">Acceso directo desde navegador</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl">12,341</p>
                <p className="text-xs text-muted">27%</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-4">
              <div>
                <p className="font-semibold">Redes sociales</p>
                <p className="text-xs text-muted">Facebook, Instagram, Twitter, LinkedIn</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl">8,923</p>
                <p className="text-xs text-muted">20%</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-4">
              <div>
                <p className="font-semibold">Referidos</p>
                <p className="text-xs text-muted">Links desde otros sitios</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl">5,423</p>
                <p className="text-xs text-muted">12%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
