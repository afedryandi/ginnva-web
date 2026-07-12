import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Paint Protection Film (PPF) Ginnva';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage('Paint Protection Film Ginnva', 'TPU 3rd Generation, self-healing & anti-yellowing');
}