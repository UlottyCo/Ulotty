import { AdminHeader } from "@/components/admin/admin-header";

export default async function EquipoPage() {
  const miembros = [
    { nombre: "Juan Pérez", email: "juan@ulotty.com", rol: "Administrador", estado: "Activo", ultima_actividad: "Hace 5 min", fecha_unio: "1 ago 2024" },
    { nombre: "María García", email: "maria@ulotty.com", rol: "Moderador", estado: "Activo", ultima_actividad: "Hace 2 horas", fecha_unio: "15 ago 2024" },
    { nombre: "Carlos López", email: "carlos@ulotty.com", rol: "Moderador", estado: "Activo", ultima_actividad: "Hace 1 día", fecha_unio: "20 ago 2024" },
    { nombre: "Ana Martínez", email: "ana@ulotty.com", rol: "Administrador", estado: "Activo", ultima_actividad: "Hace 30 min", fecha_unio: "10 ago 2024" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Equipo</h1>
            <p className="text-muted mt-2">Gestiona miembros del equipo y sus permisos.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Invitar miembro
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Total miembros</div>
            <div className="text-2xl font-bold text-brand">4</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Administradores</div>
            <div className="text-2xl font-bold text-red-600">2</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Moderadores</div>
            <div className="text-2xl font-bold text-orange-600">2</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Rol</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 font-semibold">Última actividad</th>
                <th className="text-left py-3 px-4 font-semibold">Se unió</th>
                <th className="text-center py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {miembros.map((miembro) => (
                <tr key={miembro.email} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{miembro.nombre}</td>
                  <td className="py-3 px-4">{miembro.email}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${miembro.rol === "Administrador" ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" : "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"}`}>
                      {miembro.rol}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      {miembro.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted">{miembro.ultima_actividad}</td>
                  <td className="py-3 px-4 text-xs text-muted">{miembro.fecha_unio}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-xs text-brand hover:underline font-semibold">Editar</button>
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
