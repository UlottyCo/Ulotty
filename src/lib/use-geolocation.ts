'use client';

import { useState, useCallback } from 'react';
import { GeolocationService, Coordinates, Location } from './geolocation';

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPosition = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = await GeolocationService.getCurrentPosition();
      setCoordinates(coords);
      return coords;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Geolocation error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reverseGeocode = useCallback(
    async (coords?: Coordinates): Promise<Location | null> => {
      setLoading(true);
      setError(null);
      try {
        const targetCoords = coords || coordinates;
        if (!targetCoords) {
          throw new Error('No coordinates available');
        }
        const location = await GeolocationService.reverseGeocode(targetCoords);
        return location;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Reverse geocoding error';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [coordinates]
  );

  const geocode = useCallback(async (address: string): Promise<Coordinates | null> => {
    setLoading(true);
    setError(null);
    try {
      const coords = await GeolocationService.geocode(address);
      if (coords) {
        setCoordinates(coords);
      }
      return coords;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Geocoding error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    coordinates,
    loading,
    error,
    getPosition,
    reverseGeocode,
    geocode,
  };
}
