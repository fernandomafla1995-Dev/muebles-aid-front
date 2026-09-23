import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  allowedDevOrigins: [
    "distract-verbose-ethically.ngrok-free.dev",
  ],
}; 
export default nextConfig;