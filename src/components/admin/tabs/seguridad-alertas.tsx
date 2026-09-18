export function SeguridadAlertas() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Configuración de alertas de seguridad</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Alertas por intento de ataque</p>
              <p className="text-sm text-muted">Notificar cuando se detecten intentos de ataque</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Alertas de cambio de configuración</p>
              <p className="text-sm text-muted">Notificar cuando cambien configuraciones críticas</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Alertas de certificado SSL</p>
              <p className="text-sm text-muted">Notificar antes de la expiración</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Alertas de disponibilidad</p>
              <p className="text-sm text-muted">Notificar si hay caídas de servicio</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Alertas de consumo de recursos</p>
              <p className="text-sm text-muted">Notificar si se usan muchos recursos</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Canales de notificación</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-muted">admin@ulotty.com</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">SMS</p>
              <p className="text-sm text-muted">+52 661 123 4567</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Webhook</p>
              <p className="text-sm text-muted">https://alerts.ulotty.com/webhook</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Slack</p>
              <p className="text-sm text-muted">#security-alerts</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Historial de alertas</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Alerta de intento de fuerza bruta</p>
              <p className="text-xs text-muted">17 sep 2026 10:45 AM</p>
            </div>
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded">
              Resuelta
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Cambio en configuración de firewall</p>
              <p className="text-xs text-muted">16 sep 2026 3:20 PM</p>
            </div>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
              Revisada
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Certificado próximo a expirar</p>
              <p className="text-xs text-muted">15 sep 2026 9:00 AM</p>
            </div>
            <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
              Pendiente
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Respaldo de datos completado</p>
              <p className="text-xs text-muted">14 sep 2026 2:30 AM</p>
            </div>
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
              Completada
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
