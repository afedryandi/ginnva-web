import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import styles from './page.module.css';
import Gallery from './Gallery';

// Landing page iklan (Meta Ads) — varian dari /kaca-film/campaign
// dengan Above The Fold di-desain ulang mengikuti design reference
// terpisah (layout terang split teks/foto + bar statistik, referensi
// ALSOK Indonesia yang diberikan user 2026-09-22) — bukan hero video
// gelap seperti /kaca-film/campaign. Sisa section (Benefits, USP,
// Portfolio, dst) SAMA PERSIS dengan /kaca-film/campaign, cuma
// di-duplikasi di sini (bukan di-share) mengikuti konvensi repo tiap
// landing page iklan berdiri sendiri.
//
// Foto hero & galeri masih PLACEHOLDER (foto asli belum tersedia,
// keputusan user 2026-09-22) — tinggal timpa src di HERO_IMAGE/GALLERY
// begitu asetnya ada.
const TITLE = 'Ginnva Premium Automotive Window Film';
const DESC = 'Chinese-engineered window film, resmi didistribusikan di Indonesia oleh Ginnva. E-Warranty digital, dipasang presisi di GINNVA House, PIK 2.';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/kaca-film/campaign2'),
  title: TITLE,
  description: DESC,
  openGraph: {
    ...seoDefaults.openGraph,
    title: TITLE,
    description: DESC,
    url: 'https://ginnva.id/kaca-film/campaign2',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: TITLE,
    description: DESC,
  },
};

const WA_NUMBER = '628118681678';
const RESERVE_MESSAGE = 'Hallo Ginnva, saya ingin Reserve Slot untuk pasang Window Film.';
const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

function Section({
  children,
  alt,
  dark,
  style,
}: {
  children: React.ReactNode;
  alt?: boolean;
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <section
      className={`${styles.psec} ${alt ? styles.psecAlt : ''}`}
      style={dark ? { background: '#141416', ...style } : style}
    >
      <div className="wrap" style={{ maxWidth: '1080px' }}>{children}</div>
    </section>
  );
}

// Ikon inline sederhana (stroke-based), konsisten dengan gaya X/Check
// circle di app/kaca-film/page.tsx — 1 ikon per kartu USP.
const IconHeat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8" />
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
  </svg>
);
const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);
const IconLock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </svg>
);
const IconVerify = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    <path d="M9 12.3l2 2 4-4.6" />
  </svg>
);
const HERO_STATS = [
  { v: '61%', l: 'Heat Rejection' },
  { v: '99%', l: 'UV Blocked' },
  { v: '72%', l: 'Clarity Retained' },
  { v: '10 Yrs', l: 'Warranty' },
];

const GALLERY = [
  { src: '/image/ppf-kaca-film/kf1.jpg', alt: 'BMW Series 7 - Window Film Ginnva', cap: 'BMW Series 7' },
  { src: '/image/ppf-kaca-film/kf2.jpg', alt: 'Porsche Macan - Window Film Ginnva', cap: 'Porsche Macan' },
  { src: '/image/ppf-kaca-film/kf3.jpg', alt: 'Audi A6 - Window Film Ginnva', cap: 'Audi A6' },
  { src: '/image/ppf-kaca-film/kf4.jpg', alt: 'GWM Tank 500 - Window Film Ginnva', cap: 'GWM Tank 500' },
];

const USP_ITEMS = [
  {
    icon: <IconHeat />,
    title: 'No More Heat Build-Up',
    desc: 'Mobil yang diparkir di bawah matahari tetap bisa dimasuki tanpa harus menunggu AC mengejar dari nol.',
  },
  {
    icon: <IconShield />,
    title: 'Interior That Ages Slower',
    desc: 'Dashboard nggak retak halus, jok nggak kehilangan warna, trim plastik nggak berubah kusam.',
  },
  {
    icon: <IconEye />,
    title: 'Less Glare, Same Clarity',
    desc: 'Matahari sore dan lampu jauh dari arah berlawanan nggak lagi memaksa menyipit, termasuk saat berkendara malam.',
  },
  {
    icon: <IconLock />,
    title: 'Privacy Without Losing Signal',
    desc: 'Kaca samping bisa segelap yang kamu mau. GPS, e-Toll, dan sinyal HP tetap jalan seperti biasa.',
  },
];

const WHO_WE_ARE = [
  { v: '30 Years', l: 'Pengalaman di bidang adhesive dan top coating' },
  { v: 'Publicly Listed', l: 'Tercatat di Bursa Efek Shanghai' },
  { v: 'In-House R&D', l: 'Tim riset dan pengembangan sendiri' },
  { v: 'Own Factory', l: 'Pabrik milik sendiri di Jiangsu, Tiongkok' },
];

// Foto per seri masih PLACEHOLDER (reuse foto galeri instalasi yang
// sudah ada, bukan studio shot per-seri sungguhan) — keputusan user
// 2026-09-22, tinggal timpa src begitu asetnya ada.
const SERIES = [
  {
    name: 'A70',
    photo: '/image/ppf-kaca-film/a70-banner.png',
    photoFit: 'contain' as const,
    photoBg: 'purple' as const,
    character: 'Bright and clear, highest heat rejection among windscreen films.',
    specs: ['VLT 72%', 'TSER 61%', 'UV 99%', '10-year warranty'],
  },
  {
    name: 'H70',
    photo: '/image/ppf-kaca-film/h-series-banner.png',
    photoFit: 'contain' as const,
    photoBg: 'white' as const,
    character: 'Nano ceramic windscreen film.',
    specs: ['TSER 47%', 'UV 99%', '8-year warranty'],
  },
  {
    name: 'H30',
    photo: '/image/ppf-kaca-film/h-series-banner.png',
    photoFit: 'contain' as const,
    photoBg: 'white' as const,
    character: 'Medium tint, privacy without going too dark.',
    specs: ['VLT 28%', 'TSER 56%', 'UV 99%', '8-year warranty'],
  },
  {
    name: 'H15',
    photo: '/image/ppf-kaca-film/h-series-banner.png',
    photoFit: 'contain' as const,
    photoBg: 'white' as const,
    character: 'Darkest tint, highest heat rejection in the range.',
    specs: ['VLT 16%', 'TSER 65%', 'UV 99%', '8-year warranty'],
  },
];

export default function KacaFilmCampaign2Page() {
  return (
    <main data-page="kaca-film-campaign2" style={{ backgroundColor: '#fff' }}>
      {/* ================= ABOVE THE FOLD (light split hero) ================= */}
      <div className={styles.heroLight}>
        <header style={{ borderBottom: '1px solid var(--line)' }}>
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', maxWidth: '1080px' }}>
            <Image src="/image/ginnva-logo-red.webp" alt="Ginnva Shield Indonesia" width={130} height={26} style={{ height: '26px', width: 'auto' }} />
            <a className="pill pill--accent" style={{ height: '38px', padding: '0 20px', fontSize: '13px' }} href={waLink(RESERVE_MESSAGE)} target="_blank" rel="noopener">
              Reserve Your Slot
            </a>
          </div>
        </header>

        <div className="wrap" style={{ maxWidth: '1080px', paddingTop: '48px' }}>
          <div className={styles.heroTop}>
            <div>
              <div className={styles.heroEyebrow}>
                Chinese-Engineered Window Film. Officially Distributed in Indonesia (Ginnva Shield Indonesia).
              </div>
              <h1 className={styles.heroTitle}>Premium Automotive Window Film</h1>
              <p className={styles.heroLead}>
                Percayakan perlindungan kaca mobil kamu kepada Ginnva, dikerjakan dealer resmi dengan
                E-Warranty digital, memastikan setiap posisi kaca dapat seri yang tepat.
              </p>
              <a
                href={waLink(RESERVE_MESSAGE)}
                target="_blank"
                rel="noopener"
                className="pill pill--accent"
                style={{ marginTop: '28px' }}
              >
                Reserve Your Slot
              </a>
            </div>
            <div className={styles.heroPic}>
              <Image src="/image/ppf-kaca-film/kaca-film-hero.webp" alt="Pemasangan Window Film Ginnva" fill sizes="(max-width: 760px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>

          <div className={styles.heroStatBar}>
            {HERO_STATS.map((s) => (
              <div key={s.l}>
                <div className={styles.v}>{s.v}</div>
                <div className={styles.l}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= USP (design reference ALSOK, 2026-09-23:
           headline tunggal tanpa eyebrow, grid 4-across). Section
           "Benefits" yang dulu ada di sini DIHAPUS 2026-09-23 (revisi LP)
           — angkanya (61%/99%/72%/10 Yrs) duplikat persis dgn stat-bar di
           Hero, section terpisah cuma mengulang tanpa info baru. ================= */}
      <Section alt>
        <h2 className={styles.uspHeadline}>What Changes After Installation</h2>
        <div className={styles.uspGrid}>
          {USP_ITEMS.map((item) => (
            <div key={item.title} className={styles.uspCard}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= PORTFOLIO ================= */}
      <Section>
        <div className={styles.head}>
          <h2 className={styles.t}>Installed. On Real Cars.</h2>
        </div>
        <Gallery photos={GALLERY} />
      </Section>

      {/* ================= WHO WE ARE (foto pendukung ditambahkan
           2026-09-23, revisi LP poin 4 — klarifikasi user: bukan USP,
           tapi section ini yang dimaksud. Foto gedung pabrik Ginnva asli
           (bukan placeholder), ditampilkan landscape full-width di atas
           grid, sesuai permintaan user 2026-09-23.) ================= */}
      <Section alt>
        <div className={styles.head}>
          <h2 className={styles.t}>Built by the Manufacturer</h2>
        </div>
        <div className={styles.whoImgWrap}>
          <Image src="/image/ppf-kaca-film/ginnva-factory.png" alt="Gedung pabrik Ginnva" fill sizes="1080px" style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.whoGrid}>
          {WHO_WE_ARE.map((item) => (
            <div key={item.v} className={styles.whoCard}>
              <div className={styles.v}>{item.v}</div>
              <div className={styles.l}>{item.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= OFFER (design reference Jakarta Aesthetic
           Clinic, 2026-09-23; nama seri diganti dari badge pill
           mengambang jadi overlay gradient di dalam foto, 2026-09-23) ================= */}
      <Section>
        <h2 className={styles.offerHeadline}>Meet the Series</h2>
        <div className={styles.seriesGrid}>
          {SERIES.map((s) => (
            <div key={s.name} className={styles.seriesCard}>
              <div className={`${styles.picWrap} ${'photoBg' in s ? (s.photoBg === 'white' ? styles.picWrapContainLight : styles.picWrapContainDark) : ''}`}>
                <Image src={s.photo} alt={`Ginnva Window Film ${s.name}`} fill sizes="(max-width: 900px) 45vw, 22vw" className={'photoFit' in s ? styles.picContain : undefined} style={{ objectFit: 'photoFit' in s ? s.photoFit : 'cover' }} />
                <div className={styles.picOverlay}>
                  <span className={styles.name}>{s.name}</span>
                </div>
              </div>
              <p className={styles.character}>{s.character}</p>
              <div className={styles.specs}>{s.specs.join(' · ')}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= CERTIFICATE (foto pendukung ditambahkan
           2026-09-23, revisi LP poin 3 — masih PLACEHOLDER, ganti begitu
           ada contoh tampilan E-Warranty/sertifikat asli) ================= */}
      <Section alt>
        <div className={styles.head}>
          <h2 className={styles.t}>Warranty You Can Verify</h2>
        </div>
        <div className={styles.certCard}>
          <div className={styles.icon}><IconVerify /></div>
          <p>
            Setiap pemasangan menerbitkan E-Warranty digital berisi data kendaraan, produk yang
            dipasang, tanggal pemasangan, dan masa berlaku. Bisa diverifikasi kapan aja.
          </p>
        </div>
        <div className={styles.certGallery}>
          <figure className={styles.certGalleryItem}>
            <div className={styles.certImgWrap} style={{ aspectRatio: '688/733' }}>
              <Image src="/image/ppf-kaca-film/ewarranty-web.png" alt="Tampilan cek E-Warranty di website" fill sizes="(max-width: 760px) 100vw, 460px" style={{ objectFit: 'contain' }} />
            </div>
            <figcaption>Tampilan cek di website</figcaption>
          </figure>
          <figure className={styles.certGalleryItem}>
            <div className={styles.certImgWrap} style={{ aspectRatio: '784/753' }}>
              <Image src="/image/ppf-kaca-film/ewarranty-pdf.png" alt="Tampilan unduhan E-Warranty format PDF (Roll Number disensor)" fill sizes="(max-width: 760px) 100vw, 460px" style={{ objectFit: 'contain' }} />
            </div>
            <figcaption>Tampilan download E-Warranty format PDF</figcaption>
          </figure>
        </div>
      </Section>

      {/* ================= LOCATION (design reference Jakarta Aesthetic
           Clinic; diubah 2026-09-23 dari foto full-bleed + kartu overlay
           jadi side-by-side — kartu alamat statis di kiri, foto gedung
           Ginnva House mengisi sisa lebar di kanan, supaya foto persis
           mulai dari sebelah kartu, bukan dari tepi kiri browser). ================= */}
      <div className={styles.locationPhoto}>
        <div className={styles.locationCard}>
          <span className={styles.pin}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
              <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </span>
          <h2>Booking Jadwal Instalasi</h2>
          <p className={styles.addr}>
            Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2, Kosambi,
            Selembaran, Tangerang, Banten 15210
          </p>
          <a className="pill pill--accent" style={{ marginTop: '24px', alignSelf: 'flex-start' }} href={waLink(RESERVE_MESSAGE)} target="_blank" rel="noopener">
            Reserve Your Slot
          </a>
        </div>
        <div className={styles.locationImgWrap}>
          <Image
            src="/image/ppf-kaca-film/ginnva-house.webp"
            alt="Ginnva House"
            fill
            sizes="(max-width: 760px) 100vw, 60vw"
            style={{ objectFit: 'cover', objectPosition: 'center top', transform: 'scale(1.12)' }}
          />
        </div>
      </div>

      {/* ================= URGENCY ================= */}
      <div className={styles.urgency}>
        <div className="wrap" style={{ maxWidth: '620px' }}>
          <h2>Book Before the Day Fills Up</h2>
          <p>Tell Us the Car. We&apos;ll Build the Combination.</p>
          <a
            href={waLink(RESERVE_MESSAGE)}
            target="_blank"
            rel="noopener"
            className="pill pill--accent"
            style={{ marginTop: '28px' }}
          >
            Reserve Your Slot
          </a>
        </div>
      </div>

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

      {/* ================= FLOATING WHATSAPP (brief: CTA sama dgn "Reserve Your Slot") ================= */}
      <a href={waLink(RESERVE_MESSAGE)} target="_blank" rel="noopener" className={styles.floatingWa} aria-label="Reserve Your Slot via WhatsApp">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.2c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.82 2.42a8.16 8.16 0 0 1 2.41 5.81c0 4.54-3.69 8.23-8.17 8.23zm4.51-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z" /></svg>
        <span>Reserve Your Slot</span>
      </a>
    </main>
  );
}
