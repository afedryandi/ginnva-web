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
  ...canonical('/product/film-pelindung-cat'),
  title: 'Paint Protection Film (PPF) Ginnva — TPU Generasi 3 Self-Healing',
  description: 'PPF Ginnva berbasis 100% TPU 3rd Generation. Self-healing, anti-yellowing, super hydrophobic. Proteksi cat kendaraan premium garansi 10 tahun.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Paint Protection Film (PPF) Ginnva — TPU Generasi 3 Self-Healing',
    description: 'PPF Ginnva berbasis 100% TPU 3rd Generation. Self-healing, anti-yellowing, super hydrophobic. Proteksi cat kendaraan premium garansi 10 tahun.',
    url: 'https://ginnva.id/product/film-pelindung-cat',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Paint Protection Film (PPF) Ginnva — TPU Generasi 3 Self-Healing',
    description: 'PPF Ginnva berbasis 100% TPU 3rd Generation. Self-healing, anti-yellowing, super hydrophobic. Proteksi cat kendaraan premium garansi 10 tahun.',
  },
};

const columnsData = [
  'Series',
  'Model',
  'Base\nMaterial',
  'Coating',
  'Color',
  'Thickness\n(mil)',
  'Cap Sheet',
  'Linear',
  'Specification',
  'Warranty\n(Years)',
];

const specsRows = [
  { label: 'Black Crystal', values: ['M8-M', 'TPU 3rd Generation', 'Hydrophobic', 'Matte', '7.5 ± 3%', 'HC 50 µm', '92 µm', '1.52 × 15 m', '8'] },
  { label: 'Orange Crystal', values: ['M10', 'TPU 3rd Generation', 'Hydrophobic', 'Gloss', '8.8 ± 3%', 'HC 50 µm', '92 µm', '1.52 × 15 m', '8'] },
  { label: 'Orange Crystal', values: ['H10', 'TPU 3rd Generation', 'Hydrophobic', 'Gloss', '7.8 ± 3%', 'HC 50 µm', '92 µm', '1.52 × 15 m', '8'] },
  { label: 'Green Crystal', values: ['EV7', 'TPU 3rd Generation', 'Hydrophilic', 'Gloss', '7.5 ± 3%', 'HC 50 µm', '75 µm', '1.52 × 15 m', '5'] },
];

const faqItems = [
  {
    q: 'Apa itu Paint Protection Film (PPF) dan apa bedanya dengan coating?',
    a: 'PPF adalah lapisan film TPU transparan yang dipasang di atas permukaan cat kendaraan untuk memberikan perlindungan fisik dari benturan kerikil, goresan halus, dan kontaminan kimia. Berbeda dengan coating yang hanya melapisi secara kimiawi, PPF memiliki ketebalan nyata (7.5–8.8 mil) yang menyerap dampak fisik secara langsung dan memiliki kemampuan self-healing terhadap goresan ringan.'
  },
  {
    q: 'Apakah PPF Ginnva aman untuk cat asli kendaraan?',
    a: 'Ya. Adhesive PS berkinerja tinggi milik Ginnva diformulasikan khusus agar tidak merusak cat asli — memiliki transparansi tinggi, haze rendah, daya rekat kuat namun tetap aman saat dilepas. Tidak meninggalkan residu dan tidak mengubah warna cat di bawahnya.'
  },
  {
    q: 'Apa itu fitur self-healing pada PPF Ginnva?',
    a: 'Lapisan top coating Crystal-Shield Ginnva memiliki kemampuan pemulihan mandiri berkat struktur jaringan silang tiga dimensi yang elastis. Goresan ringan dan swirl mark pada permukaan film dapat pulih sendiri dengan bantuan panas matahari atau air hangat — menjaga tampilan kendaraan tetap sempurna tanpa perlu dipoles ulang.'
  },
  {
    q: 'Apakah PPF Ginnva tahan terhadap menguning?',
    a: 'Ya. PPF Ginnva memiliki ketahanan anti-yellowing superior yang diuji melalui uji akselerasi QUV selama 400 jam (setara ratusan hari paparan sinar matahari). Hasilnya menunjukkan perubahan warna yang sangat minimal — berkat UV absorber yang dicampurkan langsung ke dalam substrat film, bukan hanya di lapisan adhesive, sehingga perlindungannya jauh lebih tahan lama.'
  },
  {
    q: 'Berapa lama masa garansi PPF Ginnva?',
    a: 'Garansi resmi bervariasi sesuai seri produk: Black Crystal dan Orange Crystal mendapat garansi 8 tahun, sementara Green Crystal (EV7) mendapat garansi 5 tahun. Setiap pemasangan dilindungi E-Warranty digital yang mencakup perlindungan dari gelembung, delaminasi, perubahan warna, dan kerusakan akibat cacat produk.'
  },
  {
    q: 'Apakah semua bagian eksterior kendaraan bisa dipasang PPF?',
    a: 'Ya. PPF Ginnva tersedia untuk pemasangan full body maupun parsial — area rentan seperti kap mesin, bumper, fender, kaca spion, dan door cup. Dealer resmi Ginnva menggunakan pola cutting digital sesuai tipe kendaraan untuk memastikan hasil pemasangan yang presisi dan rapi.'
  },
];

export default function FilmPerlindunganCatPage() {
  return (
    <main data-page="product" data-nav="product">
      <ProductSchema
        name="Paint Protection Film (PPF) Ginnva"
        description="PPF Ginnva berbasis 100% TPU 3rd Generation, self-healing, anti-yellowing, super hydrophobic. Proteksi cat kendaraan premium garansi hingga 8 tahun."
        imagePath="/image/product/paint-protection-film.webp"
        category="Paint Protection Film"
        path="/product/film-pelindung-cat"
      />
      <ProductBanner currentId="2" title="Paint Protection Film" enTitle="Film Pelindung Cat" bgUrl="/image/product/paint-protection-film.webp" />
      <ProductIntro 
        title="Ginnva Paint Protection Film" 
        subTitle="FILM PELINDUNG CAT PREMIUM"
        description="Ginnva PPF menggunakan bahan 100% TPU 3rd Generation dengan lapisan Crystal-Shield dan adhesive berkinerja tinggi. Tersedia dalam seri Black Crystal, Orange Crystal, dan Green Crystal. Melindungi cat dari goresan, benturan kerikil, dan korosi, dilengkapi kemampuan self-healing, ketahanan anti-yellowing superior, dan efek Super Hydrophobic yang membuat permukaan selalu bersih." 
        imgUrl="/image/product/paint-protection-film.webp" 
      />
      <ProductSpecs columns={columnsData} rows={specsRows} />
      <ProductGalleryDynamic productType="ppf" />
      <ProductFaq faqs={faqItems} />
    </main>
  );
}