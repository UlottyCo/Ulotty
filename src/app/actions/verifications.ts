"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SubmitVerificationState {
  error: string | null;
}

export async function submitVerification(
  listingId: string,
  _prevState: SubmitVerificationState,
  formData: FormData,
): Promise<SubmitVerificationState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const documents = formData
    .getAll("documents")
    .filter(
      (entry): entry is File => entry instanceof File && entry.size > 0,
    );

  if (documents.length === 0) {
    return { error: "Sube al menos un documento." };
  }

  let uploadedCount = 0;

  for (const file of documents) {
    const ext = file.name.split(".").pop() || "pdf";
    const path = `${listingId}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("verification-documents")
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      console.error("Error al subir documento de verificación:", {
        listingId,
        fileName: file.name,
        uploadError,
      });
      continue;
    }

    const { error: insertError } = await supabase
      .from("verifications")
      .insert({ listing_id: listingId, document_path: path });

    if (insertError) {
      console.error("Error al crear fila en verifications:", {
        listingId,
        path,
        insertError,
      });
      continue;
    }

    uploadedCount++;
  }

  if (uploadedCount === 0) {
    return {
      error:
        "No se pudo subir ningún documento (¿este predio es tuyo?). Intenta de nuevo.",
    };
  }

  revalidatePath(`/publicar/predio/${listingId}/verificar`);
  redirect(`/publicar/predio/${listingId}/verificar`);
}
