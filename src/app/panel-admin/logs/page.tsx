import { AdminHeader } from "@/components/admin/admin-header";

export default async function LogsPage() {
  const logs = [
    { timestamp: "17 sep 2026 10:45:32", nivel: "INFO", modulo: "Auth", mensaje: "Usuario juan@ulotty.com inició sesión" },
    { timestamp: "17 sep 2026 10:43:15", nivel: "ERROR", modulo: "API", mensaje: "Timeout en endpoint /propiedades - 30s" },
    { timestamp: "17 sep 2026 10:42:08", nivel: "INFO", modulo: "Database", mensaje: "Respaldo completado - 12.4 GB en 45 min" },
    { timestamp: "17 sep 2026 10:40:22", nivel: "WARNING", modulo: "Email", mensaje: "Servicio SendGrid degradado - retry en 5 min" },
    { timestamp: "17 sep 2026 10:38:11", nivel: "INFO", modulo: "Payment", mensaje: "Pago procesado - INV-2026-001 - $99.00" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Logs del sistema</h1>
          <p className="text-muted mt-2">Monitorea eventos y errores del sistema.</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Total eventos</div>
            <div className="text-2xl font-bold text-brand">847,234</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Hoy</div>
            <div className="text-2xl font-bold text-blue-600">3,421</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Errores</div>
            <div className="text-2xl font-bold text-red-600">47</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Advertencias</div>
            <div className="text-2xl font-bold text-orange-600">234</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="mb-4 flex gap-4">
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-sm">
              <option>Todos los niveles</option>
              <option>INFO</option>
              <option>WARNING</option>
              <option>ERROR</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-sm">
              <option>Todos los módulos</option>
              <option>Auth</option>
              <option>API</option>
              <option>Database</option>
              <option>Email</option>
              <option>Payment</option>
            </select>
            <input type="text" placeholder="Buscar en logs..." className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-sm" />
          </div>

          <div className="space-y-2 font-mono text-xs">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 bg-background rounded-lg hover:bg-border transition">
                <span className="text-muted min-w-48">{log.timestamp}</span>
                <span className={`px-2 py-1 rounded font-bold min-w-20 text-center ${log.nivel === "INFO" ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : log.nivel === "WARNING" ? "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"}`}>
                  {log.nivel}
                </span>
                <span className="text-muted min-w-32">{log.modulo}</span>
                <span className="flex-1 text-foreground">{log.mensaje}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
