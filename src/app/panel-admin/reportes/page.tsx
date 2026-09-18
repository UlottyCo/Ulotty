import { AdminHeader } from "@/components/admin/admin-header";
import { ReportesClient } from "./reportes-client";

export default function ReportesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Reportes</h1>
          <p className="text-muted mt-2">Genera y gestiona reportes del sistema.</p>
        </div>
        <ReportesClient />
      </div>
    </div>
  );
}
