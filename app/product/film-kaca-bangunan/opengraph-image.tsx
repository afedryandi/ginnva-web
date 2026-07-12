import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Architectural Window Film Ginnva';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage('Film Kaca Bangunan Ginnva', 'Solusi efisiensi energi untuk gedung & hunian');
}