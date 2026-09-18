"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPropertyById, updateProperty, deleteProperty } from "@/app/actions/properties";

export function PropiedadClient({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("detalles");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPropertyById(propertyId);
        setProperty(data);
        setFormData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyId]);

  const handleUpdate = async () => {
    try {
      await updateProperty(propertyId, formData);
      setProperty(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Eliminar esta propiedad?")) return;
    try {
      await deleteProperty(propertyId);
      router.push("/panel-admin/propiedades");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <div className="py-8 text-center">Cargando...</div>;
  if (!property) return <div className="py-8 text-center text-red-600">Propiedad no encontrada</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <p className="text-muted mt-2">{property.address}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90"
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Precio</div>
          <div className="text-2xl font-bold text-brand">
            ${property.price?.toLocaleString() || 0}
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Área (m²)</div>
          <div className="text-2xl font-bold text-blue-600">{property.area || 0}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Habitaciones</div>
          <div className="text-2xl font-bold text-green-600">{property.bedrooms || 0}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Estado</div>
          <div className={`text-sm font-bold px-2 py-1 rounded w-fit ${
            property.status === "aprobada" ? "bg-green-100 text-green-700" :
            property.status === "pendiente" ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-700"
          }`}>
            {property.status}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="flex border-b border-border">
          {["detalles", "historia", "documentos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold capitalize ${
                activeTab === tab
                  ? "text-brand border-b-2 border-brand"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "detalles" && (
            <div className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Título</label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Precio</label>
                      <input
                        type="number"
                        value={formData.price || ""}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Área (m²)</label>
                      <input
                        type="number"
                        value={formData.area || ""}
                        onChange={(e) => setFormData({ ...formData, area: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Estado</label>
                      <select
                        value={formData.status || ""}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      >
                        <option>aprobada</option>
                        <option>pendiente</option>
                        <option>rechazada</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={handleUpdate}
                    className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90"
                  >
                    Guardar cambios
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted mb-1">Dirección</p>
                    <p className="font-semibold">{property.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Tipo</p>
                    <p className="font-semibold">{property.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Descripción</p>
                    <p className="font-semibold">{property.description || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Propietario</p>
                    <p className="font-semibold">{property.owner_id || "—"}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "historia" && (
            <div className="text-center text-muted py-8">
              No hay historial disponible
            </div>
          )}

          {activeTab === "documentos" && (
            <div className="text-center text-muted py-8">
              No hay documentos disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
