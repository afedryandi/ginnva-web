import React from 'react';
import { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import ProductBanner from '@/components/product/ProductBanner';
import ProductIntro from '@/components/product/ProductIntro';
import ProductSchema from '@/components/product/ProductSchema';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/product/film-kaca-bangunan'),
  title: 'Film Kaca Bangunan Ginnva — Efisiensi Energi & Perlindungan UV',
  description: 'Ginnva Architectural Film untuk gedung dan hunian. Tolak panas matahari, hemat energi AC, blokir UV 99%. Solusi kaca bangunan premium.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Film Kaca Bangunan Ginnva — Efisiensi Energi & Perlindungan UV',
    description: 'Ginnva Architectural Film untuk gedung dan hunian. Tolak panas matahari, hemat energi AC, blokir UV 99%. Solusi kaca bangunan premium.',
    url: 'https://ginnva.id/product/film-kaca-bangunan',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Film Kaca Bangunan Ginnva — Efisiensi Energi & Perlindungan UV',
    description: 'Ginnva Architectural Film untuk gedung dan hunian. Tolak panas matahari, hemat energi AC, blokir UV 99%. Solusi kaca bangunan premium.',
  },
};

export default function FilmKacaBangunanPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductSchema
        name="Film Kaca Bangunan Ginnva"
        description="Ginnva Architectural Film untuk gedung dan hunian. Tolak panas matahari, hemat energi AC, blokir UV 99%. Solusi kaca bangunan premium."
        imagePath="/image/product/architectural-window-film.webp"
        category="Architectural Film"
        path="/product/film-kaca-bangunan"
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