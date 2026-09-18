export function SeguridadDatos() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Respaldos de datos</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Respaldo automático diario</p>
              <p className="text-sm text-muted">Cada 24 horas a las 2:30 AM</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Activo</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Respaldo de base de datos</p>
              <p className="text-sm text-muted">Último respaldo: 17 sep 2026 a las 2:30 AM</p>
            </div>
            <button className="text-xs text-brand hover:underline font-semibold">
              Descargar
            </button>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Almacenamiento en la nube</p>
              <p className="text-sm text-muted">AWS S3 con redundancia multi-región</p>
            </div>
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
              Sincronizado
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Políticas de retención de datos</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Retención de logs de auditoría</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
              <option>1 año (seleccionado)</option>
              <option>6 meses</option>
              <option>2 años</option>
              <option>Indefinido</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Retención de datos de usuarios eliminados</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
              <option>30 días (seleccionado)</option>
              <option>7 días</option>
              <option>60 días</option>
              <option>Eliminar inmediatamente</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Encriptación de datos</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Encriptación en tránsito</p>
              <p className="text-sm text-muted">TLS 1.3 para todas las conexiones</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Habilitado</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Encriptación en reposo</p>
              <p className="text-sm text-muted">AES-256 para datos almacenados</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Habilitado</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-background rounded-lg p-4">
            <div>
              <p className="font-semibold">Encriptación de contraseñas</p>
              <p className="text-sm text-muted">Bcrypt con 12 rondas</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-green-600">Habilitado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
