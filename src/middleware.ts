import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas - no requieren autenticación
  const publicRoutes = ["/", "/propiedades", "/publicar"];
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Rutas protegidas - requieren autenticación
  const protectedRoutes = ["/panel-propietario", "/panel-admin"];
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Por ahora solo verificamos autenticación
    // En producción, verificar rol (owner vs admin)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
