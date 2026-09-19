"use client";

import { ToastContainer } from "./toast";
import { MobileSidebar } from "./sidebar";
import { NotificationCenter } from "./notification-center";

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

          {/* Notification Center */}
          <NotificationCenter />

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
