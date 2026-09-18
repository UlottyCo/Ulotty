import { AdminHeader } from "@/components/admin/admin-header";
import { ComisionesClient } from "./comisiones-client";

export default function ComisionesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Comisiones de agentes</h1>
          <p className="text-muted mt-2">Gestiona y monitorea las comisiones de los agentes.</p>
        </div>
        <ComisionesClient />
      </div>
    </div>
  );
}
