import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Color Change Film Ginnva';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage('Color Change Film Ginnva', 'Ubah tampilan kendaraan tanpa cat ulang');
}