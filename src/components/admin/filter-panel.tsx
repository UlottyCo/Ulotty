"use client";

import { useState } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterPanelProps {
  filters: FilterConfig[];
  onFiltersChange: (filters: Record<string, string>) => void;
  collapsible?: boolean;
}

export function FilterPanel({ filters, onFiltersChange, collapsible = true }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(!collapsible);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...selectedFilters, [key]: value };
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    setSelectedFilters({});
    onFiltersChange({});
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {collapsible && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-3 flex items-center justify-between hover:bg-background/50 transition"
        >
          <span className="font-semibold">Filtros</span>
          <svg
            className={`h-5 w-5 transform transition ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}

      {isOpen && (
        <>
          {!collapsible && <div className="border-b border-border" />}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-sm font-semibold mb-2">{filter.label}</label>
                  <select
                    value={selectedFilters[filter.key] || ""}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                  >
                    <option value="">Todas</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm text-foreground hover:bg-background/50 rounded-lg transition"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
