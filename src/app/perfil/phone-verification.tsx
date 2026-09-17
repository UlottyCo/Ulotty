"use client";

import { useActionState } from "react";
import {
  requestPhoneCode,
  confirmPhoneCode,
  type PhoneVerificationState,
} from "@/app/actions/phone-verification";

const initialState: PhoneVerificationState = {
  error: null,
  codeSent: false,
  verified: false,
};

export function PhoneVerification({
  phone,
  phoneVerified,
}: {
  phone: string | null;
  phoneVerified: boolean;
}) {
  const [requestState, requestAction, requestPending] = useActionState(
    requestPhoneCode,
    initialState,
  );
  const [confirmState, confirmAction, confirmPending] = useActionState(
    confirmPhoneCode,
    initialState,
  );

  const verifiedNow = phoneVerified || confirmState.verified;
  const codeSent = requestState.codeSent && !verifiedNow;

  if (verifiedNow) {
    return (
      <div className="rounded-md border border-border p-4 text-sm">
        <p className="font-medium text-green-700 dark:text-green-400">
          Teléfono verificado ✓
        </p>
        <p className="mt-1 text-muted">
          Necesario para contactar dueños y agendar visitas.
        </p>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="rounded-md border border-border p-4 text-sm">
        <p className="font-medium">Teléfono sin verificar</p>
        <p className="mt-1 text-muted">
          Agrega tu teléfono arriba y guarda, luego regresa aquí para
          verificarlo.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border p-4 text-sm">
      <p className="font-medium">Teléfono sin verificar</p>
      <p className="mt-1 text-muted">
        Necesario para contactar dueños y agendar visitas. Te mandamos
        un código por SMS a tu teléfono ({phone}).
      </p>

      {!codeSent ? (
        <form action={requestAction} className="mt-3">
          <button
            type="submit"
            disabled={requestPending}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60"
          >
            {requestPending ? "Enviando..." : "Enviar código por SMS"}
          </button>
        </form>
      ) : (
        <form action={confirmAction} className="mt-3 flex flex-wrap items-end gap-2">
          <div>
            <label
              className="mb-1 block text-xs text-muted"
              htmlFor="code"
            >
              Código de 6 dígitos
            </label>
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              className="w-32 rounded-md border border-border px-3 py-2 text-sm dark:bg-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={confirmPending}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60"
          >
            {confirmPending ? "Verificando..." : "Confirmar código"}
          </button>
        </form>
      )}

      {requestState.error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {requestState.error}
        </p>
      )}
      {confirmState.error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {confirmState.error}
        </p>
      )}
    </div>
  );
}
