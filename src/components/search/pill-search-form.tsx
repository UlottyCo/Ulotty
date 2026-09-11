// Los chips de filtro (Precio, m², Habitaciones, Amenidades) son
// visuales por ahora — "amenidades" y "habitaciones" ni siquiera
// existen como columnas en listings todavía, así que no filtran nada
// todavía. Construirlos funcionales es un cambio de esquema aparte.
const FILTER_CHIPS = ["Precio", "m²", "Habitaciones", "Amenidades"];

interface PillSearchFormProps {
  action?: string;
  defaultZona?: string;
  defaultOperacion?: string;
  defaultTipo?: string;
}

export function PillSearchForm({
  action = "/propiedades",
  defaultZona = "",
  defaultOperacion = "",
  defaultTipo = "",
}: PillSearchFormProps) {
  return (
    <div>
      <form
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

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="rounded-full border border-border px-4 py-2 text-sm"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
