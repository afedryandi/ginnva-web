import React from 'react';
import Image from 'next/image';

// Data Array untuk Penghargaan (Honor Grid).
// Caption dibaca langsung dari isi tiap sertifikat (nama resmi & penerbit).
const HONOR_IMAGES = [
  { src: '/image/certification/certification-1.webp', caption: 'FSC Chain of Custody Certification — Bureau Veritas' },
  { src: '/image/certification/certification-2.webp', caption: 'China Automotive Aftermarket TOP100 List 2024' },
  { src: '/image/certification/certification-3.webp', caption: 'Drafting Unit — Standar Teknis Pemasangan Kaca Film Otomotif (T/CADCC 006-2025)' },
  { src: '/image/certification/certification-4.webp', caption: '5G Commercial Industry Alliance — Excellent National Brand' },
  { src: '/image/certification/certification-5.webp', caption: 'Shanghai Science & Technology "Little Giant" Enterprise (2014)' },
  { src: '/image/certification/certification-6.webp', caption: 'Sertifikasi Sistem Manajemen ISO — DZCC (Akreditasi IAS/IAF)' },
  { src: '/image/certification/certification-7.webp', caption: 'Shanghai Specialized, Refined, Distinctive & Innovative (SRDI) Enterprise (2014)' },
  { src: '/image/certification/certification-8.webp', caption: 'ASWORLD 2024 Recommended Brand Award' },
  { src: '/image/certification/certification-9.webp', caption: 'Drafting Unit — Standar Pemasangan Film Pelindung Cat Otomotif (CADCC)' },
  { src: '/image/certification/certification-10.webp', caption: 'Sertifikat Peringkat Pemasok Produk Otomotif — Bintang 5' },
  { src: '/image/certification/certification-11.webp', caption: 'China Automotive Aftermarket TOP100 List 2023' },
  { src: '/image/certification/certification-12.webp', caption: 'National High-Tech Enterprise Certificate' },
];

export default function BrandHonor() {
  return (
    <>
      {/* ===================== MITRA UTAMA ===================== */}
            <section className="psec">
              <div className="wrap">
                <div className="head">
                  <div className="t">Mitra Utama</div>
                  <div className="e">Key Partners</div>
                </div>
                <div className="partners-img-wrapper">
                  <Image 
                    className="partners-img" 
                    src="/image/partners.webp" 
                    alt="Mitra Utama" 
                    width={1200}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </section>
      
            {/* ===================== PENGHARGAAN ===================== */}
            <section className="psec psec--alt">
              <div className="wrap">
                <div className="head">
                  <div className="t">Penghargaan Perusahaan</div>
                  <div className="e">Enterprise Honor</div>
                </div>
                <div className="honor-grid">
                  {HONOR_IMAGES.map((item, idx) => (
                    <div
                      className="h"
                      key={idx}
                      style={{ aspectRatio: 'auto', flexDirection: 'column', overflow: 'visible' }}
                    >
                      <div style={{ width: '100%', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                          src={item.src}
                          alt={item.caption}
                          width={280}
                          height={200}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', marginTop: '8px' }}>
                        {item.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
    </>
  );
}