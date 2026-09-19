"use client";

import { ToastContainer } from "./toast";
import { MobileSidebar } from "./sidebar";

export function AdminHeader() {
  return (
    <>
      <ToastContainer />
      <div className="bg-surface border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar usuarios, propiedades, operaciones..."
              className="w-full px-4 py-2 pl-10 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <span className="absolute left-3 top-2.5 text-muted">🔍</span>
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 text-muted hover:text-foreground transition">
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Admin Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-sm font-semibold">
              JM
            </div>
            <button className="text-sm hover:text-brand transition">▼</button>
          </div>
        </div>
      </div>
      <MobileSidebar />
    </>
  );
}
