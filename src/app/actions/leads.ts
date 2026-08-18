"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createLead(listingId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/propiedades/${listingId}`);
  }

  const { error } = await supabase.from("leads").insert({
    listing_id: listingId,
    buyer_id: user.id,
  });

  // 23505 = ya existe un lead tuyo para este listing (constraint unique):
  // no es un error real, solo significa "ya contactaste esto".
  if (error && error.code !== "23505") {
    console.error("Error al crear lead:", { listingId, error });
  }

  revalidatePath(`/propiedades/${listingId}`);
}

export interface RevealBuyerPhoneResult {
  phone: string | null;
  error: string | null;
}

// El teléfono completo del comprador nunca viaja en la carga inicial del
// panel de propietario (solo una versión enmascarada) — esta Server
// Action es la única forma de obtenerlo, y solo bajo demanda al hacer
// clic en "Ver teléfono completo".
export async function revealBuyerPhone(
  buyerId: string,
): Promise<RevealBuyerPhoneResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { phone: null, error: "No autorizado." };
  }

  const { data, error } = await supabase
    .from("users")
    .select("phone")
    .eq("id", buyerId)
    .maybeSingle();

  if (error) {
    console.error("Error al revelar teléfono de comprador:", {
      buyerId,
      error,
    });
    return { phone: null, error: "No se pudo cargar el teléfono." };
  }

  // RLS filtra la fila (sin error) si este comprador nunca contactó
  // ninguno de tus predios — no es un error de red, es de permiso.
  if (!data) {
    return { phone: null, error: "No tienes permiso para ver este teléfono." };
  }

  return { phone: data.phone, error: null };
}
