import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { seoDefaults } from '@/config/seo';
import WarrantyForm from './WarrantyForm';

export const metadata: Metadata = {
  ...seoDefaults,
  title: 'Cek Garansi Ginnva — Verifikasi E-Warranty Online',
  description: 'Cek status garansi produk Ginnva Anda secara online. Masukkan nomor garansi atau plat kendaraan untuk verifikasi langsung.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Cek Garansi Ginnva — Verifikasi E-Warranty Online',
    description: 'Cek status garansi produk Ginnva Anda secara online. Masukkan nomor garansi atau plat kendaraan untuk verifikasi langsung.',
    url: 'https://ginnva.id/warranty',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Cek Garansi Ginnva — Verifikasi E-Warranty Online',
    description: 'Cek status garansi produk Ginnva Anda secara online. Masukkan nomor garansi atau plat kendaraan untuk verifikasi langsung.',
  },
};

export default function CekGaransiPage() {
  return (
    <main data-page="warranty-check" data-nav="services" style={{ minHeight: '80vh', backgroundColor: '#f9f9f9' }}>
      {/* Banner Atas */}
      <section className="page-banner">
        <div className="bg" style={{ backgroundImage: `url('/image/warranty-banner.webp')` }} />
        <div className="inner">
          <h1>E-Warranty Check</h1>
          <div className="en">VERIFIKASI JAMINAN GARANSI RESMI</div>
        </div>
      </section>

      {/* Konten Formulir & Interaksi.
          Suspense WAJIB di sini karena WarrantyForm pakai useSearchParams()
          (baca ?code= dari URL hasil scan QR) — tanpa boundary ini, Next.js
          App Router akan gagal saat build/static generation. */}
      <Suspense fallback={null}>
        <WarrantyForm />
      </Suspense>
    </main>
  );
}