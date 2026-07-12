import React from 'react';
import { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import ProductBanner from '@/components/product/ProductBanner';
import ProductIntro from '@/components/product/ProductIntro';
import ProductSpecs from '@/components/product/ProductSpecs';
import ProductGalleryDynamic from '@/components/product/ProductGalleryDynamic';
import ProductFaq from '@/components/product/ProductFaq';
import ProductSchema from '@/components/product/ProductSchema';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/product/kaca-film-mobil'),
  title: 'Kaca Film Mobil Premium Ginnva — Teknologi Bi-Silver & Nano-Ceramic',
  description: 'Kaca film mobil Ginnva dengan teknologi Bi-silver Sputtering dan Nano-Ceramic. Tolak panas hingga 93%, blokir UV 99%, garansi hingga 10 tahun.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Kaca Film Mobil Premium Ginnva — Teknologi Bi-Silver & Nano-Ceramic',
    description: 'Kaca film mobil Ginnva dengan teknologi Bi-silver Sputtering dan Nano-Ceramic. Tolak panas hingga 93%, blokir UV 99%, garansi hingga 10 tahun.',
    url: 'https://ginnva.id/product/kaca-film-mobil',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Kaca Film Mobil Premium Ginnva — Teknologi Bi-Silver & Nano-Ceramic',
    description: 'Kaca film mobil Ginnva dengan teknologi Bi-silver Sputtering dan Nano-Ceramic. Tolak panas hingga 93%, blokir UV 99%, garansi hingga 10 tahun.',
  },
};

const columnsData = [
  'Series',
  'Part',
  'Thickness (mil)',
  'VLT%\n(Visible Light Transmittance)',
  'VLR%\n(Visible Light Reflectance)',
  'UV Block%',
  'TSER%\n(Total Solar Energy Rejected)',
  'Warranty\n(Years)',
];

const rowsData = [
  { label: 'A70', values: ['Depan',       '2', '72', '11/11', '99', '61', '10'] },
  { label: 'H70', values: ['Depan',       '2', '72', '8/8',   '99', '47', '8'] },
  { label: 'H30', values: ['Samping/Belakang', '2', '28', '6/6', '99', '56', '8'] },
  { label: 'H15', values: ['Samping/Belakang', '2', '16', '6/6', '99', '65', '8'] },
];

const faqItems = [
  {
    q: 'Apakah kaca film Ginnva mengganggu sinyal GPS atau e-Toll?',
    a: 'Tidak. Teknologi sputtering Ginnva dirancang agar tidak memblokir gelombang elektromagnetik, sehingga sinyal HP, GPS, dan e-Toll tetap berfungsi normal setelah pemasangan.'
  },
  {
    q: 'Berapa lama masa garansi resmi Ginnva?',
    a: 'Seri A70 mendapat garansi 10 tahun. Seri H70, H30, dan H15 mendapat garansi 8 tahun — mencakup perlindungan dari gelembung, korosi, dan perubahan warna akibat cacat produk. Garansi diterbitkan secara digital melalui sistem E-Warranty resmi Ginnva.'
  },
  {
    q: 'Apa perbedaan seri A70 dan H70?',
    a: 'A70 menggunakan teknologi Bi-silver Sputtering dengan TSER 61% (penolakan total energi matahari) dan garansi 10 tahun — cocok untuk kaca depan dengan performa penolakan panas tertinggi. H70 menggunakan Nano-Ceramic dengan TSER 47% dan garansi 8 tahun, ideal untuk kaca depan dengan nilai lebih terjangkau.'
  },
  {
    q: 'Mengapa H30 dan H15 lebih gelap dari A70/H70?',
    a: 'H30 (VLT 28%) dan H15 (VLT 16%) dirancang khusus untuk kaca samping dan belakang. Kaca di area ini umumnya dipasang film lebih gelap untuk meningkatkan privasi penumpang. Semakin rendah nilai VLT (Visible Light Transmittance), semakin gelap tampilan film dan semakin tinggi tingkat privasi yang didapat.'
  },
  {
    q: 'Apakah kaca film Ginnva aman untuk kaca depan?',
    a: 'Ya. Seri A70 dan H70 dirancang khusus untuk kaca depan (windshield) dengan VLT 72% — memenuhi persyaratan visibilitas minimal sesuai aturan lalu lintas, sekaligus memberikan perlindungan terhadap sinar UV hingga 99% dan penolakan panas inframerah yang signifikan.'
  },
  {
    q: 'Apakah Ginnva menyediakan garansi digital?',
    a: 'Ya. Setiap pemasangan produk Ginnva dilengkapi E-Warranty resmi yang diterbitkan secara digital — mencakup data kendaraan, produk yang dipasang, tanggal pemasangan, dan masa berlaku garansi. Garansi dapat diverifikasi kapan saja melalui sistem E-Warranty Ginnva Indonesia.'
  }
];

export default function KacaFilmMobilPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductSchema
        name="Kaca Film Mobil Ginnva"
        description="Kaca film mobil Ginnva dengan teknologi Bi-silver Sputtering dan Nano-Ceramic. Tolak panas hingga 93%, blokir UV 99%, garansi hingga 10 tahun."
        imagePath="/image/product/car-window-film.webp"
        category="Kaca Film Otomotif"
        path="/product/kaca-film-mobil"
      />
      <ProductBanner
        currentId="1" 
        title="Film Kaca Mobil" 
        enTitle="Car Window Film" 
        bgUrl="/image/product/car-window-film.webp" 
      />
      <ProductIntro 
        title="Ginnva Premium Car Window Film" 
        subTitle="KACA FILM MOBIL PERFORMA TINGGI"
        description="Kaca Film Mobil Ginnva menggunakan teknologi pelapisan Magnetron Sputtering Multi-Layer dan Nano-Ceramic tingkat lanjut. Tersedia dalam berbagai seri mulai dari Bi-silver Sputtering (garansi 10 tahun) hingga Nano-Ceramic (garansi 8 tahun). Semua seri memberikan perlindungan UV hingga 99%, penolakan panas inframerah superior, dan kejernihan optik tinggi — tanpa mengganggu sinyal GPS maupun e-Toll."
        imgUrl="/image/product/car-window-film.webp" 
      />
      <ProductSpecs columns={columnsData} rows={rowsData} />
      <ProductGalleryDynamic productType="window_film" />
      <ProductFaq faqs={faqItems} />
    </main>
  );
}