import React from 'react';
import { Metadata } from 'next';
import { seoDefaults } from '@/config/seo';
import CaseBanner from '@/components/case/CaseBanner';
import CaseGrid from '@/components/case/CaseGrid';

export const metadata: Metadata = {
  ...seoDefaults,
  title: 'Portofolio & Case Study — Hasil Pemasangan Ginnva',
  description: 'Lihat portofolio hasil pemasangan Paint Protection Film dan Kaca Film Ginnva pada berbagai jenis kendaraan premium di Indonesia.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Portofolio & Case Study — Hasil Pemasangan Ginnva',
    description: 'Lihat portofolio hasil pemasangan Paint Protection Film dan Kaca Film Ginnva pada berbagai jenis kendaraan premium di Indonesia.',
    url: 'https://ginnva.id/case',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Portofolio & Case Study — Hasil Pemasangan Ginnva',
    description: 'Lihat portofolio hasil pemasangan Paint Protection Film dan Kaca Film Ginnva pada berbagai jenis kendaraan premium di Indonesia.',
  },
};

export default function CasePage() {
  return (
    <main data-page="case" data-nav="brand">
      <CaseBanner />
      <CaseGrid />
    </main>
  );
}