import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "10.119.107.22",
  ],
    output: 'standalone'
};

export default nextConfig;