"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface GrantUlotsState {
  error: string | null;
}

const initialState: GrantUlotsState = { error: null };

export async function grantUlots(
  _prevState: GrantUlotsState,
  formData: FormData,
): Promise<GrantUlotsState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  const userId = formData.get("userId") as string;
  const amount = Number(formData.get("amount"));
  const reasonRaw = (formData.get("reason") as string)?.trim();

  if (!userId) {
    return { error: "Falta el dueño." };
  }
  if (!Number.isFinite(amount) || amount === 0) {
    return { error: "La cantidad debe ser un número distinto de 0." };
  }

  const { error } = await supabase.rpc("grant_ulots", {
    p_user_id: userId,
    p_amount: amount,
    p_reason: reasonRaw || "Asignado manualmente por admin",
  });

  if (error) {
    console.error("Error al asignar Ulots:", { userId, amount, error });
    return { error: `No se pudo asignar: ${error.message}` };
  }

  revalidatePath("/panel/admin");
  revalidatePath("/panel/propietario");

  return initialState;
}
