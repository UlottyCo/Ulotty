"use client";

export function SystemStatus() {
  const services = [
    {
      name: "API Status",
      status: "active",
      responseTime: "45ms",
      uptime: "99.9%",
    },
    {
      name: "Database",
      status: "active",
      responseTime: "12ms",
      uptime: "99.99%",
    },
    {
      name: "Storage",
      status: "active",
      responseTime: "78ms",
      uptime: "99.95%",
    },
    {
      name: "Email Service",
      status: "active",
      responseTime: "234ms",
      uptime: "99.5%",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "error":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "🟢 Activo";
      case "warning":
        return "🟡 Advertencia";
      case "error":
        return "🔴 Error";
      default:
        return "⚪ Desconocido";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {services.map((service) => (
        <div key={service.name} className="bg-gradient-to-br from-background to-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-foreground">{service.name}</h3>
              <p className={`text-sm font-semibold mt-2 ${getStatusColor(service.status)}`}>
                {getStatusBadge(service.status)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted mb-1">Respuesta</p>
              <p className="text-lg font-bold text-brand">{service.responseTime}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">Uptime</p>
              <p className="text-lg font-bold text-green-600">{service.uptime}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
