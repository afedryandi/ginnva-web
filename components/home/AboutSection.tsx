'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  // "Baca Selengkapnya" collapsible (audit SEO 2026-09-30) -- konten
  // ekstra TETAP ada di HTML awal (bukan di-mount belakangan), cuma
  // dilipat visual lewat maxHeight -- crawler/SEO checker tetap baca
  // teksnya, homepage tetap ringkas buat mata manusia. Pola sama dengan
  // accordion "read more" standar, bukan cloaking (isinya sama persis
  // untuk bot & manusia).
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* ===================== PROFIL PERUSAHAAN ===================== */}
      <section className="brand-sec on-dark" id="brand">
        <div 
          className="bg" 
          style={{ backgroundImage: `url('/image/building-image.webp')` }}
        />
        <div className="wrap">
          <div className="sec-title">Profil Perusahaan</div>
          <div className="sec-sub">Enterprise Introduction</div>
          <p className="text">
            <strong>PT. Ginnva Shield Indonesia</strong> adalah distributor resmi dan perwakilan eksklusif brand Ginnva di Indonesia. Kami menghadirkan solusi <strong>Paint Protection Film (PPF)</strong> dan <strong>Kaca Film Mobil</strong> premium berstandar internasional yang dirancang khusus untuk menghadapi tantangan iklim tropis Indonesia.
          </p>
          <p className="text">
            Menggabungkan material canggih, manufaktur presisi, dan pemahaman mendalam akan pasar lokal, kami berkomitmen menjaga estetika, kenyamanan, serta nilai investasi kendaraan premium Anda.
          </p>
          {/* Konten SEO (audit 2026-09-30) -- kata "otomotif" & "premium" (dari H1
              tersembunyi HeroSection.tsx) disisipkan di sini supaya SELALU
              terlihat, tidak bergantung status expanded di bawah. */}
          <p className="text">
            Paint Protection Film Ginnva menggunakan TPU self-healing generasi ketiga yang memulihkan goresan halus dengan sendirinya, sementara kaca film otomotif Bi-silver Sputtering &amp; Nano-Ceramic kami menolak hingga 61% panas matahari dan memblokir 99% sinar UV — dipasang langsung oleh installer bersertifikasi di GINNVA House, PIK 2, dengan garansi resmi <strong>E-Warranty</strong> hingga 10 tahun untuk seluruh lini produk premium kami.
          </p>

          {/* "Baca Selengkapnya" collapsible -- teks di bawah ini TETAP ada di
              HTML awal (lihat catatan di useState di atas), cuma dilipat
              visual lewat maxHeight supaya homepage tetap ringkas dilihat. */}
          <div
            id="about-more"
            style={{
              maxHeight: expanded ? '2000px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.4s ease',
            }}
          >
            <p className="text">
              Iklim tropis Indonesia — panas matahari intens sepanjang tahun, kelembapan tinggi, dan paparan debu jalanan — adalah tantangan nyata bagi cat dan kaca kendaraan. Lapisan self-healing pada PPF kami memulihkan goresan halus akibat kerikil, sikat cuci otomatis, atau ranting pohon hanya dengan panas matahari atau air hangat, tanpa meninggalkan bekas permanen pada cat orisinal kendaraan. Kaca film kami menjaga interior tetap sejuk sekaligus melindungi kulit dan material jok dari pemudaran warna — tanpa mengganggu sinyal GPS, radio, maupun e-Toll.
            </p>
            <p className="text">
              Setiap produk Ginnva yang beredar di Indonesia diproduksi oleh Shanghai Smith Adhesive New Material Co., Ltd. — perusahaan material perekat pertama di China yang tercatat di Bursa Efek Shanghai (kode saham 603683), berdiri sejak 1994 dan melayani lebih dari 110 negara. Riset dan pengembangan material inilah yang menjadi dasar seluruh lini produk PPF dan kaca film yang kami distribusikan secara eksklusif di Indonesia. Pemasangan dilakukan langsung oleh installer bersertifikasi di GINNVA House, PIK 2, dengan standar presisi yang sama di setiap kendaraan — mulai dari city car harian hingga kendaraan premium dan listrik.
            </p>
            <p className="text">
              Kami juga menerbitkan E-Warranty digital untuk setiap pemasangan — mencatat data kendaraan, produk yang dipakai, tanggal pasang, dan masa berlaku garansi, yang dapat diverifikasi kapan saja lewat sistem resmi Ginnva. Bagi kami, hubungan dengan pelanggan tidak berhenti di hari pemasangan — dukungan purnajual, jaringan dealer resmi, dan tim layanan pelanggan kami tetap siap mendampingi selama masa garansi berlangsung.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls="about-more"
              className="pill pill--light"
              style={{ cursor: 'pointer', border: 'none' }}
            >
              {expanded ? 'Sembunyikan' : 'Baca Selengkapnya'}
            </button>
            <Link href="/brand" className="pill pill--accent">
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== MITRA ===================== */}
      <section 
        className="cooperation"
        style={{ backgroundImage: `url('/image/partners-background.webp')` }}
      >
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="sec-title">Mitra</div>
            <div className="sec-sub">Partners</div>
          </div>
          <div className="partners-wrapper">
            <Image 
              className="partners" 
              src="/image/partners.webp"
              alt="Mitra"
              width={1200}
              height={300}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </section>
    </>
  );
}