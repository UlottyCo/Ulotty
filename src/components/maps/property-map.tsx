'use client';

import { useEffect, useRef, useState } from 'react';
import { Coordinates } from '@/lib/geolocation';

interface PropertyMapProps {
  coordinates?: Coordinates;
  address?: string;
  title?: string;
  height?: string;
}

export function PropertyMap({
  coordinates,
  address,
  title = 'Ubicación',
  height = '400px',
}: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coordinates || !mapContainer.current) return;

    setLoading(true);
    setError(null);

    const mapHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="text-align: center; color: white;">
          <div style="font-size: 48px; margin-bottom: 16px;">📍</div>
          <div style="font-size: 18px; font-weight: bold;">${title}</div>
          <div style="font-size: 14px; margin-top: 8px; opacity: 0.9;">
            ${coordinates.latitude.toFixed(4)}°, ${coordinates.longitude.toFixed(4)}°
          </div>
          ${address ? `<div style="font-size: 12px; margin-top: 8px; opacity: 0.8;">${address}</div>` : ''}
          <div style="font-size: 11px; margin-top: 16px; opacity: 0.7;">🗺️ Mapa interactivo (integración con Google Maps/Mapbox disponible)</div>
        </div>
      </div>
    `;

    if (mapContainer.current) {
      mapContainer.current.innerHTML = mapHTML;
      setLoading(false);
    }
  }, [coordinates, title, address]);

  if (!coordinates) {
    return (
      <div
        style={{ height }}
        className="bg-gray-100 rounded-lg flex items-center justify-center"
      >
        <p className="text-gray-500">Sin coordenadas disponibles</p>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      style={{ height }}
      className="rounded-lg overflow-hidden border border-border"
    />
  );
}
