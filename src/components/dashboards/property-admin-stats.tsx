export interface PropertyAdminStatsProps {
  label: string;
  value: string;
  icon: string;
  subtext?: string;
  highlight?: boolean;
}

export function PropertyAdminStats({
  label,
  value,
  icon,
  subtext,
  highlight,
}: PropertyAdminStatsProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        highlight
          ? "border-red-300 bg-red-50"
          : "border-border bg-surface"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {subtext && (
            <p className="mt-1 text-xs text-muted">{subtext}</p>
          )}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
