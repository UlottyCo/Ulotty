export type ErrorLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

export interface LogEntry {
  timestamp: Date;
  level: ErrorLevel;
  message: string;
  context?: Record<string, any>;
  stackTrace?: string;
  userId?: string;
  url?: string;
}

export interface ErrorReport {
  id: string;
  error: Error | string;
  level: ErrorLevel;
  timestamp: Date;
  context?: Record<string, any>;
  userId?: string;
  breadcrumbs: Breadcrumb[];
}

export interface Breadcrumb {
  timestamp: Date;
  message: string;
  category: string;
  level: ErrorLevel;
}

export class MonitoringService {
  private logs: LogEntry[] = [];
  private errors: ErrorReport[] = [];
  private breadcrumbs: Breadcrumb[] = [];
  private userId?: string;
  private maxLogs = 1000;
  private maxBreadcrumbs = 100;

  setUserId(userId: string): void {
    this.userId = userId;
  }

  captureException(error: Error | string, context?: Record<string, any>): string {
    const id = `error_${Date.now()}`;
    const errorReport: ErrorReport = {
      id,
      error,
      level: 'error',
      timestamp: new Date(),
      context,
      userId: this.userId,
      breadcrumbs: [...this.breadcrumbs],
    };

    this.errors.push(errorReport);
    if (this.errors.length > this.maxLogs) {
      this.errors.shift();
    }

    console.error('Sentry Error:', errorReport);
    return id;
  }

  captureMessage(message: string, level: ErrorLevel = 'info', context?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      context,
      userId: this.userId,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    console.log(`[${level.toUpperCase()}]`, message, context);
  }

  addBreadcrumb(message: string, category: string = 'default', level: ErrorLevel = 'info'): void {
    const breadcrumb: Breadcrumb = {
      timestamp: new Date(),
      message,
      category,
      level,
    };

    this.breadcrumbs.push(breadcrumb);
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs.shift();
    }
  }

  startTransaction(name: string): { finish: () => void } {
    const startTime = performance.now();
    this.addBreadcrumb(`Transaction started: ${name}`, 'transaction', 'info');

    return {
      finish: () => {
        const duration = performance.now() - startTime;
        this.captureMessage(`Transaction ${name} completed in ${duration.toFixed(2)}ms`, 'info');
      },
    };
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  getErrors(): ErrorReport[] {
    return this.errors;
  }

  getBreadcrumbs(): Breadcrumb[] {
    return this.breadcrumbs;
  }

  clear(): void {
    this.logs = [];
    this.errors = [];
    this.breadcrumbs = [];
  }

  exportLogs(): string {
    return JSON.stringify(
      {
        logs: this.logs,
        errors: this.errors,
        breadcrumbs: this.breadcrumbs,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  }
}

export const monitoring = new MonitoringService();

// Auto-capture global errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    monitoring.captureException(event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    monitoring.captureException(event.reason);
  });
}
