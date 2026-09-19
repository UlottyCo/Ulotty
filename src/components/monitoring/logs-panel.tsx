'use client';

import { useState } from 'react';
import { monitoring } from '@/lib/monitoring';
import type { ErrorLevel } from '@/lib/monitoring';

export function LogsPanel() {
  const [filter, setFilter] = useState<ErrorLevel | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'logs' | 'errors' | 'breadcrumbs'>('logs');

  const logs = monitoring.getLogs();
  const errors = monitoring.getErrors();
  const breadcrumbs = monitoring.getBreadcrumbs();

  const filteredLogs = logs.filter((log) => filter === 'all' || log.level === filter);
  const filteredErrors = errors.filter((err) => filter === 'all' || err.level === filter);

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h3 className="font-bold text-lg mb-4">📊 Monitoring & Logging</h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-border">
        {(['logs', 'errors', 'breadcrumbs'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition ${
              activeTab === tab
                ? 'text-brand border-b-2 border-brand'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {tab === 'logs' && '📝'}
            {tab === 'errors' && '❌'}
            {tab === 'breadcrumbs' && '🔗'}
            {' '}{tab}
          </button>
        ))}
      </div>

      {/* Filter */}
      {(activeTab === 'logs' || activeTab === 'errors') && (
        <div className="mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
          >
            <option value="all">Todos</option>
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="fatal">Fatal</option>
          </select>
        </div>
      )}

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'logs' && (
          <div className="space-y-2">
            {filteredLogs.length === 0 ? (
              <p className="text-sm text-muted">No hay logs</p>
            ) : (
              filteredLogs.map((log, idx) => (
                <div key={idx} className="p-3 bg-background rounded border border-border text-sm">
                  <div className="flex justify-between items-start">
                    <div className="font-mono font-semibold text-xs">{log.level.toUpperCase()}</div>
                    <div className="text-xs text-muted">{log.timestamp.toLocaleTimeString('es-MX')}</div>
                  </div>
                  <p className="mt-1">{log.message}</p>
                  {log.context && (
                    <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto">
                      {JSON.stringify(log.context, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'errors' && (
          <div className="space-y-2">
            {filteredErrors.length === 0 ? (
              <p className="text-sm text-muted">No hay errores registrados</p>
            ) : (
              filteredErrors.map((error) => (
                <div key={error.id} className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800 text-sm">
                  <div className="flex justify-between items-start">
                    <div className="font-semibold text-red-700 dark:text-red-400">{error.id}</div>
                    <div className="text-xs text-muted">{error.timestamp.toLocaleTimeString('es-MX')}</div>
                  </div>
                  <p className="mt-1 text-red-700 dark:text-red-400">
                    {error.error instanceof Error ? error.error.message : String(error.error)}
                  </p>
                  {error.context && (
                    <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto">
                      {JSON.stringify(error.context, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'breadcrumbs' && (
          <div className="space-y-2">
            {breadcrumbs.length === 0 ? (
              <p className="text-sm text-muted">No hay breadcrumbs</p>
            ) : (
              breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="p-3 bg-background rounded border border-border text-sm">
                  <div className="flex justify-between items-start">
                    <div className="font-semibold">{crumb.category}</div>
                    <div className="text-xs text-muted">{crumb.timestamp.toLocaleTimeString('es-MX')}</div>
                  </div>
                  <p className="mt-1">{crumb.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Export */}
      <button
        onClick={() => {
          const data = monitoring.exportLogs();
          const blob = new Blob([data], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `logs_${new Date().toISOString()}.json`;
          a.click();
        }}
        className="mt-4 px-4 py-2 bg-brand text-brand-foreground rounded-lg hover:bg-brand/90 transition text-sm font-medium"
      >
        📥 Exportar Logs
      </button>
    </div>
  );
}
