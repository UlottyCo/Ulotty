"use client";

export function MiCuentaPreferencias() {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Preferencias de búsqueda</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Tipo de propiedad preferida</label>
            <div className="flex gap-3 flex-wrap">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm">Casa</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm">Departamento</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm">Predio</span>
              </label>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <label className="text-sm font-semibold mb-2 block">Rango de precio preferido</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
              <option>$100,000 - $500,000 MXN</option>
              <option>$500,000 - $1,000,000 MXN</option>
              <option>$1,000,000+ MXN</option>
            </select>
          </div>

          <div className="border-t border-border pt-4">
            <label className="text-sm font-semibold mb-2 block">Zonas de interés</label>
            <div className="flex gap-3 flex-wrap">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm">Rosarito</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm">Tijuana</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm">Ensenada</span>
              </label>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <label className="text-sm font-semibold mb-2 block">Características deseadas</label>
            <div className="flex gap-3 flex-wrap">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm">Vista al mar</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm">Amenidades</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm">Privada residencial</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm">Cambio de disponibilidad</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Preferencias generales</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Tema oscuro</label>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </div>
          
          <div className="flex items-center justify-between border-t border-border pt-4">
            <label className="text-sm font-semibold">Idioma</label>
            <select className="px-3 py-1 border border-border rounded text-sm bg-background">
              <option>Español</option>
              <option>English</option>
            </select>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <label className="text-sm font-semibold">Mostrar consejos</label>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
          </div>
        </div>
      </div>

      <button className="w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand/90 transition">
        Guardar preferencias
      </button>
    </div>
  );
}
