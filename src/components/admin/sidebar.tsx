'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/panel-admin/dashboard', icon: '📊' },
  { label: 'Propiedades', href: '/panel-admin/propiedades', icon: '🏠' },
  { label: 'Usuarios', href: '/panel-admin/usuarios', icon: '👥' },
  { label: 'Operaciones', href: '/panel-admin/operaciones', icon: '📋' },
  { label: 'Comisiones', href: '/panel-admin/comisiones', icon: '💰' },
  { label: 'Analytics', href: '/panel-admin/analytics', icon: '📈' },
  { label: 'Configuración', href: '/panel-admin/configuracion', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-surface border-r border-border p-4 pt-20 overflow-y-auto hidden lg:block">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.includes(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-brand text-brand-foreground font-semibold'
                  : 'text-foreground hover:bg-background'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileSidebar() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden bg-surface border-b border-border p-4 flex gap-2 overflow-x-auto">
      {navItems.map((item) => {
        const isActive = pathname.includes(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition ${
              isActive
                ? 'bg-brand text-brand-foreground font-semibold'
                : 'text-foreground hover:bg-background'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
