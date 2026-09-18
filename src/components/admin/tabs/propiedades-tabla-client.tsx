"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProperties, updateProperty, deleteProperty } from "@/app/actions/properties";
import { ConfirmarEliminarModal } from "../modals/confirmar-eliminar-modal";

interface PropiedadesTablaClientProps {
  filterStatus?: string;
  filterType?: string;
}

export function PropiedadesTablaClient({ filterStatus, filterType }: PropiedadesTablaClientProps) {
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id?: string; title?: string }>({ isOpen: false });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadProperties() {
      try {
        const filters: any = {};
        if (filterStatus && filterStatus !== "todas") {
          filters.status = filterStatus;
        }
        if (filterType && filterType !== "todas") {
          filters.type = filterType;
        }
        const data = await getProperties(filters);
        setProperties(data || []);
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, [filterStatus, filterType]);

  const handleApprove = async (id: string) => {
    try {
      await updateProperty(id, { status: "aprobada" });
      setProperties(properties.map(p => p.id === id ? { ...p, status: "aprobada" } : p));
    } catch (error) {
      console.error("Error approving property:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateProperty(id, { status: "rechazada" });
      setProperties(properties.map(p => p.id === id ? { ...p, status: "rechazada" } : p));
    } catch (error) {
      console.error("Error rejecting property:", error);
    }
  };

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteModal({ isOpen: true, id, title });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.id) return;
    setDeleting(true);
    try {
      await deleteProperty(deleteModal.id);
      setProperties(properties.filter(p => p.id !== deleteModal.id));
      setDeleteModal({ isOpen: false });
    } catch (error) {
      console.error("Error deleting property:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando propiedades...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Propiedad</th>
            <th className="text-left py-3 px-4 font-semibold">Tipo</th>
            <th className="text-left py-3 px-4 font-semibold">Operación</th>
            <th className="text-left py-3 px-4 font-semibold">Precio</th>
            <th className="text-left py-3 px-4 font-semibold">Ubicación</th>
            <th className="text-left py-3 px-4 font-semibold">Estado</th>
            <th className="text-left py-3 px-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.id} className="border-b border-border hover:bg-background transition">
              <td className="py-3 px-4">
                <div className="font-semibold text-foreground">{prop.title || "Sin título"}</div>
                <div className="text-xs text-muted">{prop.owner_id?.substring(0, 8)}...</div>
              </td>
              <td className="py-3 px-4 text-sm">{prop.type || "—"}</td>
              <td className="py-3 px-4 text-sm">{prop.operation || "—"}</td>
              <td className="py-3 px-4 text-sm font-semibold">${prop.price?.toLocaleString() || "—"}</td>
              <td className="py-3 px-4 text-sm text-muted">{prop.city || prop.location || "—"}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  prop.status === "aprobada" ? "bg-green-100 text-green-700" :
                  prop.status === "pendiente" ? "bg-yellow-100 text-yellow-700" :
                  prop.status === "rechazada" ? "bg-red-100 text-red-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {prop.status || "—"}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-1">
                  <button
                    onClick={() => router.push(`/panel-admin/propiedades/${prop.id}`)}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded transition"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => router.push(`/panel-admin/propiedades/${prop.id}`)}
                    className="text-xs px-2 py-1 bg-brand/10 text-brand hover:bg-brand/20 rounded transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(prop.id, prop.title)}
                    className="text-xs px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded transition"
                  >
                    Eliminar
                  </button>
                  {prop.status === "pendiente" && (
                    <>
                      <button
                        onClick={() => handleApprove(prop.id)}
                        className="text-xs px-2 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded transition"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleReject(prop.id)}
                        className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded transition"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {properties.length === 0 && (
        <div className="text-center py-8 text-muted">No hay propiedades que mostrar</div>
      )}

      <ConfirmarEliminarModal
        isOpen={deleteModal.isOpen}
        title="Eliminar propiedad"
        message={`¿Está seguro que desea eliminar la propiedad "${deleteModal.title}"? Esta acción no se puede deshacer.`}
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false })}
      />
    </div>
  );
}
