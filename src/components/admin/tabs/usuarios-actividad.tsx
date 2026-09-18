export function UsuariosActividad() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Actividad reciente de usuarios</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Juan Pérez Morales</p>
              <p className="text-xs text-muted">Subió 3 propiedades</p>
            </div>
            <span className="text-xs text-muted">Hace 5 minutos</span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Patricia López Flores</p>
              <p className="text-xs text-muted">Rechazó propiedad (ID: P234)</p>
            </div>
            <span className="text-xs text-muted">Hace 15 minutos</span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Carlos Ramírez Sánchez</p>
              <p className="text-xs text-muted">Contactó a agente</p>
            </div>
            <span className="text-xs text-muted">Hace 1 hora</span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Ana Martínez Ruiz</p>
              <p className="text-xs text-muted">Guardó 5 propiedades</p>
            </div>
            <span className="text-xs text-muted">Hace 2 horas</span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">María García López</p>
              <p className="text-xs text-muted">Aprobó 2 propiedades</p>
            </div>
            <span className="text-xs text-muted">Hace 3 horas</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Estadísticas de actividad</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4">
            <p className="text-sm text-muted mb-2">Logins totales hoy</p>
            <p className="text-2xl font-bold text-brand">3.245</p>
            <p className="text-xs text-muted mt-2">+15% vs ayer</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-sm text-muted mb-2">Tiempo promedio de sesión</p>
            <p className="text-2xl font-bold text-brand">24 min</p>
            <p className="text-xs text-muted mt-2">+3 min vs semana anterior</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-sm text-muted mb-2">Acciones por usuario/día</p>
            <p className="text-2xl font-bold text-brand">4.2</p>
            <p className="text-xs text-muted mt-2">Promedio</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Acciones de moderadores</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Suspensiones de cuenta</p>
              <p className="text-xs text-muted">Últimos 7 días</p>
            </div>
            <p className="text-xl font-bold text-brand">12</p>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Propiedades rechazadas</p>
              <p className="text-xs text-muted">Últimos 7 días</p>
            </div>
            <p className="text-xl font-bold text-brand">45</p>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Usuarios verificados</p>
              <p className="text-xs text-muted">Últimos 7 días</p>
            </div>
            <p className="text-xl font-bold text-brand">234</p>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Avisos enviados</p>
              <p className="text-xs text-muted">Últimos 7 días</p>
            </div>
            <p className="text-xl font-bold text-brand">89</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Usuarios con reportes activos</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">User #4521</p>
              <p className="text-xs text-muted">Múltiples reportes de usuarios</p>
            </div>
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded">
              5 reportes
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">User #3287</p>
              <p className="text-xs text-muted">Comportamiento sospechoso</p>
            </div>
            <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
              3 reportes
            </span>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">User #7834</p>
              <p className="text-xs text-muted">Spam en propiedades</p>
            </div>
            <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
              2 reportes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
