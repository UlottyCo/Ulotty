import { AdminHeader } from "@/components/admin/admin-header";
import { PropiedadesContent } from "@/components/admin/propiedades-content";

export default async function PropiedadesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header with Search */}
      <AdminHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Gestión de propiedades</h1>
            <p className="text-muted mt-2">
              Administra todas las propiedades del sistema, revisa su estado y realiza acciones.
            </p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Nueva propiedad
          </button>
        </div>

        {/* Content */}
        <PropiedadesContent />
      </div>
    </div>
  );
}
