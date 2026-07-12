import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Cek Garansi Ginnva — Verifikasi E-Warranty Online';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage('Cek Garansi Ginnva', 'Verifikasi keaslian E-Warranty resmi Anda');
}