import { AdminHeader } from "@/components/admin/admin-header";

export default async function SuscripcionesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Planes de suscripción</h1>
          <p className="text-muted mt-2">Gestiona planes y suscripciones de usuarios.</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Suscriptores activos</div>
            <div className="text-2xl font-bold text-brand">2,847</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Ingresos por suscripción</div>
            <div className="text-2xl font-bold text-green-600">$284,700</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Churn rate</div>
            <div className="text-2xl font-bold text-red-600">2.3%</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">MRR</div>
            <div className="text-2xl font-bold text-blue-600">$23,725</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface rounded-lg border border-brand p-6">
            <h3 className="text-lg font-bold mb-2">Free</h3>
            <div className="text-3xl font-bold text-muted mb-4">Gratis</div>
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-muted mb-3">1,234 usuarios</p>
              <p className="text-xs text-muted">Creadores: 0%</p>
            </div>
            <ul className="space-y-2 text-sm mb-6">
              <li className="text-muted">✓ Hasta 3 propiedades</li>
              <li className="text-muted">✓ Búsqueda básica</li>
              <li className="text-muted">✓ Contacto por email</li>
              <li className="text-muted">✗ Análisis avanzado</li>
            </ul>
          </div>

          <div className="bg-surface rounded-lg border border-brand p-6">
            <h3 className="text-lg font-bold mb-2">Premium</h3>
            <div className="text-3xl font-bold text-brand mb-1">$99<span className="text-sm text-muted">/mes</span></div>
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-muted mb-3">1,234 usuarios</p>
              <p className="text-xs text-muted">Creadores: 43%</p>
            </div>
            <ul className="space-y-2 text-sm mb-6">
              <li className="text-muted">✓ Propiedades ilimitadas</li>
              <li className="text-muted">✓ Búsqueda avanzada</li>
              <li className="text-muted">✓ Análisis básico</li>
              <li className="text-muted">✗ Soporte prioritario</li>
            </ul>
          </div>

          <div className="bg-surface rounded-lg border border-brand p-6">
            <h3 className="text-lg font-bold mb-2">Professional</h3>
            <div className="text-3xl font-bold text-brand mb-1">$299<span className="text-sm text-muted">/mes</span></div>
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-muted mb-3">379 usuarios</p>
              <p className="text-xs text-muted">Creadores: 100%</p>
            </div>
            <ul className="space-y-2 text-sm mb-6">
              <li className="text-muted">✓ Propiedades ilimitadas</li>
              <li className="text-muted">✓ Análisis avanzado</li>
              <li className="text-muted">✓ Soporte prioritario 24/7</li>
              <li className="text-muted">✓ API access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
