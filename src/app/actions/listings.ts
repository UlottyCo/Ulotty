"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface UpdateListingDraftState {
  error: string | null;
}

export async function updateListingDraft(
  listingId: string,
  _prevState: UpdateListingDraftState,
  formData: FormData,
): Promise<UpdateListingDraftState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const folio = (formData.get("folio") as string)?.trim();
  const type = formData.get("type") as string;
  const operation = formData.get("operation") as string;
  const priceMxn = Number(formData.get("priceMxn"));
  const priceUsdRaw = (formData.get("priceUsd") as string)?.trim();
  const priceUsd = priceUsdRaw ? Number(priceUsdRaw) : null;
  const exchangeRateRaw = (formData.get("exchangeRateUsed") as string)?.trim();
  const exchangeRateUsed = exchangeRateRaw ? Number(exchangeRateRaw) : null;
  const areaM2 = Number(formData.get("areaM2"));
  const description = (formData.get("description") as string)?.trim();
  const latitude = Number(formData.get("latitude"));
  const longitude = Number(formData.get("longitude"));
  const acceptExclusivity = formData.get("acceptExclusivity") === "on";

  // El perímetro es opcional: solo se guarda si tiene al menos 3
  // puntos (un polígono válido). Menos que eso, o algo mal formado,
  // se guarda como null — nunca bloquea el resto del formulario.
  let boundaryPoints: [number, number][] | null = null;
  const boundaryPointsRaw = formData.get("boundaryPoints") as string | null;
  if (boundaryPointsRaw) {
    try {
      const parsed = JSON.parse(boundaryPointsRaw);
      if (
        Array.isArray(parsed) &&
        parsed.length >= 3 &&
        parsed.every(
          (p) =>
            Array.isArray(p) &&
            p.length === 2 &&
            Number.isFinite(p[0]) &&
            Number.isFinite(p[1]),
        )
      ) {
        boundaryPoints = parsed;
      }
    } catch {
      boundaryPoints = null;
    }
  }

  if (!folio || !type || !operation || !description) {
    return { error: "Completa todos los campos obligatorios." };
  }
  if (!Number.isFinite(priceMxn) || priceMxn <= 0) {
    return { error: "El precio en MXN debe ser mayor a 0." };
  }
  if (!Number.isFinite(areaM2) || areaM2 <= 0) {
    return { error: "Los m² deben ser mayores a 0." };
  }
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return { error: "Marca la ubicación de este predio en el mapa." };
  }

  const photos = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  // Esta misma pantalla sirve tanto para completar un borrador (Paso 2)
  // como para editar un predio ya publicado desde el panel de
  // propietario. Solo forzamos el paso a 'disponible' quando viene de
  // 'borrador' — si ya tiene otro estatus (apartado/vendido/vendido
  // fuera), editar los datos no debe revertirlo silenciosamente.
  const { data: current } = await supabase
    .from("listings")
    .select("status")
    .eq("id", listingId)
    .single();

  if (!current) {
    return { error: "No se pudo guardar (¿este predio es tuyo?)." };
  }

  const { count: existingPhotoCount } = await supabase
    .from("listing_photos")
    .select("id", { count: "exact", head: true })
    .eq("listing_id", listingId);

  if (photos.length === 0 && !existingPhotoCount) {
    return { error: "Sube al menos una foto." };
  }

  // El checkbox de exclusividad solo sirve para ACTIVARLA — si no está
  // marcado, no tocamos is_exclusive/exclusive_until (no hay forma de
  // cancelarla desde aquí todavía).
  const exclusivityFields: Record<string, unknown> = {};
  if (acceptExclusivity) {
    const exclusiveUntil = new Date();
    exclusiveUntil.setDate(exclusiveUntil.getDate() + 90);
    exclusivityFields.is_exclusive = true;
    exclusivityFields.exclusive_until = exclusiveUntil
      .toISOString()
      .slice(0, 10);
  }

  const { data: updated, error: updateError } = await supabase
    .from("listings")
    .update({
      folio,
      type,
      operation,
      price_mxn: priceMxn,
      price_usd: priceUsd,
      exchange_rate_used: exchangeRateUsed,
      area_m2: areaM2,
      description,
      latitude,
      longitude,
      boundary_points: boundaryPoints,
      ...exclusivityFields,
    })
    .eq("id", listingId)
    .select()
    .single();

  if (updateError || !updated) {
    console.error("Error al actualizar listing en updateListingDraft:", {
      listingId,
      updateError,
    });
    if (updateError?.code === "23505") {
      return { error: "Ese folio ya está en uso. Elige otro." };
    }
    return {
      error: `No se pudo guardar (¿este predio es tuyo?). ${
        updateError?.message ?? "Sin más detalle."
      }`,
    };
  }

  // El paso de 'borrador' a 'disponible' pasa por la misma función que
  // usa el selector de estatus del panel de propietario
  // (update_listing_status), para que quede registrado en
  // listing_status_history desde la primera publicación — antes esta
  // Server Action ponía el estatus directo con .update(), y ese primer
  // cambio nunca quedaba en la bitácora.
  if (current.status === "borrador") {
    const { error: statusError } = await supabase.rpc(
      "update_listing_status",
      { p_listing_id: listingId, p_new_status: "disponible", p_reason: null },
    );

    if (statusError) {
      console.error("Error al pasar de borrador a disponible:", {
        listingId,
        statusError,
      });
      return {
        error: `Se guardaron tus datos, pero no se pudo activar el predio: ${statusError.message}`,
      };
    }
  }

  for (let i = 0; i < photos.length; i++) {
    const file = photos[i];
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${listingId}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("listing-photos")
      .upload(path, file, { contentType: file.type });

    if (uploadError) continue;

    await supabase.from("listing_photos").insert({
      listing_id: listingId,
      storage_path: path,
      position: i,
    });
  }

  revalidatePath("/publicar");
  revalidatePath(`/publicar/predio/${listingId}`);
  redirect(`/publicar/predio/${listingId}/verificar`);
}
