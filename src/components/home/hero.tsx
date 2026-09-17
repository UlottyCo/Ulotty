import { PillSearchForm } from "@/components/search/pill-search-form";

export function Hero() {
  return (
    <div className="bg-gradient-to-b from-accent/30 to-background px-4 py-16 text-center">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">
          Encuentra tu lugar en Baja California
        </h1>
        <p className="mt-2 text-muted">
          Casas, terrenos y departamentos en las mejores zonas.
        </p>

        <div className="mt-8 text-left">
          <PillSearchForm />
        </div>
      </div>
    </div>
  );
}
