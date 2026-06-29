import React from 'react';
import { Metadata } from 'next';
import ProductBanner from '@/components/product/ProductBanner';
import ProductIntro from '@/components/product/ProductIntro';
import ProductSpecs from '@/components/product/ProductSpecs';
import ProductGallery from '@/components/product/ProductGallery';

export const metadata: Metadata = {
  title: 'Film Kaca Bangunan & Rumah | Ginnva Shield Indonesia',
};

const columnsData = ['Tipe Varian', 'VLT (Kegelapan)', 'IRR (Tolak Panas)', 'UVR (Blok UV)', 'TSER (Total Energi)'];

const specsRows = [
  { label: 'Ginnva Architecture 20', values: ['20%', '90%', '99%', '65%'] },
  { label: 'Ginnva Architecture 40', values: ['40%', '88%', '99%', '60%'] }
];

export default function FilmKacaBangunanPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductBanner currentId="4" title="Film Kaca Bangunan" enTitle="Architectural Window Film" bgUrl="/image/product/architectural-window-film.webp" />
      <ProductIntro 
        title="Ginnva Architectural Film" 
        subTitle="ECO ENERGY SAVING WINDOW FILM" 
        description="Solusi efisiensi energi interior untuk gedung perkantoran dan hunian pribadi. Mereduksi beban kerja AC secara signifikan dengan menolak panas matahari langsung yang menembus kaca jendela." 
        imgUrl="/image/product/architectural-window-film.webp" 
      />
      <ProductSpecs columns={columnsData} rows={specsRows} />
      <ProductGallery images={['/image/product/architectural-window-film.webp']} faqs={[]} />
    </main>
  );
}