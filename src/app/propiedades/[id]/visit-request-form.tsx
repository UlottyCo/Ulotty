"use client";

import { useActionState, useState } from "react";
import { requestVisit, type RequestVisitState } from "@/app/actions/visits";

const initialState: RequestVisitState = { error: null, success: false };

export function VisitRequestForm({ listingId }: { listingId: string }) {
  const action = requestVisit.bind(null, listingId);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [open, setOpen] = useState(false);

  if (state.success) {
    return (
      <p className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950/40 dark:text-green-400">
        Visita solicitada. El dueño verá tu propuesta y te contactará
        para coordinar.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold dark:border-white/10"
      >
        Agendar visita
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10"
    >
      <div>
        <label
          className="mb-1 block text-sm text-black/60 dark:text-white/60"
          htmlFor="preferredDatetime"
        >
          Fecha y hora propuesta
        </label>
        <input
          id="preferredDatetime"
          name="preferredDatetime"
          type="datetime-local"
          required
          className="w-full rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
        />
      </div>

      <div>
        <label
          className="mb-1 block text-sm text-black/60 dark:text-white/60"
          htmlFor="message"
        >
          Mensaje — opcional
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          placeholder="Ej. prefiero por la tarde"
          className="w-full rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-black px-6 py-2 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-black"
        >
          {pending ? "Enviando..." : "Enviar solicitud"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-black/10 px-4 py-2 text-sm dark:border-white/10"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
