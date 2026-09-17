import Link from "next/link";

export function SellBanner() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-border bg-subtle p-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold">¿Quieres vender o rentar?</h2>
        <p className="mt-1 text-muted">
          Llega a más personas. Publica tu propiedad en Ulotty.
        </p>
      </div>
      <Link
        href="/publicar"
        className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground"
      >
        Publicar propiedad
      </Link>
    </div>
  );
}
