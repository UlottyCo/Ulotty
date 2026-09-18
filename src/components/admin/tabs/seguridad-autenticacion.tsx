export function SeguridadAutenticacion() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Configuración de autenticación</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Autenticación de dos factores (2FA)</p>
              <p className="text-sm text-muted">Requerir 2FA para administradores</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Autenticación OAuth/SSO</p>
              <p className="text-sm text-muted">Google, Microsoft y GitHub habilitados</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Contraseñas temporales</p>
              <p className="text-sm text-muted">Expiración cada 90 días</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Bloqueo de cuenta tras fallos</p>
              <p className="text-sm text-muted">Bloquear después de 5 intentos fallidos</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Métodos de autenticación activos</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔑</span>
              <div>
                <p className="font-semibold">Email y contraseña</p>
                <p className="text-xs text-muted">4.681 usuarios activos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Activo</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔐</span>
              <div>
                <p className="font-semibold">2FA - Autenticador</p>
                <p className="text-xs text-muted">2.145 usuarios activos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Activo</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-semibold">2FA - SMS</p>
                <p className="text-xs text-muted">1.234 usuarios activos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Activo</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <div>
                <p className="font-semibold">OAuth - Google</p>
                <p className="text-xs text-muted">856 usuarios activos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Activo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
