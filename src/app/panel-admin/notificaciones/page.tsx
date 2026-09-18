import { AdminHeader } from "@/components/admin/admin-header";

export default async function NotificacionesPage() {
  const notificaciones = [
    { id: 1, tipo: "Alerta", titulo: "23 contactos sin responder", descripcion: "Agentes no han respondido contactos", fecha: "Hace 5 minutos", prioridad: "Alta" },
    { id: 2, tipo: "Aviso", titulo: "5 propiedades rechazadas", descripcion: "Revisar propiedades rechazadas esta semana", fecha: "Hace 1 hora", prioridad: "Media" },
    { id: 3, tipo: "Error", titulo: "Email service degradado", descripcion: "Algunos correos pueden no estar llegando", fecha: "Hace 2 horas", prioridad: "Alta" },
    { id: 4, tipo: "Info", titulo: "Nuevas propiedades: 34", descripcion: "Se agregaron 34 propiedades esta semana", fecha: "Hace 6 horas", prioridad: "Baja" },
    { id: 5, tipo: "Alerta", titulo: "Usuario suspendido", descripcion: "Usuario #4521 fue suspendido por spam", fecha: "Hace 1 día", prioridad: "Media" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Notificaciones</h1>
            <p className="text-muted mt-2">Centro de notificaciones y alertas del sistema.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            Marcar todas como leídas
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Total notificaciones</div>
            <div className="text-2xl font-bold text-brand">427</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">No leídas</div>
            <div className="text-2xl font-bold text-red-600">23</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Alertas activas</div>
            <div className="text-2xl font-bold text-orange-600">5</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Esta semana</div>
            <div className="text-2xl font-bold text-blue-600">89</div>
          </div>
        </div>

        <div className="space-y-3">
          {notificaciones.map((not) => (
            <div key={not.id} className="bg-surface rounded-lg border border-border p-4 hover:bg-background transition cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${not.tipo === "Alerta" ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" : not.tipo === "Aviso" ? "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" : not.tipo === "Error" ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"}`}>
                      {not.tipo}
                    </span>
                    {not.prioridad === "Alta" && <span className="text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-semibold">Alta prioridad</span>}
                  </div>
                  <h3 className="font-bold">{not.titulo}</h3>
                  <p className="text-sm text-muted">{not.descripcion}</p>
                  <p className="text-xs text-muted mt-2">{not.fecha}</p>
                </div>
                <button className="text-xs text-brand hover:underline font-semibold ml-4">Descartar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
