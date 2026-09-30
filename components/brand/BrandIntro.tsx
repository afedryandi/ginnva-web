'use client';

import React, { useState } from 'react';

// Sembunyi-visual (bukan display:none) -- sama pola dengan HeroSection.tsx.
const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

function BuildingPhoto({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="ec-photo" style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: 'linear-gradient(135deg, #f2f5fa 0%, #e8edf5 100%)' }}>
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
      <section className="banner brand-banner">
        {/* Gap SEO (audit 2026-09-30): halaman ini sebelumnya loncat
            langsung ke h3 tanpa h1/h2 sama sekali -- H1 di sini murni
            sinyal SEO (konten identik dengan metadata.title halaman ini),
            "Profil Perusahaan" di bawah dipromosikan jadi h2. */}
        <h1 style={visuallyHidden}>Tentang Ginnva — Brand PPF & Kaca Film Premium</h1>
        <img
          src="/image/building-image.webp"
          alt="Ginnva Building"
          className="banner-img"
        />
        <a className="scrolldown" aria-label="Gulir ke bawah" />
      </section>

      {/* ===================== PROFIL PERUSAHAAN ===================== */}
      <section className="psec">
        <div className="wrap">
          <div className="head">
            {/* margin:0 & fontWeight:inherit -- div sebelumnya tidak kena margin/bold
                UA default h2, browser MEMBERI default itu kalau tidak dinolkan
                eksplisit di sini (globals.css tidak reset margin/font-weight
                universal, cuma body). */}
            <h2 className="t" style={{ margin: 0, fontWeight: 'inherit' }}>Profil Perusahaan</h2>
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
            <div className="entity-card">
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
            <div className="entity-card">
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
                  Shanghai Smith Adhesive New Material Co., Ltd.
                  <span style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--muted-2)', marginTop: '4px', letterSpacing: '.02em' }}>
                    SSE: 603683
                  </span>
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.85', textAlign: 'justify', margin: 0 }}>
                  Perusahaan material perekat pertama di China yang tercatat di bursa saham, berdiri sejak tahun <strong>1994</strong> dan resmi terdaftar di <strong>Bursa Efek Shanghai (SSE)</strong> pada tahun <strong>2017</strong> dengan kode saham <strong>603683</strong>.
                  <br /><br />
                  Bisnis Ginnva China mencakup tiga bidang utama: <strong>material perekat industri</strong>, <strong>material perekat elektronik</strong>, dan <strong>material film fungsional</strong>. Produknya diaplikasikan di industri otomotif (PPF, Kaca Film, dan Color Change Film), konstruksi & dekorasi, baterai kendaraan listrik, serta layar sentuh.
                  <br /><br />
                  Dengan komitmen pada inovasi teknologi, Ginnva China melayani lebih dari <strong>110 negara</strong> di seluruh dunia melalui kolaborasi riset bersama pelanggan industri terkemuka.
                </p>
              </div>
            </div>

          </div>

          {/* ── Kotak kepercayaan/penunjukan mitra — diletakkan di tengah,
                di antara kolom Ginnva Indonesia & Ginnva China ─────────── */}
          <div style={{
            maxWidth: '760px',
            margin: '32px auto 0',
            textAlign: 'center',
            background: 'rgba(237,22,81,.05)',
            border: '1px solid rgba(237,22,81,.15)',
            borderRadius: '16px',
            padding: '28px 32px',
          }}>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.85', margin: 0 }}>
              Sebagai bentuk kepercayaan dan ekspansi global, Shanghai Smith Adhesive New Material Co., Ltd. secara resmi menunjuk <strong>PT. Ginnva Shield Indonesia</strong> sebagai mitra dan perwakilan eksklusif di Indonesia untuk memasarkan serta mendistribusikan produk film otomotif bermerek <strong>Ginnva</strong>.
            </p>
          </div>

          {/* Konten SEO (audit 2026-09-30, "butuh 800 kata supaya SEO maksimal") --
              halaman ini sebelumnya loncat dari kotak kepercayaan langsung ke
              BrandTimeline tanpa narasi penutup. Paragraf di bawah melengkapi
              cerita perusahaan sebelum masuk ke linimasa. */}
          <div style={{ maxWidth: '860px', margin: '56px auto 0' }}>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.85', textAlign: 'justify', margin: '0 0 20px' }}>
              Lebih jauh tentang bagaimana status ini berjalan di lapangan: perwakilan eksklusif bukan sekadar label distribusi — setiap batch Paint Protection Film dan kaca film yang beredar di Indonesia melalui jalur resmi PT. Ginnva Shield Indonesia diproduksi dan diuji dengan standar kontrol kualitas yang sama dengan yang berlaku di fasilitas produksi Shanghai Smith Adhesive. Dukungan riset dan pengembangan material langsung dari prinsipal di China memungkinkan kami menghadirkan teknologi terbaru — mulai dari TPU self-healing generasi ketiga untuk PPF, hingga Bi-silver Sputtering dan Nano-Ceramic untuk kaca film — tanpa jeda distribusi yang panjang seperti produk yang masuk lewat jalur tidak resmi.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.85', textAlign: 'justify', margin: '0 0 20px' }}>
              Kami memahami bahwa PPF dan kaca film bukan produk yang dibeli setiap tahun — keputusan memasang film pada kendaraan biasanya berlaku untuk jangka waktu lama, bahkan sepanjang masa pakai kendaraan itu sendiri. Karena itu, seluruh proses pemasangan Ginnva dilakukan oleh installer terlatih di fasilitas kami sendiri, GINNVA House di PIK 2, bukan diserahkan ke pihak ketiga yang tidak terverifikasi. Konsistensi hasil pemasangan — presisi potongan, kerapian tepi, dan kebersihan permukaan sebelum film ditempel — adalah faktor yang paling menentukan usia pakai produk, sebesar apa pun kualitas material film itu sendiri.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.85', textAlign: 'justify', margin: 0 }}>
              Komitmen ini yang mendasari sistem garansi resmi Ginnva: setiap kendaraan yang dipasangi produk kami mendapat <strong>E-Warranty</strong> digital yang tercatat di sistem pusat, bisa diverifikasi kapan saja, dan mencakup perlindungan hingga 10 tahun untuk kaca film serta 8 tahun untuk PPF. Sepanjang perjalanan kami di Indonesia, filosofi yang kami pegang tetap sama — menghadirkan teknologi proteksi kendaraan kelas dunia, dengan layanan dan tanggung jawab purnajual yang benar-benar bisa dipertanggungjawabkan di lapangan.
            </p>
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