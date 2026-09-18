"use client";

export function SeguridadClient() {
  const settings = [
    { name: "Autenticación de dos factores", status: "Habilitada", toggle: true },
    { name: "Requisito de contraseña fuerte", status: "Habilitado", toggle: true },
    { name: "Caducidad de sesión", status: "30 minutos", toggle: false },
    { name: "Restricción IP", status: "Deshabilitada", toggle: false },
    { name: "Encriptación de datos", status: "AES-256", toggle: false },
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-4">
      {settings.map((setting) => (
        <div key={setting.name} className="flex justify-between items-center border-b border-border pb-4 last:border-0">
          <div>
            <p className="font-semibold">{setting.name}</p>
            <p className="text-sm text-muted">{setting.status}</p>
          </div>
          {setting.toggle && <input type="checkbox" defaultChecked className="w-5 h-5" />}
        </div>
      ))}
    </div>
  );
}
