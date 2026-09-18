export function PropiedadesMapeo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Propiedades por ubicación</h3>
        <div className="bg-background rounded-lg p-8 text-center">
          <p className="text-muted mb-4">Mapa interactivo de propiedades</p>
          <div className="w-full h-96 bg-border rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl mb-2">🗺️</p>
              <p className="text-muted">Mapa será renderizado aquí</p>
              <p className="text-xs text-muted mt-2">Integraciones con Mapbox o Google Maps</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Concentración por municipio</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Tijuana</p>
              <p className="text-xs text-muted">1.245 propiedades</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-border rounded-full h-2">
                <div className="bg-brand h-2 rounded-full" style={{ width: "36%" }}></div>
              </div>
              <span className="text-sm font-semibold">36%</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Rosarito</p>
              <p className="text-xs text-muted">892 propiedades</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-border rounded-full h-2">
                <div className="bg-brand h-2 rounded-full" style={{ width: "26%" }}></div>
              </div>
              <span className="text-sm font-semibold">26%</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Ensenada</p>
              <p className="text-xs text-muted">654 propiedades</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-border rounded-full h-2">
                <div className="bg-brand h-2 rounded-full" style={{ width: "19%" }}></div>
              </div>
              <span className="text-sm font-semibold">19%</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Tecate</p>
              <p className="text-xs text-muted">456 propiedades</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-border rounded-full h-2">
                <div className="bg-brand h-2 rounded-full" style={{ width: "13%" }}></div>
              </div>
              <span className="text-sm font-semibold">13%</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Otros</p>
              <p className="text-xs text-muted">211 propiedades</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-border rounded-full h-2">
                <div className="bg-brand h-2 rounded-full" style={{ width: "6%" }}></div>
              </div>
              <span className="text-sm font-semibold">6%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Zonas de mayor demanda</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4">
            <p className="font-semibold mb-3">Top 3 zonas</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Playas de Tijuana</span>
                <span className="font-bold">234 vistas/día</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Centro Rosarito</span>
                <span className="font-bold">187 vistas/día</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Ensenada Puerto</span>
                <span className="font-bold">156 vistas/día</span>
              </div>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="font-semibold mb-3">Contactos por zona</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Playas de Tijuana</span>
                <span className="font-bold">42 contactos/día</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Centro Rosarito</span>
                <span className="font-bold">28 contactos/día</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Ensenada Puerto</span>
                <span className="font-bold">19 contactos/día</span>
              </div>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="font-semibold mb-3">Precio promedio</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Playas de Tijuana</span>
                <span className="font-bold">$1.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Centro Rosarito</span>
                <span className="font-bold">$950K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Ensenada Puerto</span>
                <span className="font-bold">$780K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
