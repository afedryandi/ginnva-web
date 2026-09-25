import type { Metadata } from 'next';
import Calculator from './Calculator';

// Alat internal utk tim sales -- sengaja TIDAK diindeks & TIDAK pakai
// SEO metadata situs utama (lihat SiteChrome.tsx, path ini masuk
// BARE_PREFIXES supaya Header/Footer/ChatWidget publik tidak ikut tampil).
export const metadata: Metadata = {
  title: 'Price List Kaca Film — Internal',
  robots: { index: false, follow: false },
};

export default function PricelistKacaFilmPage() {
  return <Calculator />;
}
