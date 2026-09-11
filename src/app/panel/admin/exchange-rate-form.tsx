"use client";

import { useActionState } from "react";
import {
  setDailyExchangeRate,
  type SetExchangeRateState,
} from "@/app/actions/admin-settings";

const initialState: SetExchangeRateState = { error: null };

interface ExchangeRateFormProps {
  currentRate: number | null;
  setAt: string | null;
}

export function ExchangeRateForm({
  currentRate,
  setAt,
}: ExchangeRateFormProps) {
  const [state, formAction, pending] = useActionState(
    setDailyExchangeRate,
    initialState,
  );

  return (
    <div className="rounded-lg border border-border p-4">
      <h2 className="font-semibold">Tipo de cambio de hoy</h2>
      <p className="mt-1 text-sm text-muted">
        {currentRate !== null
          ? `Actual: $${currentRate.toFixed(4)} MXN (actualizado ${new Date(setAt!).toLocaleString("es-MX")})`
          : "Todavía no se ha registrado ninguno."}
      </p>
      <p className="mt-1 text-xs text-muted">
        A los dueños se les sugiere este valor menos $0.30 MXN al
        publicar — lo pueden sobreescribir libremente.
      </p>

      <form action={formAction} className="mt-3 flex items-end gap-2">
        <div>
          <label
            className="mb-1 block text-xs text-muted"
            htmlFor="rate"
          >
            Nuevo tipo de cambio (MXN por USD)
          </label>
          <input
            id="rate"
            name="rate"
            type="number"
            min={0}
            step="0.0001"
            required
            className="w-40 rounded-md border border-border px-3 py-2 text-sm dark:bg-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60"
        >
          {pending ? "Guardando..." : "Actualizar"}
        </button>
      </form>

      {state.error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
    </div>
  );
}
