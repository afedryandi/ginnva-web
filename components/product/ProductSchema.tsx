import { SITE_URL } from '@/config/seo';

interface ProductSchemaProps {
  name: string;
  description: string;
  imagePath: string; // relatif, mis. "/image/product/paint-protection-film.webp"
  category: string;
  path: string; // mis. "/product/film-pelindung-cat"
}

// Schema markup Product — dipakai di tiap halaman /product/* supaya Google
// bisa menampilkan rich result (nama, gambar, kategori, brand) untuk
// produk Ginnva di hasil pencarian.
export default function ProductSchema({ name, description, imagePath, category, path }: ProductSchemaProps) {
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
      availability: 'https://schema.org/InStock',
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