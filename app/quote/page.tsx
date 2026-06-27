import React from 'react';
import { Metadata } from 'next';
import QuoteForm from './QuoteForm';

export const metadata: Metadata = {
  title: 'Minta Penawaran | Ginnva Shield Indonesia',
  description:
    'Minta penawaran harga pemasangan Kaca Film & Paint Protection Film Ginnva sesuai tipe kendaraan Anda, atau tanyakan ketersediaan Color Change dan Architectural Film.',
};

export default function QuotePage() {
  return (
    <main data-page="quote" data-nav="services" style={{ minHeight: '80vh', backgroundColor: 'var(--alt)' }}>
      {/* Banner Atas — pola sama dengan /warranty */}
      <section className="page-banner" style={{ backgroundColor: '#111', color: '#fff', padding: '60px 0', textAlign: 'center' }}>
        <div className="inner">
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Minta Penawaran</h1>
          <div className="en" style={{ color: '#aaa', fontSize: '14px', letterSpacing: '1px' }}>
            PENAWARAN HARGA PRODUK GINNVA
          </div>
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