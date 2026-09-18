import { AdminHeader } from "@/components/admin/admin-header";
import { SesionesClient } from "./sesiones-client";

export default function SesionesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Sesiones activas</h1>
          <p className="text-muted mt-2">Monitorea sesiones de usuarios.</p>
        </div>
        <SesionesClient />
      </div>
    </div>
  );
}
