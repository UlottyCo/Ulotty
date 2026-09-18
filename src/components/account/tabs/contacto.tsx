"use client";

export function MiCuentaContacto() {
  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-lg font-bold mb-4">Métodos de contacto</h2>
      <p className="text-muted mb-6">Gestiona los métodos por los cuales otros usuarios pueden contactarte.</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">📧 Correo electrónico</p>
            <p className="text-sm text-green-600 dark:text-green-400">juan@ejemplo.com</p>
          </div>
          <button className="text-sm text-brand font-semibold hover:underline">Editar</button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">📱 Teléfono</p>
            <p className="text-sm text-green-600 dark:text-green-400">+52 661 123 4567</p>
          </div>
          <button className="text-sm text-brand font-semibold hover:underline">Editar</button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">💬 WhatsApp</p>
            <p className="text-sm text-green-600 dark:text-green-400">+52 661 123 4567</p>
          </div>
          <button className="text-sm text-brand font-semibold hover:underline">Editar</button>
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <p className="font-semibold">🔗 Redes sociales</p>
            <p className="text-sm text-muted">Conecta tus redes sociales</p>
          </div>
          <button className="text-sm text-brand font-semibold hover:underline">Conectar</button>
        </div>
      </div>
    </div>
  );
}
