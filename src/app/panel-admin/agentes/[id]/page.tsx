import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { AgentePerfilContent } from "@/components/admin/agente-perfil-content";

interface AgentePerfilPageProps {
  params: Promise<{ id: string }>;
}

export default async function AgentePerfilPage({ params }: AgentePerfilPageProps) {
  const { id } = await params;

  // Mock agent data - in production, fetch from database
  const agent = {
    id,
    name: "Juan Pérez Morales",
    email: "juan.perez@example.com",
    phone: "+52 661 123 4567",
    verification: "Agente verificado",
    company: "Century 21 Rosarito",
    location: "Rosarito, B.C.",
    rating: 4.8,
    reviews: 36,
    properties: {
      published: 12,
      pending: 5,
      rejected: 2,
    },
    operations: {
      total: 28,
      completed: 24,
    },
    commissions: {
      total: "$482,500 MXN",
      pending: 48,
    },
    verified: true,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header with Search */}
      <AdminHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2">
          <a href="/panel-admin/agentes" className="text-sm text-brand hover:underline">
            ← Usuarios
          </a>
          <span className="text-sm text-muted">Detalles de usuario</span>
        </div>

        {/* Content */}
        <AgentePerfilContent agent={agent} />
      </div>
    </div>
  );
}
