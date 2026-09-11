"use client";

import { useActionState, useState } from "react";
import { setInitialRole, type SetInitialRoleState } from "@/app/actions/role";
import type { UserRole } from "@/types";

const ROLE_OPTIONS: { value: UserRole; label: string; description: string }[] = [
  {
    value: "comprador",
    label: "Comprador",
    description: "Busco predios, casas o departamentos",
  },
  {
    value: "particular",
    label: "Particular",
    description: "Tengo una propiedad propia para vender o rentar",
  },
  {
    value: "agente",
    label: "Agente",
    description: "Represento propiedades de otros como intermediario",
  },
  {
    value: "desarrolladora",
    label: "Desarrolladora",
    description: "Administro un fraccionamiento con varios lotes",
  },
];

const initialState: SetInitialRoleState = { error: null };

export function RoleForm({ next }: { next: string }) {
  const action = setInitialRole.bind(null, next);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [role, setRole] = useState<UserRole | null>(null);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-3">
      <input type="hidden" name="role" value={role ?? ""} />

      {ROLE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setRole(option.value)}
          className={`flex flex-col items-start rounded-lg border px-4 py-3 text-left transition ${
            role === option.value
              ? "border-black dark:border-white"
              : "border-black/10 dark:border-white/10"
          }`}
        >
          <span className="text-sm font-semibold">{option.label}</span>
          <span className="text-xs text-black/60 dark:text-white/60">
            {option.description}
          </span>
        </button>
      ))}

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending || !role}
        className="mt-2 rounded-full bg-black py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-black"
      >
        {pending ? "Guardando..." : "Continuar"}
      </button>
    </form>
  );
}
