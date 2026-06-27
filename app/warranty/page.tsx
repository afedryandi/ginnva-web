import React from 'react';
import { Metadata } from 'next';
import WarrantyForm from './WarrantyForm';

export const metadata: Metadata = {
  title: 'Cek Garansi Resmi (E-Warranty) | Ginnva Shield Indonesia',
  description: 'Verifikasi keaslian produk Ginnva Anda. Masukkan nomor kode e-warranty untuk memeriksa masa berlaku, detail unit, dan mengunduh kartu sertifikat garansi digital Anda.',
};

export default function CekGaransiPage() {
  return (
    <main data-page="warranty-check" data-nav="services" style={{ minHeight: '80vh', backgroundColor: '#f9f9f9' }}>
      {/* Banner Atas */}
      <section className="page-banner" style={{ backgroundColor: '#111', color: '#fff', padding: '60px 0', textAlign: 'center' }}>
        <div className="inner">
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>E-Warranty Check</h1>
          <div className="en" style={{ color: '#aaa', fontSize: '14px', letterSpacing: '1px' }}>VERIFIKASI JAMINAN GARANSI RESMI</div>
        </div>
      </section>

      {/* Konten Formulir & Interaksi */}
      <WarrantyForm />
    </main>
  );
}