"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { MAX_PHOTOS_PER_LISTING } from "@/lib/photos";

interface PhotoActionResult {
  error: string | null;
}

/**
 * Registra en listing_photos una foto que el navegador ya subió a
 * Storage. La posición se calcula desde el máximo actual para que un
 * segundo lote no vuelva a empezar en 0 y deje dos portadas.
 */
export async function addListingPhoto(
  listingId: string,
  storagePath: string,
): Promise<PhotoActionResult & { id: string | null; position: number | null }> {
  const supabase = await createClient();

  const {
    data: existing,
    count,
    error: countError,
  } = await supabase
    .from("listing_photos")
    .select("position", { count: "exact" })
    .eq("listing_id", listingId)
    .order("position", { ascending: false })
    .limit(1);

  if (countError) {
    return { error: countError.message, id: null, position: null };
  }

  if ((count ?? 0) >= MAX_PHOTOS_PER_LISTING) {
    return {
      error: `Este predio ya llegó al máximo de ${MAX_PHOTOS_PER_LISTING} fotos.`,
      id: null,
      position: null,
    };
  }

  const nextPosition = existing?.length ? existing[0].position + 1 : 0;

  const { data, error } = await supabase
    .from("listing_photos")
    .insert({
      listing_id: listingId,
      storage_path: storagePath,
      position: nextPosition,
    })
    .select("id, position")
    .single();

  if (error || !data) {
    return {
      error: error?.message ?? "No se pudo registrar la foto.",
      id: null,
      position: null,
    };
  }

  revalidatePath(`/publicar/predio/${listingId}`);
  revalidatePath(`/propiedades/${listingId}`);
  return { error: null, id: data.id, position: data.position };
}

/**
 * Reescribe el orden completo: la foto en el índice 0 del arreglo queda
 * como portada. Se manda la lista entera en vez de foto por foto para
 * que no queden posiciones duplicadas a medio camino.
 */
export async function reorderListingPhotos(
  listingId: string,
  orderedPhotoIds: string[],
): Promise<PhotoActionResult> {
  const supabase = await createClient();

  const { data: owned, error: ownedError } = await supabase
    .from("listing_photos")
    .select("id")
    .eq("listing_id", listingId);

  if (ownedError) {
    return { error: ownedError.message };
  }

  const ownedIds = new Set((owned ?? []).map((p) => p.id));
  if (
    orderedPhotoIds.length !== ownedIds.size ||
    !orderedPhotoIds.every((id) => ownedIds.has(id))
  ) {
    return { error: "La lista de fotos no coincide con este predio." };
  }

  for (let i = 0; i < orderedPhotoIds.length; i++) {
    const { error } = await supabase
      .from("listing_photos")
      .update({ position: i })
      .eq("id", orderedPhotoIds[i])
      .eq("listing_id", listingId);

    if (error) {
      return { error: `No se pudo guardar el orden: ${error.message}` };
    }
  }

  revalidatePath(`/publicar/predio/${listingId}`);
  revalidatePath(`/propiedades/${listingId}`);
  return { error: null };
}

/**
 * Borra el archivo de Storage y su fila. Después compacta las
 * posiciones restantes para que no queden huecos y la portada siga
 * siendo la position 0.
 */
export async function deleteListingPhoto(
  listingId: string,
  photoId: string,
): Promise<PhotoActionResult> {
  const supabase = await createClient();

  const { data: photo, error: findError } = await supabase
    .from("listing_photos")
    .select("id, storage_path")
    .eq("id", photoId)
    .eq("listing_id", listingId)
    .single();

  if (findError || !photo) {
    return { error: "No se encontró esa foto." };
  }

  const { error: storageError } = await supabase.storage
    .from("listing-photos")
    .remove([photo.storage_path]);

  if (storageError) {
    return { error: `No se pudo borrar el archivo: ${storageError.message}` };
  }

  const { error: rowError } = await supabase
    .from("listing_photos")
    .delete()
    .eq("id", photoId)
    .eq("listing_id", listingId);

  if (rowError) {
    return { error: `No se pudo borrar la foto: ${rowError.message}` };
  }

  const { data: remaining } = await supabase
    .from("listing_photos")
    .select("id")
    .eq("listing_id", listingId)
    .order("position", { ascending: true });

  for (let i = 0; i < (remaining ?? []).length; i++) {
    await supabase
      .from("listing_photos")
      .update({ position: i })
      .eq("id", remaining![i].id);
  }

  revalidatePath(`/publicar/predio/${listingId}`);
  revalidatePath(`/propiedades/${listingId}`);
  return { error: null };
}
