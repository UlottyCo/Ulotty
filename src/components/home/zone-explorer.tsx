import Link from "next/link";

export interface ZoneCount {
  zone: string;
  count: number;
}

export function ZoneExplorer({ zones }: { zones: ZoneCount[] }) {
  if (zones.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {zones.map((z) => (
        <Link
          key={z.zone}
          href={`/propiedades?zona=${encodeURIComponent(z.zone)}`}
          className="flex aspect-square flex-col justify-end overflow-hidden rounded-lg border border-border bg-subtle p-4"
        >
          <span className="font-semibold">{z.zone}</span>
          <span className="text-sm text-muted">
            {z.count} {z.count === 1 ? "propiedad" : "propiedades"}
          </span>
        </Link>
      ))}
    </div>
  );
}
