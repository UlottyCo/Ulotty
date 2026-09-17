"use client";

import dynamic from "next/dynamic";

const ListingMap = dynamic(
  () => import("@/components/map/listing-map").then((m) => m.ListingMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[300px] items-center justify-center rounded-lg border border-border text-sm text-muted">
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
