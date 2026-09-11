"use client";

import { useActionState, useState, type MouseEvent } from "react";
import {
  approveBuyerIdVerification,
  rejectBuyerIdVerification,
  type ReviewBuyerVerificationState,
} from "@/app/actions/admin-buyer-verifications";

const initialState: ReviewBuyerVerificationState = { error: null };

interface BuyerVerificationReviewCardProps {
  verificationId: string;
  buyerName: string;
  buyerEmail: string;
  submittedAt: string;
  signedUrl: string | null;
}

export function BuyerVerificationReviewCard({
  verificationId,
  buyerName,
  buyerEmail,
  submittedAt,
  signedUrl,
}: BuyerVerificationReviewCardProps) {
  const approveAction = approveBuyerIdVerification.bind(null, verificationId);
  const rejectAction = rejectBuyerIdVerification.bind(null, verificationId);

  const [approveState, approveFormAction, approvePending] = useActionState(
    approveAction,
    initialState,
  );
  const [rejectState, rejectFormAction, rejectPending] = useActionState(
    rejectAction,
    initialState,
  );

  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);

  function handleRejectClick(e: MouseEvent<HTMLButtonElement>) {
    if (!reason.trim()) {
      e.preventDefault();
      setReasonError("Escribe un motivo antes de rechazar.");
      return;
    }
    setReasonError(null);
  }

  const pending = approvePending || rejectPending;

  return (
    <div className="rounded-lg border border-border p-4">
      <p className="font-medium">
        {buyerName} ({buyerEmail})
      </p>
      <p className="text-xs text-muted">
        Enviado: {new Date(submittedAt).toLocaleString("es-MX")}
      </p>

      <div className="mt-3">
        {signedUrl ? (
          <a
            href={signedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-3 py-1 text-xs underline"
          >
            Ver documento
          </a>
        ) : (
          <span className="text-xs text-red-600">Documento no disponible</span>
        )}
      </div>

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Motivo de rechazo (solo si vas a rechazar)"
        rows={2}
        className="mt-3 w-full rounded-md border border-border px-3 py-2 text-sm dark:bg-transparent"
      />

      {reasonError && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {reasonError}
        </p>
      )}
      {approveState.error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {approveState.error}
        </p>
      )}
      {rejectState.error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {rejectState.error}
        </p>
      )}

      <div className="mt-3 flex gap-2">
        <form action={approveFormAction}>
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60"
          >
            {approvePending ? "Aprobando..." : "Aprobar"}
          </button>
        </form>
        <form action={rejectFormAction}>
          <input type="hidden" name="reason" value={reason} />
          <button
            type="submit"
            onClick={handleRejectClick}
            disabled={pending}
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-60 dark:border-red-900 dark:text-red-400"
          >
            {rejectPending ? "Rechazando..." : "Rechazar"}
          </button>
        </form>
      </div>
    </div>
  );
}
