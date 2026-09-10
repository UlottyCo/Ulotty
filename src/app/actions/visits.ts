"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface RequestVisitState {
  error: string | null;
  success: boolean;
}

const initialState: RequestVisitState = { error: null, success: false };

export async function requestVisit(
  listingId: string,
  _prevState: RequestVisitState,
  formData: FormData,
): Promise<RequestVisitState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/propiedades/${listingId}`);
  }

  const { data: profile } = await supabase
    .from("users")
    .select("phone_verified")
    .eq("id", user.id)
    .single();

  if (!profile?.phone_verified) {
    return {
      error: "Verifica tu teléfono en tu perfil antes de agendar una visita.",
      success: false,
    };
  }

  const { data: idVerification } = await supabase
    .from("buyer_id_verifications")
    .select("id")
    .eq("buyer_id", user.id)
    .eq("status", "aprobado")
    .maybeSingle();

  if (!idVerification) {
    return {
      error:
        "Necesitas tu identificación oficial aprobada antes de agendar una visita. Súbela en tu perfil.",
      success: false,
    };
  }

  const preferredDatetimeRaw = formData.get("preferredDatetime") as string;
  const message = (formData.get("message") as string)?.trim() || null;

  if (!preferredDatetimeRaw) {
    return { error: "Elige una fecha y hora.", success: false };
  }

  const preferredDatetime = new Date(preferredDatetimeRaw);
  if (Number.isNaN(preferredDatetime.getTime())) {
    return { error: "Fecha inválida.", success: false };
  }

  // Agendar visita también cuenta como "contactar" — si todavía no
  // existía un lead tuyo para este predio, se crea aquí.
  let leadId: string;

  const { data: insertedLead, error: leadInsertError } = await supabase
    .from("leads")
    .insert({ listing_id: listingId, buyer_id: user.id })
    .select("id")
    .single();

  if (leadInsertError) {
    if (leadInsertError.code !== "23505") {
      console.error("Error al crear lead para visita:", {
        listingId,
        leadInsertError,
      });
      return { error: "No se pudo agendar la visita.", success: false };
    }

    const { data: existingLead, error: existingLeadError } = await supabase
      .from("leads")
      .select("id")
      .eq("listing_id", listingId)
      .eq("buyer_id", user.id)
      .single();

    if (existingLeadError || !existingLead) {
      console.error("Error al recuperar lead existente para visita:", {
        listingId,
        existingLeadError,
      });
      return { error: "No se pudo agendar la visita.", success: false };
    }

    leadId = existingLead.id;
  } else {
    leadId = insertedLead.id;
  }

  const { error: visitError } = await supabase.from("visit_requests").insert({
    lead_id: leadId,
    preferred_datetime: preferredDatetime.toISOString(),
    message,
  });

  if (visitError) {
    console.error("Error al agendar visita:", { listingId, visitError });
    return {
      error: `No se pudo agendar la visita: ${visitError.message}`,
      success: false,
    };
  }

  revalidatePath(`/propiedades/${listingId}`);
  revalidatePath("/panel/propietario");

  return { error: null, success: true };
}
