// @ts-check
import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence Turbopack workspace root warning (ada dua package-lock.json)
  turbopack: {
    root: import.meta.dirname,
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

export default withSentryConfig(nextConfig, {
  // Upload sourcemap hanya jalan kalau org/project/authToken di-set lewat
  // env (SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN) — kalau kosong,
  // langkah ini di-skip otomatis tanpa bikin build gagal.
  silent: true,
  widenClientFileUpload: true,
});