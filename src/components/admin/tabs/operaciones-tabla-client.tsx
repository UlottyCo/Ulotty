"use client";

import { useEffect, useState } from "react";
import { getOperations, updateOperation } from "@/app/actions/operations";

interface OperacionesTablaClientProps {
  filterStatus?: string;
}

export function OperacionesTablaClient({ filterStatus }: OperacionesTablaClientProps) {
  const [operations, setOperations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOperations() {
      try {
        const filters: any = {};
        if (filterStatus && filterStatus !== "todas") {
          filters.status = filterStatus;
        }
        const data = await getOperations(filters);
        setOperations(data || []);
      } catch (error) {
        console.error("Error loading operations:", error);
      } finally {
        setLoading(false);
      }
    }
    loadOperations();
  }, [filterStatus]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateOperation(id, { status });
      setOperations(operations.map(op => op.id === id ? { ...op, status } : op));
    } catch (error) {
      console.error("Error updating operation:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando operaciones...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completada":
        return "bg-green-100 text-green-700";
      case "en_proceso":
        return "bg-blue-100 text-blue-700";
      case "pendiente":
        return "bg-yellow-100 text-yellow-700";
      case "cancelada":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Propiedad</th>
            <th className="text-left py-3 px-4 font-semibold">Tipo</th>
            <th className="text-left py-3 px-4 font-semibold">Monto</th>
            <th className="text-left py-3 px-4 font-semibold">Estado</th>
            <th className="text-left py-3 px-4 font-semibold">Método pago</th>
            <th className="text-left py-3 px-4 font-semibold">Fecha</th>
            <th className="text-left py-3 px-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((op) => (
            <tr key={op.id} className="border-b border-border hover:bg-background transition">
              <td className="py-3 px-4">
                <div className="font-semibold text-foreground">{op.property?.title || "—"}</div>
              </td>
              <td className="py-3 px-4 text-sm capitalize">{op.transaction_type || "—"}</td>
              <td className="py-3 px-4 font-semibold">${op.amount?.toLocaleString() || "—"}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(op.status)}`}>
                  {op.status || "—"}
                </span>
              </td>
              <td className="py-3 px-4 text-sm">{op.payment_method || "—"}</td>
              <td className="py-3 px-4 text-sm text-muted">
                {op.payment_date ? new Date(op.payment_date).toLocaleDateString('es-MX') : "—"}
              </td>
              <td className="py-3 px-4">
                {op.status === "pendiente" && (
                  <button
                    onClick={() => handleStatusChange(op.id, "en_proceso")}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded transition"
                  >
                    Procesar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {operations.length === 0 && (
        <div className="text-center py-8 text-muted">No hay operaciones que mostrar</div>
      )}
    </div>
  );
}
