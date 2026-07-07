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
          style={{ backgroundImage: `url('image/building-image.webp')` }}
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