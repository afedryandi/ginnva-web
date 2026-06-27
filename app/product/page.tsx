import { redirect } from 'next/navigation';

// Halaman /product tanpa sub-path tidak punya konten sendiri.
// Selalu arahkan ke produk pertama (Film Kaca Mobil) sebagai default,
// sesuai produk yang ditampilkan saat currentId="1" di ProductBanner.
export default function ProductIndexPage() {
  redirect('/product/kaca-film-mobil');
}