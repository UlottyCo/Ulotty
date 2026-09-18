"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserById, updateUser, suspendUser } from "@/app/actions/users";
import { EditarUsuarioModal } from "@/components/admin/modals/editar-usuario-modal";
import { showToast } from "@/components/admin/toast";

export function UsuarioClient({ userId }: { userId: string }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      const data = await getUserById(userId);
      setUser(data);
    } catch (error) {
      console.error("Error:", error);
      showToast("Error al cargar el usuario", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSuspend = async () => {
    setUpdating(true);
    try {
      await suspendUser(userId);
      setUser({ ...user, active: !user.active });
      showToast(
        user.active ? "Usuario suspendido" : "Usuario reactivado",
        "success"
      );
    } catch (error) {
      showToast("Error al actualizar usuario", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleVerify = async () => {
    setUpdating(true);
    try {
      await updateUser(userId, { verified: true });
      setUser({ ...user, verified: true });
      showToast("Usuario verificado", "success");
    } catch (error) {
      showToast("Error al verificar usuario", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin">⏳</div>
        <span className="ml-2">Cargando usuario...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <p className="text-red-600 font-semibold">⚠️ Usuario no encontrado</p>
        <a href="/panel-admin/usuarios" className="text-sm text-brand hover:underline mt-4 inline-block">
          ← Volver a usuarios
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{user.full_name}</h1>
          <p className="text-muted mt-2 flex items-center gap-2">
            📧 {user.email}
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
            onClick={handleToggleSuspend}
            disabled={updating}
            className={`px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 text-white ${
              user.active ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {user.active ? "⏸️ Suspender" : "✅ Reactivar"}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">👤 Rol</div>
          <div className="text-lg font-bold text-brand capitalize">{user.role || "—"}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">⭐ Calificación</div>
          <div className="text-lg font-bold text-yellow-600">
            {user.rating ? `${user.rating}/5.0` : "Sin calificación"}
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">✅ Verificado</div>
          <div className={`text-sm font-bold px-2 py-1 rounded w-fit ${
            user.verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}>
            {user.verified ? "Sí" : "No"}
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">📱 Estado</div>
          <div className={`text-sm font-bold px-2 py-1 rounded w-fit ${
            user.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {user.active ? "Activo" : "Suspendido"}
          </div>
        </div>
      </div>

      {/* Verificación */}
      {!user.verified && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-yellow-900">⚠️ Usuario no verificado</p>
              <p className="text-sm text-yellow-700 mt-1">Este usuario aún no ha sido verificado en el sistema</p>
            </div>
            <button
              onClick={handleVerify}
              disabled={updating}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition"
            >
              Verificar ahora
            </button>
          </div>
        </div>
      )}

      {/* Detalles */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold mb-6">Información del usuario</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted mb-1">Teléfono</p>
            <p className="font-semibold text-foreground">{user.phone || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Ubicación</p>
            <p className="font-semibold text-foreground">{user.location || "—"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-muted mb-1">Biografía</p>
            <p className="font-semibold text-foreground">{user.bio || "Sin biografía"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-muted mb-1">Fecha de registro</p>
            <p className="font-semibold text-foreground">
              {new Date(user.created_at).toLocaleDateString("es-MX")}
            </p>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      <EditarUsuarioModal
        isOpen={editModalOpen}
        user={user}
        onClose={() => setEditModalOpen(false)}
        onSuccess={loadUser}
      />
    </div>
  );
}
