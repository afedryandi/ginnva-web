'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ProductBanner() {
  const searchParams = useSearchParams();
  const currentId = searchParams.get('id') || '1';

  return (
    <>
      <section className="page-banner">
        <div 
          className="bg" 
          style={{ 
            backgroundImage: `url('/image/product/car-window-film.webp')`,
            backgroundPosition: 'center' 
          }}
        />
        <div className="inner">
          <h1>Film Kaca Mobil</h1>
          <div className="en">Car Window Film</div>
        </div>
      </section>

      {/* PILIH PRODUK TABBAR */}
      <div className="pd-tabbar">
        <div className="wrap">
          <Link href="/product?id=1" className={currentId === '1' ? 'active' : ''}>Film Kaca Mobil</Link>
          <Link href="/product?id=2" className={currentId === '2' ? 'active' : ''}>Film Pelindung Cat</Link>
          <Link href="/product?id=3" className={currentId === '3' ? 'active' : ''}>Film Pengubah Warna</Link>
          <Link href="/product?id=4" className={currentId === '4' ? 'active' : ''}>Film Kaca Bangunan</Link>
        </div>
      </div>
    </>
  );
}