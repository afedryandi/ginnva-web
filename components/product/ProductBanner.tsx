'use client';

import React from 'react';
import Link from 'next/link';

interface BannerProps {
  currentId: string;
  title: string;
  enTitle: string;
  bgUrl: string;
}

export default function ProductBanner({ currentId, title, enTitle, bgUrl }: BannerProps) {
  return (
    <>
      <section className="page-banner">
        <div 
          className="bg" 
          style={{ 
            backgroundImage: `url('${bgUrl}')`,
            backgroundPosition: 'center' 
          }}
        />
        <div className="inner">
          <h1>{title}</h1>
          <div className="en">{enTitle}</div>
        </div>
      </section>

      {/* PILIH PRODUK TABBAR */}
      <div className="pd-tabbar">
        <div className="wrap">
          <Link href="/product/kaca-film-mobil" className={currentId === '1' ? 'active' : ''}>Film Kaca Mobil</Link>
          <Link href="/product/film-pelindung-cat" className={currentId === '2' ? 'active' : ''}>Film Pelindung Cat</Link>
          <Link href="/product/film-pengubah-warna" className={currentId === '3' ? 'active' : ''}>Film Pengubah Warna</Link>
          <Link href="/product/film-kaca-bangunan" className={currentId === '4' ? 'active' : ''}>Film Kaca Bangunan</Link>
        </div>
      </div>
    </>
  );
}