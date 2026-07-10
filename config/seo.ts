// config/seo.ts
// Konfigurasi SEO terpusat — semua metadata halaman mengacu ke sini
// supaya konsisten dan mudah diupdate saat ada perubahan brand.

export const SITE_URL = 'https://ginnva.id';
export const SITE_NAME = 'Ginnva Shield Indonesia';
export const SITE_DESCRIPTION =
  'Distributor resmi Paint Protection Film (PPF) dan Kaca Film Otomotif Ginnva di Indonesia. Proteksi cat kendaraan premium dengan garansi resmi hingga 10 tahun.';
export const SITE_LOCALE = 'id_ID';
export const SITE_TWITTER = '@ginnvaid';

// OG Image default — public/og-default.jpg (1200x630px)
export const OG_IMAGE_DEFAULT = `${SITE_URL}/og-default.jpg`;

// Helper canonical URL — pakai di tiap page.tsx: `...canonical('/brand')`
// supaya Google tahu persis URL "resmi" tiap halaman, mencegah masalah
// duplicate content (mis. akses lewat query string atau trailing slash).
export function canonical(path: string = '/') {
  return {
    alternates: {
      canonical: `${SITE_URL}${path === '/' ? '' : path}`,
    },
  };
}

export const seoDefaults = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: 'PT Ginnva Shield Indonesia' }],
  creator: 'PT Ginnva Shield Indonesia',
  publisher: 'PT Ginnva Shield Indonesia',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website' as const,
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_DEFAULT,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    site: SITE_TWITTER,
    images: [OG_IMAGE_DEFAULT],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};