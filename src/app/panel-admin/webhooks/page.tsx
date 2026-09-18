import { AdminHeader } from "@/components/admin/admin-header";
import { WebhooksClient } from "./webhooks-client";

export default function WebhooksPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Webhooks</h1>
          <p className="text-muted mt-2">Gestiona webhooks.</p>
        </div>
        <WebhooksClient />
      </div>
    </div>
  );
}
