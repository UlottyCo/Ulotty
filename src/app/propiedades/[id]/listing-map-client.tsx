"use client";

import dynamic from "next/dynamic";

const ListingMap = dynamic(
  () => import("@/components/map/listing-map").then((m) => m.ListingMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[300px] items-center justify-center rounded-lg border border-black/10 text-sm text-black/40 dark:border-white/10 dark:text-white/40">
        Cargando mapa...
      </div>
    ),
  },
);

export function ListingMapClient({
  latitude,
  longitude,
  boundaryPoints,
}: {
  latitude: number;
  longitude: number;
  boundaryPoints?: [number, number][] | null;
}) {
  return (
    <ListingMap
      latitude={latitude}
      longitude={longitude}
      boundaryPoints={boundaryPoints}
    />
  );
}
