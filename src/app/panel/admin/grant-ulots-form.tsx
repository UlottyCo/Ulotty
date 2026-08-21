"use client";

import { useActionState } from "react";
import { grantUlots, type GrantUlotsState } from "@/app/actions/ulots";

const initialState: GrantUlotsState = { error: null };

export interface UlotOwnerRow {
  id: string;
  fullName: string;
  email: string;
  balance: number;
}

function GrantRow({ owner }: { owner: UlotOwnerRow }) {
  const [state, formAction, pending] = useActionState(
    grantUlots,
    initialState,
  );

  return (
    <tr className="border-b border-black/5 align-top dark:border-white/5">
      <td className="py-2 pr-4">
        {owner.fullName}
        <p className="text-xs text-black/40 dark:text-white/40">
          {owner.email}
        </p>
      </td>
      <td className="py-2 pr-4 font-medium">{owner.balance}</td>
      <td className="py-2 pr-4">
        <form action={formAction} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="userId" value={owner.id} />
          <input
            type="number"
            name="amount"
            placeholder="Cantidad"
            required
            className="w-24 rounded-md border border-black/10 px-2 py-1 text-sm dark:border-white/10 dark:bg-transparent"
          />
          <input
            type="text"
            name="reason"
            placeholder="Motivo (opcional)"
            className="w-40 rounded-md border border-black/10 px-2 py-1 text-sm dark:border-white/10 dark:bg-transparent"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-black px-3 py-1 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {pending ? "..." : "Asignar"}
          </button>
        </form>
        {state.error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {state.error}
          </p>
        )}
      </td>
    </tr>
  );
}

export function GrantUlotsTable({ owners }: { owners: UlotOwnerRow[] }) {
  if (owners.length === 0) {
    return (
      <p className="text-sm text-black/60 dark:text-white/60">
        No hay dueños particulares/agentes registrados todavía.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 text-xs text-black/60 dark:border-white/10 dark:text-white/60">
            <th className="py-2 pr-4">Dueño</th>
            <th className="py-2 pr-4">Saldo</th>
            <th className="py-2 pr-4">Asignar Ulots (positivo o negativo)</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <GrantRow key={owner.id} owner={owner} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
