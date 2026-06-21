'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CASE_DATA = [
  { id: 1, title: 'Kaca Film · Zeekr 9X — Ginnva Ziwei 70', short: 'Zeekr 9X · Ziwei 70', img: '/image/image-coming-soon.webp' },
  { id: 2, title: 'Kaca Film · AITO M8 — Ginnva Ziwei 70', short: 'AITO M8 · Ziwei 70', img: '/image/image-coming-soon.webp' },
  { id: 3, title: 'Kaca Film · Mercedes-Benz E300L — Ginnva Ziwei 70', short: 'Mercedes E300L · Ziwei 70', img: '/image/image-coming-soon.webp' },
  { id: 4, title: 'Kaca Film · Tank 500 — Ginnva Ziwei 70', short: 'Tank 500 · Ziwei 70', img: '/image/image-coming-soon.webp' },
];

export default function CaseAndNewsSection() {
  const [activeCase, setActiveCase] = useState(CASE_DATA[0]);

  return (
    <>
      {/* ===================== GALERI PEMASANGAN ===================== */}
      <section className="case" id="case">
        <div className="wrap">
          <div className="sec-title-box">
            <div>
              <div className="sec-title">Galeri Pemasangan</div>
              <div className="sec-sub">Case Show</div>
            </div>
            <a className="pill pill--outline" href="https://www.ginnvafilm.com/case.html" target="_blank" rel="noopener noreferrer">
              Selengkapnya
            </a>
          </div>
          <div className="case-main">
            <div className="bigPic">
              <Image src={activeCase.img} alt={activeCase.title} width={800} height={500} style={{ width: '100%', height: 'auto' }} />
              <div className="nameBox"><h3>{activeCase.title}</h3></div>
            </div>
            <div className="thumbs">
              {CASE_DATA.map((item) => (
                <div 
                  key={item.id} 
                  className={`thumb ${activeCase.id === item.id ? 'active' : ''}`}
                  onClick={() => setActiveCase(item)}
                >
                  <Image src={item.img} alt={item.short} width={180} height={120} />
                  <div className="nameBox">{item.short}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BERITA ===================== */}
      <section className="news" id="news">
        <div className="wrap">
          <div className="sec-title-box">
            <div>
              <div className="sec-title">Berita Terbaru</div>
              <div className="sec-sub">News</div>
            </div>
            <Link href="/news" className="pill pill--outline">Selengkapnya</Link>
          </div>
          <div className="news-con">
            <Link href="/news" className="media">
              <div className="pic">
                <Image src="/image/image-coming-soon.webp" alt="Berita" width={500} height={300} style={{ width: '100%', height: 'auto' }} />
              </div>
              <div className="nm">Bersama Cahaya — Pameran Jiuzhou Shenzhen sukses digelar</div>
              <div className="date">25 Mar 2026</div>
            </Link>
            <div className="list">
              <ul>
                <li><Link href="/news"><div className="nm">Pameran AAITF Beijing ditutup — sorotan momen gemilang Ginnva</div><div className="meta"><span>Kabar Brand</span><span>25 Mar 2026</span></div></Link></li>
                <li><Link href="/news"><div className="nm">Rapat tahunan dealer nasional film mobil Ginnva 2026 sukses digelar</div><div className="meta"><span>Kabar Brand</span><span>25 Mar 2026</span></div></Link></li>
                <li><Link href="/news"><div className="nm">Peluncuran produk baru Ginnva & kunjungan pabrik bersama kreator</div><div className="meta"><span>Kabar Brand</span><span>25 Mar 2026</span></div></Link></li>
                <li><Link href="/news"><div className="nm">Program edukasi Douyin Ginnva — menjangkau arus baru industri</div><div className="meta"><span>Kabar Brand</span><span>05 Feb 2026</span></div></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}