export function MessagesSection() {
  const messages = [
    {
      id: 1,
      from: "Juan López",
      text: "¿Cuáles son las condiciones de renta?",
      time: "hace 2h",
      unread: true,
    },
    {
      id: 2,
      from: "María García",
      text: "Me interesa mucho la propiedad...",
      time: "hace 5h",
      unread: true,
    },
    {
      id: 3,
      from: "Carlos Ruiz",
      text: "¿Puedo visitar el martes?",
      time: "ayer",
      unread: false,
    },
    {
      id: 4,
      from: "Ana Martínez",
      text: "Gracias por la información",
      time: "2 días",
      unread: false,
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Mensajes Recientes</h2>
        <a href="#" className="text-sm text-brand hover:underline">
          Ver todos →
        </a>
      </div>

      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg p-3 cursor-pointer hover:bg-subtle/50 transition ${
              msg.unread ? "bg-subtle/30 border border-brand/20" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm">{msg.from}</p>
                <p className="mt-1 text-xs text-muted line-clamp-2">
                  {msg.text}
                </p>
              </div>
              {msg.unread && (
                <div className="ml-2 mt-1 h-2 w-2 rounded-full bg-brand flex-shrink-0" />
              )}
            </div>
            <p className="mt-2 text-xs text-muted">{msg.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
