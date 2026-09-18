export function TasksSection() {
  const tasks = [
    {
      id: 1,
      title: "Responder consulta sobre servicios",
      dueDate: "Hoy",
      priority: "alta",
      completed: false,
    },
    {
      id: 2,
      title: "Actualizar fotos de la propiedad",
      dueDate: "Mañana",
      priority: "media",
      completed: false,
    },
    {
      id: 3,
      title: "Confirmar visita con cliente",
      dueDate: "20 sep",
      priority: "alta",
      completed: false,
    },
    {
      id: 4,
      title: "Enviar contrato de renta",
      dueDate: "Completada",
      priority: "media",
      completed: true,
    },
  ];

  const priorityColors: Record<string, string> = {
    alta: "bg-red-100 text-red-700",
    media: "bg-yellow-100 text-yellow-700",
    baja: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tareas Pendientes</h2>
        <a href="#" className="text-sm text-brand hover:underline">
          Ver todas →
        </a>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 rounded-lg border border-border/50 p-3 ${
              task.completed ? "opacity-60" : ""
            }`}
          >
            <input
              type="checkbox"
              defaultChecked={task.completed}
              className="h-4 w-4 cursor-pointer rounded"
            />
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  task.completed ? "line-through text-muted" : ""
                }`}
              >
                {task.title}
              </p>
              <p className="mt-1 text-xs text-muted">{task.dueDate}</p>
            </div>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                priorityColors[task.priority] || "bg-gray-100 text-gray-700"
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
