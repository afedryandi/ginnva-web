'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductBanner from '@/components/product/ProductBanner';
import KacaFilmIntro from '@/components/product/KacaFilmIntro';
import KacaFilmSpecs from '@/components/product/KacaFilmSpecs';
import KacaFilmGallery from '@/components/product/KacaFilmGallery';

// Product mapping
const productMap: { [key: string]: string } = {
  '1': 'kaca-film-mobil',
};

function ProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // If id=1 or no id parameter, show kaca-film-mobil
  if (id === '1' || !id) {
    return (
      <main data-page="product" data-nav="product">
        <ProductBanner />
        <KacaFilmIntro />
        <KacaFilmSpecs />
        <KacaFilmGallery />
      </main>
    );
  }

  // If id doesn't match any product
  return (
    <main data-page="product" data-nav="product">
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1>Produk Tidak Ditemukan</h1>
        <p>Maaf, produk yang Anda cari tidak tersedia.</p>
      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}
