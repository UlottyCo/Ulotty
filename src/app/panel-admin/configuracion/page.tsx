import { AdminHeader } from "@/components/admin/admin-header";
import { ConfiguracionClient } from "./configuracion-client";

export default function ConfigPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Configuración</h1>
          <p className="text-muted mt-2">Ajusta los parámetros del sistema.</p>
        </div>
        <ConfiguracionClient />
      </div>
    </div>
  );
}
