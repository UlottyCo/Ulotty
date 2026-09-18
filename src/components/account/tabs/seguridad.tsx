"use client";

export function MiCuentaSeguridad() {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Seguridad de la cuenta</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-semibold">Contraseña</p>
              <p className="text-sm text-muted">Última cambio hace 3 meses</p>
            </div>
            <button className="text-sm text-brand font-semibold hover:underline">Cambiar</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-semibold">Autenticación de dos factores</p>
              <p className="text-sm text-muted">Añade protección adicional a tu cuenta</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-semibold">Sesiones activas</p>
              <p className="text-sm text-muted">Gestiona tus dispositivos conectados</p>
            </div>
            <button className="text-sm text-brand font-semibold hover:underline">Ver</button>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Privacidad</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-semibold">Descarga tus datos</p>
              <p className="text-sm text-muted">Obtén una copia de tu información personal</p>
            </div>
            <button className="text-sm text-brand font-semibold hover:underline">Descargar</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-semibold">Eliminar cuenta</p>
              <p className="text-sm text-muted">Eliminar tu cuenta permanentemente</p>
            </div>
            <button className="text-sm text-red-600 font-semibold hover:underline">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
