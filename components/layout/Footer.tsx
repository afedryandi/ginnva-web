// components/layout/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { GINNVA_PRODUCTS, MALL_URL } from '@/config/site';

export default function Footer() {
  const SOCIAL_ITEMS = [
    { img: '/image/contact/qrcode-instagram.png', label: 'Instagram', url: 'https://www.instagram.com/ginnva.id' },
    { img: '/image/contact/qrcode-tiktok.png', label: 'TikTok', url: 'https://www.tiktok.com/@ginnva.id' },
    { img: '/image/contact/qrcode-facebook.png', label: 'Facebook', url: 'https://www.facebook.com/ginnvaid' },
    { img: '/image/contact/qrcode-linkedin.png', label: 'LinkedIn', url: 'https://www.linkedin.com/company/ginnva-indonesia' },
  ];

  return (
    <footer className="footer" id="site-footer">
      <div className="wrap">

        <div className="foot-main">
          <div className="foot-col">
            <h5>Tentang</h5>
            <Link href="/brand">Profil Brand</Link>
            <Link href="/news">Berita</Link>
            <Link href="/contact">Kontak</Link>
          </div>

          <div className="foot-col">
            <h5>Produk</h5>
            {GINNVA_PRODUCTS.map((p) => (
              <Link key={p.id} href={`/product?id=${p.id}`}>{p.name}</Link>
            ))}
          </div>

          <div className="foot-col">
            <h5>Layanan</h5>
            <Link href="/warranty">Cek Garansi</Link>
            <Link href="/dealers">Lokasi Dealer</Link>
            <Link href="../ginnva-web/index.html">Sistem Toko</Link>
            <Link href="/quote">Estimasi Harga</Link>
          </div>

          <div className="foot-col">
            <h5>Toko Online</h5>
            <a href={MALL_URL} target="_blank" rel="noopener noreferrer">Coming Soon</a>
          </div>

          <div className="foot-hot"> 
            <div className="l">Hotline Layanan:</div>
            <div className="n">
              <a href="https://wa.me/628118681678" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                <img src="/image/contact/whatsapp.png" alt="WhatsApp" loading="lazy" /> 
              </a>
              <a href="https://wa.me/628118681678" target="_blank" rel="noopener noreferrer" className="phone-link">
                0811 8681 678
              </a>
            </div>
            <div className="foot-social">
              {SOCIAL_ITEMS.map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="qr">
                  <img src={item.img} alt={item.label} loading="lazy" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="foot-bottom"> 
          <span>©2026 PT. Ginnva Shield Indonesia</span>
          <div className="links">
            <Link href="/contact">Kontak</Link>
            <Link href="/legal">Pernyataan Hukum</Link>
            <Link href="/privacy">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}