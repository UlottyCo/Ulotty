import { AdminHeader } from "@/components/admin/admin-header";
import { AnalyticsClient } from "./analytics-client";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Analytics</h1>
          <p className="text-muted mt-2">Análisis de tráfico y comportamiento de usuarios.</p>
        </div>
        <AnalyticsClient />
      </div>
    </div>
  );
}
