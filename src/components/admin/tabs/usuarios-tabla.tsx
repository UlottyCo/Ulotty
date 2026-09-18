interface UsuarioItem {
  id: string;
  nombre: string;
  email: string;
  rol: "agente" | "comprador" | "admin" | "moderador";
  estado: "activo" | "inactivo" | "suspendido" | "verificacion";
  verificado: boolean;
  transacciones: number;
  ultima_actividad: string;
  fecha_registro: string;
}

interface UsuariosTablaProps {
  filterRole: string;
  filterStatus: string;
}

const usuarios: UsuarioItem[] = [
  {
    id: "U001",
    nombre: "Juan Pérez Morales",
    email: "juan.perez@example.com",
    rol: "agente",
    estado: "activo",
    verificado: true,
    transacciones: 28,
    ultima_actividad: "Hace 5 minutos",
    fecha_registro: "15 ago 2024",
  },
  {
    id: "U002",
    nombre: "María García López",
    email: "maria.garcia@example.com",
    rol: "agente",
    estado: "activo",
    verificado: true,
    transacciones: 15,
    ultima_actividad: "Hace 2 horas",
    fecha_registro: "20 ago 2024",
  },
  {
    id: "U003",
    nombre: "Carlos Ramírez Sánchez",
    email: "carlos.ramirez@example.com",
    rol: "comprador",
    estado: "activo",
    verificado: false,
    transacciones: 3,
    ultima_actividad: "Hace 1 día",
    fecha_registro: "1 sep 2026",
  },
  {
    id: "U004",
    nombre: "Ana Martínez Ruiz",
    email: "ana.martinez@example.com",
    rol: "agente",
    estado: "activo",
    verificado: true,
    transacciones: 42,
    ultima_actividad: "Hace 30 minutos",
    fecha_registro: "10 ago 2024",
  },
  {
    id: "U005",
    nombre: "Luis González Torres",
    email: "luis.gonzalez@example.com",
    rol: "comprador",
    estado: "inactivo",
    verificado: true,
    transacciones: 8,
    ultima_actividad: "Hace 3 semanas",
    fecha_registro: "15 jun 2026",
  },
  {
    id: "U006",
    nombre: "Patricia López Flores",
    email: "patricia.lopez@example.com",
    rol: "moderador",
    estado: "activo",
    verificado: true,
    transacciones: 0,
    ultima_actividad: "Hace 10 minutos",
    fecha_registro: "1 ago 2024",
  },
];

export function UsuariosTabla({ filterRole, filterStatus }: UsuariosTablaProps) {
  const filtered = usuarios.filter((u) => {
    const roleMatch = filterRole === "todos" || u.rol === filterRole;
    const statusMatch = filterStatus === "todos" || u.estado === filterStatus;
    return roleMatch && statusMatch;
  });

  const getRolBadge = (rol: string) => {
    const badgeClasses = {
      agente: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
      comprador: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
      admin: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
      moderador: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
    };
    return badgeClasses[rol as keyof typeof badgeClasses] || badgeClasses.comprador;
  };

  const getEstadoBadge = (estado: string) => {
    const badgeClasses = {
      activo: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      inactivo: "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300",
      suspendido: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
      verificacion: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
    };
    return badgeClasses[estado as keyof typeof badgeClasses] || badgeClasses.inactivo;
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted mb-4">Mostrando {filtered.length} de {usuarios.length} usuarios</div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Usuario</th>
              <th className="text-left py-3 px-4 font-semibold">Rol</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 font-semibold">Verificación</th>
              <th className="text-center py-3 px-4 font-semibold">Transacciones</th>
              <th className="text-left py-3 px-4 font-semibold">Última actividad</th>
              <th className="text-left py-3 px-4 font-semibold">Registro</th>
              <th className="text-center py-3 px-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((usuario) => (
              <tr key={usuario.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-semibold">{usuario.nombre}</p>
                    <p className="text-xs text-muted">{usuario.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getRolBadge(usuario.rol)}`}>
                    {usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getEstadoBadge(usuario.estado)}`}>
                    {usuario.estado.charAt(0).toUpperCase() + usuario.estado.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {usuario.verificado ? (
                    <span className="text-xs text-green-600 font-semibold">✓ Verificado</span>
                  ) : (
                    <span className="text-xs text-yellow-600 font-semibold">⚠ Pendiente</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center text-muted font-semibold">{usuario.transacciones}</td>
                <td className="py-3 px-4 text-xs text-muted">{usuario.ultima_actividad}</td>
                <td className="py-3 px-4 text-xs text-muted">{usuario.fecha_registro}</td>
                <td className="py-3 px-4 text-center">
                  <button className="text-xs text-brand hover:underline font-semibold">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted">No hay usuarios que coincidan con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
}
