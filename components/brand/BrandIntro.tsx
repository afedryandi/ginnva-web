'use client';

import React, { useState } from 'react';

function BuildingPhoto({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [errored, setErrored] = useState(false);

  return (
    <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: 'linear-gradient(135deg, #f2f5fa 0%, #e8edf5 100%)' }}>
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%', minHeight: '180px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: 'var(--muted-2)', fontSize: '14px', gap: '8px',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span>{label}</span>
          <span style={{ fontSize: '12px', color: '#ccc' }}>(segera diperbarui)</span>
        </div>
      )}
    </div>
  );
}

export default function BrandIntro() {
  return (
    <>
      {/* ===================== PAGE BANNER ===================== */}
      <section className="page-banner">
        <div
          className="bg"
          style={{ backgroundImage: `url('/image/building-image.webp')` }}
        />
        <div className="inner">
          <h1>Profil Brand</h1>
          <div className="en">Brand Introduction</div>
        </div>
      </section>

      {/* ===================== PROFIL PERUSAHAAN ===================== */}
      <section className="psec">
        <div className="wrap">
          <div className="head">
            <div className="t">Profil Perusahaan</div>
            <div className="e">Enterprise Introduction</div>
          </div>

          {/* ── Dua kolom entitas ───────────────────────────────────── */}
          <div className="entity-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginBottom: '0',
          }}>

            {/* ── Ginnva Indonesia ─────────────────────────────────── */}
            <div style={{ border: '1px solid var(--line)', borderRadius: '18px', overflow: 'hidden', background: '#fff' }}>
              <BuildingPhoto
                src="/image/building-image.webp"
                alt="Gedung PT. Ginnva Shield Indonesia"
                label="Foto Gedung Ginnva Indonesia"
              />
              <div style={{ padding: '28px 28px 32px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(237,22,81,.07)', borderRadius: '20px',
                  padding: '4px 14px', marginBottom: '16px',
                }}>
                  <span style={{ fontSize: '16px' }}>🇮🇩</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                    Ginnva Indonesia
                  </span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--ink)', marginBottom: '14px', lineHeight: '1.35' }}>
                  PT. Ginnva Shield Indonesia
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.85', textAlign: 'justify', margin: 0 }}>
                  PT. Ginnva Shield Indonesia adalah distributor resmi dan perwakilan eksklusif brand Ginnva di Indonesia. Kami menghadirkan solusi <strong>Paint Protection Film (PPF)</strong> dan <strong>Kaca Film Mobil</strong> premium berstandar internasional yang dirancang untuk performa, daya tahan, dan estetika.
                  <br /><br />
                  Dikembangkan dengan material canggih dan inovasi mutakhir, produk kami dirancang khusus untuk menghadapi iklim tropis Indonesia, memberikan penolakan panas yang optimal, perlindungan terhadap sinar UV, serta ketahanan jangka panjang terhadap goresan, noda, dan kerusakan lingkungan.
                  <br /><br />
                  Kami bermitra dengan para profesional otomotif, dealer, dan pemilik kendaraan premium di seluruh Indonesia untuk menghadirkan kualitas yang konsisten dan hasil yang unggul, menggabungkan keahlian internasional dengan pemahaman mendalam terhadap pasar lokal.
                </p>
              </div>
            </div>

            {/* ── Ginnva China ─────────────────────────────────────── */}
            <div style={{ border: '1px solid var(--line)', borderRadius: '18px', overflow: 'hidden', background: '#fff' }}>
              <BuildingPhoto
                src="/image/building-china.webp"
                alt="Kantor Pusat Ginnva China"
                label="Foto Gedung Ginnva China"
              />
              <div style={{ padding: '28px 28px 32px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(237,22,81,.07)', borderRadius: '20px',
                  padding: '4px 14px', marginBottom: '16px',
                }}>
                  <span style={{ fontSize: '16px' }}>🇨🇳</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                    Ginnva China
                  </span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--ink)', marginBottom: '14px', lineHeight: '1.35' }}>
                  Ginnva New Material Co., Ltd.
                  <span style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--muted-2)', marginTop: '4px', letterSpacing: '.02em' }}>
                    SSE: 603683
                  </span>
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.85', textAlign: 'justify', margin: 0 }}>
                  Perusahaan material perekat pertama di China yang tercatat di bursa saham, berdiri sejak tahun <strong>1994</strong> dan resmi terdaftar di <strong>Bursa Efek Shanghai (SSE)</strong> pada tahun <strong>2017</strong> dengan kode saham <strong>603683</strong>.
                  <br /><br />
                  Bisnis Ginnva China mencakup tiga bidang utama: <strong>material perekat industri</strong>, <strong>material perekat elektronik</strong>, dan <strong>material film fungsional</strong>. Produknya diaplikasikan di industri otomotif (PPF, Kaca Film, dan Color Change Film), konstruksi & dekorasi, baterai kendaraan listrik, serta layar sentuh.
                  <br /><br />
                  Dengan komitmen pada inovasi teknologi, Ginnva China melayani lebih dari <strong>70 negara</strong> di seluruh dunia melalui kolaborasi riset bersama pelanggan industri terkemuka.
                </p>
              </div>
            </div>

          </div>

          {/* Stat row gabungan
          <div className="stat-row">
            <div className="it"><div className="v">1994</div><div className="l">Tahun Berdiri</div></div>
            <div className="it"><div className="v">70<small>+</small></div><div className="l">Negara Ekspor</div></div>
            <div className="it"><div className="v">10<small>+</small></div><div className="l">Anak Perusahaan</div></div>
            <div className="it"><div className="v">20<small>+</small></div><div className="l">Jaringan Layanan</div></div>
          </div>
          */}
        </div>
      </section>
    </>
  );
}