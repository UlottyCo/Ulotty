interface PropiedadItem {
  id: string;
  titulo: string;
  direccion: string;
  tipo: string;
  precio: string;
  agente: string;
  estado: "activa" | "pendiente" | "rechazada" | "draft";
  vistas: number;
  contactos: number;
  fecha: string;
}

interface PropiedadesTablaProps {
  filterStatus: string;
  filterType: string;
}

const propiedades: PropiedadItem[] = [
  {
    id: "P001",
    titulo: "Casa moderna en Rosarito",
    direccion: "Blvd. Benito Juárez 1234, Rosarito",
    tipo: "Casa",
    precio: "$850,000",
    agente: "Juan Pérez",
    estado: "activa",
    vistas: 324,
    contactos: 42,
    fecha: "15 sep 2026",
  },
  {
    id: "P002",
    titulo: "Departamento céntrico en Tijuana",
    direccion: "Av. Revolución 567, Tijuana",
    tipo: "Departamento",
    precio: "$420,000",
    agente: "María García",
    estado: "activa",
    vistas: 542,
    contactos: 78,
    fecha: "12 sep 2026",
  },
  {
    id: "P003",
    titulo: "Terreno comercial en Ensenada",
    direccion: "Carr. Transpeninsular km 180, Ensenada",
    tipo: "Terreno",
    precio: "$1,200,000",
    agente: "Carlos López",
    estado: "pendiente",
    vistas: 128,
    contactos: 15,
    fecha: "14 sep 2026",
  },
  {
    id: "P004",
    titulo: "Oficinas premium en Tijuana",
    direccion: "Centro de Negocios, Av. Paseo de los Héroes",
    tipo: "Comercial",
    precio: "$2,500,000",
    agente: "Juan Pérez",
    estado: "activa",
    vistas: 213,
    contactos: 31,
    fecha: "10 sep 2026",
  },
  {
    id: "P005",
    titulo: "Casa de playa en Rosarito",
    direccion: "Zona Playas, Rosarito",
    tipo: "Casa",
    precio: "$1,400,000",
    agente: "Ana Martínez",
    estado: "rechazada",
    vistas: 87,
    contactos: 8,
    fecha: "8 sep 2026",
  },
  {
    id: "P006",
    titulo: "Departamento Tres Ríos",
    direccion: "Tres Ríos, Av. Mirador",
    tipo: "Departamento",
    precio: "$580,000",
    agente: "María García",
    estado: "activa",
    vistas: 456,
    contactos: 63,
    fecha: "13 sep 2026",
  },
];

export function PropiedadesTabla({ filterStatus, filterType }: PropiedadesTablaProps) {
  const filtered = propiedades.filter((p) => {
    const statusMatch = filterStatus === "todas" || p.estado === filterStatus;
    const typeMatch =
      filterType === "todas" || p.tipo.toLowerCase().includes(filterType.toLowerCase());
    return statusMatch && typeMatch;
  });

  const getEstadoBadge = (estado: string) => {
    const badgeClasses = {
      activa: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      pendiente: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
      rechazada: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
      draft: "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300",
    };
    return badgeClasses[estado as keyof typeof badgeClasses] || badgeClasses.draft;
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted mb-4">Mostrando {filtered.length} de {propiedades.length} propiedades</div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Propiedad</th>
              <th className="text-left py-3 px-4 font-semibold">Tipo</th>
              <th className="text-left py-3 px-4 font-semibold">Precio</th>
              <th className="text-left py-3 px-4 font-semibold">Agente</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-center py-3 px-4 font-semibold">Vistas</th>
              <th className="text-center py-3 px-4 font-semibold">Contactos</th>
              <th className="text-left py-3 px-4 font-semibold">Fecha</th>
              <th className="text-center py-3 px-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((propiedad) => (
              <tr key={propiedad.id} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-semibold">{propiedad.titulo}</p>
                    <p className="text-xs text-muted">{propiedad.direccion}</p>
                  </div>
                </td>
                <td className="py-3 px-4">{propiedad.tipo}</td>
                <td className="py-3 px-4 font-semibold">{propiedad.precio}</td>
                <td className="py-3 px-4">{propiedad.agente}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getEstadoBadge(propiedad.estado)}`}>
                    {propiedad.estado.charAt(0).toUpperCase() + propiedad.estado.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-center text-muted">{propiedad.vistas}</td>
                <td className="py-3 px-4 text-center text-muted">{propiedad.contactos}</td>
                <td className="py-3 px-4 text-xs text-muted">{propiedad.fecha}</td>
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
          <p className="text-muted">No hay propiedades que coincidan con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
}
