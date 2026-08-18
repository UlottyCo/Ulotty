"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface UpdateListingStatusState {
  error: string | null;
}

const initialOk: UpdateListingStatusState = { error: null };

export async function updateListingStatus(
  listingId: string,
  _prevState: UpdateListingStatusState,
  formData: FormData,
): Promise<UpdateListingStatusState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  const status = formData.get("status") as string;
  const reasonRaw = (formData.get("reason") as string)?.trim();

  if (status === "vendido_fuera" && !reasonRaw) {
    return {
      error: 'Elige un motivo para marcar "vendido fuera de la plataforma".',
    };
  }

  const { error } = await supabase.rpc("update_listing_status", {
    p_listing_id: listingId,
    p_new_status: status,
    p_reason: reasonRaw || null,
  });

  if (error) {
    console.error("Error al cambiar estatus:", { listingId, status, error });
    return { error: `No se pudo cambiar el estatus: ${error.message}` };
  }

  revalidatePath("/panel/propietario");
  revalidatePath(`/propiedades/${listingId}`);
  revalidatePath("/propiedades");

  return initialOk;
}
