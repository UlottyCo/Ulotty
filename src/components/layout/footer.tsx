import Link from "next/link";
import { siteConfig } from "@/config/site";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Explora",
    links: [
      { label: "Comprar", href: "/propiedades" },
      { label: "Rentar", href: "/propiedades" },
      { label: "Publicar", href: "/publicar" },
    ],
  },
  {
    title: "Cuenta",
    links: [
      { label: "Perfil", href: "/perfil" },
      { label: "Mensajes", href: "/mensajes" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-semibold">{siteConfig.name}</span>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6 text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
