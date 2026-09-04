"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ReviewBuyerVerificationState {
  error: string | null;
}

const initialOk: ReviewBuyerVerificationState = { error: null };

export async function approveBuyerIdVerification(
  verificationId: string,
  _prevState: ReviewBuyerVerificationState,
  _formData: FormData,
): Promise<ReviewBuyerVerificationState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  const { error } = await supabase
    .from("buyer_id_verifications")
    .update({
      status: "aprobado",
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
    })
    .eq("id", verificationId)
    .eq("status", "pendiente");

  if (error) {
    console.error("Error al aprobar identificación de comprador:", {
      verificationId,
      error,
    });
    return { error: `No se pudo aprobar: ${error.message}` };
  }

  revalidatePath("/panel/admin");
  return initialOk;
}

export async function rejectBuyerIdVerification(
  verificationId: string,
  _prevState: ReviewBuyerVerificationState,
  formData: FormData,
): Promise<ReviewBuyerVerificationState> {
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
    .from("buyer_id_verifications")
    .update({
      status: "rechazado",
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      rejection_reason: reason,
    })
    .eq("id", verificationId)
    .eq("status", "pendiente");

  if (error) {
    console.error("Error al rechazar identificación de comprador:", {
      verificationId,
      error,
    });
    return { error: `No se pudo rechazar: ${error.message}` };
  }

  revalidatePath("/panel/admin");
  return initialOk;
}
