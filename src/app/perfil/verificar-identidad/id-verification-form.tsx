"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import {
  submitBuyerIdVerification,
  type SubmitBuyerIdState,
} from "@/app/actions/buyer-verification";

const initialState: SubmitBuyerIdState = { error: null };
const MAX_DOC_BYTES = 10 * 1024 * 1024;

export function IdVerificationForm() {
  const [state, formAction, pending] = useActionState(
    submitBuyerIdVerification,
    initialState,
  );
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileError(
      file && file.size > MAX_DOC_BYTES
        ? "El archivo pesa demasiado (máximo 10MB)."
        : null,
    );
  }

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <div>
        <label
          className="mb-1 block text-sm text-black/60 dark:text-white/60"
          htmlFor="document"
        >
          Identificación oficial (INE, pasaporte)
        </label>
        <input
          id="document"
          name="document"
          type="file"
          accept="application/pdf,image/jpeg,image/png"
          required
          onChange={handleFileChange}
          className="w-full rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
        />
        <p className="mt-1 text-xs text-black/40 dark:text-white/40">
          PDF, JPG o PNG. Máximo 10MB.
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
