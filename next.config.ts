import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.15', '192.168.1.19', '192.168.1.3'],
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://135.125.200.112:9002';
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${backendUrl}/api/main-platform/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;

