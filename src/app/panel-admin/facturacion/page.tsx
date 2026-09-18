import { AdminHeader } from "@/components/admin/admin-header";
import { FacturacionClient } from "./facturacion-client";

export default function FacturacionPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Facturación</h1>
          <p className="text-muted mt-2">Gestiona facturas e invoices.</p>
        </div>
        <FacturacionClient />
      </div>
    </div>
  );
}
