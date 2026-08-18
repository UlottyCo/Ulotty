"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  updateListingStatus,
  type UpdateListingStatusState,
} from "@/app/actions/listing-status";
import { LeadContact } from "./lead-contact";

const STATUS_LABELS: Record<string, string> = {
  borrador: "Borrador",
  disponible: "Disponible",
  apartado: "Apartado",
  vendido: "Vendido",
  vendido_fuera: "Vendido fuera de la plataforma",
};

const VERIFICACION_LABELS: Record<string, string> = {
  sin_enviar: "Sin enviar",
  pendiente: "En revisión",
  rechazado: "Rechazado",
  aprobado: "Aprobado",
};

const MOTIVOS_VENDIDO_FUERA = [
  "Vendido en la plataforma",
  "Vendido por fuera",
  "Ya no disponible",
  "Otro",
];

const initialState: UpdateListingStatusState = { error: null };

interface OwnerListingContact {
  leadId: string;
  contactedAt: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  maskedPhone: string | null;
}

interface OwnerListingRowProps {
  listingId: string;
  folio: string | null;
  type: string | null;
  zoneTitle: string;
  zone: string;
  priceMxn: number | null;
  status: string;
  verificacion: "sin_enviar" | "pendiente" | "rechazado" | "aprobado";
  contacts: OwnerListingContact[];
}

export function OwnerListingRow({
  listingId,
  folio,
  type,
  zoneTitle,
  zone,
  priceMxn,
  status,
  verificacion,
  contacts,
}: OwnerListingRowProps) {
  const action = updateListingStatus.bind(null, listingId);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [selectedStatus, setSelectedStatus] = useState(status);

  const isBorrador = status === "borrador";

  return (
    <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium">
            {folio ?? "(sin folio)"} {type ? `· ${type}` : ""} — {zoneTitle}
          </p>
          <p className="text-sm text-black/60 dark:text-white/60">{zone}</p>
          {priceMxn !== null && (
            <p className="text-sm text-black/60 dark:text-white/60">
              {new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
                maximumFractionDigits: 0,
              }).format(priceMxn)}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 text-xs">
          <span className="rounded-full bg-black/5 px-2 py-1 dark:bg-white/10">
            {STATUS_LABELS[status] ?? status}
          </span>
          {!isBorrador && (
            <span className="rounded-full bg-black/5 px-2 py-1 dark:bg-white/10">
              Verificación: {VERIFICACION_LABELS[verificacion]}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={`/publicar/predio/${listingId}`}
          className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10"
        >
          {isBorrador ? "Completar" : "Editar"}
        </Link>
        {!isBorrador && verificacion !== "aprobado" && (
          <Link
            href={`/publicar/predio/${listingId}/verificar`}
            className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10"
          >
            Verificación
          </Link>
        )}
      </div>

      {!isBorrador && (
        <form
          action={formAction}
          className="mt-4 flex flex-wrap items-end gap-2"
        >
          <div>
            <label className="block text-xs text-black/60 dark:text-white/60">
              Cambiar estatus
            </label>
            <select
              name="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="mt-1 rounded-md border border-black/10 px-2 py-2 text-sm dark:border-white/10 dark:bg-transparent"
            >
              <option value="disponible">Disponible</option>
              <option value="apartado">Apartado</option>
              <option value="vendido">Vendido</option>
              <option value="vendido_fuera">
                Vendido fuera de la plataforma
              </option>
            </select>
          </div>

          {selectedStatus === "vendido_fuera" && (
            <div>
              <label className="block text-xs text-black/60 dark:text-white/60">
                Motivo (obligatorio)
              </label>
              <select
                name="reason"
                required
                defaultValue=""
                className="mt-1 rounded-md border border-black/10 px-2 py-2 text-sm dark:border-white/10 dark:bg-transparent"
              >
                <option value="" disabled>
                  Elige un motivo
                </option>
                {MOTIVOS_VENDIDO_FUERA.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={pending || selectedStatus === status}
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-black"
          >
            {pending ? "Guardando..." : "Guardar"}
          </button>
        </form>
      )}

      {state.error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      {!isBorrador && (
        <details className="mt-4 rounded-md border border-black/10 px-3 py-2 dark:border-white/10">
          <summary className="cursor-pointer text-sm font-medium">
            Contactos ({contacts.length})
          </summary>
          {contacts.length === 0 ? (
            <p className="mt-2 text-sm text-black/40 dark:text-white/40">
              Nadie te ha contactado por este predio todavía.
            </p>
          ) : (
            <div className="mt-2">
              {contacts.map((contact) => (
                <LeadContact
                  key={contact.leadId}
                  buyerId={contact.buyerId}
                  buyerName={contact.buyerName}
                  buyerEmail={contact.buyerEmail}
                  maskedPhone={contact.maskedPhone}
                  contactedAt={contact.contactedAt}
                />
              ))}
            </div>
          )}
        </details>
      )}
    </div>
  );
}
