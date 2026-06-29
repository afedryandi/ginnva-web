import React from 'react';
import { Metadata } from 'next';
import CaseBanner from '@/components/case/CaseBanner';
import CaseGrid from '@/components/case/CaseGrid';

export const metadata: Metadata = {
  title: 'Galeri Pemasangan | Ginnva Shield Indonesia',
  description: 'Lihat hasil pemasangan kaca film dan pelindung cat Ginnva pada berbagai jenis kendaraan.',
};

export default function CasePage() {
  return (
    <main data-page="case" data-nav="brand">
      <CaseBanner />
      <CaseGrid />
    </main>
  );
}