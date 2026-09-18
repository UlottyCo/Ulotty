"use client";

export function MiCuentaVerificacion() {
  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-lg font-bold mb-4">Verificación</h2>
      <p className="text-muted">Verifica tu identidad para acceder a funciones adicionales.</p>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">Identidad verificada</p>
            <p className="text-sm text-muted">✅ Verificado</p>
          </div>
          <span className="text-2xl">✓</span>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">Correo electrónico verificado</p>
            <p className="text-sm text-muted">juan@ejemplo.com</p>
          </div>
          <span className="text-2xl">✓</span>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">Teléfono verificado</p>
            <p className="text-sm text-muted">+52 661 123 4567</p>
          </div>
          <span className="text-2xl">✓</span>
        </div>
      </div>
    </div>
  );
}
