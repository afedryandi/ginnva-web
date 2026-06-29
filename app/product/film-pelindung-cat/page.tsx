import React from 'react';
import { Metadata } from 'next';
import ProductBanner from '@/components/product/ProductBanner';
import ProductIntro from '@/components/product/ProductIntro';
import ProductSpecs from '@/components/product/ProductSpecs';
import ProductGallery from '@/components/product/ProductGallery';

export const metadata: Metadata = {
  title: 'Paint Protection Film (PPF) Premium | Ginnva Shield Indonesia',
  description: 'Lindungi cat asli kendaraan Anda dari goresan kerikil jalanan dan cuaca ekstrem menggunakan Ginnva PPF berteknologi self-healing.',
};

const columnsData = ['Tipe Varian', 'Ketebalan', 'Tingkat Kejernihan', 'Ketahanan UV', 'Fitur Utama'];

const specsRows = [
  { label: 'Ginnva PPF Matte', values: ['8.5 mil', 'Gloss 95%', 'Tahan Menguning', 'Self-Healing'] },
  { label: 'Ginnva PPF Glossy', values: ['7.5 mil', 'Gloss 98%', 'Tahan Menguning', 'Self-Healing'] }
];

export default function FilmPerlindunganCatPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductBanner currentId="2" title="Paint Protection Film" enTitle="Film Pelindung Cat" bgUrl="/image/product/paint-protection-film.webp" />
      <ProductIntro 
        title="Ginnva Paint Protection Film" 
        subTitle="ULTIMATE PAINT PROTECTION" 
        description="Lapisan film TPU transparan elastisitas tinggi yang memberikan perlindungan fisik maksimal dari benturan kerikil, goresan halus, dan oksidasi kimia luar dengan fitur pemulihan mandiri (self-healing)." 
        imgUrl="/image/product/paint-protection-film.webp" 
      />
      <ProductSpecs columns={columnsData} rows={specsRows} />
      <ProductGallery images={['/image/product/paint-protection-film.webp']} faqs={[]} />
    </main>
  );
}