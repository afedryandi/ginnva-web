import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Kaca Film Mobil Ginnva';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage('Kaca Film Mobil Ginnva', 'Penolakan panas superior, UV protection hingga 99%');
}