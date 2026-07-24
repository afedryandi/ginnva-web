import AboutSection from '@/components/home/AboutSection';
import CaseAndNewsSection from '@/components/home/CaseAndNewsSection';
import HeroSection from '@/components/home/HeroSection';
import ProductSection from '@/components/home/ProductSection';

import type { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/'),
  title: 'Ginnva Shield Indonesia — PPF & Kaca Film Otomotif Premium',
  description: 'Distributor resmi Paint Protection Film (PPF) dan Kaca Film Otomotif Ginnva di Indonesia. Lindungi kendaraan Anda dengan teknologi film premium bergaransi hingga 10 tahun.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Ginnva Shield Indonesia — PPF & Kaca Film Otomotif Premium',
    description: 'Distributor resmi Paint Protection Film (PPF) dan Kaca Film Otomotif Ginnva di Indonesia. Lindungi kendaraan Anda dengan teknologi film premium bergaransi hingga 10 tahun.',
    url: 'https://ginnva.id',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Ginnva Shield Indonesia — PPF & Kaca Film Otomotif Premium',
    description: 'Distributor resmi Paint Protection Film (PPF) dan Kaca Film Otomotif Ginnva di Indonesia. Lindungi kendaraan Anda dengan teknologi film premium bergaransi hingga 10 tahun.',
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <CaseAndNewsSection />
    </main>
  );
}