"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPropertyById, updateProperty, deleteProperty } from "@/app/actions/properties";
import { EditarPropiedadModal } from "@/components/admin/modals/editar-propiedad-modal";
import { ConfirmarEliminarModal } from "@/components/admin/modals/confirmar-eliminar-modal";
import { showToast } from "@/components/admin/toast";

export function PropiedadClient({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadProperty();
  }, [propertyId]);

  const loadProperty = async () => {
    try {
      const data = await getPropertyById(propertyId);
      setProperty(data);
    } catch (error) {
      console.error("Error:", error);
      showToast("Error al cargar la propiedad", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      await updateProperty(propertyId, { status: newStatus });
      setProperty({ ...property, status: newStatus });
      showToast(`Estado actualizado a ${newStatus}`, "success");
    } catch (error) {
      showToast("Error al actualizar estado", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProperty(propertyId);
      showToast("Propiedad eliminada exitosamente", "success");
      router.push("/panel-admin/propiedades");
    } catch (error) {
      showToast("Error al eliminar la propiedad", "error");
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin">⏳</div>
        <span className="ml-2">Cargando propiedad...</span>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <p className="text-red-600 font-semibold">⚠️ Propiedad no encontrada</p>
        <a href="/panel-admin/propiedades" className="text-sm text-brand hover:underline mt-4 inline-block">
          ← Volver a propiedades
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{property.title}</h1>
          <p className="text-muted mt-2 flex items-center gap-2">
            📍 {property.address}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditModalOpen(true)}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">💰 Precio</div>
          <div className="text-2xl font-bold text-brand">
            ${property.price?.toLocaleString("es-MX") || "0"}
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">📐 Área</div>
          <div className="text-2xl font-bold text-blue-600">{property.area || 0} m²</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">🛏️ Habitaciones</div>
          <div className="text-2xl font-bold text-green-600">{property.bedrooms || 0}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">🚿 Baños</div>
          <div className="text-2xl font-bold text-purple-600">{property.bathrooms || 0}</div>
        </div>
      </div>

      {/* Estado y Acciones */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Estado de la propiedad</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            property.status === "aprobada" ? "bg-green-100 text-green-700" :
            property.status === "pendiente" ? "bg-yellow-100 text-yellow-700" :
            property.status === "rechazada" ? "bg-red-100 text-red-700" :
            property.status === "activa" ? "bg-blue-100 text-blue-700" :
            property.status === "vendida" ? "bg-gray-100 text-gray-700" :
            "bg-purple-100 text-purple-700"
          }`}>
            {property.status}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleStatusChange("pendiente")}
            disabled={updating || property.status === "pendiente"}
            className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 disabled:opacity-50 transition text-sm font-medium"
          >
            ⏳ Pendiente
          </button>
          <button
            onClick={() => handleStatusChange("aprobada")}
            disabled={updating || property.status === "aprobada"}
            className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50 transition text-sm font-medium"
          >
            ✅ Aprobada
          </button>
          <button
            onClick={() => handleStatusChange("rechazada")}
            disabled={updating || property.status === "rechazada"}
            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 transition text-sm font-medium"
          >
            ❌ Rechazada
          </button>
        </div>
      </div>

      {/* Detalles */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold mb-6">Detalles de la propiedad</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted mb-1">Tipo de propiedad</p>
            <p className="font-semibold text-foreground capitalize">{property.type}</p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Tipo de operación</p>
            <p className="font-semibold text-foreground capitalize">{property.operation || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Ciudad</p>
            <p className="font-semibold text-foreground">{property.city || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Código postal</p>
            <p className="font-semibold text-foreground">{property.postal_code || "—"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-muted mb-1">Descripción</p>
            <p className="font-semibold text-foreground">{property.description || "Sin descripción"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-muted mb-1">Fecha de creación</p>
            <p className="font-semibold text-foreground">
              {new Date(property.created_at).toLocaleDateString("es-MX")}
            </p>
          </div>
        </div>
      </div>

      {/* Modales */}
      <EditarPropiedadModal
        isOpen={editModalOpen}
        property={property}
        onClose={() => setEditModalOpen(false)}
        onSuccess={loadProperty}
      />

      <ConfirmarEliminarModal
        isOpen={deleteModalOpen}
        title="Eliminar propiedad"
        message={`¿Está seguro que desea eliminar la propiedad "${property.title}"? Esta acción no se puede deshacer.`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}
