"use client";
import { useEffect, useState } from "react";
import { getUsers } from "@/app/actions/users";

export function EquipoClient() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getUsers({ role: "admin" });
        setMembers(data?.concat(await getUsers({ role: "moderador" })) || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    load();
  }, []);

  if (loading) return <div className="py-8">Cargando...</div>;

  return (
    <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Nombre</th>
            <th className="text-left py-3 px-4 font-semibold">Email</th>
            <th className="text-left py-3 px-4 font-semibold">Rol</th>
            <th className="text-left py-3 px-4 font-semibold">Verificado</th>
          </tr>
        </thead>
        <tbody>
          {members.slice(0, 10).map((member) => (
            <tr key={member.id} className="border-b border-border hover:bg-background transition">
              <td className="py-3 px-4 font-semibold">{member.full_name}</td>
              <td className="py-3 px-4">{member.email}</td>
              <td className="py-3 px-4 capitalize">{member.role}</td>
              <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${member.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{member.verified ? '✓' : '✗'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
