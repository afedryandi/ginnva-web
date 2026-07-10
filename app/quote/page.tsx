import React from 'react';
import { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import QuoteForm from './QuoteForm';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/quote'),
  title: 'Minta Penawaran Harga PPF & Kaca Film — Ginnva Shield Indonesia',
  description: 'Ajukan permintaan penawaran harga pemasangan Paint Protection Film atau Kaca Film Ginnva untuk kendaraan Anda. Gratis konsultasi.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Minta Penawaran Harga PPF & Kaca Film — Ginnva Shield Indonesia',
    description: 'Ajukan permintaan penawaran harga pemasangan Paint Protection Film atau Kaca Film Ginnva untuk kendaraan Anda. Gratis konsultasi.',
    url: 'https://ginnva.id/quote',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Minta Penawaran Harga PPF & Kaca Film — Ginnva Shield Indonesia',
    description: 'Ajukan permintaan penawaran harga pemasangan Paint Protection Film atau Kaca Film Ginnva untuk kendaraan Anda. Gratis konsultasi.',
  },
};

export default function QuotePage() {
  return (
    <main data-page="quote" data-nav="services" style={{ minHeight: '80vh', backgroundColor: 'var(--alt)' }}>
      {/* Banner Atas — pola sama dengan /warranty */}
      <section className="page-banner">
        <div className="bg" style={{ backgroundImage: `url('/image/price-navbar.webp')` }} />
        <div className="inner">
          <h1>Minta Penawaran</h1>
          <div className="en">PENAWARAN HARGA PRODUK GINNVA</div>
        </div>
      </section>

      <section style={{ padding: '60px 20px' }}>
        <div className="wrap" style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div className="sec-title-box" style={{ display: 'block', textAlign: 'center', marginBottom: '40px' }}>
            <div className="sec-title" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)' }}>Pilih Produk Anda</div>
            <div className="sec-sub" style={{ marginTop: '10px' }}>
              Klik salah satu produk untuk mengisi formulir
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>
    </main>
  );
}