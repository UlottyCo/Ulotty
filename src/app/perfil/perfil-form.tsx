"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  updateProfile,
  type UpdateProfileState,
} from "@/app/actions/profile";

const ROLE_LABELS: Record<string, string> = {
  particular: "Particular",
  desarrolladora: "Desarrolladora",
  agente: "Agente",
  comprador: "Comprador",
  admin: "Admin",
};

const initialState: UpdateProfileState = { error: null, success: false };

interface PerfilFormProps {
  fullName: string;
  email: string;
  phone: string | null;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export function PerfilForm({
  fullName,
  email,
  phone,
  role,
  isVerified,
  createdAt,
}: PerfilFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );
  const [phoneValue, setPhoneValue] = useState(phone ?? "");

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <div>
        <label
          className="mb-1 block text-sm text-muted"
          htmlFor="fullName"
        >
          Nombre completo
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          defaultValue={fullName}
          className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
        />
      </div>

      <div>
        <label
          className="mb-1 block text-sm text-muted"
          htmlFor="email"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          disabled
          className="w-full rounded-md border border-border bg-subtle px-3 py-2 text-muted"
        />
        <p className="mt-1 text-xs text-muted">
          No se puede cambiar desde aquí todavía.
        </p>
      </div>

      <div>
        <label
          className="mb-1 block text-sm text-muted"
          htmlFor="phone"
        >
          Teléfono / WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          maxLength={15}
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value.replace(/\D/g, ""))}
          placeholder="Solo dígitos, ej. 6641234567"
          className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted">Rol</p>
          <p className="mt-1 font-medium">{ROLE_LABELS[role] ?? role}</p>
        </div>
        <div>
          <p className="text-muted">
            Identidad verificada
          </p>
          <p className="mt-1 font-medium">{isVerified ? "Sí" : "No"}</p>
        </div>
        <div className="col-span-2">
          <p className="text-muted">Miembro desde</p>
          <p className="mt-1 font-medium">
            {new Date(createdAt).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <Link
        href={`/login?mode=forgot&email=${encodeURIComponent(email)}`}
        className="self-start text-sm underline text-muted"
      >
        Cambiar contraseña
      </Link>

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-700 dark:text-green-400">
          Cambios guardados.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-brand py-3 text-sm font-semibold text-brand-foreground disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
