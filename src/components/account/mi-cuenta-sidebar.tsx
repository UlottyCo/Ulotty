import Link from "next/link";

export function MiCuentaSidebar() {
  const menuItems = [
    { icon: "🏠", label: "Inicio", href: "/" },
    { icon: "🔍", label: "Buscar propiedades", href: "/propiedades" },
    { icon: "❤️", label: "Mis favoritos", href: "/mi-cuenta/favoritos" },
    { icon: "📍", label: "Búsquedas guardadas", href: "/mi-cuenta/busquedas-guardadas" },
    { icon: "🔔", label: "Alertas", href: "/mi-cuenta/alertas" },
    { icon: "💬", label: "Mis consultas", href: "/mi-cuenta/consultas" },
    { icon: "💌", label: "Mensajes", href: "/mi-cuenta/mensajes" },
    { icon: "📅", label: "Visitas agendadas", href: "/mi-cuenta/visitas" },
    { icon: "🏢", label: "Mis operaciones", href: "/mi-cuenta/operaciones" },
    { icon: "👤", label: "Mi cuenta", href: "/mi-cuenta", active: true },
    { icon: "⚙️", label: "Configuración", href: "/mi-cuenta/configuracion" },
    { icon: "💬", label: "Soporte", href: "/soporte" },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded flex items-center justify-center text-white font-bold">
            U
          </div>
          <span className="font-bold">Ulotty</span>
        </Link>
      </div>

      {/* User Profile Card */}
      <div className="p-4 m-4 bg-background rounded-lg border border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-semibold">
            JM
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Juan Márquez</p>
            <p className="text-xs text-muted">Ver su perfil →</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-2 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              item.active
                ? "bg-brand text-white font-semibold"
                : "text-foreground hover:bg-background"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
