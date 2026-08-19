import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import PartnerForm from './PartnerForm';
import PartnerSignupBar from './PartnerSignupBar';
import {
  ShieldIcon,
  SparkleIcon,
  RefreshIcon,
  SunIcon,
  CheckCircleIcon,
  XCircleIcon,
  GaugeIcon,
  GearShiftIcon,
  DoorIcon,
} from './icons';

// Kembaran app/giias/page.tsx — TIDAK terikat 1 event/pameran tertentu,
// jadi tidak ada kata "GIIAS"/nama event apa pun di sini (beda dari
// halaman itu yang memang khusus periode GIIAS). Struktur & gaya visual
// SENGAJA dibuat sama persis (sama komponen Section/IconBadge, sama
// urutan section) sesuai permintaan — cuma kontennya di-generalize.
const TITLE = 'Interior Protection Privilege — Ginnva Shield Indonesia';
const DESC = 'Baru beli mobil baru? Klaim FREE Interior PPF dari Ginnva — lindungi dashboard, door panel, dan area interior lainnya sejak hari pertama.';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/partner'),
  title: TITLE,
  description: DESC,
  openGraph: {
    ...seoDefaults.openGraph,
    title: TITLE,
    description: DESC,
    url: 'https://ginnva.id/partner',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: TITLE,
    description: DESC,
  },
};

const ACCENT = '#ed1651';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';

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
      <div className="wrap" style={{ maxWidth: '1000px' }}>{children}</div>
    </section>
  );
}

function IconBadge({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
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
        background: dark ? 'rgba(237,22,81,.14)' : 'rgba(237,22,81,.08)',
        color: ACCENT,
      }}
    >
      {children}
    </div>
  );
}

// Cuma 1 benefit (FREE Interior PPF, beda dari /giias yang punya 3
// pilihan kombinasi) — supaya section ini tidak terasa sepi cuma 1
// kalimat sendirian, dipecah jadi area cakupan yang dilindungi, bukan
// dibuat-buat jadi banyak "benefit" palsu.
const INTERIOR_COVERAGE = [
  { icon: <GaugeIcon size={26} color="#fff" />, title: 'Dashboard & Panel', sub: 'Melindungi dari goresan dan sinar UV harian' },
  { icon: <GearShiftIcon size={26} color="#fff" />, title: 'Konsol & Area Gear', sub: 'Bagian yang paling sering tersentuh tetap mulus' },
  { icon: <DoorIcon size={26} color="#fff" />, title: 'Door Panel & Armrest', sub: 'Area yang sering bergesekan tangan & pakaian' },
];

const PPF_FEATURES = [
  { icon: <SparkleIcon size={24} />, title: 'Scratch Protection', text: 'Mengurangi risiko goresan dari kunci, kuku, atau gesekan harian.' },
  { icon: <RefreshIcon size={24} />, title: 'Self-Healing Surface', text: 'Goresan halus memudar dengan panas.' },
  { icon: <SunIcon size={24} />, title: 'Anti-Yellowing', text: 'Permukaan tidak mudah menguning walau sering terpapar sinar matahari.' },
  { icon: <ShieldIcon size={24} />, title: 'Stain Resistant', text: 'Permukaan jadi lebih mudah dibersihkan dari noda harian.' },
];

const GALLERY = [
  { src: '/image/giias/Flagship Store.webp', label: 'Flagship Store' },
  { src: '/image/giias/Workshop.webp', label: 'Workshop' },
  { src: '/image/giias/Lounge.webp', label: 'Lounge' },
  { src: '/image/giias/Installation Bay.webp', label: 'Installation Bay' },
];

export default async function PartnerPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const hasReferralCode = !!(await searchParams).ref;

  return (
    <main data-page="partner" style={{ backgroundColor: '#fff' }}>
      <PartnerSignupBar hasReferralCode={hasReferralCode} />

      {/* ================= 1. HERO ================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
          overflow: 'hidden',
          padding: '140px 20px 80px',
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
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,9,13,.55), rgba(8,9,13,.78))' }} />

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
            GINNVA PRIVILEGE
          </div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.15, margin: 0 }}>
            SUDAH BELI MOBIL BARU?
            <br />
            <span style={{ color: ACCENT }}>Protect It From Day One.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,.85)', marginTop: '18px' }}>
            New Car Protection Privilege dari Ginnva — klaim FREE Interior PPF Anda sekarang.
          </p>

          <div style={{ marginTop: '40px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)', marginBottom: '14px' }}>
              FREE Interior PPF Mencakup
            </div>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {INTERIOR_COVERAGE.map((b) => (
                <div
                  key={b.title}
                  style={{
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.18)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    width: '220px',
                  }}
                >
                  {b.icon}
                  <div style={{ fontWeight: 700, marginTop: '10px', fontSize: '15px' }}>{b.title}</div>
                  <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,.65)', marginTop: '4px' }}>{b.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <a href="#klaim" className="pill pill--accent" style={{ marginTop: '44px', fontSize: '15px', fontWeight: 700, letterSpacing: '.03em' }}>
            KLAIM PRIVILEGE SEKARANG
          </a>
          <div style={{ marginTop: '14px', fontSize: '12.5px', color: 'rgba(255,255,255,.7)' }}>
            *Setiap Pembelian Pemasangan PPF
          </div>
        </div>
      </section>

      {/* ================= 2. EMOSIONAL ================= */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <h2 className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 32px)' }}>
              Your Car Will Never Be This New Again.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '15.5px', lineHeight: 1.8, marginTop: '16px' }}>
              Sejak dipakai, interior mulai terpapar goresan kunci, kuku, dan gesekan harian. Waktu terbaik
              melindungi kendaraan adalah <b>sebelum</b> risiko itu terjadi.
            </p>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '18px', overflow: 'hidden' }}>
            <Image src="/image/product/paint-protection-film.webp" alt="Paint Protection Film Ginnva" fill sizes="(max-width: 720px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </Section>

      {/* ================= 3. WHAT IS INTERIOR PPF ================= */}
      <Section alt>
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <h2 className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>Apa fungsi Interior PPF?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {PPF_FEATURES.map((f) => (
            <div key={f.title} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '14px', padding: '28px 18px', textAlign: 'center' }}>
              <IconBadge>{f.icon}</IconBadge>
              <div style={{ fontWeight: 700, marginTop: '14px', fontSize: '15px' }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px', lineHeight: 1.6 }}>{f.text}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= 4. WITHOUT VS WITH ================= */}
      <Section>
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <h2 className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>Why Protect Your Interior?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', background: '#fafafa' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.1em', color: 'var(--muted-2)', textTransform: 'uppercase' }}>Without Interior PPF</div>
            <ul style={{ marginTop: '16px', listStyle: 'none', padding: 0, color: 'var(--muted)', fontSize: '15px' }}>
              {['Goresan Kunci & Kuku', 'Permukaan Kusam & Menguning', 'Sulit Dibersihkan', 'Nilai Jual Turun'].map((t) => (
                <li key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0' }}>
                  <XCircleIcon size={18} color="#c0392b" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ border: `1px solid ${ACCENT}`, borderRadius: '16px', padding: '28px', background: 'rgba(237,22,81,.04)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.1em', color: ACCENT, textTransform: 'uppercase' }}>With Interior PPF</div>
            <ul style={{ marginTop: '16px', listStyle: 'none', padding: 0, color: 'var(--ink)', fontSize: '15px' }}>
              {['Terlindungi dari Goresan', 'Permukaan Tetap Glossy', 'Mudah Dibersihkan', 'Nilai Jual Terjaga'].map((t) => (
                <li key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0' }}>
                  <CheckCircleIcon size={18} color={ACCENT} /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ================= 5 + 6. PRIVILEGE + FORM ================= */}
      <Section alt style={{ scrollMarginTop: '80px' }}>
        <div id="klaim" style={{ scrollMarginTop: '90px' }} />
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <h2 className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>Claim Your Complimentary Interior Protection</h2>
        </div>
        <PartnerForm />
      </Section>

      {/* ================= 7. SONAX TRUST BUILDER ================= */}
      <Section>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.14em', color: ACCENT, textTransform: 'uppercase' }}>
            Premium Preparation Matters
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.8, marginTop: '12px' }}>
            Sebelum PPF dipasang, permukaan kendaraan dipersiapkan dengan proses detailing profesional <b>SONAX</b>.
          </p>
        </div>
      </Section>

      {/* ================= 8. VISIT GINNVA HOUSE ================= */}
      <Section alt>
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <h2 className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>Experience GINNVA Before You Decide.</h2>
          <div className="sec-sub" style={{ marginTop: '10px' }}>Lihat langsung cara kerja PPF & proses instalasi di GINNVA House</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', marginBottom: '32px' }}>
          {GALLERY.map((g) => (
            <div key={g.label} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)' }}>
              <Image src={g.src} alt={g.label} fill sizes="(max-width: 720px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '8px 10px', fontSize: '12px', color: '#fff', background: 'linear-gradient(to top, rgba(10,11,16,.8), transparent)' }}>
                {g.label}
              </div>
            </div>
          ))}
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>GINNVA House — PIK 2</h3>
            <div className="row"><b>Alamat</b><span>Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2, Kosambi, Selembaran, Tangerang, Banten 15210</span></div>
            <div className="row"><b>Telepon</b><span>+62 811-8681-678</span></div>
          </div>
          <div className="contact-map" style={{ position: 'relative', minHeight: '320px', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.459351816242!2d106.70506227361535!3d-6.068620459549684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a030025c42b81%3A0xab33d6b0eb2e1130!2sFlagship%20Store%20Ginnva%20Indonesia!5e0!3m2!1sid!2sid!4v1783226085997!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi GINNVA House"
            />
          </div>
        </div>
      </Section>

      {/* ================= 9. FINAL CTA ================= */}
      <section
        style={{
          position: 'relative',
          padding: '90px 20px',
          textAlign: 'center',
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        <Image src="/image/hero-banner-giias.webp" alt="" fill sizes="100vw" style={{ objectFit: 'cover', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(20,21,26,.88) 0%, rgba(31,20,32,.88) 55%, rgba(58,15,34,.88) 100%)' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.3 }}>YOUR NEW CAR DESERVES PROTECTION FROM DAY ONE.</h2>
          <a href="#klaim" className="pill pill--accent" style={{ marginTop: '30px', fontSize: '15px', fontWeight: 700 }}>
            CLAIM YOUR PRIVILEGE
          </a>
        </div>
      </section>
    </main>
  );
}