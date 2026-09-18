"use client";

import { useState } from "react";
import { approveProperty, rejectProperty, requestCorrection } from "@/app/actions/dashboard";

interface Listing {
  id: string;
  folio: string | null;
  type: string | null;
  status: string;
  price_mxn: number | null;
  area_m2: number | null;
  created_at: string;
  listing_groups: { zone: string } | null;
}

export function AdminListingsContainer({ listings }: { listings: Listing[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState(listings);

  const handleApprove = async (id: string) => {
    setIsLoading(true);
    const result = await approveProperty(id);
    if (result.success) {
      setItems(items.map((item) => 
        item.id === id ? { ...item, status: "verificado" } : item
      ));
    }
    setIsLoading(false);
  };

  const handleReject = async (id: string) => {
    setIsLoading(true);
    const result = await rejectProperty(id, "No cumple requisitos");
    if (result.success) {
      setItems(items.map((item) => 
        item.id === id ? { ...item, status: "rechazado" } : item
      ));
    }
    setIsLoading(false);
  };

  const statusBadges: Record<string, string> = {
    borrador: "bg-blue-100 text-blue-700",
    verificado: "bg-green-100 text-green-700",
    rechazado: "bg-red-100 text-red-700",
    pausado: "bg-gray-100 text-gray-700",
    publicado: "bg-purple-100 text-purple-700",
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Hoy" : `${diff}d`;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead className="bg-surface border-b border-border">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Propiedad</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Zona</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Hace</th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-muted">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((prop) => (
            <tr key={prop.id} className="hover:bg-subtle/50">
              <td className="px-6 py-4 text-sm font-mono text-foreground">{prop.folio}</td>
              <td className="px-6 py-4 text-sm font-medium text-foreground">
                {prop.type || "—"}
              </td>
              <td className="px-6 py-4 text-sm text-muted">{prop.type || "—"}</td>
              <td className="px-6 py-4 text-sm text-muted">
                {prop.listing_groups?.zone || "—"}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-foreground">
                ${prop.price_mxn?.toLocaleString("es-MX") || "—"}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    statusBadges[prop.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {prop.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-muted">
                {formatDate(prop.created_at)}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  {prop.status === "borrador" && (
                    <>
                      <button
                        onClick={() => handleApprove(prop.id)}
                        disabled={isLoading}
                        className="rounded px-2 py-1 text-xs font-semibold text-green-600 hover:bg-green-50 disabled:opacity-50"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleReject(prop.id)}
                        disabled={isLoading}
                        className="rounded px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-surface border-t border-border px-6 py-4 text-sm text-muted">
        Mostrando {items.length} propiedades
      </div>
    </div>
  );
}
