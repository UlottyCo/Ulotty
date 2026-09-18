export interface PropertyStatsCardProps {
  label: string;
  value: string;
  icon: string;
  trend?: string;
  highlight?: boolean;
}

export function PropertyStatsCard({
  label,
  value,
  icon,
  trend,
  highlight,
}: PropertyStatsCardProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        highlight
          ? "border-brand/50 bg-brand/5"
          : "border-border bg-surface"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          {trend && <p className="mt-1 text-xs text-muted">{trend}</p>}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
