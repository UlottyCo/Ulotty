import Link from "next/link";
import { siteConfig } from "@/config/site";
import { createClient } from "@/lib/supabase/server";
import { NavTabs } from "./nav-tabs";
import { NavMenu } from "./nav-menu";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let fullName: string | null = null;
  const roleLinks: { label: string; href: string }[] = [];
  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("full_name, role")
      .eq("id", user.id)
      .single();
    fullName = profile?.full_name ?? null;

    if (
      profile?.role === "particular" ||
      profile?.role === "desarrolladora" ||
      profile?.role === "agente"
    ) {
      roleLinks.push({ label: "Mi panel", href: "/panel/propietario" });
    }
    if (profile?.role === "admin") {
      roleLinks.push({ label: "Admin", href: "/panel/admin" });
    }
  }

  // El resto del nav (Mensajes, Perfil, panel según rol) vive dentro
  // del menú de la hamburguesa — Comprar/Rentar/Publicar ya cubren la
  // navegación principal en el header.
  const menuLinks: { label: string; href: string }[] = [
    ...roleLinks,
    { label: "Mensajes", href: "/mensajes" },
    { label: "Perfil", href: "/perfil" },
  ];

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/ulotty_icon_dark.svg"
            alt=""
            className="h-8 w-8 dark:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/ulotty_icon_light.svg"
            alt=""
            className="hidden h-8 w-8 dark:block"
          />
          {siteConfig.name}
        </Link>

        <NavTabs />

        {user ? (
          <NavMenu fullName={fullName} email={user.email ?? ""} links={menuLinks} />
        ) : (
          <Link
            href="/login"
            className="rounded-md bg-brand px-4 py-2 text-sm text-brand-foreground"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}
