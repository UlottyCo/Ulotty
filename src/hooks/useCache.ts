"use client";

import { useEffect, useState, useCallback } from "react";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const isCacheValid = useCallback(() => {
    const entry = cache.get(key);
    if (!entry) return false;
    return Date.now() - entry.timestamp < ttl;
  }, [key, ttl]);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      if (isCacheValid()) {
        const cachedEntry = cache.get(key);
        if (cachedEntry) {
          setData(cachedEntry.data);
          setLoading(false);
          return;
        }
      }

      // Fetch new data
      const result = await fetcher();
      cache.set(key, {
        data: result,
        timestamp: Date.now(),
      });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, isCacheValid]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refetch = useCallback(async () => {
    cache.delete(key);
    await fetch();
  }, [key, fetch]);

  return { data, loading, error, refetch };
}
