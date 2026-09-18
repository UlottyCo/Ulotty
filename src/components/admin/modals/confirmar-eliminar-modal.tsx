"use client";

interface ConfirmarEliminarModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmarEliminarModal({
  isOpen,
  title,
  message,
  loading,
  onConfirm,
  onCancel,
}: ConfirmarEliminarModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg border border-border w-full max-w-sm mx-4">
        <div className="p-6">
          <h2 className="text-lg font-bold text-red-600 mb-2">{title}</h2>
          <p className="text-foreground mb-6">{message}</p>

          <div className="flex gap-2 justify-end">
            <button
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 text-foreground hover:bg-background rounded-lg disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
