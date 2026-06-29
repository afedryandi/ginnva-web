import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Diperlukan supaya next/image bisa render gambar cover berita yang
    // di-upload lewat Filament (disimpan di api.ginnva.id/storage/...).
    // Tanpa ini, Next.js akan menolak <Image src="https://api.ginnva.id/...">
    // dengan error "Invalid src prop".
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.ginnva.id',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;