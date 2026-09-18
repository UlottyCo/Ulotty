"use client";

import { User } from "@supabase/supabase-js";
import Image from "next/image";

interface MiCuentaPerfilProps {
  user: User;
  profile: any;
}

export function MiCuentaPerfil({ user, profile }: MiCuentaPerfilProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Profile Card */}
      <div className="lg:col-span-1">
        <div className="bg-surface rounded-lg border border-border p-6 sticky top-8">
          {/* Avatar */}
          <div className="mb-6 text-center">
            <div className="w-24 h-24 rounded-full bg-brand text-white flex items-center justify-center font-bold text-3xl mx-auto mb-4">
              JM
            </div>
            <p className="font-bold text-lg">Juan Márquez</p>
            <p className="text-sm text-muted">Comprador</p>
            <button className="mt-3 px-4 py-2 text-sm border border-border rounded-lg hover:bg-background transition">
              Editar perfil
            </button>
          </div>

          {/* Verification Badge */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">Cuenta verificada</p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Tu cuenta está verificada y puedes usar todas las funciones de Ulotty.</p>
          </div>

          {/* Account Type */}
          <div className="mt-6 p-4 bg-background rounded-lg">
            <p className="text-xs font-semibold text-muted uppercase mb-2">Tipo de cuenta</p>
            <p className="font-semibold">Comprador</p>
            <button className="text-xs text-brand mt-2 hover:underline">Cambiar tipo de cuenta</button>
          </div>

          {/* Mi nivel en Ulotty */}
          <div className="mt-6 p-4 bg-background rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⭐</span>
              <p className="font-semibold">Mi nivel en Ulotty</p>
            </div>
            <p className="text-sm text-muted mb-3">Explorador</p>
            <p className="text-xs text-muted mb-3">Completa tu perfil y realiza más acciones para llegar al siguiente nivel.</p>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-brand h-2 rounded-full" style={{ width: "30%" }}></div>
            </div>
          </div>

          {/* Recently Added */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Actividad reciente</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">👁️</span>
                <span className="text-muted">Visita agendada</span>
                <span className="text-xs text-muted ml-auto">15 ago 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <span className="text-muted">Mensaje enviado</span>
                <span className="text-xs text-muted ml-auto">15 ago 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">❤️</span>
                <span className="text-muted">Propiedad guardada</span>
                <span className="text-xs text-muted ml-auto">14 ago 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔔</span>
                <span className="text-muted">Alerta creada</span>
                <span className="text-xs text-muted ml-auto">10 ago 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Personal Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Información personal */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Información personal</h2>
            <button className="text-xs text-brand hover:underline font-semibold">Editar</button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-muted uppercase mb-2">Nombre completo</p>
              <p className="font-semibold">Juan Márquez</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase mb-2">Fecha de nacimiento</p>
              <p className="font-semibold">12 de marzo de 1995</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase mb-2">Nacionalidad</p>
              <p className="font-semibold">Mexicana</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase mb-2">Ciudad</p>
              <p className="font-semibold">Tijuana, B.C.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase mb-2">Idioma</p>
              <p className="font-semibold">Español</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase mb-2">Sobre mí</p>
              <p className="font-semibold text-muted">Información en propiedades frente al mar y zonas residenciales.</p>
            </div>
          </div>
        </div>

        {/* Mis estadísticas */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h2 className="text-lg font-bold mb-6">Mis estadísticas</h2>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand">12</div>
              <p className="text-xs text-muted">Propiedades guardadas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand">8</div>
              <p className="text-xs text-muted">Propiedades vistas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand">3</div>
              <p className="text-xs text-muted">Apendidas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand">1</div>
              <p className="text-xs text-muted">Proceso</p>
            </div>
          </div>
        </div>

        {/* Privacidad y seguridad */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Privacidad y seguridad</h2>
            <button className="text-xs text-brand hover:underline font-semibold">Editar</button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Perfil visible para otros usuarios</p>
                <p className="text-xs text-muted">Los demás pueden ver tu perfil</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="text-sm font-semibold">Mostrar mi actividad</p>
                <p className="text-xs text-muted">Otros usuarios pueden ver tu actividad</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="text-sm font-semibold">Permitir mensajes</p>
                <p className="text-xs text-muted">Sin restricción</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="text-sm font-semibold">Datos personales</p>
                <p className="text-xs text-muted">Podólogos y seguros</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" />
            </div>
          </div>
        </div>

        {/* Métodos de contacto */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Métodos de contacto</h2>
            <button className="text-xs text-brand hover:underline font-semibold">Editar</button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>📧</span>
                <div>
                  <p className="text-sm">juan@ejemplo.com</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Verificado</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-3">
                <span>📱</span>
                <div>
                  <p className="text-sm">+52 661 123 4567</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Verificado</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-3">
                <span>💬</span>
                <div>
                  <p className="text-sm">+52 661 123 4567</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Comprobado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
