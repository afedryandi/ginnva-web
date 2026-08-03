'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from '@/components/chat/ChatWidget';

// Halaman /giias adalah landing page berdiri sendiri untuk sales dealer
// mobil di GIIAS — TIDAK butuh Header/Footer/ChatWidget situs utama
// (bukan bagian dari navigasi ginnva.id biasa, jadi elemen situs itu
// cuma bikin distraksi buat customer yang lagi diarahkan ke satu CTA
// spesifik). Semua halaman lain tetap tampil dengan chrome normal.
const BARE_PREFIXES = ['/giias'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_PREFIXES.some((p) => pathname === p || pathname?.startsWith(`${p}/`));

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: '1 0 auto' }}>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
