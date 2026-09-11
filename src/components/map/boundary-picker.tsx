"use client";

import { MapContainer, TileLayer, Polygon, CircleMarker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mismo centro por default que LocationPicker, para que ambos mapas de
// esta pantalla arranquen viendo el mismo lugar cuando el predio
// todavía no tiene nada marcado.
const DEFAULT_CENTER: [number, number] = [32.3639, -117.0678];

function ClickHandler({ onAddPoint }: { onAddPoint: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onAddPoint(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface BoundaryPickerProps {
  points: [number, number][];
  center: [number, number] | null;
  onChange: (points: [number, number][]) => void;
}

export function BoundaryPicker({ points, center, onChange }: BoundaryPickerProps) {
  function handleAddPoint(lat: number, lng: number) {
    onChange([...points, [lat, lng]]);
  }

  function handleUndo() {
    onChange(points.slice(0, -1));
  }

  function handleClear() {
    onChange([]);
  }

  return (
    <div>
      <MapContainer
        center={center ?? DEFAULT_CENTER}
        zoom={16}
        style={{ height: "300px", width: "100%", borderRadius: "0.5rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point, i) => (
          <CircleMarker
            key={i}
            center={point}
            radius={5}
            pathOptions={{ color: "#dc2626", fillColor: "#dc2626", fillOpacity: 1 }}
          />
        ))}
        {points.length >= 3 && (
          <Polygon
            positions={points}
            pathOptions={{ color: "#dc2626", fillOpacity: 0.15 }}
          />
        )}
        <ClickHandler onAddPoint={handleAddPoint} />
      </MapContainer>

      <div className="mt-2 flex items-center gap-3">
        <p className="text-xs text-black/40 dark:text-white/40">
          {points.length === 0
            ? "Sin puntos todavía"
            : `${points.length} punto${points.length === 1 ? "" : "s"}${
                points.length < 3 ? " (mínimo 3)" : ""
              }`}
        </p>
        <button
          type="button"
          onClick={handleUndo}
          disabled={points.length === 0}
          className="rounded-md border border-black/10 px-2 py-1 text-xs disabled:opacity-40 dark:border-white/10"
        >
          Deshacer último punto
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={points.length === 0}
          className="rounded-md border border-black/10 px-2 py-1 text-xs disabled:opacity-40 dark:border-white/10"
        >
          Borrar perímetro
        </button>
      </div>
    </div>
  );
}
