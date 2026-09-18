export function PropiedadesReporteria() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Reportes generados</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Reporte mensual de propiedades</p>
              <p className="text-xs text-muted">Generado el 17 sep 2026</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">Descargar</button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Análisis de mercado Q3 2026</p>
              <p className="text-xs text-muted">Generado el 15 sep 2026</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">Descargar</button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Desempeño de agentes por propiedades</p>
              <p className="text-xs text-muted">Generado el 10 sep 2026</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">Descargar</button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Reporte de propiedades rechazadas</p>
              <p className="text-xs text-muted">Generado el 5 sep 2026</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">Descargar</button>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Generar nuevo reporte</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Tipo de reporte</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
              <option>Análisis por zona</option>
              <option>Análisis por tipo</option>
              <option>Desempeño de agentes</option>
              <option>Tendencias de precios</option>
              <option>Actividad de usuarios</option>
              <option>Reportes de revisión</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Período</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Este mes</option>
              <option>Este trimestre</option>
              <option>Este año</option>
              <option>Personalizado</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Formato</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="format" value="pdf" defaultChecked className="w-4 h-4" />
                <span>PDF</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="format" value="excel" className="w-4 h-4" />
                <span>Excel</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="format" value="csv" className="w-4 h-4" />
                <span>CSV</span>
              </label>
            </div>
          </div>
          <button className="w-full px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            Generar reporte
          </button>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Alertas y notificaciones</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Alertas sobre propiedades pendientes</p>
              <p className="text-sm text-muted">Notificar cuando hay propiedades sin revisar</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Alertas de cambios de precio</p>
              <p className="text-sm text-muted">Notificar cuando hay cambios significativos</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Reportes automáticos</p>
              <p className="text-sm text-muted">Enviar reportes semanales por email</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Alertas de fraude</p>
              <p className="text-sm text-muted">Detectar y alertar sobre actividades sospechosas</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">KPIs principales</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-2">Tasa de aprobación</p>
            <p className="text-2xl font-bold text-green-600">82%</p>
            <p className="text-xs text-muted mt-2">↑ 3% vs mes anterior</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-2">Tiempo promedio revisión</p>
            <p className="text-2xl font-bold text-blue-600">2.4 días</p>
            <p className="text-xs text-muted mt-2">↓ 8 horas vs mes anterior</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-2">Enganche promedio</p>
            <p className="text-2xl font-bold text-purple-600">42 vistas</p>
            <p className="text-xs text-muted mt-2">↑ 12 vistas vs mes anterior</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-2">Valor promedio listado</p>
            <p className="text-2xl font-bold text-orange-600">$1.2M</p>
            <p className="text-xs text-muted mt-2">↑ $87K vs mes anterior</p>
          </div>
        </div>
      </div>
    </div>
  );
}
