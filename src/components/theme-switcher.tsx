'use client';

import { useTheme } from '@/lib/theme-context';

export function ThemeSwitcher() {
  const { theme, actualTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      <button
        onClick={() => setTheme('light')}
        className={`px-3 py-1 rounded transition text-sm font-medium ${
          theme === 'light' ? 'bg-brand text-white' : 'text-foreground hover:bg-background'
        }`}
        title="Tema claro"
      >
        ☀️
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`px-3 py-1 rounded transition text-sm font-medium ${
          theme === 'dark' ? 'bg-brand text-white' : 'text-foreground hover:bg-background'
        }`}
        title="Tema oscuro"
      >
        🌙
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`px-3 py-1 rounded transition text-sm font-medium ${
          theme === 'system' ? 'bg-brand text-white' : 'text-foreground hover:bg-background'
        }`}
        title="Usar preferencia del sistema"
      >
        ⚙️
      </button>
    </div>
  );
}

export function ThemeToggleButton() {
  const { actualTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-background transition text-foreground"
      title={`Cambiar a tema ${actualTheme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {actualTheme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
