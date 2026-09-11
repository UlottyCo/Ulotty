"use client";

import { useActionState } from "react";
import {
  markPenaltyCollected,
  type MarkPenaltyState,
} from "@/app/actions/admin-penalties";

const STATUS_LABELS: Record<string, string> = {
  disponible: "Disponible",
  apartado: "Apartado",
  vendido: "Vendido",
  vendido_fuera: "Vendido fuera de la plataforma",
};

const initialState: MarkPenaltyState = { error: null };

export interface AdminListingRow {
  id: string;
  folio: string | null;
  status: string;
  priceMxn: number | null;
  zoneTitle: string;
  zone: string;
  ownerName: string;
  commissionRatePct: number | null;
  commissionAmountMxn: number | null;
  penaltyHistoryId: string | null;
  penaltyAmountMxn: number | null;
  penaltyStatus: "pendiente" | "cobrado" | null;
}

function formatMxn(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

function PenaltyCell({
  historyId,
  amount,
  status,
}: {
  historyId: string;
  amount: number;
  status: "pendiente" | "cobrado";
}) {
  const action = markPenaltyCollected.bind(null, historyId);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="flex flex-col gap-1">
      <span
        className={
          status === "pendiente"
            ? "text-red-600 dark:text-red-400"
            : "text-muted"
        }
      >
        {formatMxn(amount)} ({status === "pendiente" ? "pendiente" : "cobrado"})
      </span>
      {status === "pendiente" && (
        <form action={formAction}>
          <button
            type="submit"
            disabled={pending}
            className="text-xs underline disabled:opacity-50"
          >
            {pending ? "Guardando..." : "Marcar como cobrada"}
          </button>
        </form>
      )}
      {state.error && (
        <span className="text-xs text-red-600 dark:text-red-400">
          {state.error}
        </span>
      )}
    </div>
  );
}

export function AdminListingsTable({ rows }: { rows: AdminListingRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted">
        No hay predios activos todavía.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted">
            <th className="py-2 pr-4">Folio</th>
            <th className="py-2 pr-4">Dueño</th>
            <th className="py-2 pr-4">Zona</th>
            <th className="py-2 pr-4">Precio</th>
            <th className="py-2 pr-4">Estatus</th>
            <th className="py-2 pr-4">Comisión</th>
            <th className="py-2 pr-4">Penalización</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-border align-top"
            >
              <td className="py-2 pr-4">{row.folio ?? "(sin folio)"}</td>
              <td className="py-2 pr-4">{row.ownerName}</td>
              <td className="py-2 pr-4">
                {row.zoneTitle} — {row.zone}
              </td>
              <td className="py-2 pr-4">{formatMxn(row.priceMxn)}</td>
              <td className="py-2 pr-4">
                {STATUS_LABELS[row.status] ?? row.status}
              </td>
              <td className="py-2 pr-4">
                {row.commissionRatePct !== null
                  ? `${row.commissionRatePct}% (${formatMxn(row.commissionAmountMxn)})`
                  : "Sin definir"}
              </td>
              <td className="py-2 pr-4">
                {row.penaltyHistoryId &&
                row.penaltyAmountMxn !== null &&
                row.penaltyStatus ? (
                  <PenaltyCell
                    historyId={row.penaltyHistoryId}
                    amount={row.penaltyAmountMxn}
                    status={row.penaltyStatus}
                  />
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
