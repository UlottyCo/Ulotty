import { AdminHeader } from "@/components/admin/admin-header";
import { SeguridadSistemaContent } from "@/components/admin/seguridad-sistema-content";

export default async function SeguridadPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header with Search */}
      <AdminHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Seguridad del sistema</h1>
          <p className="text-muted mt-2">
            Protege la plataforma, la información y la confianza de nuestros usuarios.
          </p>
        </div>

        {/* Content */}
        <SeguridadSistemaContent />
      </div>
    </div>
  );
}
