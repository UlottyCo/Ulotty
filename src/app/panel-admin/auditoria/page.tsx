import { AdminHeader } from "@/components/admin/admin-header";
import { AuditoriaClient } from "./auditoria-client";

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Auditoría</h1>
          <p className="text-muted mt-2">Registro de eventos y cambios del sistema.</p>
        </div>
        <AuditoriaClient />
      </div>
    </div>
  );
}
