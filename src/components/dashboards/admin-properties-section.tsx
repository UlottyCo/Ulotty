"use client";

import { useState, useEffect } from "react";
import { getAdminListings } from "@/app/actions/dashboard";
import { AdminPropertiesFiltersClient } from "./admin-properties-filters-client";
import { PropertyAdminTableClient } from "./property-admin-table-client";

interface Property {
  id: string;
  folio: string;
  type: string;
  zona: string;
  price_mxn: number;
  status: string;
  created_at: string;
}

export function AdminPropertiesSection() {
  const [listings, setListings] = useState<Property[]>([]);
  const [filteredListings, setFilteredListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      const data = await getAdminListings();
      const formatted = data.map((l) => ({
        id: l.id,
        folio: l.folio || "—",
        type: l.type || "—",
        zona: l.listing_groups?.zone || "—",
        price_mxn: l.price_mxn || 0,
        status: l.status,
        created_at: l.created_at,
      }));
      setListings(formatted);
      setFilteredListings(formatted);
      setLoading(false);
    };

    loadListings();
  }, []);

  const handleFilter = (filters: {
    search?: string;
    status?: string;
    type?: string;
    zona?: string;
  }) => {
    let result = listings;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.folio.toLowerCase().includes(searchLower) ||
          item.id.toLowerCase().includes(searchLower) ||
          item.zona.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status) {
      result = result.filter((item) => item.status === filters.status);
    }

    if (filters.type) {
      result = result.filter((item) => item.type === filters.type);
    }

    if (filters.zona) {
      const zonaLower = filters.zona.toLowerCase();
      result = result.filter((item) => item.zona.toLowerCase().includes(zonaLower));
    }

    setFilteredListings(result);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <AdminPropertiesFiltersClient onFilter={handleFilter} />

      {/* Table */}
      {loading ? (
        <div className="rounded-lg border border-border p-6 text-center">
          <p className="text-muted">Cargando propiedades...</p>
        </div>
      ) : (
        <PropertyAdminTableClient listings={filteredListings} />
      )}
    </div>
  );
}
