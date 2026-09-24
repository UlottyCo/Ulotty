import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // En desarrollo Next bloquea con 403 los assets pedidos desde un origen
  // distinto al que arrancó el server (localhost). Sin esto, abrir la app
  // desde el celular por la IP de la LAN sirve el HTML pero no los chunks
  // de cliente: React nunca hidrata y nada responde al toque.
  allowedDevOrigins: ["192.168.100.*"],
  experimental: {
    serverActions: {
      // Default de Next.js es 1MB. Fotos de listings hasta 5MB c/u y
      // documentos de verificación hasta 10MB c/u (varios por envío) —
      // dejamos margen amplio para varios archivos en una sola petición.
      bodySizeLimit: "40mb",
    },
  },
};

export default nextConfig;
