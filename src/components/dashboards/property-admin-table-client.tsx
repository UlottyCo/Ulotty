"use client";

import { useState } from "react";
import Link from "next/link";
import { approveProperty, rejectProperty, requestCorrection } from "@/app/actions/dashboard";

interface Property {
  id: string;
  folio: string;
  type: string;
  zona: string;
  price_mxn: number;
  status: string;
  created_at: string;
}

interface AdminPropertiesTableProps {
  listings: Property[];
}

export function PropertyAdminTableClient({ listings }: AdminPropertiesTableProps) {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [items, setItems] = useState(listings);

  function formatPrice(price: number) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(price);
  }

  function getDaysAgo(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  }

  async function handleApprove(id: string) {
    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await approveProperty(id);
      if (result.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: "verificado" } : item))
        );
      }
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  }

  async function handleReject(id: string) {
    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await rejectProperty(id, "Rechazado por el admin");
      if (result.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: "rechazado" } : item))
        );
      }
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  }

  async function handleRequestCorrection(id: string) {
    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await requestCorrection(id, "Se requieren correcciones");
      if (result.success) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: "requiere_corrección" } : item))
        );
      }
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  }

  const statusBadges: Record<string, string> = {
    borrador: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    verificado: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    rechazado: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "requiere_corrección": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    pausado: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    publicado: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  const statusLabels: Record<string, string> = {
    borrador: "Borrador",
    verificado: "Verificado",
    rechazado: "Rechazado",
    "requiere_corrección": "Requiere corrección",
    pausado: "Pausado",
    publicado: "Publicado",
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
              <td className="px-6 py-4 text-sm font-medium text-foreground">Propiedad {prop.id}</td>
              <td className="px-6 py-4 text-sm text-muted">{prop.type}</td>
              <td className="px-6 py-4 text-sm text-muted">{prop.zona}</td>
              <td className="px-6 py-4 text-sm font-medium text-foreground">{formatPrice(prop.price_mxn)}</td>
              <td className="px-6 py-4">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusBadges[prop.status] || "bg-gray-100 text-gray-700"}`}>
                  {statusLabels[prop.status] || prop.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-muted">{getDaysAgo(prop.created_at)}d</td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={`/panel-admin/propiedades/${prop.id}`}
                    className="rounded px-2 py-1 text-xs font-semibold text-brand hover:bg-brand/10"
                  >
                    Ver
                  </Link>

                  {prop.status === "borrador" && (
                    <>
                      <button
                        onClick={() => handleApprove(prop.id)}
                        disabled={loading[prop.id]}
                        className="rounded px-2 py-1 text-xs font-semibold text-green-600 hover:bg-green-50 disabled:opacity-50"
                      >
                        {loading[prop.id] ? "..." : "✓"}
                      </button>
                      <button
                        onClick={() => handleRequestCorrection(prop.id)}
                        disabled={loading[prop.id]}
                        className="rounded px-2 py-1 text-xs font-semibold text-orange-600 hover:bg-orange-50 disabled:opacity-50"
                      >
                        {loading[prop.id] ? "..." : "○"}
                      </button>
                      <button
                        onClick={() => handleReject(prop.id)}
                        disabled={loading[prop.id]}
                        className="rounded px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {loading[prop.id] ? "..." : "✕"}
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
        Mostrando 1-{Math.min(items.length, 20)} de {items.length} propiedades
      </div>
    </div>
  );
}
