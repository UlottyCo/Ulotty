export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Top KPIs */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-xs text-muted mb-2">Ingresos hoy</div>
          <div className="text-2xl font-bold text-green-600">$45,234</div>
          <div className="text-xs text-muted mt-2">↑ 12% vs ayer</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-xs text-muted mb-2">Transacciones hoy</div>
          <div className="text-2xl font-bold text-blue-600">127</div>
          <div className="text-xs text-muted mt-2">↑ 8% vs ayer</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-xs text-muted mb-2">Nuevas propiedades</div>
          <div className="text-2xl font-bold text-purple-600">34</div>
          <div className="text-xs text-muted mt-2">↑ 15% vs ayer</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-xs text-muted mb-2">Nuevos usuarios</div>
          <div className="text-2xl font-bold text-orange-600">82</div>
          <div className="text-xs text-muted mt-2">↑ 5% vs ayer</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-xs text-muted mb-2">Contactos pendientes</div>
          <div className="text-2xl font-bold text-red-600">23</div>
          <div className="text-xs text-muted mt-2">Requieren atención</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-xs text-muted mb-2">Tasa de satisfacción</div>
          <div className="text-2xl font-bold text-green-600">4.7/5</div>
          <div className="text-xs text-muted mt-2">↑ 0.2 vs mes anterior</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-bold mb-4">Ingresos (últimos 30 días)</h3>
          <div className="h-64 bg-background rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl mb-2">📊</p>
              <p className="text-muted">Gráfico de ingresos</p>
              <p className="text-xs text-muted mt-2">Se renderizará con Chart.js o Recharts</p>
            </div>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-bold mb-4">Actividad de usuarios (últimos 7 días)</h3>
          <div className="h-64 bg-background rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl mb-2">📈</p>
              <p className="text-muted">Gráfico de actividad</p>
              <p className="text-xs text-muted mt-2">Se renderizará con Chart.js o Recharts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Transactions */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Transacciones recientes</h3>
            <a href="/panel-admin/operaciones" className="text-xs text-brand hover:underline">Ver todas</a>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-background rounded-lg p-3">
              <div>
                <p className="text-sm font-semibold">Venta - Propiedad #P234</p>
                <p className="text-xs text-muted">Juan Pérez → Carlos Ramírez</p>
              </div>
              <p className="text-sm font-bold text-green-600">+$850,000</p>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-3">
              <div>
                <p className="text-sm font-semibold">Comisión generada</p>
                <p className="text-xs text-muted">María García - 5 propiedades</p>
              </div>
              <p className="text-sm font-bold text-green-600">+$12,450</p>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-3">
              <div>
                <p className="text-sm font-semibold">Pago de suscripción</p>
                <p className="text-xs text-muted">Plan Premium - Usuario #4521</p>
              </div>
              <p className="text-sm font-bold text-green-600">+$99</p>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-3">
              <div>
                <p className="text-sm font-semibold">Refund procesado</p>
                <p className="text-xs text-muted">Usuario #3287 - Solicitud #R123</p>
              </div>
              <p className="text-sm font-bold text-red-600">-$420</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Estado del sistema</h3>
            <a href="/panel-admin/seguridad" className="text-xs text-brand hover:underline">Ver detalles</a>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-background rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-sm font-semibold">API</p>
              </div>
              <span className="text-xs text-green-600">Operativo</span>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-sm font-semibold">Base de datos</p>
              </div>
              <span className="text-xs text-green-600">99.9% uptime</span>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-sm font-semibold">CDN</p>
              </div>
              <span className="text-xs text-green-600">Operativo</span>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <p className="text-sm font-semibold">Email</p>
              </div>
              <span className="text-xs text-yellow-600">Degradado</span>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-sm font-semibold">Storage</p>
              </div>
              <span className="text-xs text-green-600">85% disponible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Top Properties */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Propiedades top</h3>
            <a href="/panel-admin/propiedades" className="text-xs text-brand hover:underline">Ver todas</a>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between bg-background rounded-lg p-2">
              <span className="text-muted">Casa Rosarito #P001</span>
              <span className="font-bold">542 vistas</span>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-2">
              <span className="text-muted">Depto Tijuana #P045</span>
              <span className="font-bold">487 vistas</span>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-2">
              <span className="text-muted">Terreno Ensenada #P123</span>
              <span className="font-bold">421 vistas</span>
            </div>
          </div>
        </div>

        {/* Top Agents */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Agentes destacados</h3>
            <a href="/panel-admin/usuarios?role=agente" className="text-xs text-brand hover:underline">Ver todos</a>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between bg-background rounded-lg p-2">
              <span className="text-muted">Juan Pérez</span>
              <span className="font-bold">$482.5K</span>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-2">
              <span className="text-muted">Ana Martínez</span>
              <span className="font-bold">$356.2K</span>
            </div>
            <div className="flex items-center justify-between bg-background rounded-lg p-2">
              <span className="text-muted">María García</span>
              <span className="font-bold">$298.7K</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Alertas activas</h3>
            <a href="/panel-admin/notificaciones" className="text-xs text-brand hover:underline">Ver todas</a>
          </div>
          <div className="space-y-2">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">
              <p className="text-xs font-semibold text-red-700 dark:text-red-400">23 contactos sin responder</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2">
              <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">5 propiedades rechazadas</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">Email service degradado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
