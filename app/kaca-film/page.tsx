import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import styles from './page.module.css';

// Landing page iklan (Meta Ads) khusus Kaca Film Mobil — pecahan dari
// halaman gabungan /ppf-kaca-film sebelumnya, atas permintaan user
// supaya PPF dan Kaca Film masing-masing punya landing page sendiri
// (satu produk, satu fokus iklan). Struktur & bare-chrome sama persis
// dengan /partner (lihat SiteChrome.tsx). Kembaran persis dari
// app/ppf/page.tsx, cuma kontennya di-generalize ke Kaca Film saja —
// SENGAJA berdiri sendiri (bukan share komponen) mengikuti konvensi
// /partner & /giias di repo ini.
const TITLE = 'Ginnva Kaca Film — Perlindungan Kaca Premium';
const DESC = 'Distributor resmi dan perwakilan eksklusif Ginnva di Indonesia — Kaca Film premium Bi-silver Sputtering & Nano-Ceramic, tolak panas hingga 61%, garansi hingga 10 tahun, dipasang presisi di GINNVA House, PIK 2.';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/kaca-film'),
  title: TITLE,
  description: DESC,
  openGraph: {
    ...seoDefaults.openGraph,
    title: TITLE,
    description: DESC,
    url: 'https://ginnva.id/kaca-film',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: TITLE,
    description: DESC,
  },
};

const ACCENT = '#ed1651';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';
const WA_NUMBER = '628118681678';
const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

function Section({
  children,
  alt,
  style,
}: {
  children: React.ReactNode;
  alt?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <section className={`${styles.psec} ${alt ? styles.psecAlt : ''}`} style={style}>
      <div className="wrap" style={{ maxWidth: '1080px' }}>{children}</div>
    </section>
  );
}

const XCircle = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 9l6 6M15 9l-6 6" />
  </svg>
);

const CheckCircle = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.3 10.8 15 16 9.5" />
  </svg>
);

const GALLERY = [
  { src: '/image/ppf-kaca-film/kf1.jpg', alt: 'BMW Series 7 - Kaca Film Ginnva', cap: 'BMW Series 7 · Kaca Film' },
  { src: '/image/ppf-kaca-film/kf2.jpg', alt: 'Porsche Macan - Kaca Film Ginnva', cap: 'Porsche Macan · Kaca Film' },
  { src: '/image/ppf-kaca-film/kf3.jpg', alt: 'Audi A6 - Kaca Film Ginnva', cap: 'Audi A6 · Kaca Film' },
  { src: '/image/ppf-kaca-film/kf4.jpg', alt: 'GWM Tank 500 - Kaca Film Ginnva', cap: 'GWM Tank 500 · Kaca Film' },
];

// Sama persis dengan components/brand/BrandHonor.tsx — caption dibaca
// langsung dari isi tiap sertifikat, jangan diubah tanpa cek ulang file
// gambarnya di public/image/certification/.
const HONOR_IMAGES = [
  { src: '/image/certification/certification-12.webp', caption: 'National High-Tech Enterprise Certificate' },
  { src: '/image/certification/certification-2.webp', caption: 'China Automotive Aftermarket TOP100 List 2024' },
  { src: '/image/certification/certification-10.webp', caption: 'Sertifikat Peringkat Pemasok Otomotif — Bintang 5' },
  { src: '/image/certification/certification-9.webp', caption: 'Drafting Unit — Standar Pemasangan Film Pelindung Cat Otomotif (CADCC)' },
  { src: '/image/certification/certification-6.webp', caption: 'Sertifikasi Sistem Manajemen ISO — DZCC' },
  { src: '/image/certification/certification-1.webp', caption: 'FSC Chain of Custody Certification — Bureau Veritas' },
  { src: '/image/certification/certification-3.webp', caption: 'Drafting Unit — Standar Pemasangan Kaca Film Otomotif (T/CADCC 006-2025)' },
  { src: '/image/certification/certification-4.webp', caption: '5G Commercial Industry Alliance — Excellent National Brand' },
  { src: '/image/certification/certification-5.webp', caption: 'Shanghai Science & Technology "Little Giant" Enterprise (2014)' },
  { src: '/image/certification/certification-7.webp', caption: 'Shanghai SRDI Enterprise (2014)' },
  { src: '/image/certification/certification-8.webp', caption: 'ASWORLD 2024 Recommended Brand Award' },
  { src: '/image/certification/certification-11.webp', caption: 'China Automotive Aftermarket TOP100 List 2023' },
];

export default function KacaFilmPage() {
  return (
    <main data-page="kaca-film" style={{ backgroundColor: '#fff' }}>
      {/* ================= HERO + NAVBAR BLUR ================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '82vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
          overflow: 'hidden',
          padding: '100px 20px 70px',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/image/hero-banner.webp"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={`${API_BASE}/video/ginnva-hero.mp4`} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,9,13,.6), rgba(8,9,13,.82))' }} />

        <header
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            background: 'rgba(20,21,26,.28)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(255,255,255,.14)',
          }}
        >
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <Image src="/image/ginnva-logo-white.webp" alt="Ginnva Shield Indonesia" width={130} height={26} style={{ height: '26px', width: 'auto' }} />
            <a className="pill pill--accent" style={{ height: '38px', padding: '0 20px', fontSize: '13px' }} href={waLink('Halo Ginnva, saya tertarik konsultasi Kaca Film')} target="_blank" rel="noopener">
              Chat WhatsApp
            </a>
          </div>
        </header>

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: '#fff',
              border: '1px solid rgba(255,255,255,.4)',
              borderRadius: '20px',
              padding: '7px 18px 7px 8px',
              background: 'rgba(0,0,0,.25)',
            }}
          >
            <span style={{ background: ACCENT, color: '#fff', borderRadius: '14px', padding: '2px 10px', fontWeight: 800 }}>110+</span>
            Negara Terpercaya Ginnva Global
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 50px)', lineHeight: 1.15, marginTop: '24px' }}>
            SUDAH BELI MOBIL BARU?
            <br />
            <span style={{ color: ACCENT }}>Cool Comfort From Day One.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,.85)', marginTop: '18px', maxWidth: '56ch', marginInline: 'auto' }}>
            Distributor resmi dan perwakilan eksklusif Ginnva di Indonesia — Kaca Film premium Bi-silver
            Sputtering &amp; Nano-Ceramic, tolak panas hingga 61%, garansi hingga 10 tahun, dipasang presisi
            di GINNVA House, PIK 2.
          </p>
          <a
            href={waLink('Halo Ginnva, saya tertarik konsultasi Kaca Film')}
            target="_blank"
            rel="noopener"
            className="pill pill--accent"
            style={{ marginTop: '36px' }}
          >
            Chat WhatsApp Sekarang
          </a>
        </div>
      </section>

      {/* ================= PRODUK KAMI ================= */}
      <Section>
        <div className={styles.head}>
          <div className={styles.e}>Produk Kami</div>
          <h2 className={styles.t}>Kaca Film Performa Tinggi untuk Mobil Anda</h2>
        </div>
        <div className={`${styles.prodCard} ${styles.featureCard}`}>
          <div className={styles.pic}>
            <Image src="/image/product/car-window-film.webp" alt="Kaca Film Mobil Ginnva" fill sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.body}>
            <h3>Ginnva Premium Car Window Film</h3>
            <p>
              Menggunakan teknologi pelapisan Magnetron Sputtering Multi-Layer dan Nano-Ceramic tingkat lanjut.
              Semua seri memberikan perlindungan UV hingga 99%, penolakan panas inframerah superior, dan
              kejernihan optik tinggi — tanpa mengganggu sinyal GPS maupun e-Toll.
            </p>
            <div className={styles.chips}>
              <span className={styles.chip}>UV block 99%</span>
              <span className={styles.chip}>Tidak ganggu GPS</span>
              <span className={styles.chip}>Kejernihan optik tinggi</span>
            </div>

            <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'A70', finish: 'Kaca Depan · TSER 61%', warranty: '10 tahun' },
                { name: 'H70', finish: 'Kaca Depan · TSER 47%', warranty: '8 tahun' },
                { name: 'H30', finish: 'Samping/Belakang · TSER 56%', warranty: '8 tahun' },
                { name: 'H15', finish: 'Samping/Belakang · TSER 65%', warranty: '8 tahun' },
              ].map((v) => (
                <div key={v.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '12px 14px', borderRadius: '10px', background: 'var(--alt)', fontSize: '13.5px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{v.name}</span>
                  <span style={{ color: 'var(--muted)' }}>{v.finish} · Garansi {v.warranty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ================= KENAPA MEREKA PERCAYA ================= */}
      <Section alt>
        <div className={styles.head}>
          <div className={styles.e}>Hasil Nyata</div>
          <h2 className={styles.t}>Kenapa Mereka Percaya Ginnva</h2>
        </div>
        <div className={styles.galleryScroll}>
          {GALLERY.map((g) => (
            <div key={g.cap} className={styles.galleryItem}>
              <Image src={g.src} alt={g.alt} fill sizes="230px" style={{ objectFit: 'cover' }} />
              <div className={styles.galleryCap}>{g.cap}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= WITHOUT VS WITH ================= */}
      <Section>
        <div className={styles.head}>
          <div className={styles.e}>Kenapa Melindungi Sejak Hari Pertama</div>
          <h2 className={styles.t}>Your Cabin Will Never Feel This Cool Again.</h2>
        </div>
        <div className={styles.grid2} style={{ alignItems: 'stretch' }}>
          <div className={styles.cmpCard}>
            <div className={styles.cmpLabel}>Tanpa Kaca Film</div>
            <ul>
              {['Panas menembus kabin', 'Kaca kusam & menguning', 'Privasi kurang terjaga', 'UV merusak interior'].map((t) => (
                <li key={t}><XCircle color="#c0392b" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.cmpCard} ${styles.cmpCardWith}`}>
            <div className={styles.cmpLabel}>Dengan Ginnva Kaca Film</div>
            <ul>
              {['Kabin sejuk, tolak panas 61%', 'Kaca tetap jernih & bening', 'Privasi terjaga maksimal', 'Blokir UV hingga 99%'].map((t) => (
                <li key={t}><CheckCircle color={ACCENT} /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ================= KREDIBILITAS GLOBAL ================= */}
      <Section alt>
        <div className={styles.head}>
          <div className={styles.e}>Kredibilitas Global</div>
          <h2 className={styles.t}>Didukung Ginnva China — Tercatat di Bursa Efek Shanghai</h2>
        </div>
        <p style={{ maxWidth: '70ch', margin: '0 auto 36px', textAlign: 'center', color: 'var(--muted)', fontSize: '15px', lineHeight: 1.8 }}>
          PT. Ginnva Shield Indonesia adalah distributor resmi dan perwakilan eksklusif{' '}
          <b>Shanghai Smith Adhesive New Material Co., Ltd.</b> (SSE: 603683) — perusahaan material perekat pertama
          di China yang tercatat di bursa saham, berdiri sejak 1994 dan melayani lebih dari 110 negara di seluruh dunia.
        </p>
        <div className={styles.statRow}>
          <div className={styles.it}><div className={styles.v}>158+</div><div className={styles.l}>Sertifikasi Industri</div></div>
          <div className={styles.it}><div className={styles.v}>100+</div><div className={styles.l}>Paten Proprietary</div></div>
          <div className={styles.it}><div className={styles.v}>120+</div><div className={styles.l}>Personel R&amp;D</div></div>
          <div className={styles.it}><div className={styles.v}>4</div><div className={styles.l}>Basis Produksi</div></div>
        </div>

        <div className={styles.honorGrid}>
          {HONOR_IMAGES.map((item) => (
            <div key={item.src} className={styles.honorItem}>
              <div className={styles.pic}>
                <Image src={item.src} alt={item.caption} width={280} height={200} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div className={styles.cap}>{item.caption}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= LOKASI ================= */}
      <section className={styles.psec} style={{ background: '#141416' }}>
        <div className="wrap" style={{ maxWidth: '1080px' }}>
          <div className={styles.head}>
            <div className={styles.e} style={{ justifyContent: 'center' }}>Flagship Store · Workshop · Lounge</div>
            <h2 className={styles.t} style={{ color: '#fff' }}>GINNVA House — PIK 2</h2>
          </div>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <div className={styles.row}><b>Alamat</b><span>Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2, Kosambi, Selembaran, Tangerang, Banten 15210</span></div>
              <div className={styles.row}><b>Telepon</b><span>+62 811-8681-678</span></div>
              <a className="pill pill--accent" style={{ marginTop: '24px' }} href={waLink('Halo Ginnva, saya ingin datang langsung ke GINNVA House')} target="_blank" rel="noopener">
                Chat untuk Atur Kunjungan
              </a>
            </div>
            <div className={styles.contactMap} style={{ position: 'relative', minHeight: '320px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.459351816242!2d106.70506227361535!3d-6.068620459549684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a030025c42b81%3A0xab33d6b0eb2e1130!2sFlagship%20Store%20Ginnva%20Indonesia!5e0!3m2!1sid!2sid!4v1783226085997!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi GINNVA House"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className={styles.footer}>
        <div className="wrap" style={{ maxWidth: '1080px', paddingTop: '32px' }}>
          <Image src="/image/ginnva-logo-white.webp" alt="Ginnva Shield Indonesia" width={110} height={22} style={{ height: '22px', width: 'auto', opacity: 0.9 }} />
          <div className={styles.footBottom}>
            <span>© 2026 PT. Ginnva Shield Indonesia. Semua hak dilindungi.</span>
            <a href={waLink('')}>+62 811-8681-678</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
