import Link from "next/link";

const PROPERTY_TYPES: { value: string; label: string; icon: string }[] = [
  { value: "casa", label: "Casas", icon: "🏠" },
  { value: "depto", label: "Deptos", icon: "🏢" },
  { value: "predio", label: "Predios", icon: "⛰️" },
];

export function PropertyTypeNav() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:max-w-md">
      {PROPERTY_TYPES.map((item) => (
        <Link
          key={item.value}
          href={`/propiedades?tipo=${item.value}`}
          className="flex flex-col items-center gap-2 rounded-lg border border-border px-4 py-4 text-center hover:bg-subtle"
        >
          <span className="text-2xl" aria-hidden>
            {item.icon}
          </span>
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
