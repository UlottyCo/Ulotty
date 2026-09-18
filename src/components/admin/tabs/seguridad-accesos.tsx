export function SeguridadAccesos() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Control de acceso por rol</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Administrador</p>
              <p className="text-sm text-muted">Acceso total al sistema</p>
            </div>
            <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
              3 usuarios
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Moderador</p>
              <p className="text-sm text-muted">Moderar propiedades y usuarios</p>
            </div>
            <span className="text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
              8 usuarios
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Agente</p>
              <p className="text-sm text-muted">Gestionar propiedades propias</p>
            </div>
            <span className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
              1.250 usuarios
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Comprador</p>
              <p className="text-sm text-muted">Buscar y guardar propiedades</p>
            </div>
            <span className="text-sm bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">
              3.428 usuarios
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Sesiones activas</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Juan Pérez</p>
              <p className="text-muted">Conectado hace 2 horas</p>
            </div>
            <button className="text-xs text-red-600 hover:underline">Desconectar</button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">María García</p>
              <p className="text-muted">Conectado hace 15 minutos</p>
            </div>
            <button className="text-xs text-red-600 hover:underline">Desconectar</button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Carlos López</p>
              <p className="text-muted">Conectado ahora mismo</p>
            </div>
            <button className="text-xs text-red-600 hover:underline">Desconectar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
