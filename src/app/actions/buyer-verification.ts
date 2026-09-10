"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SubmitBuyerIdState {
  error: string | null;
}

export async function submitBuyerIdVerification(
  _prevState: SubmitBuyerIdState,
  formData: FormData,
): Promise<SubmitBuyerIdState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const document = formData.get("document");
  if (!(document instanceof File) || document.size === 0) {
    return { error: "Sube tu identificación oficial." };
  }

  const ext = document.name.split(".").pop() || "pdf";
  const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("buyer-id-documents")
    .upload(path, document, { contentType: document.type });

  if (uploadError) {
    console.error("Error al subir identificación de comprador:", {
      userId: user.id,
      uploadError,
    });
    return { error: `No se pudo subir el archivo: ${uploadError.message}` };
  }

  const { error: insertError } = await supabase
    .from("buyer_id_verifications")
    .insert({ buyer_id: user.id, document_path: path });

  if (insertError) {
    console.error("Error al crear fila en buyer_id_verifications:", {
      userId: user.id,
      insertError,
    });
    return { error: `No se pudo enviar: ${insertError.message}` };
  }

  revalidatePath("/perfil/verificar-identidad");
  redirect("/perfil/verificar-identidad");
}
