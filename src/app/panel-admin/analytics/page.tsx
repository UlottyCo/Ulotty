import { AdminHeader } from "@/components/admin/admin-header";
import { Sidebar } from "@/components/admin/sidebar";
import { AnalyticsClient } from "./analytics-client";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <Sidebar />

      <div className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Analytics</h1>
            <p className="text-muted mt-2">
              Visualiza el desempeño y crecimiento de tu plataforma
            </p>
          </div>

          <AnalyticsClient />
        </div>
      </div>
    </div>
  );
}
