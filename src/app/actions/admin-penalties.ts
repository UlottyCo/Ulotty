"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface MarkPenaltyState {
  error: string | null;
}

const initialState: MarkPenaltyState = { error: null };

export async function markPenaltyCollected(
  historyId: string,
  _prevState: MarkPenaltyState,
  _formData: FormData,
): Promise<MarkPenaltyState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  const { error } = await supabase
    .from("listing_status_history")
    .update({ penalty_status: "cobrado" })
    .eq("id", historyId)
    .eq("penalty_status", "pendiente");

  if (error) {
    console.error("Error al marcar penalización como cobrada:", {
      historyId,
      error,
    });
    return { error: `No se pudo actualizar: ${error.message}` };
  }

  revalidatePath("/panel/admin");

  return initialState;
}
