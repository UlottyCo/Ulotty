"use client";

import { useState, useTransition } from "react";
import { revealBuyerPhone } from "@/app/actions/leads";

interface LeadContactProps {
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  maskedPhone: string | null;
  contactedAt: string;
}

export function LeadContact({
  buyerId,
  buyerName,
  buyerEmail,
  maskedPhone,
  contactedAt,
}: LeadContactProps) {
  const [revealedPhone, setRevealedPhone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleReveal() {
    setError(null);
    startTransition(async () => {
      const result = await revealBuyerPhone(buyerId);
      if (result.error) {
        setError(result.error);
        return;
      }
      setRevealedPhone(result.phone ?? "(sin teléfono registrado)");
    });
  }

  return (
    <div className="border-t border-black/10 py-2 text-sm first:border-t-0 dark:border-white/10">
      <p className="font-medium">{buyerName}</p>
      <p className="text-black/60 dark:text-white/60">{buyerEmail}</p>

      <div className="mt-1 flex items-center gap-2">
        {maskedPhone === null ? (
          <span className="text-black/40 dark:text-white/40">
            Sin teléfono registrado
          </span>
        ) : revealedPhone ? (
          <span>{revealedPhone}</span>
        ) : (
          <>
            <span className="text-black/60 dark:text-white/60">
              {maskedPhone}
            </span>
            <button
              type="button"
              onClick={handleReveal}
              disabled={pending}
              className="text-xs underline disabled:opacity-50"
            >
              {pending ? "Cargando..." : "Ver teléfono completo"}
            </button>
          </>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}

      <p className="mt-1 text-xs text-black/40 dark:text-white/40">
        Contactó el {new Date(contactedAt).toLocaleString("es-MX")}
      </p>
    </div>
  );
}
