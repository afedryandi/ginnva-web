'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GINNVA_PRODUCTS } from '@/config/site';

const WA_URL = `https://wa.me/628118681678?text=${encodeURIComponent('Halo, saya ingin bertanya lebih lanjut tentang produk Ginnva.')}`;

// Tilt 3D halus mengikuti posisi kursor — dibaca dari mouse position
// relatif ke kartu, dikonversi jadi rotateX/rotateY kecil (maks ~8deg)
// supaya terasa "hidup" tanpa berlebihan. Direset ke 0 saat mouse keluar.
function handleTilt(e: React.MouseEvent<HTMLAnchorElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
  card.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
  card.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
  card.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
}

function resetTilt(e: React.MouseEvent<HTMLAnchorElement>) {
  const card = e.currentTarget;
  card.style.setProperty('--rx', '0deg');
  card.style.setProperty('--ry', '0deg');
}

// CTA magnetik — tombol bergeser sedikit ke arah kursor selama masih di
// dalam area tombol, kembali ke tengah saat keluar. Efek populer di UI
// 2026 untuk memberi kesan tombol "responsif" terhadap kursor.
function handleMagnet(e: React.MouseEvent<HTMLAnchorElement>) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
}

function resetMagnet(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.transform = 'translate(0, 0)';
}

export default function ProductGridSection() {
  const ctaRef = useRef<HTMLAnchorElement>(null);

  return (
    <section className="product-grid-sec" id="product-grid">
      <div className="wrap">
        <div className="product-grid-head">
          <div className="sec-title sec-title--no-bar">Produk Kami</div>
          <div className="sec-sub">Our Products — 2026 Series</div>
        </div>

        <div className="product-grid">
          {GINNVA_PRODUCTS.map((p, idx) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="product-grid-item"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <span className="product-grid-item__index">{String(idx + 1).padStart(2, '0')}</span>

              <div className="thumb">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width: 560px) 50vw, (max-width: 980px) 50vw, 25vw"
                  className="thumb-img"
                />
                <span className="thumb-glow" />
              </div>

              <div className="label">
                <div>
                  <div className="name">{p.name}</div>
                  <div className="sub">{p.sub}</div>
                </div>
                <span className="arrow-badge" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="product-grid-cta">
          <a
            ref={ctaRef}
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill--accent pill--magnetic"
            onMouseMove={handleMagnet}
            onMouseLeave={resetMagnet}
          >
            <span>Selengkapnya</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
