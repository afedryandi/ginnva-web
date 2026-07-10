import React from 'react';
import NewsBanner from '@/components/news/NewsBanner';
import NewsGrid from '@/components/news/NewsGrid';

import type { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/news'),
  title: 'Berita & Artikel — Ginnva Shield Indonesia',
  description: 'Berita terbaru, tips perawatan film kendaraan, dan informasi produk dari Ginnva Shield Indonesia.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Berita & Artikel — Ginnva Shield Indonesia',
    description: 'Berita terbaru, tips perawatan film kendaraan, dan informasi produk dari Ginnva Shield Indonesia.',
    url: 'https://ginnva.id/news',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Berita & Artikel — Ginnva Shield Indonesia',
    description: 'Berita terbaru, tips perawatan film kendaraan, dan informasi produk dari Ginnva Shield Indonesia.',
  },
};

export default function NewsPage() {
  return (
    <main data-page="news" data-nav="brand">
      <NewsBanner />
      <NewsGrid />
    </main>
  );
}