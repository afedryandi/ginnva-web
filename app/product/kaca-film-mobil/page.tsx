import React from 'react';
import { Metadata } from 'next';
import ProductBanner from '@/components/product/ProductBanner';
import KacaFilmIntro from '@/components/product/KacaFilmIntro';
import KacaFilmSpecs from '@/components/product/KacaFilmSpecs';
import KacaFilmGallery from '@/components/product/KacaFilmGallery';

// Pengaturan Tag SEO Halaman Kaca Film
export const metadata: Metadata = {
  title: 'Premium Film Kaca Mobil | Ginnva Shield Indonesia',
  description: 'Film Kaca otomotif premium Ginnva memberikan penolakan panas infra merah optimal dan perlindungan sinar UV maksimal untuk kenyamanan berkendara Anda.',
};

export default function KacaFilmPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductBanner />
      <KacaFilmIntro />
      <KacaFilmSpecs />
      <KacaFilmGallery />
    </main>
  );
}