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

  // Security header dasar — sebelumnya tidak ada sama sekali (semua
  // request Next.js cuma pakai default bawaan framework, tanpa CSP/
  // clickjacking protection/dll). 'unsafe-inline' di script-src/style-src
  // dipakai karena Next.js App Router belum diset up dengan nonce-based
  // CSP (butuh middleware tambahan) — masih jauh lebih ketat daripada
  // tanpa CSP sama sekali, dan connect-src/img-src/frame-src dibatasi
  // cuma ke origin yang benar-benar dipakai (backend, GA, Google Maps
  // embed, Sentry).
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://api.ginnva.id https://www.ginnvafilm.com https://www.googletagmanager.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.ginnva.id https://www.google-analytics.com https://analytics.google.com https://*.sentry.io https://*.ingest.sentry.io",
      "frame-src https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Upload sourcemap hanya jalan kalau org/project/authToken di-set lewat
  // env (SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN) — kalau kosong,
  // langkah ini di-skip otomatis tanpa bikin build gagal.
  silent: true,
  widenClientFileUpload: true,
});