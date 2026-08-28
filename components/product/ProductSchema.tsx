import { SITE_URL } from '@/config/seo';

interface ProductSchemaProps {
  name: string;
  description: string;
  imagePath: string; // relatif, mis. "/image/product/paint-protection-film.webp"
  category: string;
  path: string; // mis. "/product/film-pelindung-cat"
  // false untuk produk yang belum dijual (mis. Color Change Film) — dulu
  // SEMUA halaman produk hardcode availability "InStock" di sini walau
  // produknya belum benar-benar dijual, itu salah satu penyebab Google AI
  // Overview meringkas produk itu sebagai sudah tersedia dibeli. Default
  // true supaya 3 produk yang memang sudah dijual tidak perlu ubah apa pun.
  available?: boolean;
}

// Schema markup Product — dipakai di tiap halaman /product/* supaya Google
// bisa menampilkan rich result (nama, gambar, kategori, brand) untuk
// produk Ginnva di hasil pencarian.
export default function ProductSchema({ name, description, imagePath, category, path, available = true }: ProductSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `${SITE_URL}${imagePath}`,
    category,
    url: `${SITE_URL}${path}`,
    brand: {
      '@type': 'Brand',
      name: 'Ginnva',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'PT Ginnva Shield Indonesia',
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      availability: available ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      priceCurrency: 'IDR',
      url: `${SITE_URL}${path}`,
      seller: {
        '@type': 'Organization',
        name: 'PT Ginnva Shield Indonesia',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}