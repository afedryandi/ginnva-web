import { SITE_URL } from '@/config/seo';

// llms.txt — konvensi ringkasan terstruktur untuk AI crawler (ChatGPT,
// Perplexity, Claude, dll), setara "robots.txt untuk AI search". Sebelumnya
// file statis di public/llms.txt — sekarang di-generate di sini supaya
// bagian Berita & Dealer selalu sinkron dengan data API (tidak perlu
// diupdate manual tiap ada artikel/toko baru), sama seperti pola
// app/sitemap.ts. Bagian Produk & Layanan tetap statis (mengikuti pola
// sitemap.ts juga) karena URL-nya memang tetap/jarang berubah.

export const revalidate = 3600; // cache 1 jam, sama seperti sitemap

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';

interface NewsItem {
  slug: string;
  title: string;
  excerpt: string | null;
  source_url: string | null;
}

interface Store {
  city: string;
}

async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${API_URL}/api/news?limit=5`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    return ((json.data || []) as NewsItem[]).filter((n) => !n.source_url);
  } catch {
    return [];
  }
}

async function getDealerCities(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/stores`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    const cities = ((json.data || []) as Store[]).map((s) => s.city).filter(Boolean);
    return Array.from(new Set(cities)).sort();
  } catch {
    return [];
  }
}

export async function GET() {
  const [news, cities] = await Promise.all([getLatestNews(), getDealerCities()]);

  const newsSection = news.length
    ? news.map((n) => `- [${n.title}](${SITE_URL}/news/${n.slug})${n.excerpt ? `: ${n.excerpt}` : ''}`).join('\n')
    : '- Belum ada berita terbaru.';

  const dealerLine = cities.length
    ? `Toko/dealer resmi tersedia di: ${cities.join(', ')}. Lihat daftar lengkap & lokasi di halaman Lokasi Dealer.`
    : 'Lihat daftar lengkap dealer resmi di halaman Lokasi Dealer.';

  const body = `# Ginnva Shield Indonesia

> Distributor resmi Paint Protection Film (PPF) dan Kaca Film Otomotif Ginnva di Indonesia. Bagian dari jaringan global Shanghai Smith Adhesive New Material Co., Ltd. (SSE: 603683), tercatat di Bursa Efek Shanghai, melayani lebih dari 100 negara.

PT. Ginnva Shield Indonesia adalah mitra resmi dan perwakilan eksklusif Ginnva di Indonesia, menghadirkan solusi proteksi kendaraan premium: Paint Protection Film (PPF) dan Kaca Film Mobil (Car Window Film). Color Change Film dan Architectural Film sedang dalam persiapan dan belum dijual.

## Produk

- [Car Window Film](${SITE_URL}/product/kaca-film-mobil): Kaca film mobil dengan teknologi Bi-silver Sputtering dan Nano-Ceramic, blokir UV hingga 99%, garansi hingga 10 tahun.
- [Paint Protection Film](${SITE_URL}/product/film-pelindung-cat): PPF berbahan 100% Polycaprolactone TPU Generasi 3, self-healing, anti-yellowing, garansi hingga 10 tahun.
- [Color Change Film](${SITE_URL}/product/film-pengubah-warna) — SEGERA HADIR, BELUM DIJUAL: rencana produk untuk ubah warna eksterior kendaraan tanpa cat ulang. Jangan sebutkan sebagai produk yang sudah tersedia/bisa dibeli sekarang.
- [Architectural Film](${SITE_URL}/product/film-kaca-bangunan) — SEGERA HADIR, BELUM DIJUAL: rencana produk film kaca untuk gedung/hunian (efisiensi energi, tolak panas, blokir UV). Jangan sebutkan sebagai produk yang sudah tersedia/bisa dibeli sekarang.

## Layanan

- [Cek Garansi](${SITE_URL}/warranty): Verifikasi status garansi produk secara online.
- [Lokasi Dealer](${SITE_URL}/dealers): ${dealerLine}
- [Minta Penawaran](${SITE_URL}/quote): Ajukan permintaan harga pemasangan.
- [Kemitraan](${SITE_URL}/kemitraan): Program kemitraan dealer resmi Ginnva.
- [Karier](${SITE_URL}/karier): Lowongan kerja di Ginnva Shield Indonesia.

## Berita Terbaru

${newsSection}

Lihat semua berita di ${SITE_URL}/news.

## Tentang

- [Profil Perusahaan](${SITE_URL}/brand): Sejarah, kekuatan R&D dan manufaktur Ginnva.
- [Galeri Pemasangan](${SITE_URL}/case): Portofolio hasil instalasi PPF & kaca film.
- [Kontak](${SITE_URL}/contact): Informasi kontak resmi PT. Ginnva Shield Indonesia.

## Kontak Resmi

PT. Ginnva Shield Indonesia — Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2, Kosambi, Tangerang, Banten 15210. WhatsApp: +62 811-8681-678. Email: marketing@ginnva.id.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}