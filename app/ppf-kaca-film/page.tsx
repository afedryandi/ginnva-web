import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import { ShieldIcon, SparkleIcon, RefreshIcon, SunIcon, CheckCircleIcon, XCircleIcon } from '../partner/icons';

// Landing page iklan (Meta Ads) untuk PPF + Kaca Film — satu halaman,
// satu CTA (klik ke WhatsApp), struktur & gaya visual sama persis
// dengan /partner (lihat SiteChrome.tsx: kedua path ini "bare", tanpa
// Header/Footer/ChatWidget situs utama, karena keduanya landing page
// iklan yang tidak boleh mendistraksi customer dari satu CTA).
const TITLE = 'PPF & Kaca Film Premium Bergaransi — Ginnva Shield Indonesia';
const DESC = 'Lindungi cat dan kaca mobil Anda dengan PPF TPU Generasi 3 Self-Healing dan Kaca Film Bi-Silver/Nano-Ceramic dari Ginnva. Garansi resmi hingga 10 tahun.';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/ppf-kaca-film'),
  title: TITLE,
  description: DESC,
  openGraph: {
    ...seoDefaults.openGraph,
    title: TITLE,
    description: DESC,
    url: 'https://ginnva.id/ppf-kaca-film',
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
    <section className={alt ? 'psec psec--alt' : 'psec'} style={style}>
      <div className="wrap" style={{ maxWidth: '1080px' }}>{children}</div>
    </section>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        background: 'rgba(237,22,81,.08)',
        color: ACCENT,
      }}
    >
      {children}
    </div>
  );
}

const PPF_FEATURES = ['Self-Healing Surface', 'Anti-Yellowing', 'Super Hydrophobic', 'Garansi hingga 8 Tahun'];
const WINDOW_FEATURES = ['Tolak Panas hingga 61%', 'Blokir UV 99%', 'Tidak Ganggu Sinyal GPS/e-Toll', 'Garansi hingga 10 Tahun'];

const GALLERY = [
  { src: '/image/giias/Flagship Store.webp', label: 'Flagship Store' },
  { src: '/image/giias/Workshop.webp', label: 'Workshop' },
  { src: '/image/giias/Lounge.webp', label: 'Lounge' },
  { src: '/image/giias/Installation Bay.webp', label: 'Installation Bay' },
];

// Sama persis dengan components/brand/BrandHonor.tsx — caption dibaca
// langsung dari isi tiap sertifikat, jangan diubah tanpa cek ulang file
// gambarnya di public/image/certification/.
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

export default function PpfKacaFilmPage() {
  return (
    <main data-page="ppf-kaca-film" style={{ backgroundColor: '#fff' }}>
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
            <a className="pill pill--accent" style={{ height: '38px', padding: '0 20px', fontSize: '13px' }} href={waLink('Halo Ginnva, saya tertarik konsultasi PPF / Kaca Film')} target="_blank" rel="noopener">
              Chat WhatsApp
            </a>
          </div>
        </header>

        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: ACCENT,
              border: `1px solid ${ACCENT}`,
              borderRadius: '20px',
              padding: '6px 18px',
              marginBottom: '24px',
              background: 'rgba(0,0,0,.25)',
            }}
          >
            110+ Negara Terpercaya Ginnva Global
          </div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.15, margin: 0 }}>
            Lindungi Mobil Anda dengan
            <br />
            <span style={{ color: ACCENT }}>PPF &amp; Kaca Film Premium Ginnva</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,.85)', marginTop: '18px' }}>
            Self-healing, anti-yellowing, tolak panas hingga 61% — bergaransi resmi hingga 10 tahun.
          </p>
          <a
            href={waLink('Halo Ginnva, saya tertarik konsultasi PPF / Kaca Film')}
            target="_blank"
            rel="noopener"
            className="pill pill--accent"
            style={{ marginTop: '40px', fontSize: '15px', fontWeight: 700, letterSpacing: '.03em' }}
          >
            KONSULTASI GRATIS VIA WHATSAPP
          </a>
        </div>
      </section>

      {/* ================= PRODUK KAMI ================= */}
      <Section>
        <div className="head" style={{ textAlign: 'center' }}>
          <div className="e" style={{ justifyContent: 'center' }}>Dua Lapisan Proteksi Utama</div>
          <h2 className="t">Produk Kami</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginTop: '36px' }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: '18px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3' }}>
              <Image src="/image/product/paint-protection-film.webp" alt="Paint Protection Film Ginnva" fill sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '26px' }}>
              <h3 style={{ fontSize: '19px', margin: 0 }}>Paint Protection Film (PPF)</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', lineHeight: 1.75, marginTop: '10px' }}>
                100% TPU 3rd Generation dengan lapisan Crystal-Shield — melindungi cat dari goresan, benturan kerikil, dan korosi.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                {PPF_FEATURES.map((f) => (
                  <span key={f} style={{ fontSize: '12.5px', color: ACCENT, background: 'rgba(237,22,81,.08)', borderRadius: '20px', padding: '6px 14px' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ border: '1px solid var(--line)', borderRadius: '18px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3' }}>
              <Image src="/image/product/car-window-film.webp" alt="Kaca Film Mobil Ginnva" fill sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '26px' }}>
              <h3 style={{ fontSize: '19px', margin: 0 }}>Kaca Film Mobil</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', lineHeight: 1.75, marginTop: '10px' }}>
                Teknologi Bi-silver Sputtering &amp; Nano-Ceramic — kejernihan optik tinggi tanpa mengganggu sinyal GPS maupun e-Toll.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                {WINDOW_FEATURES.map((f) => (
                  <span key={f} style={{ fontSize: '12.5px', color: ACCENT, background: 'rgba(237,22,81,.08)', borderRadius: '20px', padding: '6px 14px' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= KENAPA MEREKA PERCAYA ================= */}
      <Section alt>
        <div className="head" style={{ textAlign: 'center' }}>
          <div className="e" style={{ justifyContent: 'center' }}>Flagship Store · Workshop · Lounge</div>
          <h2 className="t">Kenapa Mereka Percaya Ginnva</h2>
        </div>
        <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', padding: '28px 4px 8px', scrollbarWidth: 'thin' }}>
          {GALLERY.map((g) => (
            <div key={g.label} style={{ position: 'relative', flexShrink: 0, width: '260px', aspectRatio: '4/3', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--line)' }}>
              <Image src={g.src} alt={g.label} fill sizes="260px" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '10px 12px', fontSize: '12.5px', color: '#fff', background: 'linear-gradient(to top, rgba(10,11,16,.8), transparent)' }}>
                {g.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= WITHOUT VS WITH ================= */}
      <Section>
        <div className="head" style={{ textAlign: 'center' }}>
          <h2 className="t">Kenapa Harus Dilindungi Sejak Awal?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '32px' }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', background: '#fafafa' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.1em', color: 'var(--muted-2)', textTransform: 'uppercase' }}>Tanpa Ginnva</div>
            <ul style={{ marginTop: '16px', listStyle: 'none', padding: 0, color: 'var(--muted)', fontSize: '15px' }}>
              {['Cat Baret & Kusam', 'Interior & Kaca Menguning', 'Panas Menembus Kabin', 'Nilai Jual Turun'].map((t) => (
                <li key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0' }}>
                  <XCircleIcon size={18} color="#c0392b" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ border: `1px solid ${ACCENT}`, borderRadius: '16px', padding: '28px', background: 'rgba(237,22,81,.04)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.1em', color: ACCENT, textTransform: 'uppercase' }}>Dengan Ginnva</div>
            <ul style={{ marginTop: '16px', listStyle: 'none', padding: 0, color: 'var(--ink)', fontSize: '15px' }}>
              {['Cat Terlindungi & Self-Healing', 'Kabin Sejuk, Tolak Panas 61%', 'Blokir UV hingga 99%', 'Nilai Jual Terjaga'].map((t) => (
                <li key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0' }}>
                  <CheckCircleIcon size={18} color={ACCENT} /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ================= KREDIBILITAS GLOBAL ================= */}
      <Section alt>
        <div className="head" style={{ textAlign: 'center' }}>
          <div className="e" style={{ justifyContent: 'center' }}>Distributor Resmi di Indonesia</div>
          <h2 className="t">Kredibilitas Global</h2>
        </div>
        <p style={{ maxWidth: '680px', margin: '16px auto 0', textAlign: 'center', color: 'var(--muted)', fontSize: '14.5px', lineHeight: 1.8 }}>
          PT. Ginnva Shield Indonesia adalah distributor resmi <b>Shanghai Smith Adhesive New Material Co., Ltd.</b> (SSE: 603683),
          produsen material perekat fungsional sejak 1994 yang telah melayani 110+ negara.
        </p>
        <div className="stat-row" style={{ marginTop: '32px' }}>
          <div className="it"><div className="v">158<small>+</small></div><div className="l">Sertifikasi Industri</div></div>
          <div className="it"><div className="v">100<small>+</small></div><div className="l">Paten Proprietary</div></div>
          <div className="it"><div className="v">120<small>+</small></div><div className="l">Personel R&amp;D</div></div>
          <div className="it"><div className="v">4</div><div className="l">Basis Produksi</div></div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            padding: '32px 4px 16px',
            scrollSnapType: 'x proximity',
            scrollbarWidth: 'thin',
          }}
        >
          {HONOR_IMAGES.map((item) => (
            <div key={item.src} style={{ flexShrink: 0, width: '220px', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '14px', overflow: 'hidden', background: '#fafafa', border: '1px solid var(--line)' }}>
                <Image src={item.src} alt={item.caption} fill sizes="220px" style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: '14px', color: 'var(--ink)', textAlign: 'center', marginTop: '14px', lineHeight: 1.5, fontWeight: 500 }}>
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= LOKASI ================= */}
      <Section>
        <div className="head" style={{ textAlign: 'center' }}>
          <div className="e" style={{ justifyContent: 'center' }}>Flagship Store · Workshop · Lounge</div>
          <h2 className="t">GINNVA House — PIK 2</h2>
        </div>
        <div className="contact-grid" style={{ marginTop: '32px' }}>
          <div className="contact-card">
            <div className="row"><b>Alamat</b><span>Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2, Kosambi, Selembaran, Tangerang, Banten 15210</span></div>
            <div className="row"><b>Telepon</b><span>+62 811-8681-678</span></div>
            <a className="pill pill--accent" style={{ marginTop: '24px' }} href={waLink('Halo Ginnva, saya ingin datang langsung ke GINNVA House')} target="_blank" rel="noopener">
              Chat untuk Atur Kunjungan
            </a>
          </div>
          <div className="contact-map" style={{ position: 'relative', minHeight: '320px', overflow: 'hidden' }}>
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
      </Section>

      {/* ================= FOOTER ================= */}
      <footer style={{ background: '#1a1a1d', color: 'rgba(255,255,255,.7)' }}>
        <div className="wrap" style={{ padding: '24px 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,.45)' }}>
          <span>© {new Date().getFullYear()} PT Ginnva Shield Indonesia</span>
          <a href="tel:+628118681678" style={{ color: 'rgba(255,255,255,.45)' }}>+62 811-8681-678</a>
        </div>
      </footer>
    </main>
  );
}
