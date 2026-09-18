export function SeguridadMonitoreo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Monitoreo de seguridad en tiempo real</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-2">Intentos de ataque bloqueados</p>
            <p className="text-2xl font-bold text-green-600">1.243</p>
            <p className="text-xs text-muted mt-1">Últimas 24 horas</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-2">Vulnerabilidades detectadas</p>
            <p className="text-2xl font-bold text-yellow-600">3</p>
            <p className="text-xs text-muted mt-1">Todas con parches</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-2">Alertas de seguridad</p>
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-xs text-muted mt-1">12 resueltas hoy</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Alertas recientes</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Intento de fuerza bruta detectado</p>
              <p className="text-xs text-muted">Desde IP: 192.168.1.100</p>
            </div>
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded">
              Bloqueado
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Cambio en configuración de firewall</p>
              <p className="text-xs text-muted">Por administrador juan.perez</p>
            </div>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
              Revisado
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Certificado SSL próximo a expirar</p>
              <p className="text-xs text-muted">Vence en 180 días</p>
            </div>
            <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
              Pendiente
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Actividad inusual en base de datos</p>
              <p className="text-xs text-muted">Múltiples queries desde usuario admin</p>
            </div>
            <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
              Investigando
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Configuración de monitoreo</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Monitoreo de tráfico</p>
              <p className="text-sm text-muted">Analizar patrones de tráfico sospechosos</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Alertas en tiempo real</p>
              <p className="text-sm text-muted">Notificar inmediatamente anomalías</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}
