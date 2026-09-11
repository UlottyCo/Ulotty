import { PillSearchForm } from "@/components/search/pill-search-form";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold">
        Encuentra tu lugar en Baja California
      </h1>

      <div className="mt-8 text-left">
        <PillSearchForm />
      </div>
    </div>
  );
}
