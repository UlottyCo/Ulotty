"use client";

import { useRouter } from "next/navigation";

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      icon: "🏠",
      label: "Nueva Propiedad",
      description: "Crear una nueva propiedad",
      action: () => router.push("/panel-admin/propiedades"),
      color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    },
    {
      icon: "👤",
      label: "Nuevo Usuario",
      description: "Agregar un nuevo usuario",
      action: () => router.push("/panel-admin/agentes"),
      color: "bg-green-100 text-green-700 hover:bg-green-200",
    },
    {
      icon: "📊",
      label: "Ver Reportes",
      description: "Generar reportes",
      action: () => router.push("/panel-admin/reportes"),
      color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    },
    {
      icon: "⚙️",
      label: "Configuración",
      description: "Ajustar configuraciones",
      action: () => router.push("/panel-admin/configuracion"),
      color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.action}
          className={`${action.color} rounded-lg border border-current border-opacity-20 p-6 text-center transition transform hover:scale-105 cursor-pointer`}
        >
          <div className="text-3xl mb-2">{action.icon}</div>
          <div className="font-semibold text-sm">{action.label}</div>
          <div className="text-xs opacity-75 mt-1">{action.description}</div>
        </button>
      ))}
    </div>
  );
}
