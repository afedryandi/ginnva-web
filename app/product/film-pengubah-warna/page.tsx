import React from 'react';
import { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import ProductBanner from '@/components/product/ProductBanner';
import ProductIntro from '@/components/product/ProductIntro';
import ProductSchema from '@/components/product/ProductSchema';

// Produk ini BELUM DIJUAL — title/description/structured data SENGAJA
// menyatakan "segera hadir" secara eksplisit (bukan menyiratkan sudah
// tersedia dibeli seperti versi sebelumnya), dan ProductSchema di bawah
// pakai available={false} (availability jadi PreOrder, bukan InStock) —
// supaya Google/AI Overview tidak lagi meringkas ini sebagai produk yang
// sudah dijual Ginnva sekarang. Update copy ini begitu produknya benar-benar
// siap dijual (dan hapus available={false} di bawah).
export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/product/film-pengubah-warna'),
  title: 'Color Change Film Ginnva — Segera Hadir',
  description: 'Color Change Film Ginnva sedang dalam persiapan dan belum tersedia untuk dibeli. Matte, satin, dan ultra-gloss — hubungi kami untuk info ketersediaan.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Color Change Film Ginnva — Segera Hadir',
    description: 'Color Change Film Ginnva sedang dalam persiapan dan belum tersedia untuk dibeli. Hubungi kami untuk info ketersediaan.',
    url: 'https://ginnva.id/product/film-pengubah-warna',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Color Change Film Ginnva — Segera Hadir',
    description: 'Color Change Film Ginnva sedang dalam persiapan dan belum tersedia untuk dibeli. Hubungi kami untuk info ketersediaan.',
  },
};

export default function FilmPengubahWarnaPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductSchema
        name="Color Change Film Ginnva"
        description="Color Change Film Ginnva sedang dalam persiapan dan belum tersedia untuk dibeli. Matte, satin, dan ultra-gloss — hubungi kami untuk info ketersediaan."
        imagePath="/image/product/color-change-film.webp"
        category="Color Change Film"
        path="/product/film-pengubah-warna"
        available={false}
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