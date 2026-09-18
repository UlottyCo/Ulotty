import { AdminHeader } from "@/components/admin/admin-header";
import { NotificacionesClient } from "./notificaciones-client";

export default function NotificacionesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Notificaciones</h1>
          <p className="text-muted mt-2">Centro de notificaciones y alertas del sistema.</p>
        </div>
        <NotificacionesClient />
      </div>
    </div>
  );
}
