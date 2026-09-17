import { FilterChip } from "./filter-chip";

// Habitaciones y Amenidades siguen sin ser funcionales todavía — esos
// campos ni existen en listings (vienen en PRs aparte, ya con su
// propia migración).
const COMING_SOON_CHIPS = ["Habitaciones", "Amenidades"];

interface PillSearchFormProps {
  action?: string;
  defaultZona?: string;
  defaultOperacion?: string;
  defaultTipo?: string;
  defaultPrecioMin?: string;
  defaultPrecioMax?: string;
  defaultAreaMin?: string;
  defaultAreaMax?: string;
}

function rangeLabel(base: string, min: string, max: string, unit = "") {
  if (!min && !max) return base;
  if (min && max) return `${base}: ${min}${unit}–${max}${unit}`;
  if (min) return `${base}: desde ${min}${unit}`;
  return `${base}: hasta ${max}${unit}`;
}

export function PillSearchForm({
  action = "/propiedades",
  defaultZona = "",
  defaultOperacion = "",
  defaultTipo = "",
  defaultPrecioMin = "",
  defaultPrecioMax = "",
  defaultAreaMin = "",
  defaultAreaMax = "",
}: PillSearchFormProps) {
  return (
    <div>
      <form
        id="pill-search-form"
        method="GET"
        action={action}
        className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface sm:flex-row sm:items-stretch sm:rounded-full"
      >
        <label className="flex-1 border-b border-border px-6 py-3 sm:border-b-0 sm:border-r">
          <span className="block text-xs font-semibold">Zona</span>
          <input
            type="text"
            name="zona"
            defaultValue={defaultZona}
            placeholder="Rosarito, playas"
            className="w-full bg-transparent text-sm text-muted outline-none placeholder:text-muted"
          />
        </label>
        <label className="flex-1 border-b border-border px-6 py-3 sm:border-b-0 sm:border-r">
          <span className="block text-xs font-semibold">Operación</span>
          <select
            name="operacion"
            defaultValue={defaultOperacion}
            className="w-full bg-transparent text-sm text-muted outline-none"
          >
            <option value="">Venta o renta</option>
            <option value="venta">Venta</option>
            <option value="renta">Renta</option>
          </select>
        </label>
        <label className="flex-1 px-6 py-3">
          <span className="block text-xs font-semibold">Tipo</span>
          <select
            name="tipo"
            defaultValue={defaultTipo}
            className="w-full bg-transparent text-sm text-muted outline-none"
          >
            <option value="">Casa, depto, predio</option>
            <option value="predio">Predio</option>
            <option value="casa">Casa</option>
            <option value="depto">Depto</option>
          </select>
        </label>

        <div className="flex items-center justify-center p-2">
          <button
            type="submit"
            aria-label="Buscar"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M17 17L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </form>

      {/* Todos los chips de filtro en una sola línea, superpuestos
          justo debajo de la píldora — si no caben en pantallas
          angostas, hacen scroll horizontal en vez de saltar de
          línea. */}
      <div className="mt-3 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
        <FilterChip
          label={rangeLabel("Precio", defaultPrecioMin, defaultPrecioMax)}
          active={!!(defaultPrecioMin || defaultPrecioMax)}
        >
          <div className="flex flex-col gap-3">
            <label className="text-sm">
              <span className="block text-xs font-semibold text-muted">
                Mínimo (MXN)
              </span>
              <input
                type="number"
                min={0}
                name="precioMin"
                form="pill-search-form"
                defaultValue={defaultPrecioMin}
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="block text-xs font-semibold text-muted">
                Máximo (MXN)
              </span>
              <input
                type="number"
                min={0}
                name="precioMax"
                form="pill-search-form"
                defaultValue={defaultPrecioMax}
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </label>
          </div>
        </FilterChip>

        <FilterChip
          label={rangeLabel("m²", defaultAreaMin, defaultAreaMax)}
          active={!!(defaultAreaMin || defaultAreaMax)}
        >
          <div className="flex flex-col gap-3">
            <label className="text-sm">
              <span className="block text-xs font-semibold text-muted">
                Mínimo (m²)
              </span>
              <input
                type="number"
                min={0}
                name="areaMin"
                form="pill-search-form"
                defaultValue={defaultAreaMin}
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="block text-xs font-semibold text-muted">
                Máximo (m²)
              </span>
              <input
                type="number"
                min={0}
                name="areaMax"
                form="pill-search-form"
                defaultValue={defaultAreaMax}
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </label>
          </div>
        </FilterChip>

        {COMING_SOON_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="shrink-0 rounded-full border border-border bg-surface px-4 py-2 text-sm shadow-sm"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
