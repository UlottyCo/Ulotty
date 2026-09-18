export function UsuariosRoles() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Roles del sistema</h3>
        <div className="space-y-4">
          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-lg font-bold">Administrador</p>
                <p className="text-sm text-muted">Acceso total al sistema</p>
              </div>
              <span className="text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-3 py-1 rounded-full">
                8 usuarios
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted">✓ Gestionar todos los usuarios</p>
              <p className="text-muted">✓ Acceso a configuración del sistema</p>
              <p className="text-muted">✓ Generar reportes</p>
              <p className="text-muted">✓ Gestionar moderadores</p>
              <p className="text-muted">✓ Ver auditoría</p>
            </div>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-lg font-bold">Moderador</p>
                <p className="text-sm text-muted">Moderar contenido y usuarios</p>
              </div>
              <span className="text-sm bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">
                138 usuarios
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted">✓ Revisar propiedades</p>
              <p className="text-muted">✓ Moderar usuarios</p>
              <p className="text-muted">✓ Responder reportes</p>
              <p className="text-muted">✓ Suspender cuentas</p>
            </div>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-lg font-bold">Agente</p>
                <p className="text-sm text-muted">Gestionar propiedades</p>
              </div>
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                1.245 usuarios
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted">✓ Crear y editar propiedades</p>
              <p className="text-muted">✓ Ver estadísticas propias</p>
              <p className="text-muted">✓ Responder contactos</p>
              <p className="text-muted">✓ Gestionar comisiones</p>
            </div>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-lg font-bold">Comprador</p>
                <p className="text-sm text-muted">Buscar y contactar</p>
              </div>
              <span className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
                3.287 usuarios
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted">✓ Buscar propiedades</p>
              <p className="text-muted">✓ Guardar favoritos</p>
              <p className="text-muted">✓ Contactar agentes</p>
              <p className="text-muted">✓ Ver historial</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Permisos especiales</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Acceso a datos sensibles</p>
              <p className="text-sm text-muted">Información de transacciones y pagos</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">Gestionar</button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Exportación de datos</p>
              <p className="text-sm text-muted">Permitir descargas de reportes</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">Gestionar</button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">API access</p>
              <p className="text-sm text-muted">Acceso a API keys para integraciones</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">Gestionar</button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Publicación automática</p>
              <p className="text-sm text-muted">Saltarse revisión de propiedades</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">Gestionar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
