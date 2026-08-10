'use client';

import React from 'react';
import Link from 'next/link';
import { GINNVA_PRODUCTS } from '@/config/site';

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

      {/* PILIH PRODUK TABBAR — data-driven dari GINNVA_PRODUCTS supaya
          tab-nya otomatis konsisten di semua halaman produk tanpa
          duplikasi markup per produk. */}
      <div className="pd-tabbar">
        <div className="wrap">
          {GINNVA_PRODUCTS.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className={currentId === p.id ? 'active' : ''}>
              {p.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}