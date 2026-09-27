import { FilterChip } from "./filter-chip";

const BATHROOM_OPTIONS = ["1", "2", "3", "4"];
const PARKING_OPTIONS = ["1", "2", "3"];
const BEDROOMS_OPTIONS = ["1", "2", "3", "4"];
const AMENITIES_OPTIONS = [
  "alberca",
  "vista_mar",
  "acceso_playa",
  "estacionamiento",
  "seguridad_24h",
  "amueblado",
  "aire_acondicionado",
  "jardin",
  "terraza",
  "acepta_mascotas",
];

const AMENITIES_LABELS: Record<string, string> = {
  alberca: "Alberca",
  vista_mar: "Vista al mar",
  acceso_playa: "Acceso a playa",
  estacionamiento: "Estacionamiento",
  seguridad_24h: "Seguridad 24h",
  amueblado: "Amueblado",
  aire_acondicionado: "Aire acondicionado",
  jardin: "Jardín",
  terraza: "Terraza",
  acepta_mascotas: "Acepta mascotas",
};

interface PillSearchFormProps {
  action?: string;
  defaultZona?: string;
  defaultOperacion?: string;
  defaultTipo?: string;
  defaultPrecioMin?: string;
  defaultPrecioMax?: string;
  defaultAreaMin?: string;
  defaultAreaMax?: string;
  defaultBedrooms?: string;
  defaultBathrooms?: string;
  defaultParking?: string;
  defaultAmenities?: string | string[];
}

/**
 * Flecha propia para los <select>. Sin esto cada navegador dibuja la
 * suya: Chrome una sola punta, Safari el doble control nativo de macOS.
 */
function SelectChevron() {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
  defaultBedrooms = "",
  defaultBathrooms = "",
  defaultParking = "",
  defaultAmenities = "",
}: PillSearchFormProps) {
  return (
    <div>
      <form
        id="pill-search-form"
        method="GET"
        action={action}
        className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface sm:flex-row sm:items-stretch sm:rounded-full"
      >
        <label className="flex-1 border-b border-border px-4 py-2 sm:border-b-0 sm:border-r sm:px-6 sm:py-3">
          <span className="block text-xs font-semibold">Zona</span>
          <input
            type="text"
            name="zona"
            defaultValue={defaultZona}
            placeholder="Rosarito, playas"
            className="w-full bg-transparent text-sm text-muted outline-none placeholder:text-muted"
          />
        </label>
        <label className="flex-1 border-b border-border px-4 py-2 sm:border-b-0 sm:border-r sm:px-6 sm:py-3">
          <span className="block text-xs font-semibold">Operación</span>
          <div className="relative">
            <select
              name="operacion"
              defaultValue={defaultOperacion}
              className="w-full appearance-none [-webkit-appearance:none] bg-transparent pr-5 text-sm text-muted outline-none"
            >
              <option value="">Venta o renta</option>
              <option value="venta">Venta</option>
              <option value="renta">Renta</option>
            </select>
            <SelectChevron />
          </div>
        </label>
        <label className="flex-1 px-4 py-2 sm:px-6 sm:py-3">
          <span className="block text-xs font-semibold">Tipo</span>
          <div className="relative">
            <select
              name="tipo"
              defaultValue={defaultTipo}
              className="w-full appearance-none [-webkit-appearance:none] bg-transparent pr-5 text-sm text-muted outline-none"
            >
              <option value="">Casa, depto, predio</option>
              <option value="predio">Predio</option>
              <option value="casa">Casa</option>
              <option value="depto">Depto</option>
            </select>
            <SelectChevron />
          </div>
        </label>
        <div className="flex items-center justify-center p-2">
          <button
            type="submit"
            aria-label="Buscar"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground sm:h-12 sm:w-12"
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

      {/* Chips en una sola línea con scroll horizontal en pantallas
          angostas. Sin justify-start el inicio de la fila queda
          inalcanzable al desbordar, y min-w-min haría que el
          contenedor creciera con el contenido en vez de desplazarlo. */}
      <div className="fade-right-mobile mt-3 flex flex-nowrap items-center justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
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

        <FilterChip
          label={defaultBedrooms ? `Habitaciones: ${defaultBedrooms}+` : "Habitaciones"}
          active={!!defaultBedrooms}
        >
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="bedrooms"
                value=""
                form="pill-search-form"
                defaultChecked={!defaultBedrooms}
                className="h-4 w-4"
              />
              <span className="text-sm">Cualquiera</span>
            </label>
            {BEDROOMS_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="bedrooms"
                  value={opt}
                  form="pill-search-form"
                  defaultChecked={defaultBedrooms === opt}
                  className="h-4 w-4"
                />
                <span className="text-sm">{opt}+</span>
              </label>
            ))}
          </div>
        </FilterChip>

        <FilterChip
          label={defaultBathrooms ? `Baños: ${defaultBathrooms}+` : "Baños"}
          active={!!defaultBathrooms}
        >
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="bathrooms"
                value=""
                form="pill-search-form"
                defaultChecked={!defaultBathrooms}
                className="h-4 w-4"
              />
              <span className="text-sm">Cualquiera</span>
            </label>
            {BATHROOM_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="bathrooms"
                  value={opt}
                  form="pill-search-form"
                  defaultChecked={defaultBathrooms === opt}
                  className="h-4 w-4"
                />
                <span className="text-sm">{opt}+</span>
              </label>
            ))}
          </div>
        </FilterChip>

        <FilterChip
          label={defaultParking ? `Estac.: ${defaultParking}+` : "Estacionamientos"}
          active={!!defaultParking}
        >
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="parking"
                value=""
                form="pill-search-form"
                defaultChecked={!defaultParking}
                className="h-4 w-4"
              />
              <span className="text-sm">Cualquiera</span>
            </label>
            {PARKING_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="parking"
                  value={opt}
                  form="pill-search-form"
                  defaultChecked={defaultParking === opt}
                  className="h-4 w-4"
                />
                <span className="text-sm">{opt}+</span>
              </label>
            ))}
          </div>
        </FilterChip>

        <FilterChip
          label="Amenidades"
          active={!!defaultAmenities}
        >
          <div className="flex flex-col gap-2">
            {AMENITIES_OPTIONS.map((amenity) => {
              let amenitiesArray: string[] = [];
              if (defaultAmenities) {
                if (typeof defaultAmenities === "string") {
                  amenitiesArray = defaultAmenities.split(",").filter(Boolean);
                } else if (Array.isArray(defaultAmenities)) {
                  amenitiesArray = defaultAmenities.filter(Boolean);
                }
              }
              return (
                <label key={amenity} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    form="pill-search-form"
                    defaultChecked={amenitiesArray.includes(amenity)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">{AMENITIES_LABELS[amenity]}</span>
                </label>
              );
            })}
          </div>
        </FilterChip>

        {/* Ícono de amenidades pequeño alternativo si prefieres espacio */}
        {/*
        <FilterChip label="" active={!!defaultAmenities}>
          ...
        </FilterChip>
        */}
      </div>
    </div>
  );
}
