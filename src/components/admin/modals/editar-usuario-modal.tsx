"use client";

import { useState } from "react";
import { updateUser } from "@/app/actions/users";
import { validateUser } from "@/lib/validators";
import { showToast } from "../toast";

interface EditarUsuarioModalProps {
  isOpen: boolean;
  user: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EditarUsuarioModal({
  isOpen,
  user,
  onClose,
  onSuccess,
}: EditarUsuarioModalProps) {
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    role: user?.role || "particular",
    bio: user?.bio || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateUser(formData);
    if (!validation.valid) {
      showToast("Por favor completa todos los campos requeridos", "error");
      return;
    }

    setLoading(true);
    try {
      await updateUser(user.id, formData);
      showToast("Usuario actualizado exitosamente", "success");
      onSuccess?.();
      onClose();
    } catch (error) {
      showToast("Error al actualizar el usuario", "error");
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
          <h2 className="text-xl font-bold">Editar usuario</h2>
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
              <label className="block text-sm font-semibold mb-2">Nombre completo</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Teléfono</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Rol</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="particular">Particular</option>
                <option value="agente">Agente</option>
                <option value="comprador">Comprador</option>
                <option value="desarrolladora">Desarrolladora</option>
                <option value="admin">Admin</option>
                <option value="moderador">Moderador</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Ubicación</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Biografía</label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
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
