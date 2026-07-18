import React from 'react';
import { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import DeleteAccountForm from './DeleteAccountForm';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/hapus-akun'),
  title: 'Hapus Akun — Ginnva House',
  description: 'Hapus akun dan data pribadi Anda dari aplikasi Ginnva House tanpa perlu menginstal aplikasi.',
  robots: { index: false, follow: false },
};

export default function HapusAkunPage() {
  return (
    <main data-page="hapus-akun" data-nav="services" style={{ minHeight: '80vh', backgroundColor: '#f9f9f9' }}>
      <section className="page-banner">
        <div className="bg" style={{ backgroundImage: `url('/image/warranty-banner.webp')` }} />
        <div className="inner">
          <h1>Hapus Akun</h1>
          <p>Kelola penghapusan akun dan data pribadi Anda</p>
        </div>
      </section>

      <DeleteAccountForm />
    </main>
  );
}