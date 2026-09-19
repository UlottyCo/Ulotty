export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl?: number;
}

export type CacheStrategy = 'memory' | 'localstorage' | 'indexeddb';

export class CacheManager {
  private memoryCache: Map<string, CacheEntry<any>> = new Map();
  private strategy: CacheStrategy = 'memory';

  constructor(strategy: CacheStrategy = 'memory') {
    this.strategy = strategy;
  }

  set<T>(key: string, value: T, ttlSeconds?: number): void {
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      ttl: ttlSeconds,
    };

    switch (this.strategy) {
      case 'memory':
        this.memoryCache.set(key, entry);
        break;
      case 'localstorage':
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(entry));
        }
        break;
      case 'indexeddb':
        this.setIndexedDB(key, entry);
        break;
    }
  }

  get<T>(key: string): T | null {
    let entry: CacheEntry<T> | null = null;

    switch (this.strategy) {
      case 'memory':
        entry = this.memoryCache.get(key) || null;
        break;
      case 'localstorage':
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(key);
          entry = cached ? JSON.parse(cached) : null;
        }
        break;
      case 'indexeddb':
        return this.getIndexedDB(key);
    }

    if (!entry) return null;

    // Check TTL
    if (entry.ttl) {
      const age = (Date.now() - entry.timestamp) / 1000;
      if (age > entry.ttl) {
        this.delete(key);
        return null;
      }
    }

    return entry.value;
  }

  delete(key: string): void {
    switch (this.strategy) {
      case 'memory':
        this.memoryCache.delete(key);
        break;
      case 'localstorage':
        if (typeof window !== 'undefined') {
          localStorage.removeItem(key);
        }
        break;
      case 'indexeddb':
        this.deleteIndexedDB(key);
        break;
    }
  }

  clear(): void {
    switch (this.strategy) {
      case 'memory':
        this.memoryCache.clear();
        break;
      case 'localstorage':
        if (typeof window !== 'undefined') {
          localStorage.clear();
        }
        break;
      case 'indexeddb':
        this.clearIndexedDB();
        break;
    }
  }

  private async setIndexedDB(key: string, value: any): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const db = await this.openDB();
    const transaction = db.transaction('cache', 'readwrite');
    transaction.objectStore('cache').put({ key, value });
  }

  private async getIndexedDB(key: string): Promise<any> {
    if (typeof window === 'undefined') return null;
    
    const db = await this.openDB();
    const transaction = db.transaction('cache', 'readonly');
    const result = await new Promise((resolve) => {
      const request = transaction.objectStore('cache').get(key);
      request.onsuccess = () => resolve(request.result);
    });
    return result?.value || null;
  }

  private async deleteIndexedDB(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const db = await this.openDB();
    const transaction = db.transaction('cache', 'readwrite');
    transaction.objectStore('cache').delete(key);
  }

  private async clearIndexedDB(): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const db = await this.openDB();
    const transaction = db.transaction('cache', 'readwrite');
    transaction.objectStore('cache').clear();
  }

  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('ulottyCache', 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
      };
    });
  }
}

export const globalCache = new CacheManager('memory');
