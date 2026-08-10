import React from 'react';
import { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import ProductBanner from '@/components/product/ProductBanner';
import ProductIntro from '@/components/product/ProductIntro';
import ProductSchema from '@/components/product/ProductSchema';

// Produk ini BELUM DIJUAL (UI-nya sudah pakai comingSoon di ProductIntro
// di bawah, tapi SEO title/description/structured data sebelumnya masih
// menyatakan tersedia penuh — pola bug yang sama seperti Color Change
// Film). Title/description sekarang eksplisit "segera hadir", dan
// ProductSchema pakai available={false} (availability jadi PreOrder,
// bukan InStock). Update copy ini + hapus available={false} begitu
// produknya benar-benar siap dijual.
export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/product/film-kaca-bangunan'),
  title: 'Film Kaca Bangunan (Architectural Film) Ginnva — Segera Hadir',
  description: 'Ginnva Architectural Film untuk gedung dan hunian sedang dalam persiapan dan belum tersedia untuk dibeli. Hubungi kami untuk info ketersediaan.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Film Kaca Bangunan (Architectural Film) Ginnva — Segera Hadir',
    description: 'Ginnva Architectural Film untuk gedung dan hunian sedang dalam persiapan dan belum tersedia untuk dibeli. Hubungi kami untuk info ketersediaan.',
    url: 'https://ginnva.id/product/film-kaca-bangunan',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Film Kaca Bangunan (Architectural Film) Ginnva — Segera Hadir',
    description: 'Ginnva Architectural Film untuk gedung dan hunian sedang dalam persiapan dan belum tersedia untuk dibeli. Hubungi kami untuk info ketersediaan.',
  },
};

export default function FilmKacaBangunanPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductSchema
        name="Film Kaca Bangunan Ginnva"
        description="Ginnva Architectural Film untuk gedung dan hunian sedang dalam persiapan dan belum tersedia untuk dibeli. Hubungi kami untuk info ketersediaan."
        imagePath="/image/product/architectural-window-film.webp"
        category="Architectural Film"
        path="/product/film-kaca-bangunan"
        available={false}
      />
      <ProductBanner currentId="4" title="Film Kaca Bangunan" enTitle="Architectural Window Film" bgUrl="/image/product/architectural-window-film.webp" />
      <ProductIntro
        title="Ginnva Architectural Film"
        subTitle="FILM KACA HEMAT ENERGI"
        description="Ginnva Architectural Film dirancang untuk kaca gedung dan hunian: menolak panas secara signifikan, memblokir UV hingga 99%, meningkatkan privasi, serta memberikan perlindungan tambahan dari pecahan kaca. Hasilnya adalah interior yang lebih sejuk, nyaman, dan hemat energi sepanjang hari."
        imgUrl="/image/product/architectural-window-film.webp"
        ctaLabel="Tanya Ketersediaan"
        comingSoon
      />
    </main>
  );
}