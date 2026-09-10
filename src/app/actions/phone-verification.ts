"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  startPhoneVerification as twilioStart,
  checkPhoneVerification as twilioCheck,
  toE164Mexico,
} from "@/lib/twilio";

export interface PhoneVerificationState {
  error: string | null;
  codeSent: boolean;
  verified: boolean;
}

const initialState: PhoneVerificationState = {
  error: null,
  codeSent: false,
  verified: false,
};

export async function requestPhoneCode(
  _prevState: PhoneVerificationState,
  _formData: FormData,
): Promise<PhoneVerificationState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ...initialState, error: "No autorizado." };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("phone")
    .eq("id", user.id)
    .single();

  if (!profile?.phone) {
    return {
      ...initialState,
      error: "Agrega tu teléfono en tu perfil antes de verificarlo.",
    };
  }

  const result = await twilioStart(toE164Mexico(profile.phone));

  if (!result.ok) {
    return { ...initialState, error: result.error };
  }

  return { error: null, codeSent: true, verified: false };
}

export async function confirmPhoneCode(
  _prevState: PhoneVerificationState,
  formData: FormData,
): Promise<PhoneVerificationState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ...initialState, error: "No autorizado." };
  }

  const code = (formData.get("code") as string)?.trim();
  if (!code) {
    return { error: "Escribe el código que te llegó.", codeSent: true, verified: false };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("phone")
    .eq("id", user.id)
    .single();

  if (!profile?.phone) {
    return {
      ...initialState,
      error: "Agrega tu teléfono en tu perfil antes de verificarlo.",
    };
  }

  const result = await twilioCheck(toE164Mexico(profile.phone), code);

  if (!result.ok) {
    return { error: result.error, codeSent: true, verified: false };
  }

  if (!result.approved) {
    return {
      error: "Código incorrecto o vencido. Pide uno nuevo.",
      codeSent: true,
      verified: false,
    };
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ phone_verified: true, phone_verified_at: new Date().toISOString() })
    .eq("id", user.id);

  if (updateError) {
    console.error("Error al guardar teléfono verificado:", {
      userId: user.id,
      updateError,
    });
    return {
      error: `Se validó el código pero no se pudo guardar: ${updateError.message}`,
      codeSent: true,
      verified: false,
    };
  }

  revalidatePath("/perfil");

  return { error: null, codeSent: false, verified: true };
}
