import Link from "next/link";
import { siteConfig } from "@/config/site";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

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

  // "Mi panel"/"Admin" van justo después de "Publicar" — visibles solo
  // para quien le aplica el rol, nadie más las ve.
  const navItems: { label: string; href: string }[] = [...siteConfig.nav];
  const publicarIndex = navItems.findIndex((item) => item.href === "/publicar");
  navItems.splice(publicarIndex + 1, 0, ...roleLinks);

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          {siteConfig.name}
        </Link>
        <nav className="flex gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-black/60 dark:text-white/60">
              {fullName ?? user.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-md border border-black/10 px-4 py-2 text-sm dark:border-white/10"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-md bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}
