import React from 'react';
import { Metadata } from 'next';
import ProductBanner from '@/components/product/ProductBanner';
import ProductIntro from '@/components/product/ProductIntro';
import ProductSpecs from '@/components/product/ProductSpecs';
import ProductGallery from '@/components/product/ProductGallery';

export const metadata: Metadata = {
  title: 'Premium Vinyl Wrap & Color Changing Film | Ginnva Shield Indonesia',
};

const columnsData = ['Seri Warna', 'Daya Tahan', 'Finishing Tekstur', 'Material Dasar', 'Perlindungan'];

const specsRows = [
  { label: 'Satin Series', values: ['3-5 Tahun', 'Satin Matte', 'Premium PVC', 'Anti-Scratch'] },
  { label: 'Glossy Series', values: ['3-5 Tahun', 'Ultra Gloss', 'Premium PVC', 'Anti-Scratch'] }
];

export default function FilmPengubahWarnaPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductBanner currentId="3" title="Film Pengubah Warna" enTitle="Color Changing Film" bgUrl="/image/product/color-banner.webp" />
      <ProductIntro 
        title="Ginnva Color Changing Film" 
        subTitle="PREMIUM VINYL WRAPPING SOLUTIONS" 
        description="Ubah estetika gaya mobil Anda secara instan dengan ratusan pilihan warna eksklusif matt, satin, maupun high-gloss tanpa proses pengecatan ulang yang menurunkan nilai jual kendaraan." 
        imgUrl="/image/product/color-hero.webp" 
      />
      <ProductSpecs columns={columnsData} rows={specsRows} />
      <ProductGallery images={['/image/product/color-g1.webp', '/image/product/color-g2.webp']} faqs={[]} />
    </main>
  );
}