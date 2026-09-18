export function SeguridadIntegraciones() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Integraciones de seguridad</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Cloudflare</p>
              <p className="text-sm text-muted">Protección DDoS y WAF</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Conectado</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Auth0</p>
              <p className="text-sm text-muted">Gestión centralizada de identidades</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Conectado</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Sentry</p>
              <p className="text-sm text-muted">Monitoreo de errores y performance</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Conectado</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">AWS Shield</p>
              <p className="text-sm text-muted">Protección contra ataques DDoS</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Conectado</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">APIs de seguridad</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">API Key de administrador</p>
              <p className="text-sm text-muted">Para integraciones de terceros</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">
              Regenerar
            </button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Webhooks de seguridad</p>
              <p className="text-sm text-muted">3 webhooks configurados</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">
              Gestionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
