import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: process.env.SKIP_BUILD_ERRORS === 'true',
  },
};

export default nextConfig;
