"use client";

import { useActionState } from "react";
import {
  createListingGroup,
  type CreateListingGroupState,
} from "@/app/actions/listing-groups";

const initialState: CreateListingGroupState = { error: null };

export function NuevaZonaForm() {
  const [state, formAction, pending] = useActionState(
    createListingGroup,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <div>
        <label
          className="mb-1 block text-sm text-black/60 dark:text-white/60"
          htmlFor="title"
        >
          Título de la zona
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Ej. Fraccionamiento Los Pinos"
          className="w-full rounded-md border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-transparent"
        />
      </div>

      <div>
        <label
          className="mb-1 block text-sm text-black/60 dark:text-white/60"
          htmlFor="zone"
        >
          Ubicación general
        </label>
        <input
          id="zone"
          name="zone"
          type="text"
          required
          placeholder="Ej. Km 38, Rosarito"
          className="w-full rounded-md border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-transparent"
        />
      </div>

      <div>
        <label
          className="mb-1 block text-sm text-black/60 dark:text-white/60"
          htmlFor="declaredLotsTotal"
        >
          ¿Cuántos predios tienes en esta zona?
        </label>
        <input
          id="declaredLotsTotal"
          name="declaredLotsTotal"
          type="number"
          min={1}
          max={500}
          step={1}
          required
          className="w-full rounded-md border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-transparent"
        />
        <p className="mt-1 text-xs text-black/40 dark:text-white/40">
          Vamos a crear un espacio por cada uno — los llenas uno por uno
          a continuación.
        </p>
      </div>

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-black py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-black"
      >
        {pending ? "Creando..." : "Crear zona"}
      </button>
    </form>
  );
}
