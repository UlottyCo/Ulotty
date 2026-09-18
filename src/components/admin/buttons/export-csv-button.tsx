"use client";

import { exportPropertiesToCSV, exportUsersToCSV, exportOperationsToCSV, exportCommissionsToCSV } from "@/lib/export";

interface ExportCSVButtonProps {
  data: any[];
  type: "properties" | "users" | "operations" | "commissions";
  label?: string;
}

export function ExportCSVButton({ data, type, label }: ExportCSVButtonProps) {
  const handleExport = () => {
    switch (type) {
      case "properties":
        exportPropertiesToCSV(data);
        break;
      case "users":
        exportUsersToCSV(data);
        break;
      case "operations":
        exportOperationsToCSV(data);
        break;
      case "commissions":
        exportCommissionsToCSV(data);
        break;
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={data.length === 0}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition text-sm font-semibold"
    >
      📥 {label || "Descargar CSV"}
    </button>
  );
}
