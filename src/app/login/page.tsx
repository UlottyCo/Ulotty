"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

type Mode = "signup" | "signin" | "forgot";

function mapAuthError(message: string): string {
  if (message.includes("already registered")) {
    return "Ya existe una cuenta con ese correo.";
  }
  if (message.includes("Invalid login credentials")) {
    return "Correo o contraseña incorrectos.";
  }
  if (message.includes("Password should be at least")) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  return "Ocurrió un error. Intenta de nuevo.";
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const next = searchParams.get("next") || "/";
  const initialMode: Mode =
    searchParams.get("mode") === "forgot" ? "forgot" : "signup";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    
    setError(null);
    setInfo(null);
    setLoading(true);

    if (mode === "forgot") {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email);

      setLoading(false);

      if (resetError) {
        setError(mapAuthError(resetError.message));
        return;
      }

      setInfo(
        "Si ese correo tiene una cuenta, te mandamos un link para recuperar tu contraseña.",
      );
      return;
    }

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, phone: phone || null },
        },
      });

      setLoading(false);

      if (signUpError) {
        setError(mapAuthError(signUpError.message));
        return;
      }

      if (data.session) {
        const rolUrl = new URL("/registro/rol", window.location.origin);
        rolUrl.searchParams.set("next", next);
        router.push(rolUrl.pathname + rolUrl.search);
        router.refresh();
      } else {
        setInfo(
          "Cuenta creada. Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.",
        );
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (signInError) {
        setError(mapAuthError(signInError.message));
        return;
      }

      router.push(next);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-2xl border border-border p-8">
        <h1 className="text-center text-2xl font-bold">Ulotty</h1>
        <p className="mt-1 text-center text-sm text-muted">
          {mode === "forgot"
            ? "Recuperar contraseña"
            : "Crea tu cuenta o inicia sesión"}
        </p>

        {mode === "forgot" ? (
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError(null);
              setInfo(null);
            }}
            className="mt-6 text-sm underline"
          >
            ← Volver a iniciar sesión
          </button>
        ) : (
          <div className="mt-6 flex rounded-full border border-border p-1">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
                mode === "signup"
                  ? "bg-brand text-brand-foreground "
                  : "text-muted"
              }`}
            >
              Crear cuenta
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
                mode === "signin"
                  ? "bg-brand text-brand-foreground "
                  : "text-muted"
              }`}
            >
              Iniciar sesión
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {mode === "signup" && (
            <div>
              <label
                className="mb-1 block text-sm text-muted"
                htmlFor="fullName"
              >
                Nombre completo
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
              />
            </div>
          )}

          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label
                className="mb-1 block text-sm text-muted"
                htmlFor="phone"
              >
                Teléfono / WhatsApp
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
              />
            </div>
          )}

          {mode !== "forgot" && (
            <div>
              <label
                className="mb-1 block text-sm text-muted"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
              />
            </div>
          )}

          {mode === "signin" && (
            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                setError(null);
                setInfo(null);
              }}
              className="-mt-2 self-start text-xs underline text-muted"
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          {info && (
            <p className="text-sm text-green-700 dark:text-green-400">{info}</p>
          )}

          <button
            type="submit"
            disabled={loading || !supabase}
            className="mt-2 rounded-full bg-brand py-3 text-sm font-semibold text-brand-foreground disabled:opacity-60"
          >
            {loading
              ? "Un momento..."
              : mode === "signup"
                ? "Continuar"
                : mode === "forgot"
                  ? "Enviar link de recuperación"
                  : "Iniciar sesión"}
          </button>
        </form>

        {mode === "signup" && (
          <p className="mt-4 text-center text-xs text-muted">
            El siguiente paso: nos dices cómo vas a usar Ulotty
          </p>
        )}

        <p className="mt-4 text-center text-xs text-muted">
          Al crear tu cuenta aceptas los Términos y el Aviso de privacidad.
        </p>
      </div>
    </div>
  );
}
