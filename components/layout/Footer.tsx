// components/layout/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { GINNVA_PRODUCTS, MALL_URL } from '@/config/site';

export default function Footer() {
  const SOCIAL_ITEMS = [
    { img: 'https://www.ginnvafilm.com/uploads/pic/31/3b644b07fc722368f5751c445b883f.png', label: 'Weibo' },
    { img: 'https://www.ginnvafilm.com/uploads/pic/9c/f9a3aacc7481e18167d8da81d3d918.png', label: 'WeChat' },
    { img: 'https://www.ginnvafilm.com/uploads/pic/ac/040796a2b1e7e0a95dd3399bfe75ba.png', label: 'Mini Program' },
    { img: 'https://www.ginnvafilm.com/uploads/pic/e9/0d9d7f0596a95ce19eb6a8773f3d44.png', label: 'Douyin' },
  ];

  return (
    <footer className="footer" id="site-footer"> {/* .footer dari styles.css */}
      <div className="wrap">
        <div className="flink"> {/* .flink dari styles.css */}
          <span>Tautan mitra:</span>
          <a href="https://www.smithcn.com/" target="_blank" rel="noopener noreferrer">Jinghua New Material</a>
        </div>

        <div className="foot-main"> {/* .foot-main dari styles.css */}
          <div className="foot-col"> {/* .foot-col dari styles.css */}
            <h5><Link href="/brand">Tentang</Link></h5>
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
            <a href={MALL_URL} target="_blank" rel="noopener noreferrer">Tmall Official Store</a>
          </div>

          <div className="foot-hot"> {/* .foot-hot dari styles.css */}
            <div className="l">Hotline Layanan:</div>
            <div className="n">400-116-1165</div>
            <div className="foot-social"> {/* .foot-social dari styles.css */}
              {SOCIAL_ITEMS.map((item, idx) => (
                <div key={idx} className="qr"> {/* .qr dari styles.css */}
                  <img src={item.img} alt={item.label} loading="lazy" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="foot-bottom"> {/* .foot-bottom dari styles.css */}
          <span>©2023 Shanghai Jinghua Hengye New Material Co., Ltd.</span>
          <div className="links"> {/* .links dari styles.css */}
            <Link href="/contact">Kontak</Link>
            <Link href="/legal">Pernyataan Hukum</Link>
            <Link href="/privacy">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}