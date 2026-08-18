"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface CreateListingGroupState {
  error: string | null;
}

export async function createListingGroup(
  _prevState: CreateListingGroupState,
  formData: FormData,
): Promise<CreateListingGroupState> {
  const title = (formData.get("title") as string)?.trim();
  const zone = (formData.get("zone") as string)?.trim();
  const declaredLotsTotal = Number(formData.get("declaredLotsTotal"));

  if (!title || !zone) {
    return { error: "Completa el título y la zona." };
  }

  if (
    !Number.isInteger(declaredLotsTotal) ||
    declaredLotsTotal < 1 ||
    declaredLotsTotal > 500
  ) {
    return { error: "El número de predios debe ser un entero entre 1 y 500." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: group, error } = await supabase.rpc(
    "create_listing_group_with_drafts",
    {
      p_title: title,
      p_zone: zone,
      p_declared_lots_total: declaredLotsTotal,
    },
  );

  if (error || !group) {
    return { error: "Ocurrió un error al crear la zona. Intenta de nuevo." };
  }

  revalidatePath("/publicar");
  redirect("/publicar");
}
