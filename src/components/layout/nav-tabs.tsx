"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// "Comprar" y "Rentar" todavía no filtran por operación (decisión
// explícita: son visuales por ahora, la búsqueda real sigue viviendo
// en el buscador de /propiedades). Por eso comparten el mismo href y
// solo "Comprar" se marca activo en esa ruta — no hay forma de saber
// cuál de las dos "quiso" decir el usuario sin un filtro real.
const TABS = [
  { label: "Comprar", href: "/propiedades", isActive: (p: string) => p === "/" || p.startsWith("/propiedades") },
  { label: "Rentar", href: "/propiedades", isActive: () => false },
  { label: "Publicar", href: "/publicar", isActive: (p: string) => p.startsWith("/publicar") },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="hidden gap-8 text-sm font-medium sm:flex">
      {TABS.map((tab) => {
        const active = tab.isActive(pathname);
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`border-b-2 pb-1 transition ${
              active
                ? "border-accent text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
