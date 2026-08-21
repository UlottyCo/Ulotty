"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SetExchangeRateState {
  error: string | null;
}

const initialState: SetExchangeRateState = { error: null };

export async function setDailyExchangeRate(
  _prevState: SetExchangeRateState,
  formData: FormData,
): Promise<SetExchangeRateState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  const rate = Number(formData.get("rate"));
  if (!Number.isFinite(rate) || rate <= 0) {
    return { error: "El tipo de cambio debe ser un número mayor a 0." };
  }

  const { error } = await supabase
    .from("daily_exchange_rate")
    .insert({ rate, set_by: user.id });

  if (error) {
    console.error("Error al guardar tipo de cambio:", error);
    return { error: `No se pudo guardar: ${error.message}` };
  }

  revalidatePath("/panel/admin");

  return initialState;
}
