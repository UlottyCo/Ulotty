"use client";

import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface ListingMapProps {
  latitude: number;
  longitude: number;
  boundaryPoints?: [number, number][] | null;
}

// Versión de solo lectura de LocationPicker: sin click handler, solo
// muestra dónde está el predio. Si boundaryPoints viene con datos,
// además dibuja el perímetro — si no, se comporta como siempre
// (predios viejos, sin polígono, no cambian).
export function ListingMap({ latitude, longitude, boundaryPoints }: ListingMapProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={markerIcon} />
      {boundaryPoints && boundaryPoints.length >= 3 && (
        <Polygon
          positions={boundaryPoints}
          pathOptions={{ color: "#dc2626", fillOpacity: 0.15 }}
        />
      )}
    </MapContainer>
  );
}
