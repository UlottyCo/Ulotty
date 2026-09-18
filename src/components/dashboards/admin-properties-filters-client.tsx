"use client";

import { useState } from "react";

interface AdminPropertiesFiltersClientProps {
  onFilter: (filters: {
    search?: string;
    status?: string;
    type?: string;
    zona?: string;
  }) => void;
}

export function AdminPropertiesFiltersClient({ onFilter }: AdminPropertiesFiltersClientProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [zona, setZona] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    onFilter({ search: value, status, type, zona });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilter({ search, status: value, type, zona });
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    onFilter({ search, status, type: value, zona });
  };

  const handleZonaChange = (value: string) => {
    setZona(value);
    onFilter({ search, status, type, zona: value });
  };

  const handleClear = () => {
    setSearch("");
    setStatus("");
    setType("");
    setZona("");
    onFilter({ search: "", status: "", type: "", zona: "" });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-muted mb-2">Buscar</label>
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="ID, folio, zona..."
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-muted mb-2">Estado</label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">Todos</option>
            <option value="borrador">Borrador</option>
            <option value="verificado">Verificado</option>
            <option value="rechazado">Rechazado</option>
            <option value="requiere_corrección">Requiere corrección</option>
            <option value="pausado">Pausado</option>
            <option value="publicado">Publicado</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted mb-2">Tipo</label>
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">Todos</option>
            <option value="casa">Casa</option>
            <option value="depto">Depto</option>
            <option value="predio">Predio</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted mb-2">Zona</label>
          <input
            type="text"
            value={zona}
            onChange={(e) => handleZonaChange(e.target.value)}
            placeholder="Rosarito, Centro..."
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand/90">
          Filtrar
        </button>
        <button
          onClick={handleClear}
          className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-subtle"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
