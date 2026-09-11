"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FilterChipProps {
  label: string;
  active: boolean;
  children: ReactNode;
}

// Popover genérico para un chip de filtro dentro del buscador. Los
// campos que van adentro (children) viven dentro del <form> general
// del buscador (no son su propio form) — por eso el valor se conserva
// aunque el popover se cierre, y todo se manda junto al dar clic en la
// lupa.
export function FilterChip({ label, active, children }: FilterChipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`rounded-full border px-4 py-2 text-sm ${
          active ? "border-foreground" : "border-border"
        }`}
      >
        {label}
      </button>

      {/* Nunca se desmonta cuando se cierra (solo se oculta con
          `hidden`) — los campos de adentro son inputs sin control de
          este formulario más grande, y si se desmontaran perderían su
          valor antes de que el submit los alcance a mandar. */}
      <div
        hidden={!open}
        className="absolute left-0 top-full z-10 mt-2 w-64 rounded-lg border border-border bg-surface p-4 shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}
