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
      <p className="mt-2 text-black/60 dark:text-white/60">
        No se pudo guardar el predio. Intenta de nuevo — si sigue
        fallando, revisa que tus fotos no pesen más de 5MB.
      </p>
      {error.message && (
        <p className="mt-4 rounded-md bg-black/5 p-3 text-xs text-black/50 dark:bg-white/5 dark:text-white/50">
          {error.message}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
      >
        Reintentar
      </button>
    </div>
  );
}
