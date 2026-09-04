"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface UpdateProfileState {
  error: string | null;
  success: boolean;
}

const initialState: UpdateProfileState = { error: null, success: false };

export async function updateProfile(
  _prevState: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado.", success: false };
  }

  const fullName = (formData.get("fullName") as string)?.trim();
  const phoneRaw = (formData.get("phone") as string)?.trim();

  if (!fullName) {
    return { error: "El nombre no puede quedar vacío.", success: false };
  }

  // El teléfono se usa para contacto real con compradores — solo
  // dígitos, sin espacios/guiones/paréntesis, y un largo razonable.
  if (phoneRaw && !/^\d{7,15}$/.test(phoneRaw)) {
    return {
      error: "El teléfono debe tener solo dígitos (7 a 15 números).",
      success: false,
    };
  }

  const { data: current } = await supabase
    .from("users")
    .select("phone, phone_verified")
    .eq("id", user.id)
    .single();

  // Si el teléfono cambia, la verificación anterior ya no aplica —
  // verificar el número viejo no debe contar para el nuevo.
  const phoneChanged = (current?.phone ?? null) !== (phoneRaw || null);

  const { error } = await supabase
    .from("users")
    .update({
      full_name: fullName,
      phone: phoneRaw || null,
      ...(phoneChanged && current?.phone_verified
        ? { phone_verified: false, phone_verified_at: null }
        : {}),
    })
    .eq("id", user.id);

  if (error) {
    console.error("Error al actualizar perfil:", { userId: user.id, error });
    return {
      error: `No se pudo guardar: ${error.message}`,
      success: false,
    };
  }

  // full_name también se muestra en el Navbar (parte del layout raíz),
  // no solo en /perfil.
  revalidatePath("/", "layout");

  return { error: null, success: true };
}
