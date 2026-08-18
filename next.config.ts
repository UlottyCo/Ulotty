import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
