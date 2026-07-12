import { buildOgImage, ogSize, ogContentType } from '@/lib/og';

export const alt = 'Ginnva Shield Indonesia — PPF & Kaca Film Otomotif Premium';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return buildOgImage(
    'Distributor Resmi PPF & Kaca Film Ginnva',
    'Proteksi cat kendaraan premium, garansi resmi hingga 10 tahun'
  );
}