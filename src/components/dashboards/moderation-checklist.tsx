export function ModerationChecklist() {
  const checks = [
    { id: 1, title: "Información básica completa", checked: true },
    { id: 2, title: "Fotos de calidad (mínimo 5)", checked: true },
    { id: 3, title: "Descripción detallada", checked: true },
    { id: 4, title: "Ubicación verificada", checked: true },
    { id: 5, title: "Precio consistente", checked: false },
    { id: 6, title: "Documentos adjuntos", checked: false },
    { id: 7, title: "Verificación de identidad", checked: true },
    { id: 8, title: "Cumplimiento normativo", checked: true },
  ];

  const completedCount = checks.filter((c) => c.checked).length;
  const progress = (completedCount / checks.length) * 100;

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Checklist de Verificación</h2>
        <span className="text-sm font-medium text-muted">
          {completedCount}/{checks.length} completado
        </span>
      </div>

      <div className="mb-4 overflow-hidden rounded-full bg-subtle">
        <div
          className="h-2 bg-brand transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {checks.map((check) => (
          <label
            key={check.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-subtle/50"
          >
            <input
              type="checkbox"
              defaultChecked={check.checked}
              className="h-4 w-4 cursor-pointer rounded"
            />
            <span
              className={`text-sm ${
                check.checked ? "line-through text-muted" : "text-foreground"
              }`}
            >
              {check.title}
            </span>
          </label>
        ))}
      </div>

      <div className="mt-6 space-y-2 border-t border-border pt-4">
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700">
            ✓ Aprobar
          </button>
          <button className="flex-1 rounded-lg border border-border px-4 py-2 font-semibold hover:bg-subtle">
            ⟳ Solicitar Corrección
          </button>
        </div>
        <button className="w-full rounded-lg border border-red-300 px-4 py-2 font-semibold text-red-600 hover:bg-red-50">
          ✕ Rechazar
        </button>
      </div>
    </div>
  );
}
