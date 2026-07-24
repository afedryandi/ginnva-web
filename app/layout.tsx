import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { seoDefaults, SITE_NAME, SITE_DESCRIPTION, SITE_URL, canonical } from '@/config/seo';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/'),
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'PPF Indonesia', 'Paint Protection Film', 'kaca film mobil', 'Ginnva',
    'film pelindung cat', 'window film otomotif', 'pelindung cat kendaraan',
    'kaca film premium', 'dealer PPF Jakarta', 'garansi film kendaraan',
  ],
  openGraph: {
    ...seoDefaults.openGraph,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    ...seoDefaults.twitter,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0, height: '100%' }} className="antialiased">
        {/* Schema markup Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PT Ginnva Shield Indonesia',
              url: SITE_URL,
              logo: `${SITE_URL}/image/ginnva-logo-red.webp`,
              sameAs: [
                'https://www.instagram.com/ginnva.id',
                'https://www.tiktok.com/@ginnva.id',
                'https://www.facebook.com/ginnvaid',
                'https://www.linkedin.com/company/ginnva-indonesia',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: 'Indonesian',
              },
            }),
          }}
        />
        <GoogleAnalytics />
        <Analytics />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: '1 0 auto' }}>{children}</main>
          <Footer />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}