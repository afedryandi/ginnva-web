// config/site.ts

export const MALL_URL = '';

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  sub: string;
  text: string;
  long: string;
  img: string;
  gallery: string[];
}

export const GINNVA_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    slug: 'kaca-film-mobil',
    name: 'Car Window Film',
    sub: 'KACA FILM MOBIL',
    text: 'Teknologi Bi-silver Sputtering dan Nano-Ceramic Premium. Dapat memblokir Sinar Ultraviolet hingga 99%, tetap jernih dari dalam, anti silau, tanpa mengganggu sinyal GPS maupun e-Toll.',
    long: 'Kaca Film Mobil Ginnva menggunakan teknologi pelapisan Magnetron Sputtering Multi-Layer dan Nano-Ceramic tingkat lanjut. Tersedia dalam berbagai seri mulai dari Bi-silver Sputtering (garansi 10 tahun) hingga Nano-Ceramic (garansi 8 tahun). Semua seri memberikan perlindungan UV hingga 99%, penolakan panas inframerah superior, dan kejernihan optik tinggi — tanpa mengganggu sinyal GPS maupun e-Toll.',
    img: '/image/product/car-window-film.webp',
    gallery: []
  },
  {
    id: '2',
    slug: 'film-pelindung-cat',
    name: 'Paint Protection Film',
    sub: 'FILM PELINDUNG CAT',
    text: '100% Polycaprolactone TPU Generasi 3 dengan Crystal-Shield Coating. Self-Healing, Anti-Yellowing Superior, dan Super Hydrophobic — perlindungan cat tahan hingga 10 tahun.',
    long: 'Ginnva PPF menggunakan bahan 100% Polycaprolactone TPU Generasi 3 dengan lapisan Crystal-Shield dan adhesive berkinerja tinggi. Tersedia dalam seri Black Crystal, Orange Crystal, dan Green Crystal. Melindungi cat dari goresan, benturan kerikil, dan korosi, dilengkapi kemampuan self-healing, ketahanan anti-yellowing superior, dan efek Super Hydrophobic yang membuat permukaan selalu bersih.',
    img: '/image/product/paint-protection-film.webp',
    gallery: []
  },
  {
    id: '3',
    slug: 'film-pengubah-warna',
    name: 'Color Change Film',
    sub: 'FILM PENGUBAH WARNA',
    text: 'Ubah tampilan eksterior kendaraan secara instan dengan beragam pilihan warna dan tekstur: matte, satin, glossy (tanpa pengecatan ulang yang menurunkan nilai jual).',
    long: 'Ginnva Color Change Film hadir dalam berbagai pilihan warna dan finishing tekstur premium — matte, satin, hingga ultra-gloss — berbasis material PVC berkualitas tinggi. Dipasang presisi menggunakan pola digital cutting sesuai tipe kendaraan, tampilan baru bisa dinikmati tanpa mengorbankan nilai jual kendaraan.',
    img: '/image/product/color-change-film.webp',
    gallery: []
  },
  {
    id: '4',
    slug: 'film-kaca-bangunan',
    name: 'Architectural Film',
    sub: 'FILM KACA BANGUNAN',
    text: 'Solusi efisiensi energi untuk gedung dan hunian. Menolak panas matahari secara signifikan, mengurangi beban kerja AC, memblokir paparan UV hingga 99% dan memberikan kenyamanan interior sepanjang hari.',
    long: 'Ginnva Architectural Film dirancang untuk kaca gedung dan hunian: menolak panas secara signifikan, memblokir UV hingga 99%, meningkatkan privasi, serta memberikan perlindungan tambahan dari pecahan kaca. Hasilnya adalah interior yang lebih sejuk, nyaman, dan hemat energi sepanjang hari.',
    img: '/image/product/architectural-window-film.webp',
    gallery: []
  }
];

export const NAV_ITEMS = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Tentang',
    href: '/brand',
    sub: [
      { label: 'Profil Perusahaan', href: '/brand' },
      { label: 'Galeri Pemasangan', href: '/case' },
      { label: 'Berita', href: '/news' },
      { label: 'Karier', href: '/karier' },
      { label: 'Kontak', href: '/contact' }
    ]
  },
  {
    label: 'Produk',
    href: '/product/kaca-film-mobil',
    // Mengarah ke slug route langsung (/product/[slug]), bukan query string,
    // karena setiap produk punya halaman dan data lengkap sendiri di app/product/[slug]/page.tsx
    sub: GINNVA_PRODUCTS.map(p => ({ label: p.name, href: `/product/${p.slug}` }))
  },
  {
    label: 'Layanan',
    href: '/warranty',
    sub: [
      { label: 'Cek Garansi', href: '/warranty' },
      { label: 'Lokasi Dealer', href: '/dealers' },
      { label: 'Minta Penawaran', href: '/quote' },
      { label: 'Kemitraan', href: '/kemitraan' }
    ]
  },
  { label: 'Toko Online', href: MALL_URL, blank: true, comingSoon: true }
];