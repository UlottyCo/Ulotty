"use client";

import { useState } from "react";
import { updateProperty } from "@/app/actions/properties";
import { validateProperty } from "@/lib/validators";
import { showToast } from "../toast";

interface EditarPropiedadModalProps {
  isOpen: boolean;
  property: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EditarPropiedadModal({
  isOpen,
  property,
  onClose,
  onSuccess,
}: EditarPropiedadModalProps) {
  const [formData, setFormData] = useState({
    title: property?.title || "",
    address: property?.address || "",
    type: property?.type || "casa",
    price: property?.price || "",
    area: property?.area || "",
    bedrooms: property?.bedrooms || "",
    status: property?.status || "pendiente",
    description: property?.description || "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateProperty(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      showToast("Por favor completa todos los campos requeridos", "error");
      return;
    }

    setLoading(true);
    try {
      await updateProperty(property.id, {
        ...formData,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
        bedrooms: parseInt(formData.bedrooms) || null,
      });
      showToast("Propiedad actualizada exitosamente", "success");
      onSuccess?.();
      onClose();
    } catch (error) {
      showToast("Error al actualizar la propiedad", "error");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg border border-border w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold">Editar propiedad</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="local">Local</option>
                <option value="terreno">Terreno</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Dirección</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Precio</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Área (m²)
              </label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Habitaciones
              </label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({ ...formData, bedrooms: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Estado</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="pendiente">Pendiente</option>
                <option value="aprobada">Aprobada</option>
                <option value="rechazada">Rechazada</option>
                <option value="activa">Activa</option>
                <option value="vendida">Vendida</option>
                <option value="rentada">Rentada</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-foreground hover:bg-background rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
