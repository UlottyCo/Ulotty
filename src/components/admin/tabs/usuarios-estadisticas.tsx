export function UsuariosEstadisticas() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Distribución de usuarios por tipo</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Agentes</div>
            <div className="text-3xl font-bold text-blue-600 mb-2">1.245</div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "26%" }}></div>
            </div>
            <div className="text-xs text-muted mt-2">26% del total</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Compradores</div>
            <div className="text-3xl font-bold text-purple-600 mb-2">3.287</div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="text-xs text-muted mt-2">70% del total</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Administradores</div>
            <div className="text-3xl font-bold text-red-600 mb-2">8</div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "0.2%" }}></div>
            </div>
            <div className="text-xs text-muted mt-2">0.2% del total</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Moderadores</div>
            <div className="text-3xl font-bold text-orange-600 mb-2">138</div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "3%" }}></div>
            </div>
            <div className="text-xs text-muted mt-2">3% del total</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Estado de usuarios</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-sm font-semibold">Activos</div>
            <div className="text-2xl font-bold text-green-600 mt-2">4.321</div>
            <div className="text-xs text-muted mt-1">92%</div>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⏸️</div>
            <div className="text-sm font-semibold">Inactivos</div>
            <div className="text-2xl font-bold text-gray-600 mt-2">287</div>
            <div className="text-xs text-muted mt-1">6%</div>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🚫</div>
            <div className="text-sm font-semibold">Suspendidos</div>
            <div className="text-2xl font-bold text-red-600 mt-2">23</div>
            <div className="text-xs text-muted mt-1">0.5%</div>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⏳</div>
            <div className="text-sm font-semibold">En verificación</div>
            <div className="text-2xl font-bold text-yellow-600 mt-2">47</div>
            <div className="text-xs text-muted mt-1">1%</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Verificación de usuarios</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Verificados</div>
            <div className="text-3xl font-bold text-green-600">4.303</div>
            <div className="text-xs text-muted mt-2">92% del total</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Pendientes de verificación</div>
            <div className="text-3xl font-bold text-yellow-600">270</div>
            <div className="text-xs text-muted mt-2">6% del total</div>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="text-sm text-muted mb-2">Verificación rechazada</div>
            <div className="text-3xl font-bold text-red-600">105</div>
            <div className="text-xs text-muted mt-2">2% del total</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Actividad de usuarios</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Usuarios activos hoy</p>
              <p className="text-xs text-muted">Conectados en las últimas 24 horas</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">1.234</p>
              <p className="text-xs text-muted">26% del total</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Usuarios activos esta semana</p>
              <p className="text-xs text-muted">Conectados en los últimos 7 días</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">2.847</p>
              <p className="text-xs text-muted">61% del total</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Usuarios nuevos esta semana</p>
              <p className="text-xs text-muted">Registrados en los últimos 7 días</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">287</p>
              <p className="text-xs text-muted">+6.1% vs semana anterior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
