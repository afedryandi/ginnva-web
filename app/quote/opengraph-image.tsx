import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Minta Penawaran Harga PPF & Kaca Film Ginnva';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage('Minta Penawaran Harga', 'PPF & Kaca Film Ginnva — respon cepat tim sales');
}