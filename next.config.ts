import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence Turbopack workspace root warning (ada dua package-lock.json)
  turbopack: {
    root: __dirname,
  },
  images: {
    // Format modern — browser yang support AVIF/WebP otomatis dapat versi
    // yang lebih kecil tanpa perlu konversi manual.
    formats: ['image/avif', 'image/webp'],
    // Diperlukan supaya next/image bisa render gambar cover berita yang
    // di-upload lewat Filament (disimpan di api.ginnva.id/storage/...).
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
      {
        protocol: 'https',
        hostname: 'www.ginnvafilm.com',
        pathname: '/**',
      },
    ],
    // Ukuran device yang dioptimasi
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compress output
  compress: true,
};

export default nextConfig;