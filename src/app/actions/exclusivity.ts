"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface AcceptExclusivityState {
  error: string | null;
}

const initialState: AcceptExclusivityState = { error: null };

export async function acceptExclusivity(
  listingId: string,
  _prevState: AcceptExclusivityState,
  _formData: FormData,
): Promise<AcceptExclusivityState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  const exclusiveUntil = new Date();
  exclusiveUntil.setDate(exclusiveUntil.getDate() + 90);

  const { error } = await supabase
    .from("listings")
    .update({
      is_exclusive: true,
      exclusive_until: exclusiveUntil.toISOString().slice(0, 10),
    })
    .eq("id", listingId);

  if (error) {
    console.error("Error al aceptar exclusividad:", { listingId, error });
    return { error: `No se pudo activar la exclusividad: ${error.message}` };
  }

  revalidatePath("/panel/propietario");
  revalidatePath(`/propiedades/${listingId}`);
  revalidatePath("/propiedades");

  return initialState;
}
