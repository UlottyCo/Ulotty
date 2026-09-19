'use client';

import { useTheme } from '@/lib/theme-context';

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h3 className="font-bold text-lg mb-6">Tema de la plataforma</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-3">Selecciona tu preferencia</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border-2 transition text-center ${
                theme === 'light'
                  ? 'border-brand bg-blue-50'
                  : 'border-border hover:border-brand'
              }`}
            >
              <div className="text-2xl mb-2">☀️</div>
              <div className="text-sm font-medium">Claro</div>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border-2 transition text-center ${
                theme === 'dark'
                  ? 'border-brand bg-blue-50'
                  : 'border-border hover:border-brand'
              }`}
            >
              <div className="text-2xl mb-2">🌙</div>
              <div className="text-sm font-medium">Oscuro</div>
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`p-4 rounded-lg border-2 transition text-center ${
                theme === 'system'
                  ? 'border-brand bg-blue-50'
                  : 'border-border hover:border-brand'
              }`}
            >
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium">Sistema</div>
            </button>
          </div>
          <p className="text-xs text-muted mt-3">
            Tu preferencia se guarda automáticamente en el navegador
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>ℹ️ Tema actual:</strong> {
              theme === 'light' ? 'Claro' :
              theme === 'dark' ? 'Oscuro' :
              'Sistema (automático según preferencia del sistema operativo)'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
