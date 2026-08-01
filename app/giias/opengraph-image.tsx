import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'GIIAS New Car Protection Privilege — Ginnva Shield Indonesia';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage('GIIAS New Car Protection Privilege', 'FREE Interior PPF atau FREE Sunroof / Panoramic Window Film');
}