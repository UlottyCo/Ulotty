"use client";

import { useActionState, useState } from "react";
import {
  changeUserRole,
  type ChangeUserRoleState,
} from "@/app/actions/admin-users";
import type { UserRole } from "@/types";

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "particular", label: "Particular" },
  { value: "desarrolladora", label: "Desarrolladora" },
  { value: "agente", label: "Agente" },
  { value: "comprador", label: "Comprador" },
];

const ROLE_LABELS: Record<string, string> = Object.fromEntries(
  ROLE_OPTIONS.map((o) => [o.value, o.label]),
);

export interface UserRoleRow {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

const initialState: ChangeUserRoleState = { error: null };

function ChangeRoleRow({ user }: { user: UserRoleRow }) {
  const [state, formAction, pending] = useActionState(
    changeUserRole,
    initialState,
  );
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role);
  const [confirming, setConfirming] = useState(false);

  const changed = selectedRole !== user.role;

  return (
    <tr className="border-b border-black/5 align-top dark:border-white/5">
      <td className="py-2 pr-4">
        {user.fullName}
        <p className="text-xs text-black/40 dark:text-white/40">
          {user.email}
        </p>
      </td>
      <td className="py-2 pr-4">
        <span className="rounded-full bg-black/5 px-2 py-1 text-xs dark:bg-white/10">
          {ROLE_LABELS[user.role] ?? user.role}
        </span>
      </td>
      <td className="py-2 pr-4">
        <form
          action={formAction}
          className="flex flex-wrap items-center gap-2"
        >
          <input type="hidden" name="userId" value={user.id} />
          <input type="hidden" name="newRole" value={selectedRole} />
          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value as UserRole);
              setConfirming(false);
            }}
            className="rounded-md border border-black/10 px-2 py-1 text-sm dark:border-white/10 dark:bg-transparent"
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {!confirming ? (
            <button
              type="button"
              disabled={!changed}
              onClick={() => setConfirming(true)}
              className="rounded-md bg-black px-3 py-1 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-black"
            >
              Guardar
            </button>
          ) : (
            <>
              <span className="text-xs text-black/60 dark:text-white/60">
                ¿Seguro?
              </span>
              <button
                type="submit"
                disabled={pending}
                className="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white disabled:opacity-50"
              >
                {pending ? "..." : "Sí, cambiar"}
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-md border border-black/10 px-3 py-1 text-sm dark:border-white/10"
              >
                Cancelar
              </button>
            </>
          )}
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

export function ChangeRoleTable({ users }: { users: UserRoleRow[] }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nombre o correo..."
        className="mb-3 w-full max-w-xs rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
      />

      {filtered.length === 0 ? (
        <p className="text-sm text-black/60 dark:text-white/60">
          No hay usuarios que coincidan con la búsqueda.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-xs text-black/60 dark:border-white/10 dark:text-white/60">
                <th className="py-2 pr-4">Usuario</th>
                <th className="py-2 pr-4">Rol actual</th>
                <th className="py-2 pr-4">Cambiar a</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <ChangeRoleRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
