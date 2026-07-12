import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Dealer Resmi Ginnva — Lokasi Instalasi di Seluruh Indonesia';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage('Dealer Resmi Ginnva', 'Temukan lokasi instalasi terdekat di Indonesia');
}