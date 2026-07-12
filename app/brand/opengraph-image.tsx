import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Tentang Ginnva — Profil Perusahaan';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage('Tentang Ginnva', 'Distributor resmi & perwakilan eksklusif di Indonesia');
}