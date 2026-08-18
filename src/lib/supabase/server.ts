import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente de Supabase para usar en Server Components, Server Actions y
 * Route Handlers (código que corre en el servidor). Lee/escribe la
 * sesión del usuario a través de las cookies de la petición.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll() puede fallar si se llama desde un Server Component.
            // Se puede ignorar mientras haya un middleware refrescando la
            // sesión (lo agregaremos cuando implementemos login).
          }
        },
      },
    },
  );
}
