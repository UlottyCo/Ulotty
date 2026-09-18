export function PropertyAdminFilters() {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-200">
          <label className="block text-xs font-semibold text-muted mb-2">
            Buscar
          </label>
          <input
            type="text"
            placeholder="ID, folio, zona..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="w-40">
          <label className="block text-xs font-semibold text-muted mb-2">
            Estado
          </label>
          <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand">
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="verificada">Verificada</option>
            <option value="publicada">Publicada</option>
            <option value="rechazada">Rechazada</option>
            <option value="pausada">Pausada</option>
          </select>
        </div>

        <div className="w-40">
          <label className="block text-xs font-semibold text-muted mb-2">
            Tipo
          </label>
          <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand">
            <option value="">Todos</option>
            <option value="casa">Casa</option>
            <option value="depto">Depto</option>
            <option value="predio">Predio</option>
          </select>
        </div>

        <div className="w-40">
          <label className="block text-xs font-semibold text-muted mb-2">
            Zona
          </label>
          <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand">
            <option value="">Todas</option>
            <option value="rosarito">Rosarito</option>
            <option value="playas">Playas</option>
            <option value="centro">Centro</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand/90">
            Filtrar
          </button>
          <button className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-subtle">
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
