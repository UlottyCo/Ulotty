export function ModerationDetails() {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-6 text-xl font-semibold">Detalles de la Propiedad</h2>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-muted">Tipo</p>
            <p className="mt-2 text-sm font-medium">Casa</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted">Operación</p>
            <p className="mt-2 text-sm font-medium">Venta</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted">Zona</p>
            <p className="mt-2 text-sm font-medium">Rosarito</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted">Precio (MXN)</p>
            <p className="mt-2 text-sm font-medium">$250,000</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted">Superficie (m²)</p>
            <p className="mt-2 text-sm font-medium">120</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted">Habitaciones</p>
            <p className="mt-2 text-sm font-medium">3</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted">Baños</p>
            <p className="mt-2 text-sm font-medium">2.5</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted">Estacionamientos</p>
            <p className="mt-2 text-sm font-medium">2</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-xs font-semibold text-muted">Descripción</p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Hermosa casa moderna con vista al mar, totalmente amueblada. Cuenta con
            aire acondicionado, sistema de seguridad 24h, acceso a playa privada,
            alberca y terraza amplia. Ubicada en zona residencial exclusiva.
          </p>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-xs font-semibold text-muted mb-3">Amenidades</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-subtle px-3 py-1 text-xs text-foreground">
              Alberca
            </span>
            <span className="rounded-full bg-subtle px-3 py-1 text-xs text-foreground">
              Vista al mar
            </span>
            <span className="rounded-full bg-subtle px-3 py-1 text-xs text-foreground">
              Acceso a playa
            </span>
            <span className="rounded-full bg-subtle px-3 py-1 text-xs text-foreground">
              Seguridad 24h
            </span>
            <span className="rounded-full bg-subtle px-3 py-1 text-xs text-foreground">
              Amueblado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
