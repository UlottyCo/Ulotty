"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ReviewVerificationState {
  error: string | null;
}

const initialOk: ReviewVerificationState = { error: null };

export async function approveListingVerification(
  listingId: string,
  _prevState: ReviewVerificationState,
  _formData: FormData,
): Promise<ReviewVerificationState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  const { error } = await supabase
    .from("verifications")
    .update({
      status: "aprobado",
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
    })
    .eq("listing_id", listingId)
    .eq("status", "pendiente");

  if (error) {
    console.error("Error al aprobar verificación:", { listingId, error });
    return { error: `No se pudo aprobar: ${error.message}` };
  }

  revalidatePath("/panel/admin");
  return initialOk;
}

export async function rejectListingVerification(
  listingId: string,
  _prevState: ReviewVerificationState,
  formData: FormData,
): Promise<ReviewVerificationState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  const reason = (formData.get("reason") as string)?.trim();
  if (!reason) {
    return { error: "Escribe un motivo de rechazo." };
  }

  const { error } = await supabase
    .from("verifications")
    .update({
      status: "rechazado",
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      rejection_reason: reason,
    })
    .eq("listing_id", listingId)
    .eq("status", "pendiente");

  if (error) {
    console.error("Error al rechazar verificación:", { listingId, error });
    return { error: `No se pudo rechazar: ${error.message}` };
  }

  revalidatePath("/panel/admin");
  return initialOk;
}
