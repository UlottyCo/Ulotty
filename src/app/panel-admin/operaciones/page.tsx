import { AdminHeader } from "@/components/admin/admin-header";
import { OperacionesClient } from "./operaciones-client";

export default function OperacionesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Operaciones</h1>
          <p className="text-muted mt-2">Gestiona todas las transacciones y operaciones del sistema.</p>
        </div>
        <OperacionesClient />
      </div>
    </div>
  );
}
