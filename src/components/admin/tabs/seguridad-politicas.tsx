export function SeguridadPoliticas() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Políticas de seguridad activas</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Política de contraseñas fuerte</p>
              <p className="text-sm text-muted">Mínimo 12 caracteres, números y símbolos</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Expiración de sesiones</p>
              <p className="text-sm text-muted">Sesiones expiran después de 2 horas</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Política de privacidad estricta</p>
              <p className="text-sm text-muted">Cumplimiento con GDPR y CCPA</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Auditoría completa</p>
              <p className="text-sm text-muted">Registrar todas las acciones de administrador</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Cumplimiento de PCI DSS</p>
              <p className="text-sm text-muted">Si se procesan pagos con tarjeta</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Documentos de política</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Política de privacidad</p>
              <p className="text-sm text-muted">Última actualización: 1 ago 2026</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">
              Ver
            </button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Términos de servicio</p>
              <p className="text-sm text-muted">Última actualización: 15 jul 2026</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">
              Ver
            </button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Política de cookies</p>
              <p className="text-sm text-muted">Última actualización: 20 jun 2026</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">
              Ver
            </button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Política de seguridad</p>
              <p className="text-sm text-muted">Última actualización: 10 sep 2026</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">
              Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
