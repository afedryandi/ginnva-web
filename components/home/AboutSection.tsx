import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
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
          {/* Konten SEO (audit 2026-09-30) -- dipersingkat jadi 1 paragraf (feedback:
              versi 3-paragraf sebelumnya terlalu panjang untuk homepage). Narasi
              lengkap (iklim tropis, latar manufaktur, E-Warranty) dipindah ke
              /brand, halaman yang memang pas untuk konten panjang. */}
          <p className="text">
            Paint Protection Film Ginnva menggunakan TPU self-healing generasi ketiga yang memulihkan goresan halus dengan sendirinya, sementara kaca film Bi-silver Sputtering &amp; Nano-Ceramic kami menolak hingga 61% panas matahari dan memblokir 99% sinar UV — dipasang langsung oleh installer bersertifikasi di GINNVA House, PIK 2, dengan garansi resmi <strong>E-Warranty</strong> hingga 10 tahun.
          </p>
          <Link href="/brand" className="pill pill--accent">
            Selengkapnya
          </Link>
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