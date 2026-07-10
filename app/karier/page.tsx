import type { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import CareerContent from './CareerContent';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/karier'),
  title: 'Karier — Ginnva Shield Indonesia',
  description: 'Bergabunglah bersama tim Ginnva Shield Indonesia. Lihat lowongan kerja terbaru di bidang instalasi PPF, kaca film, sales, dan operasional.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Karier — Ginnva Shield Indonesia',
    description: 'Bergabunglah bersama tim Ginnva Shield Indonesia.',
  },
};

export default function KarierPage() {
  return (
    <main>
      <section className="page-banner">
        <div className="bg" style={{ backgroundImage: `url('/image/building-image.webp')` }} />
        <div className="inner">
          <h1>Karier</h1>
          <div className="en">JOIN OUR TEAM</div>
        </div>
      </section>
      <CareerContent />
    </main>
  );
}