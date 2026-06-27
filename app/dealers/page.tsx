import React from 'react';
import { Metadata } from 'next';
import DealersList from './DealersList';

export const metadata: Metadata = {
  title: 'Lokasi Dealer | Ginnva Shield Indonesia',
  description:
    'Temukan dealer resmi Ginnva terdekat di kota Anda untuk pemasangan Kaca Film, Paint Protection Film, dan produk Ginnva lainnya.',
};

export default function DealersPage() {
  return (
    <main data-page="dealers" data-nav="services" style={{ minHeight: '80vh', backgroundColor: 'var(--alt)' }}>
      {/* Banner Atas — pola sama dengan /warranty dan /quote */}
      <section className="page-banner" style={{ backgroundColor: '#111', color: '#fff', padding: '60px 0', textAlign: 'center' }}>
        <div className="inner">
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Lokasi Dealer</h1>
          <div className="en" style={{ color: '#aaa', fontSize: '14px', letterSpacing: '1px' }}>
            DEALER STORES
          </div>
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