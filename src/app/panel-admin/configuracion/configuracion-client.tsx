"use client";

export function ConfiguracionClient() {
  const sections = [
    { title: "General", icon: "⚙️", items: ["Nombre plataforma", "URL base", "Zona horaria"] },
    { title: "Pagos", icon: "💳", items: ["Procesador", "Comisión", "Métodos habilitados"] },
    { title: "Email", icon: "📧", items: ["Servidor SMTP", "Plantillas", "Remitente"] },
    { title: "SMS", icon: "💬", items: ["Proveedor", "Créditos", "Templates"] },
    { title: "Backups", icon: "💾", items: ["Frecuencia", "Retención", "Ubicación"] },
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {sections.map((section) => (
        <div key={section.title} className="bg-surface rounded-lg border border-border p-6 cursor-pointer hover:shadow-lg transition">
          <div className="text-3xl mb-3">{section.icon}</div>
          <h3 className="font-bold mb-3">{section.title}</h3>
          <div className="space-y-2">
            {section.items.map((item) => (
              <div key={item} className="text-sm text-muted">{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
