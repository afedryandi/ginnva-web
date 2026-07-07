import type { Metadata } from 'next';
import { seoDefaults } from '@/config/seo';
import PartnershipForm from './PartnershipForm';

export const metadata: Metadata = {
  ...seoDefaults,
  title: 'Kemitraan — Ginnva Shield Indonesia',
  description: 'Bergabunglah sebagai mitra resmi dealer Ginnva Shield Indonesia. Daftarkan kota Anda dan jadilah bagian dari jaringan distributor PPF & Kaca Film premium.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Kemitraan — Ginnva Shield Indonesia',
    description: 'Bergabunglah sebagai mitra resmi dealer Ginnva Shield Indonesia.',
  },
};

export default function KemitraanPage() {
  return (
    <main>
      <section className="page-banner">
        <div className="bg" style={{ backgroundImage: `url('/image/building-image.webp')` }} />
        <div className="inner">
          <h1>Kemitraan</h1>
          <div className="en">PARTNERSHIP & DEALERSHIP</div>
        </div>
      </section>
      <PartnershipForm />
    </main>
  );
}