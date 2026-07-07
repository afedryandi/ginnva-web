import React from 'react';
import { Metadata } from 'next';
import { seoDefaults } from '@/config/seo';
import DealersList from './DealersList';

export const metadata: Metadata = {
  ...seoDefaults,
  title: 'Dealer Resmi Ginnva — Lokasi Instalasi di Seluruh Indonesia',
  description: 'Temukan dealer dan pusat instalasi resmi Ginnva terdekat di kota Anda. Pemasangan oleh teknisi bersertifikat dengan garansi resmi.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Dealer Resmi Ginnva — Lokasi Instalasi di Seluruh Indonesia',
    description: 'Temukan dealer dan pusat instalasi resmi Ginnva terdekat di kota Anda. Pemasangan oleh teknisi bersertifikat dengan garansi resmi.',
    url: 'https://ginnva.id/dealers',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Dealer Resmi Ginnva — Lokasi Instalasi di Seluruh Indonesia',
    description: 'Temukan dealer dan pusat instalasi resmi Ginnva terdekat di kota Anda. Pemasangan oleh teknisi bersertifikat dengan garansi resmi.',
  },
};

export default function DealersPage() {
  return (
    <main data-page="dealers" data-nav="services" style={{ minHeight: '80vh', backgroundColor: 'var(--alt)' }}>
      {/* Banner Atas — pola sama dengan /warranty dan /quote */}
      <section className="page-banner">
        <div className="bg" style={{ backgroundImage: `url('/image/building-image.webp')` }} />
        <div className="inner">
          <h1>Lokasi Dealer</h1>
          <div className="en">DEALER STORES</div>
        </div>
      </section>

      <section className="psec">
        <div className="wrap">
          <DealersList />
        </div>
      </section>
    </main>
  );
}