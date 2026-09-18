"use client";

import { useEffect, useState } from "react";
import { getReports } from "@/app/actions/reports";

export function ReportesClient() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getReports();
        setReports(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="py-8 text-center">Cargando...</div>;

  const reportTypes = [
    { type: "ventas", label: "Reporte de Ventas", icon: "📊", color: "bg-green-100 text-green-700" },
    { type: "usuarios", label: "Reporte de Usuarios", icon: "👥", color: "bg-blue-100 text-blue-700" },
    { type: "propiedades", label: "Reporte de Propiedades", icon: "🏠", color: "bg-purple-100 text-purple-700" },
    { type: "financiero", label: "Reporte Financiero", icon: "💰", color: "bg-orange-100 text-orange-700" },
    { type: "auditoria", label: "Reporte de Auditoría", icon: "🔍", color: "bg-red-100 text-red-700" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-5 gap-4">
        {reportTypes.map((type) => (
          <div key={type.type} className={`${type.color} rounded-lg border p-6 text-center cursor-pointer hover:shadow-lg transition`}>
            <div className="text-3xl mb-2">{type.icon}</div>
            <p className="font-semibold text-sm">{type.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="font-bold text-lg mb-4">Reportes generados</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold">Título</th>
                <th className="text-left py-3 px-4 font-semibold">Periodo</th>
                <th className="text-left py-3 px-4 font-semibold">Generado por</th>
                <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                <th className="text-left py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 capitalize">{report.report_type}</td>
                  <td className="py-3 px-4 font-semibold">{report.title}</td>
                  <td className="py-3 px-4 text-sm">
                    {report.period_start} a {report.period_end}
                  </td>
                  <td className="py-3 px-4 text-sm">{report.generated_by?.full_name || "—"}</td>
                  <td className="py-3 px-4 text-sm text-muted">
                    {new Date(report.generated_at).toLocaleDateString('es-MX')}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-xs text-brand hover:underline">Descargar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reports.length === 0 && (
            <div className="text-center py-8 text-muted">Sin reportes generados</div>
          )}
        </div>
      </div>
    </div>
  );
}
