import { AdminHeader } from "@/components/admin/admin-header";
import { UsuarioClient } from "./usuario-cliente";

interface UsuarioPageProps {
  params: Promise<{ id: string }>;
}

export default async function UsuarioPage({ params }: UsuarioPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <a href="/panel-admin/usuarios" className="text-sm text-brand hover:underline">
            ← Usuarios
          </a>
        </div>
        <UsuarioClient userId={id} />
      </div>
    </div>
  );
}
