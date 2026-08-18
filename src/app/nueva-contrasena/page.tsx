"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NuevaContrasenaPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });
    setLoading(false);

    if (updateError) {
      console.error("Error al actualizar contraseña:", updateError);
      setError(
        updateError.message.includes("Password should be at least")
          ? "La contraseña debe tener al menos 6 caracteres."
          : "No se pudo actualizar tu contraseña. Vuelve a pedir el link de recuperación e intenta de nuevo.",
      );
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 2000);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-2xl border border-black/10 p-8 dark:border-white/10">
        <h1 className="text-center text-2xl font-bold">Nueva contraseña</h1>
        <p className="mt-1 text-center text-sm text-black/60 dark:text-white/60">
          Escribe tu nueva contraseña para tu cuenta.
        </p>

        {success ? (
          <p className="mt-6 rounded-md bg-green-50 p-3 text-center text-sm text-green-800 dark:bg-green-950/40 dark:text-green-400">
            Contraseña actualizada. Te llevamos al inicio...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label
                className="mb-1 block text-sm text-black/60 dark:text-white/60"
                htmlFor="password"
              >
                Nueva contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-transparent"
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm text-black/60 dark:text-white/60"
                htmlFor="confirmPassword"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-black py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-black"
            >
              {loading ? "Guardando..." : "Guardar nueva contraseña"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
