import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function PublicarPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // La ruta ya exige sesión (proxy.ts). Si por algún motivo llegamos
  // aquí sin usuario, no hay nada que mostrar.
  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "comprador" || profile?.role === "admin") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-bold">Publicar propiedad</h1>
        <p className="mt-4 text-black/60 dark:text-white/60">
          Esta sección es solo para quienes publican propiedades
          (particular, desarrolladora o agente). Si buscas comprar o
          rentar, explora las propiedades disponibles.
        </p>
        <Link
          href="/propiedades"
          className="mt-6 inline-block rounded-md bg-black px-6 py-2 text-sm text-white dark:bg-white dark:text-black"
        >
          Ver propiedades
        </Link>
      </div>
    );
  }

  const { data: groups, error: groupsError } = await supabase
    .from("listing_groups")
    .select(
      "id, title, zone, declared_lots_total, listings(id, status, created_at)",
    )
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (groupsError) {
    console.error("Error al cargar listing_groups en /publicar:", groupsError);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold">Publicar propiedad</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Elige una zona que ya tengas registrada para seguir completando
        sus predios, o crea una zona nueva.
      </p>

      {groupsError && (
        <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
          No se pudo cargar tu lista de zonas: {groupsError.message}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4">
        {groups?.map((group) => {
          const listings = group.listings as {
            id: string;
            status: string;
            created_at: string;
          }[];
          const total = group.declared_lots_total;
          const completados = listings.filter(
            (l) => l.status !== "borrador",
          ).length;
          const todoCompleto = completados >= total && total > 0;
          const siguienteBorrador = listings
            .filter((l) => l.status === "borrador")
            .sort((a, b) => a.created_at.localeCompare(b.created_at))[0];

          return (
            <div
              key={group.id}
              className="flex items-center justify-between rounded-lg border border-black/10 p-4 dark:border-white/10"
            >
              <div>
                <p className="font-medium">{group.title}</p>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {group.zone} · {completados} de {total} predios
                  completados
                </p>
              </div>
              {todoCompleto ? (
                <span className="text-sm text-black/40 dark:text-white/40">
                  Completo
                </span>
              ) : siguienteBorrador ? (
                <Link
                  href={`/publicar/predio/${siguienteBorrador.id}`}
                  className="rounded-md border border-black/10 px-4 py-2 text-sm dark:border-white/10"
                >
                  Continuar
                </Link>
              ) : null}
            </div>
          );
        })}

        {groups?.length === 0 && (
          <p className="text-sm text-black/60 dark:text-white/60">
            Todavía no tienes ninguna zona registrada.
          </p>
        )}
      </div>

      <Link
        href="/publicar/nueva-zona"
        className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
      >
        + Crear nueva zona
      </Link>
    </div>
  );
}
