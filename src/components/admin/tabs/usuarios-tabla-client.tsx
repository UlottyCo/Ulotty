"use client";

import { useEffect, useState } from "react";
import { getUsers, verifyUser, suspendUser } from "@/app/actions/users";

interface UsuariosTablaClientProps {
  filterRole?: string;
  filterVerified?: boolean;
}

export function UsuariosTablaClient({ filterRole, filterVerified }: UsuariosTablaClientProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const filters: any = {};
        if (filterRole && filterRole !== "todas") {
          filters.role = filterRole;
        }
        if (filterVerified !== undefined) {
          filters.verified = filterVerified;
        }
        const data = await getUsers(filters);
        setUsers(data || []);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [filterRole, filterVerified]);

  const handleVerify = async (id: string) => {
    try {
      await verifyUser(id);
      setUsers(users.map(u => u.id === id ? { ...u, verified: true } : u));
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleSuspend = async (id: string) => {
    try {
      await suspendUser(id);
      setUsers(users.map(u => u.id === id ? { ...u, active: false } : u));
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando usuarios...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Usuario</th>
            <th className="text-left py-3 px-4 font-semibold">Email</th>
            <th className="text-left py-3 px-4 font-semibold">Rol</th>
            <th className="text-left py-3 px-4 font-semibold">Verificado</th>
            <th className="text-left py-3 px-4 font-semibold">Registro</th>
            <th className="text-left py-3 px-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border hover:bg-background transition">
              <td className="py-3 px-4">
                <div className="font-semibold text-foreground">{user.full_name || "Sin nombre"}</div>
                <div className="text-xs text-muted">{user.role || "—"}</div>
              </td>
              <td className="py-3 px-4 text-sm">{user.email || "—"}</td>
              <td className="py-3 px-4 text-sm capitalize">{user.role || "—"}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  user.verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {user.verified ? "✓ Verificado" : "No verificado"}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-muted">
                {new Date(user.created_at).toLocaleDateString('es-MX')}
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  {!user.verified && (
                    <button
                      onClick={() => handleVerify(user.id)}
                      className="text-xs px-2 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded transition"
                    >
                      Verificar
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="text-center py-8 text-muted">No hay usuarios que mostrar</div>
      )}
    </div>
  );
}
