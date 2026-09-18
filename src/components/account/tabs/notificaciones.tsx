"use client";

export function MiCuentaNotificaciones() {
  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-lg font-bold mb-4">Notificaciones</h2>
      <p className="text-muted mb-6">Configura cómo deseas recibir notificaciones.</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">Nuevas propiedades que coinciden</p>
            <p className="text-sm text-muted">Alertas por propiedades similares</p>
          </div>
          <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">Cambios de precio</p>
            <p className="text-sm text-muted">Notificaciones de cambios en propiedades guardadas</p>
          </div>
          <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">Mensajes de agentes</p>
            <p className="text-sm text-muted">Nuevos mensajes de agentes inmobiliarios</p>
          </div>
          <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">Recordatorios de visitas</p>
            <p className="text-sm text-muted">Recordatorios de visitas agendadas</p>
          </div>
          <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">Noticias y promociones</p>
            <p className="text-sm text-muted">Ofertas especiales y actualizaciones de Ulotty</p>
          </div>
          <input type="checkbox" className="w-5 h-5 rounded" />
        </div>
      </div>

      <div className="mt-8 p-4 bg-background rounded-lg">
        <h3 className="font-semibold mb-3">Métodos de notificación</h3>
        <div className="flex gap-3 flex-wrap">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm">Email</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm">WhatsApp</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm">Push</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="text-sm">Interna</span>
          </label>
        </div>
      </div>
    </div>
  );
}
