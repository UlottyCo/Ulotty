import { AdminHeader } from "@/components/admin/admin-header";
import { DashboardContent } from "@/components/admin/dashboard-content";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header with Search */}
      <AdminHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted mt-2">
            Visión general del sistema y métricas clave.
          </p>
        </div>

        {/* Content */}
        <DashboardContent />
      </div>
    </div>
  );
}
