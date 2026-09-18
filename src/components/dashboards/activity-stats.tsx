export function ActivityStats({
  label,
  value,
  icon,
  trend,
}: {
  label: string;
  value: string;
  icon: string;
  trend?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          {trend && <p className="mt-1 text-xs text-muted">{trend}</p>}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
