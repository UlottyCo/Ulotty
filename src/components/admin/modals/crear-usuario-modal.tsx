"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/server";

interface CrearUsuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CrearUsuarioModal({ isOpen, onClose, onSuccess }: CrearUsuarioModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    phone: "",
    role: "agente",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = await createClient();
      const { data, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        email_confirm: true,
      });

      if (authError || !data.user) {
        throw new Error(authError?.message || "Error creating user");
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          email: formData.email,
          full_name: formData.full_name,
          phone: formData.phone,
          role: formData.role,
          company: formData.company,
          verified: false,
        });

      if (profileError) throw new Error(profileError.message);

      setFormData({
        email: "",
        full_name: "",
        phone: "",
        role: "agente",
        company: "",
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error creating user";
      setError(message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg border border-border w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold">Crear usuario</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground text-2xl leading-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Nombre</label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Rol</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="agente">Agente</option>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Empresa</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
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
              {loading ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
