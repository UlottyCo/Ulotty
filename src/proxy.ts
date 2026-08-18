import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// En Next.js 16 este archivo reemplaza a "middleware.ts" (renombrado por
// Next.js para evitar confusión con el middleware de Express). Sigue
// corriendo antes de cada request, igual que antes.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
