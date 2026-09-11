"use client";

export default function PredioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold">Algo salió mal</h1>
      <p className="mt-2 text-muted">
        No se pudo guardar el predio. Intenta de nuevo — si sigue
        fallando, revisa que tus fotos no pesen más de 5MB.
      </p>
      {error.message && (
        <p className="mt-4 rounded-md bg-subtle p-3 text-xs text-muted">
          {error.message}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
      >
        Reintentar
      </button>
    </div>
  );
}
