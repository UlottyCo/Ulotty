"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

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
//
// Se renderiza con un portal a document.body: el <form> de la píldora
// usa overflow-hidden para lograr las esquinas redondeadas, y eso
// recortaba el popover si vivía dentro del mismo árbol. Con el portal
// queda fuera de ese contenedor, solo posicionado (position: fixed)
// según dónde esté el botón.
export function FilterChip({ label, active, children }: FilterChipProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 8, left: rect.left });
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    // Cierra también al hacer scroll — más simple que recalcular la
    // posición en cada frame mientras el popover está abierto.
    function handleScroll() {
      setOpen(false);
    }

    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  return (
    <div ref={triggerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`shrink-0 rounded-full border bg-surface px-4 py-2 text-sm shadow-sm ${
          active ? "border-foreground" : "border-border"
        }`}
      >
        {label}
      </button>

      {mounted &&
        createPortal(
          // Nunca se desmonta cuando se cierra (solo se oculta con
          // `hidden`) — los campos de adentro son inputs sin control
          // de este formulario más grande, y si se desmontaran
          // perderían su valor antes de que el submit los alcance a
          // mandar.
          <div
            ref={popoverRef}
            hidden={!open}
            style={{ top: position.top, left: position.left }}
            className="fixed z-50 w-64 rounded-lg border border-border bg-surface p-4 shadow-lg"
          >
            {children}
          </div>,
          document.body,
        )}
    </div>
  );
}
