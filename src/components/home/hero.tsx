import Image from "next/image";
import { PillSearchForm } from "@/components/search/pill-search-form";

export function Hero() {
  return (
    <div className="relative overflow-hidden px-4 py-10 text-center sm:py-28">
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
        <h1 className="text-2xl font-bold text-white sm:text-4xl">
          Encuentra tu lugar en Baja California
        </h1>
        <p className="mt-2 text-sm text-white/80 sm:text-base">
          Casas, terrenos y departamentos en las mejores zonas.
        </p>

        <div className="mt-4 text-left sm:mt-8">
          <PillSearchForm />
        </div>
      </div>
    </div>
  );
}
