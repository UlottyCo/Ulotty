import Link from "next/link";
import { siteConfig } from "@/config/site";

export async function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/panel-admin/dashboard"
            className="text-sm text-muted hover:text-foreground transition"
          >
            Admin
          </Link>
          <Link
            href="/propiedades"
            className="rounded-md bg-brand px-4 py-2 text-sm text-brand-foreground"
          >
            Propiedades
          </Link>
        </div>
      </div>
    </header>
  );
}
