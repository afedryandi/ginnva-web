// components/layout/Footer.tsx
'use client';

import Image from 'next/image';
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
            <Link href="/case">Galeri Pemasangan</Link>
            <Link href="/news">Berita</Link>
            <Link href="/karier">Karier</Link>
            <Link href="/contact">Kontak</Link>
          </div>

          <div className="foot-col">
            <h5>Produk</h5>
            {GINNVA_PRODUCTS.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`}>{p.name}</Link>
            ))}
          </div>

          <div className="foot-col">
            <h5>Layanan</h5>
            <Link href="/warranty">Cek Garansi</Link>
            <Link href="/dealers">Lokasi Dealer</Link>
            <Link href="/quote">Minta Penawaran</Link>
            <Link href="/kemitraan">Kemitraan</Link>
          </div>

          <div className="foot-hot">
            <div className="l">Hotline Layanan:</div>
            <div className="n">
              <a href="https://wa.me/628118681678" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                <Image src="/image/contact/whatsapp.png" alt="WhatsApp" width={32} height={32} loading="lazy" /> 
              </a>
              <a href="https://wa.me/628118681678" target="_blank" rel="noopener noreferrer" className="phone-link">
                0811 8681 678
              </a>
            </div>
            <div className="foot-social foot-social-qr">
              {SOCIAL_ITEMS.map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="qr">
                  <Image src={item.img} alt={item.label} width={120} height={120} loading="lazy" />
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile: QR code tidak berguna saat sudah browsing dari HP sendiri,
                jadi diganti ikon sosmed yang bisa langsung di-tap. */}
            <div className="foot-social foot-social-icons">
              {SOCIAL_ITEMS.map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={item.label}>
                  <span className="social-icon-badge">
                    {item.label === 'Instagram' && (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" /></svg>
                    )}
                    {item.label === 'TikTok' && (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14.5 3h2.6c.3 1.9 1.6 3.4 3.6 3.8v2.7c-1.4 0-2.7-.4-3.8-1.2v6.3c0 3.2-2.6 5.4-5.5 5.4-3 0-5.5-2.3-5.5-5.4 0-3 2.6-5.3 5.6-5.3.3 0 .6 0 .9.1v2.8a2.8 2.8 0 0 0-.9-.1c-1.5 0-2.7 1.2-2.7 2.5s1.2 2.6 2.7 2.6c1.6 0 2.8-1.2 2.8-2.6V3z"/></svg>
                    )}
                    {item.label === 'Facebook' && (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.5 21v-7.8h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.1C15.9 4 15 4 14 4c-2.4 0-4 1.5-4 4.2v2h-2.6v3H10V21h3.5z"/></svg>
                    )}
                    {item.label === 'LinkedIn' && (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.9 3.6a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM3.3 8.9h3.2V20H3.3V8.9zM9.6 8.9h3.1v1.5h.04c.43-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20h-3.2v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H9.6V8.9z"/></svg>
                    )}
                  </span>
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