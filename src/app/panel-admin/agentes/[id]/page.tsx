import { AdminHeader } from "@/components/admin/admin-header";
import { AgenteClient } from "./agente-cliente";

interface AgentePageProps {
  params: Promise<{ id: string }>;
}

export default async function AgentePage({ params }: AgentePageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <a href="/panel-admin/agentes" className="text-sm text-brand hover:underline">
            ← Agentes
          </a>
        </div>
        <AgenteClient agentId={id} />
      </div>
    </div>
  );
}
