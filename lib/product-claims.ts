// Klaim produk yang sudah DISETUJUI (Marketing/Konten Fase 2): satu sumber angka TSER/UV/VLT/garansi untuk halaman kampanye.
// Sumbernya GET /api/product-claims (panel Marketing/Konten > Klaim & Bukti) yang hanya mengeluarkan klaim berstatus disetujui.
//
// Masa transisi: selama sebuah seri belum punya klaim disetujui di panel, halaman memakai teks bawaan yang sudah tertulis di
// kodenya, supaya halaman iklan yang sedang tayang tidak mendadak kosong. Begitu klaim disetujui, angka dari panel yang menang.
// Klaim yang ditarik atau diubah (kembali ke draft) langsung hilang dari API, dan halaman kembali ke teks bawaan hanya untuk seri
// yang SAMA SEKALI tidak punya klaim disetujui lagi; hapus teks bawaan itu begitu semua klaim sudah disetujui.

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';

export type ProductClaim = {
  type: string;
  label: string;
  value: string;
  tested_at: string | null;
};

export type ClaimsBySeries = Record<string, ProductClaim[]>;

const TYPE_ORDER = ['vlt', 'tser', 'ir', 'uv', 'clarity', 'warranty_years', 'other'];

export async function getApprovedClaims(): Promise<ClaimsBySeries> {
  try {
    const res = await fetch(`${API_BASE}/api/product-claims`, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    const json = await res.json();
    const data = json?.data;
    return data && !Array.isArray(data) && typeof data === 'object' ? (data as ClaimsBySeries) : {};
  } catch {
    return {};
  }
}

/** Daftar spesifikasi satu seri, mis. ["VLT 72%", "TSER 61%"]; memakai `fallback` bila seri belum punya klaim disetujui. */
export function seriesSpecs(claims: ClaimsBySeries, series: string, fallback: string[]): string[] {
  const list = claims[series];
  if (!list || list.length === 0) return fallback;

  return [...list]
    .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type))
    .map((c) => `${c.label} ${c.value}`);
}

export type HeadlineClaims = {
  heat: string | null; // nilai TSER seri utama, mis. "61%"
  uv: string | null;
  clarity: string | null; // memakai nilai VLT seri utama
  warrantyYears: string | null; // angka tahun saja, mis. "10"
};

/** Angka sorotan di bagian atas halaman, diambil dari seri utama (A70). Nilai null = belum ada klaim disetujui. */
export function headlineClaims(claims: ClaimsBySeries, series = 'A70'): HeadlineClaims {
  const find = (type: string) => claims[series]?.find((c) => c.type === type)?.value ?? null;
  const years = find('warranty_years')?.match(/\d+/)?.[0] ?? null;

  return { heat: find('tser'), uv: find('uv'), clarity: find('vlt'), warrantyYears: years };
}
