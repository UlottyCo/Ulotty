export function PropiedadesEstadisticas() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Distribución por estado</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Activas</div>
            <div className="text-3xl font-bold text-green-600 mb-2">2.841</div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
            </div>
            <div className="text-xs text-muted mt-2">82% del total</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Pendientes</div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">234</div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "7%" }}></div>
            </div>
            <div className="text-xs text-muted mt-2">7% del total</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Rechazadas</div>
            <div className="text-3xl font-bold text-red-600 mb-2">87</div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "3%" }}></div>
            </div>
            <div className="text-xs text-muted mt-2">3% del total</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Borradores</div>
            <div className="text-3xl font-bold text-gray-600 mb-2">296</div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "8%" }}></div>
            </div>
            <div className="text-xs text-muted mt-2">8% del total</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Distribución por tipo</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🏠</div>
            <div className="text-sm font-semibold">Casas</div>
            <div className="text-xl font-bold text-brand mt-2">1.245</div>
            <div className="text-xs text-muted mt-1">36%</div>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🏢</div>
            <div className="text-sm font-semibold">Departamentos</div>
            <div className="text-xl font-bold text-brand mt-2">987</div>
            <div className="text-xs text-muted mt-1">29%</div>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🏗️</div>
            <div className="text-sm font-semibold">Terrenos</div>
            <div className="text-xl font-bold text-brand mt-2">543</div>
            <div className="text-xs text-muted mt-1">16%</div>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🏪</div>
            <div className="text-sm font-semibold">Comercial</div>
            <div className="text-xl font-bold text-brand mt-2">456</div>
            <div className="text-xs text-muted mt-1">13%</div>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🏭</div>
            <div className="text-sm font-semibold">Industrial</div>
            <div className="text-xl font-bold text-brand mt-2">227</div>
            <div className="text-xs text-muted mt-1">6%</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Estadísticas de interacción</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Vistas totales</div>
            <div className="text-3xl font-bold text-blue-600">145.328</div>
            <div className="text-xs text-muted mt-2">Promedio: 42 por propiedad</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Contactos totales</div>
            <div className="text-3xl font-bold text-green-600">8.924</div>
            <div className="text-xs text-muted mt-2">Promedio: 2.6 por propiedad</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Tasa de contacto</div>
            <div className="text-3xl font-bold text-purple-600">6.1%</div>
            <div className="text-xs text-muted mt-2">De vistas a contactos</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Rangos de precio</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Menos de $300,000</p>
              <p className="text-xs text-muted">234 propiedades</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-brand">$45.2M</p>
              <p className="text-xs text-muted">valor total</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">$300,000 - $800,000</p>
              <p className="text-xs text-muted">1.245 propiedades</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-brand">$623.5M</p>
              <p className="text-xs text-muted">valor total</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">$800,000 - $2,000,000</p>
              <p className="text-xs text-muted">987 propiedades</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-brand">$1.34B</p>
              <p className="text-xs text-muted">valor total</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Más de $2,000,000</p>
              <p className="text-xs text-muted">456 propiedades</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-brand">$1.68B</p>
              <p className="text-xs text-muted">valor total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
