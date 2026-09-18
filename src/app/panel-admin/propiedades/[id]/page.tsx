import { AdminHeader } from "@/components/admin/admin-header";
import { PropiedadClient } from "./propiedad-cliente";

interface PropiedadPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropiedadPage({ params }: PropiedadPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <a href="/panel-admin/propiedades" className="text-sm text-brand hover:underline">
            ← Propiedades
          </a>
        </div>
        <PropiedadClient propertyId={id} />
      </div>
    </div>
  );
}
