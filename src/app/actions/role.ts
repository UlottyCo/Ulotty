"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SetInitialRoleState {
  error: string | null;
}

export async function setInitialRole(
  next: string,
  _prevState: SetInitialRoleState,
  formData: FormData,
): Promise<SetInitialRoleState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = formData.get("role") as string;
  if (!["particular", "desarrolladora", "agente", "comprador"].includes(role)) {
    return { error: "Elige cómo vas a usar Ulotty." };
  }

  const { error } = await supabase.rpc("set_initial_role", { p_role: role });

  if (error) {
    console.error("Error al asignar rol inicial:", { userId: user.id, error });
    return { error: "No se pudo guardar. Intenta de nuevo." };
  }

  revalidatePath("/", "layout");
  redirect(next || "/");
}
