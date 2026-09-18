"use client";

import Image from "next/image";

export function BusquedasGuardadasContent() {
  const savedSearches = [
    {
      id: 1,
      title: "Casas en Rosarito",
      location: "Rosarito, B.C.",
      active: true,
      properties: 4,
      lastUpdated: "15 ago 2026",
      image: "🏠",
    },
    {
      id: 2,
      title: "Terrenos en Primo Tapia",
      location: "Primo Tapia, B.C.",
      active: true,
      properties: 2,
      lastUpdated: "8 ago 2026",
      image: "🌳",
    },
    {
      id: 3,
      title: "Departamentos frente al mar",
      location: "Playas de Tijuana, B.C.",
      active: true,
      properties: 1,
      lastUpdated: "1 ago 2026",
      image: "🏢",
    },
    {
      id: 4,
      title: "Casas con alberca",
      location: "Tijuana, B.C.",
      active: false,
      properties: 0,
      lastUpdated: "28 jul 2026",
      image: "🏊",
    },
    {
      id: 5,
      title: "Locales comerciales",
      location: "Zona Rio, Tijuana, B.C.",
      active: false,
      properties: 0,
      lastUpdated: "15 jul 2026",
      image: "🏪",
    },
  ];

  const alerts = [
    {
      id: 1,
      title: "Nueva propiedad!",
      description: "Casa en Rosarito",
      price: "$6,100,000 MXN",
      image: "🏠",
      time: "Hace 4 horas",
    },
    {
      id: 2,
      title: "Baja de precio",
      description: "Terreno en Primo Tapia",
      price: "Bajó $150,000",
      image: "📉",
      time: "Hace 5 horas",
    },
    {
      id: 3,
      title: "Nueva propiedad!",
      description: "Departamento frente al mar",
      price: "$2,850,000 MXN",
      image: "🏢",
      time: "Hace 1 día",
    },
    {
      id: 4,
      title: "Baja de precio",
      description: "Departamento frente al mar",
      price: "Bajó $450,000",
      image: "📉",
      time: "Hace 5 días",
    },
  ];

  const alertTypes = [
    { id: "new", label: "Nuevas propiedades", checked: true },
    { id: "price", label: "Cambios de precio", checked: true },
    { id: "similar", label: "Propiedades similares", checked: true },
    { id: "removals", label: "Propiedades removidas", checked: false },
    { id: "coordinates", label: "Cambio de disponibilidad", checked: true },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Info Section */}
        <div className="bg-surface rounded-lg border border-border p-4 flex gap-4">
          <div className="text-2xl">🔔</div>
          <div>
            <p className="font-semibold text-sm">Recibe alertas en tiempo real</p>
            <p className="text-xs text-muted">Te avisaremos cuando hay nuevas propiedades que coinciden con tus búsquedas.</p>
          </div>
          <div className="text-2xl">⏰</div>
          <div>
            <p className="font-semibold text-sm">Ahorra tiempo</p>
            <p className="text-xs text-muted">Encuentra tus próximas propiedades antes que otros.</p>
          </div>
          <div className="text-2xl">🎯</div>
          <div>
            <p className="font-semibold text-sm">Personaliza tu búsqueda</p>
            <p className="text-xs text-muted">Define exactamente qué criterios deseas.</p>
          </div>
        </div>

        {/* Searches List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Mis búsquedas</h2>
          {savedSearches.map((search) => (
            <div
              key={search.id}
              className="bg-surface rounded-lg border border-border overflow-hidden hover:border-brand/30 transition"
            >
              <div className="flex gap-4 p-4">
                {/* Image Placeholder */}
                <div className="w-24 h-24 bg-background rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  {search.image}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-bold text-foreground">{search.title}</p>
                    {search.active && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-full text-xs font-semibold text-green-700 dark:text-green-400">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Alertas activas
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted mb-2">📍 {search.location}</p>

                  <div className="flex gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-background rounded text-xs text-foreground">
                      {search.properties} propiedades coinciden
                    </span>
                    <span className="text-xs text-muted">Creada el 15 ago 2026</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 justify-center">
                  <button className="px-3 py-1 text-sm text-brand hover:bg-brand/10 rounded transition">
                    Ver resultados
                  </button>
                  <button className="px-3 py-1 text-sm text-muted hover:bg-background rounded transition">
                    ⋮
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Recent Alerts */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Alertas recientes</h3>
            <button className="text-xs text-brand hover:underline">Ver todas</button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 bg-background rounded-lg hover:border-l-2 hover:border-brand transition cursor-pointer"
              >
                <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                <p className="text-xs text-muted">{alert.description}</p>
                <p className="text-xs font-semibold text-brand mt-1">{alert.price}</p>
                <p className="text-xs text-muted mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Types */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="font-bold mb-4">Tipos de alertas</h3>
          <p className="text-xs text-muted mb-4">Elige qué notificaciones quieres recibir.</p>

          <div className="space-y-3">
            {alertTypes.map((type) => (
              <label key={type.id} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked={type.checked} className="w-4 h-4 rounded" />
                <span className="text-sm text-foreground">{type.label}</span>
              </label>
            ))}
          </div>

          <button className="w-full mt-4 px-4 py-2 text-sm border border-border rounded-lg hover:bg-background transition font-semibold">
            Guardar preferencias
          </button>
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-2">💡 Consejos para mejores resultados</p>
          <ul className="text-xs text-yellow-600 dark:text-yellow-500 space-y-1 list-disc list-inside">
            <li>Se específico en la ubicación deseada</li>
            <li>Define un rango de precio realista</li>
            <li>Acota el tipo de propiedad que buscas</li>
            <li>Cambia tus preferencias si no encuentras resultados</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
