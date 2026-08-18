"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// El ícono default de Leaflet no carga bien con bundlers como
// Next.js/Turbopack (busca las imágenes en una ruta que no existe en el
// build). Lo apuntamos a un CDN para evitar ese problema conocido.
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Rosarito, B.C. — centro por default cuando el predio todavía no tiene
// ubicación marcada.
const DEFAULT_CENTER: [number, number] = [32.3639, -117.0678];

function ClickHandler({
  onChange,
}: {
  onChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface LocationPickerProps {
  latitude: number | null;
  longitude: number | null;
  onChange: (lat: number, lng: number) => void;
}

export function LocationPicker({
  latitude,
  longitude,
  onChange,
}: LocationPickerProps) {
  const hasPosition = latitude !== null && longitude !== null;
  const center: [number, number] = hasPosition
    ? [latitude, longitude]
    : DEFAULT_CENTER;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "300px", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hasPosition && (
        <Marker position={[latitude, longitude]} icon={markerIcon} />
      )}
      <ClickHandler onChange={onChange} />
    </MapContainer>
  );
}
