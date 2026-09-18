import { AdminHeader } from "@/components/admin/admin-header";
import { SeguridadClient } from "./seguridad-client";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Seguridad del sistema</h1>
          <p className="text-muted mt-2">Protege tu plataforma.</p>
        </div>
        <SeguridadClient />
      </div>
    </div>
  );
}
