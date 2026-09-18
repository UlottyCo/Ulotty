/**
 * Utility functions for exporting data to CSV format
 */

export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Get headers from first object keys
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Handle values with commas or quotes
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportPropertiesToCSV(properties: any[]) {
  const data = properties.map((p) => ({
    ID: p.id?.substring(0, 8),
    Título: p.title,
    Dirección: p.address,
    Tipo: p.type,
    Precio: `$${p.price?.toLocaleString()}`,
    Área: `${p.area} m²`,
    Habitaciones: p.bedrooms,
    Baños: p.bathrooms,
    Ciudad: p.city,
    Estado: p.status,
    "Fecha Creación": new Date(p.created_at).toLocaleDateString("es-MX"),
  }));

  exportToCSV(data, "propiedades");
}

export function exportUsersToCSV(users: any[]) {
  const data = users.map((u) => ({
    ID: u.id?.substring(0, 8),
    Nombre: u.full_name,
    Email: u.email,
    Teléfono: u.phone,
    Rol: u.role,
    Verificado: u.verified ? "Sí" : "No",
    Activo: u.active ? "Sí" : "No",
    Calificación: u.rating,
    "Fecha Registro": new Date(u.created_at).toLocaleDateString("es-MX"),
  }));

  exportToCSV(data, "usuarios");
}

export function exportOperationsToCSV(operations: any[]) {
  const data = operations.map((o) => ({
    ID: o.id?.substring(0, 8),
    Propiedad: o.property?.title,
    Tipo: o.transaction_type,
    Monto: `$${o.amount?.toLocaleString()}`,
    Estado: o.status,
    "Método Pago": o.payment_method,
    "Fecha Pago": o.payment_date ? new Date(o.payment_date).toLocaleDateString("es-MX") : "—",
    "Fecha Creación": new Date(o.created_at).toLocaleDateString("es-MX"),
  }));

  exportToCSV(data, "operaciones");
}

export function exportCommissionsToCSV(commissions: any[]) {
  const data = commissions.map((c) => ({
    ID: c.id?.substring(0, 8),
    Agente: c.agent?.full_name,
    Operación: c.operation_id?.substring(0, 8),
    Monto: `$${c.amount?.toLocaleString()}`,
    Porcentaje: `${c.percentage}%`,
    Estado: c.status,
    "Fecha Pago": c.payment_date ? new Date(c.payment_date).toLocaleDateString("es-MX") : "—",
    "Fecha Creación": new Date(c.created_at).toLocaleDateString("es-MX"),
  }));

  exportToCSV(data, "comisiones");
}
