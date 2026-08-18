"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import {
  submitVerification,
  type SubmitVerificationState,
} from "@/app/actions/verifications";

const initialState: SubmitVerificationState = { error: null };
const MAX_DOC_BYTES = 10 * 1024 * 1024; // igual al límite del bucket

export function VerificacionForm({ listingId }: { listingId: string }) {
  const action = submitVerification.bind(null, listingId);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const tooBig = files.find((f) => f.size > MAX_DOC_BYTES);
    setFileError(
      tooBig
        ? `"${tooBig.name}" pesa demasiado (máximo 10MB por archivo).`
        : null,
    );
  }

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <div>
        <label
          className="mb-1 block text-sm text-black/60 dark:text-white/60"
          htmlFor="documents"
        >
          Documento(s) de propiedad
        </label>
        <input
          id="documents"
          name="documents"
          type="file"
          accept="application/pdf,image/jpeg,image/png"
          multiple
          required
          onChange={handleFilesChange}
          className="w-full rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
        />
        <p className="mt-1 text-xs text-black/40 dark:text-white/40">
          PDF, JPG o PNG. Máximo 10MB por archivo. Puedes subir varios
          (ej. escritura + identificación).
        </p>
      </div>

      {fileError && (
        <p className="text-sm text-red-600 dark:text-red-400">{fileError}</p>
      )}

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !!fileError}
        className="mt-2 rounded-full bg-black py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-black"
      >
        {pending ? "Enviando..." : "Enviar para revisión"}
      </button>
    </form>
  );
}
