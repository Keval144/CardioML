import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cardioml-9qxc.onrender.com/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/:path",
      },
    ];
  },
};

export default nextConfig;
