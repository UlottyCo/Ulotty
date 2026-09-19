'use client';

import { useCallback } from 'react';
import { monitoring } from './monitoring';
import type { ErrorLevel } from './monitoring';

export function useMonitoring() {
  const captureException = useCallback((error: Error | string, context?: Record<string, any>) => {
    return monitoring.captureException(error, context);
  }, []);

  const captureMessage = useCallback((message: string, level: ErrorLevel = 'info', context?: Record<string, any>) => {
    monitoring.captureMessage(message, level, context);
  }, []);

  const addBreadcrumb = useCallback((message: string, category?: string, level?: ErrorLevel) => {
    monitoring.addBreadcrumb(message, category, level);
  }, []);

  const startTransaction = useCallback((name: string) => {
    return monitoring.startTransaction(name);
  }, []);

  return {
    captureException,
    captureMessage,
    addBreadcrumb,
    startTransaction,
  };
}
