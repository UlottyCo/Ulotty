import { AdminHeader } from "@/components/admin/admin-header";

export default async function SesionesPage() {
  const sesiones = [
    { usuario: "Juan Pérez", email: "juan@ulotty.com", dispositivo: "Chrome - Windows", ip: "192.168.1.100", ubicacion: "Tijuana, MX", conectado: "Hace 5 min", duracion: "2h 34m" },
    { usuario: "María García", email: "maria@ulotty.com", dispositivo: "Safari - macOS", ip: "192.168.1.101", ubicacion: "Rosarito, MX", conectado: "Hace 2 horas", duracion: "4h 12m" },
    { usuario: "Carlos López", email: "carlos@ulotty.com", dispositivo: "Chrome - Android", ip: "192.168.1.102", ubicacion: "Ensenada, MX", conectado: "Hace 1 día", duracion: "24h 5m" },
    { usuario: "Ana Martínez", email: "ana@ulotty.com", dispositivo: "Firefox - Windows", ip: "192.168.1.103", ubicacion: "Tijuana, MX", conectado: "Hace 30 min", duracion: "3h 21m" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Sesiones activas</h1>
          <p className="text-muted mt-2">Gestiona y monitorea sesiones de usuario activas.</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Sesiones activas</div>
            <div className="text-2xl font-bold text-brand">1,234</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Usuarios conectados</div>
            <div className="text-2xl font-bold text-green-600">847</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Dispositivos únicos</div>
            <div className="text-2xl font-bold text-blue-600">923</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Sesiones inactivas</div>
            <div className="text-2xl font-bold text-red-600">389</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Usuario</th>
                <th className="text-left py-3 px-4 font-semibold">Dispositivo</th>
                <th className="text-left py-3 px-4 font-semibold">IP</th>
                <th className="text-left py-3 px-4 font-semibold">Ubicación</th>
                <th className="text-left py-3 px-4 font-semibold">Conectado</th>
                <th className="text-left py-3 px-4 font-semibold">Duración</th>
                <th className="text-center py-3 px-4 font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody>
              {sesiones.map((ses, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{ses.usuario}</td>
                  <td className="py-3 px-4">{ses.dispositivo}</td>
                  <td className="py-3 px-4 text-xs">{ses.ip}</td>
                  <td className="py-3 px-4 text-xs text-muted">{ses.ubicacion}</td>
                  <td className="py-3 px-4 text-xs text-muted">{ses.conectado}</td>
                  <td className="py-3 px-4 text-xs">{ses.duracion}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-xs text-red-600 hover:underline font-semibold">Cerrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
