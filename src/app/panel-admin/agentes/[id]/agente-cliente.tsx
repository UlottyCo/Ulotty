"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/app/actions/users";

export function AgenteClient({ agentId }: { agentId: string }) {
  const router = useRouter();
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("detalles");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getUserById(agentId);
        setAgent(data);
        setFormData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [agentId]);

  const handleUpdate = async () => {
    try {
      await updateUser(agentId, formData);
      setAgent(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <div className="py-8 text-center">Cargando...</div>;
  if (!agent) return <div className="py-8 text-center text-red-600">Agente no encontrado</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{agent.full_name}</h1>
          <p className="text-muted mt-2">{agent.email}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90"
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Contactar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Rol</div>
          <div className="text-lg font-bold text-brand capitalize">{agent.role || "—"}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Verificado</div>
          <div className={`text-sm font-bold px-2 py-1 rounded w-fit ${
            agent.verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}>
            {agent.verified ? "Sí" : "No"}
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Propiedades</div>
          <div className="text-2xl font-bold text-blue-600">12</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Comisiones</div>
          <div className="text-2xl font-bold text-green-600">$48,250</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="flex border-b border-border">
          {["detalles", "propiedades", "historial"].map((tab) => (
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
                      <label className="block text-sm font-semibold mb-2">Nombre completo</label>
                      <input
                        type="text"
                        value={formData.full_name || ""}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Teléfono</label>
                      <input
                        type="tel"
                        value={formData.phone || ""}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Rol</label>
                      <select
                        value={formData.role || ""}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      >
                        <option>agente</option>
                        <option>admin</option>
                        <option>usuario</option>
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
                    <p className="text-sm text-muted mb-1">Email</p>
                    <p className="font-semibold">{agent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Teléfono</p>
                    <p className="font-semibold">{agent.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Rol</p>
                    <p className="font-semibold capitalize">{agent.role || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Creado</p>
                    <p className="font-semibold">{agent.created_at ? new Date(agent.created_at).toLocaleDateString('es-MX') : "—"}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "propiedades" && (
            <div className="text-center text-muted py-8">
              Ver propiedades del agente
            </div>
          )}

          {activeTab === "historial" && (
            <div className="text-center text-muted py-8">
              No hay historial disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
