import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cardioml-9qxc.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
