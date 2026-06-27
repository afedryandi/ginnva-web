import React from 'react';
import { Metadata } from 'next';
import ProductBanner from '@/components/product/ProductBanner';
import ProductIntro from '@/components/product/ProductIntro';
import ProductSpecs from '@/components/product/ProductSpecs';
import ProductGallery from '@/components/product/ProductGallery';

export const metadata: Metadata = {
  title: 'Premium Film Kaca Mobil | Ginnva Shield Indonesia',
  description: 'Kaca film insulasi otomotif premium Ginnva memberikan penolakan panas infra merah optimal dan perlindungan sinar UV maksimal untuk kenyamanan berkendara Anda.',
};

const columnsData = [
  'Tipe Varian', 
  'Transmisi Cahaya (VLT)', 
  'Penolakan Infra Merah (IRR)', 
  'Pemblokiran UV (UVR)', 
  'Penolakan Energi Total (TSER)'
];

const rowsData = [
  { label: 'Ziwei 70 (Depan)', values: ['72%', '95%', '99%', '58%'] },
  { label: 'Ziwei 40 (Samping/Belakang)', values: ['38%', '92%', '99%', '62%'] },
  { label: 'Ziwei 20 (Samping/Belakang Gelap)', values: ['18%', '95%', '99%', '68%'] }
];

const galleryImages = [
  '/image/image-coming-soon.webp',
  '/image/image-coming-soon.webp',
  '/image/image-coming-soon.webp',
  '/image/image-coming-soon.webp'
];

const faqItems = [
  { 
    q: 'Apakah kaca film Ginnva mengganggu sinyal GPS?', 
    a: 'Tidak. Formulasi sputtering material kami tidak memblokir gelombang elektromagnetik, sehingga sinyal HP, e-Toll, dan GPS tetap berfungsi normal.' 
  },
  { 
    q: 'Berapa lama masa garansi resmi Ginnva?', 
    a: 'Setiap pemasangan produk tipe premium mendapatkan perlindungan E-Warranty resmi hingga 5-10 tahun dari risiko gelembung, korosi, maupun perubahan warna.' 
  }
];

export default function KacaFilmMobilPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductBanner 
        currentId="1" 
        title="Film Kaca Mobil" 
        enTitle="Car Window Film" 
        bgUrl="/image/product/car-window-film.webp" 
      />
      <ProductIntro 
        title="Ginnva Premium Car Window Film" 
        subTitle="HIGH-PERFORMANCE CAR WINDOW FILM" 
        description="Diproduksi menggunakan teknologi pelapisan magnetron sputtering multi-layer tingkat lanjut. Kaca film Ginnva memberikan penolakan panas (Heat Rejection) infra merah yang ekstrem, perlindungan blokade sinar UV hingga 99%, serta menjaga visibilitas berkendara tetap jernih tanpa mengganggu sinyal GPS maupun seluler." 
        imgUrl="/image/product/car-window-film.webp" 
      />
      <ProductSpecs columns={columnsData} rows={rowsData} />
      <ProductGallery images={galleryImages} faqs={faqItems} />
    </main>
  );
}