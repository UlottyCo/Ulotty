"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { PropiedadesContent } from "@/components/admin/propiedades-content";
import { CrearPropiedadModal } from "@/components/admin/modals/crear-propiedad-modal";

export function PropiedadesPageClient() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Gestión de propiedades</h1>
            <p className="text-muted mt-2">
              Administra todas las propiedades del sistema, revisa su estado y realiza acciones.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition"
          >
            + Nueva propiedad
          </button>
        </div>

        <PropiedadesContent key={refreshKey} />
      </div>

      <CrearPropiedadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
