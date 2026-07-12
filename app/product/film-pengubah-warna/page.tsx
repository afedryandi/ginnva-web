import React from 'react';
import { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import ProductBanner from '@/components/product/ProductBanner';
import ProductIntro from '@/components/product/ProductIntro';
import ProductSchema from '@/components/product/ProductSchema';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/product/film-pengubah-warna'),
  title: 'Color Change Film Ginnva — Ubah Warna Kendaraan Tanpa Cat Ulang',
  description: 'Ganti tampilan kendaraan dengan Color Change Film Ginnva. Tersedia matte, satin, ultra-gloss dalam ratusan pilihan warna. Tanpa cat ulang.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Color Change Film Ginnva — Ubah Warna Kendaraan Tanpa Cat Ulang',
    description: 'Ganti tampilan kendaraan dengan Color Change Film Ginnva. Tersedia matte, satin, ultra-gloss dalam ratusan pilihan warna. Tanpa cat ulang.',
    url: 'https://ginnva.id/product/film-pengubah-warna',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Color Change Film Ginnva — Ubah Warna Kendaraan Tanpa Cat Ulang',
    description: 'Ganti tampilan kendaraan dengan Color Change Film Ginnva. Tersedia matte, satin, ultra-gloss dalam ratusan pilihan warna. Tanpa cat ulang.',
  },
};

export default function FilmPengubahWarnaPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductSchema
        name="Color Change Film Ginnva"
        description="Ganti tampilan kendaraan dengan Color Change Film Ginnva. Tersedia matte, satin, ultra-gloss dalam ratusan pilihan warna. Tanpa cat ulang."
        imagePath="/image/product/color-change-film.webp"
        category="Color Change Film"
        path="/product/film-pengubah-warna"
      />
      <ProductBanner currentId="3" title="Film Pengubah Warna" enTitle="Color Changing Film" bgUrl="/image/product/color-change-film.webp" />
      <ProductIntro
        title="Ginnva Color Change Film"
        subTitle="FILM PENGUBAH WARNA KENDARAAN"
        description="Ginnva Color Change Film hadir dalam berbagai pilihan warna dan finishing tekstur premium — matte, satin, hingga ultra-gloss — berbasis material PVC berkualitas tinggi. Dipasang presisi menggunakan pola digital cutting sesuai tipe kendaraan, tampilan baru bisa dinikmati tanpa mengorbankan nilai jual kendaraan."
        imgUrl="/image/product/color-change-film.webp"
        ctaLabel="Tanya Ketersediaan"
        comingSoon
      />
    </main>
  );
}