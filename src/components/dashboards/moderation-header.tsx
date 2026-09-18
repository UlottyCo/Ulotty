export function ModerationHeader({ propertyId }: { propertyId: string }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Casa Moderna - Rosarito</h1>
            <p className="mt-1 text-muted">ID: {propertyId} · Folio: LP-001</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-right">
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Estado
          </span>
          <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
            En Revisión
          </span>
        </div>
        <p className="text-sm text-muted">Enviado hace 2 días</p>
      </div>
    </div>
  );
}
