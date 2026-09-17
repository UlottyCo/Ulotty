import Image from "next/image";
import { PillSearchForm } from "@/components/search/pill-search-form";

export function Hero() {
  return (
    <div className="relative overflow-hidden px-4 py-20 text-center sm:py-28">
      <Image
        src="/images/hero-home.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white">
          Encuentra tu lugar en Baja California
        </h1>
        <p className="mt-2 text-white/80">
          Casas, terrenos y departamentos en las mejores zonas.
        </p>

        <div className="mt-8 text-left">
          <PillSearchForm />
        </div>
      </div>
    </div>
  );
}
