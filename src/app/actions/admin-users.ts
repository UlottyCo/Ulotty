"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ChangeUserRoleState {
  error: string | null;
}

export async function changeUserRole(
  _prevState: ChangeUserRoleState,
  formData: FormData,
): Promise<ChangeUserRoleState> {
  const supabase = await createClient();
  const userId = formData.get("userId") as string;
  const newRole = formData.get("newRole") as string;

  if (
    !["particular", "desarrolladora", "agente", "comprador"].includes(newRole)
  ) {
    return { error: "Elige un rol válido." };
  }

  const { error } = await supabase.rpc("admin_change_user_role", {
    p_user_id: userId,
    p_new_role: newRole,
  });

  if (error) {
    console.error("Error al cambiar rol de usuario:", {
      userId,
      newRole,
      error,
    });
    return { error: error.message };
  }

  revalidatePath("/panel/admin");
  return { error: null };
}
