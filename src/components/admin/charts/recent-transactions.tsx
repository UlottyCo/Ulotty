"use client";

import { useEffect, useState } from "react";
import { getOperations } from "@/app/actions/operations";

export function RecentTransactions() {
  const [operations, setOperations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getOperations();
        setOperations((data || []).slice(0, 5));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando transacciones...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Propiedad</th>
            <th className="text-left py-3 px-4 font-semibold">Tipo</th>
            <th className="text-left py-3 px-4 font-semibold">Monto</th>
            <th className="text-left py-3 px-4 font-semibold">Estado</th>
            <th className="text-left py-3 px-4 font-semibold">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((op) => (
            <tr key={op.id} className="border-b border-border hover:bg-background transition">
              <td className="py-3 px-4 font-semibold">{op.property_title || "—"}</td>
              <td className="py-3 px-4 text-sm capitalize">{op.type || "—"}</td>
              <td className="py-3 px-4 font-bold">${op.amount?.toLocaleString() || "—"}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  op.status === "completada" ? "bg-green-100 text-green-700" :
                  op.status === "pendiente" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {op.status}
                </span>
              </td>
              <td className="py-3 px-4 text-muted text-sm">
                {op.created_at ? new Date(op.created_at).toLocaleDateString('es-MX') : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {operations.length === 0 && (
        <div className="text-center py-8 text-muted">Sin transacciones recientes</div>
      )}
    </div>
  );
}
