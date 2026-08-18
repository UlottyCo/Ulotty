"use client";

import { useActionState, useState, type MouseEvent } from "react";
import {
  approveListingVerification,
  rejectListingVerification,
  type ReviewVerificationState,
} from "@/app/actions/admin-verifications";

const initialState: ReviewVerificationState = { error: null };

interface VerificationDocument {
  id: string;
  signedUrl: string | null;
}

interface VerificationReviewCardProps {
  listingId: string;
  folio: string | null;
  type: string | null;
  zoneTitle: string;
  zone: string;
  ownerName: string;
  ownerEmail: string;
  submittedAt: string;
  documents: VerificationDocument[];
}

export function VerificationReviewCard({
  listingId,
  folio,
  type,
  zoneTitle,
  zone,
  ownerName,
  ownerEmail,
  submittedAt,
  documents,
}: VerificationReviewCardProps) {
  const approveAction = approveListingVerification.bind(null, listingId);
  const rejectAction = rejectListingVerification.bind(null, listingId);

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
    <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
      <p className="font-medium">
        {folio ?? "(sin folio)"} · {type ?? "-"} — {zoneTitle}
      </p>
      <p className="text-sm text-black/60 dark:text-white/60">{zone}</p>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        Dueño: {ownerName} ({ownerEmail})
      </p>
      <p className="text-xs text-black/40 dark:text-white/40">
        Enviado: {new Date(submittedAt).toLocaleString("es-MX")}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {documents.map((doc, i) =>
          doc.signedUrl ? (
            <a
              key={doc.id}
              href={doc.signedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-black/10 px-3 py-1 text-xs underline dark:border-white/10"
            >
              Ver documento {i + 1}
            </a>
          ) : (
            <span key={doc.id} className="text-xs text-red-600">
              Documento {i + 1} no disponible
            </span>
          ),
        )}
      </div>

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Motivo de rechazo (solo si vas a rechazar)"
        rows={2}
        className="mt-3 w-full rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
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
            className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-black"
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
