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
        className="rounded-full border border-border px-6 py-3 text-sm font-semibold"
      >
        Agendar visita
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 rounded-lg border border-border p-4"
    >
      <div>
        <label
          className="mb-1 block text-sm text-muted"
          htmlFor="preferredDatetime"
        >
          Fecha y hora propuesta
        </label>
        <input
          id="preferredDatetime"
          name="preferredDatetime"
          type="datetime-local"
          required
          className="w-full rounded-md border border-border px-3 py-2 text-sm dark:bg-transparent"
        />
      </div>

      <div>
        <label
          className="mb-1 block text-sm text-muted"
          htmlFor="message"
        >
          Mensaje — opcional
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          placeholder="Ej. prefiero por la tarde"
          className="w-full rounded-md border border-border px-3 py-2 text-sm dark:bg-transparent"
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
          className="rounded-full bg-brand px-6 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60"
        >
          {pending ? "Enviando..." : "Enviar solicitud"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-border px-4 py-2 text-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
