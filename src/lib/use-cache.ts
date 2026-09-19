'use client';

import { useCallback, useState, useEffect } from 'react';
import { globalCache } from './cache';

interface UseCacheOptions {
  ttl?: number; // seconds
  key: string;
}

export function useCache<T>({
  ttl = 300, // 5 minutes default
  key,
}: UseCacheOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const get = useCallback(async (fetcher: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);

    // Try to get from cache first
    const cached = globalCache.get<T>(key);
    if (cached) {
      setData(cached);
      setLoading(false);
      return cached;
    }

    try {
      const freshData = await fetcher();
      globalCache.set(key, freshData, ttl);
      setData(freshData);
      return freshData;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Cache fetch error');
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [key, ttl]);

  const set = useCallback((value: T) => {
    globalCache.set(key, value, ttl);
    setData(value);
  }, [key, ttl]);

  const clear = useCallback(() => {
    globalCache.delete(key);
    setData(null);
  }, [key]);

  return { data, loading, error, get, set, clear };
}
