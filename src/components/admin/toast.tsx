"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

let toastId = 0;
const toastCallbacks = new Set<(toast: Toast) => void>();

export function showToast(message: string, type: ToastType = "info", duration = 3000) {
  const id = `toast-${toastId++}`;
  const toast: Toast = { id, message, type, duration };
  toastCallbacks.forEach((callback) => callback(toast));
  
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }
  
  return id;
}

export function removeToast(id: string) {
  toastCallbacks.forEach((callback) => callback({ id, message: "", type: "info" }));
}

export function onToast(callback: (toast: Toast) => void) {
  toastCallbacks.add(callback);
  return () => toastCallbacks.delete(callback);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = onToast((toast) => {
      if (toast.message === "") {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      } else {
        setToasts((prev) => {
          const existing = prev.find((t) => t.id === toast.id);
          if (existing) return prev;
          return [...prev, toast];
        });
      }
    });

    return unsubscribe;
  }, []);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success": return "✓";
      case "error": return "✕";
      case "warning": return "!";
      case "info": return "ℹ";
    }
  };

  const getColors = (type: ToastType) => {
    switch (type) {
      case "success": return "bg-green-600 text-white";
      case "error": return "bg-red-600 text-white";
      case "warning": return "bg-yellow-600 text-white";
      case "info": return "bg-blue-600 text-white";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getColors(toast.type)} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-in slide-in-from-right`}
        >
          <span className="font-bold text-lg">{getIcon(toast.type)}</span>
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-lg leading-none hover:opacity-80"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
