import { AdminHeader } from "@/components/admin/admin-header";
import { UsuariosContent } from "@/components/admin/usuarios-content";

export default async function UsuariosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header with Search */}
      <AdminHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Gestión de usuarios</h1>
            <p className="text-muted mt-2">
              Administra todos los usuarios del sistema, revisa su actividad y gestiona permisos.
            </p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Invitar usuario
          </button>
        </div>

        {/* Content */}
        <UsuariosContent />
      </div>
    </div>
  );
}
