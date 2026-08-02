import React from 'react';
import type { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';
import GiiasForm from './GiiasForm';

const TITLE = 'GIIAS New Car Protection Privilege — Ginnva Shield Indonesia';
const DESC = 'Baru beli mobil di GIIAS? Klaim FREE Interior PPF atau FREE Sunroof / Panoramic Window Film khusus periode GIIAS 2026 dari Ginnva.';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/giias'),
  title: TITLE,
  description: DESC,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    ...seoDefaults.openGraph,
    title: TITLE,
    description: DESC,
    url: 'https://ginnva.id/giias',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: TITLE,
    description: DESC,
  },
};

const ACCENT = '#ed1651';

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
    <section
      className={alt ? 'psec psec--alt' : 'psec'}
      style={style}
    >
      <div className="wrap" style={{ maxWidth: '1000px' }}>{children}</div>
    </section>
  );
}

const BENEFITS = [
  { emoji: '🛡️', title: 'FREE Interior PPF', sub: 'Perlindungan panel interior dari goresan harian' },
  { emoji: '☀️', title: 'FREE Sunroof Window Film', sub: 'Menolak panas & UV dari atap kaca' },
  { emoji: '🪟', title: 'FREE Panoramic Window Film', sub: 'Untuk kendaraan dengan atap panoramic' },
];

const PPF_FEATURES = [
  { emoji: '🪨', title: 'Stone Chip Protection', text: 'Membantu melindungi cat dari benturan kerikil ringan.' },
  { emoji: '✨', title: 'Scratch Protection', text: 'Lapisan fisik membantu mengurangi risiko goresan ringan.' },
  { emoji: '♻️', title: 'Self-Healing Surface', text: 'Goresan halus tertentu pada top coat dapat memudar dengan panas.' },
  { emoji: '🎨', title: 'Preserve Original Paint', text: 'Membantu menjaga kondisi cat asli kendaraan.' },
];

const WHY_GINNVA = [
  { title: 'Premium Protection', text: 'PPF untuk perlindungan kendaraan premium.' },
  { title: 'Professional Installation', text: 'Dikerjakan oleh installer terlatih.' },
  { title: 'Premium Preparation', text: 'Proses persiapan kendaraan menggunakan standar detailing profesional.' },
  { title: 'GINNVA House', text: 'Dedicated automotive protection facility.' },
];

const FAQS = [
  { q: 'Apakah PPF merusak cat?', a: 'Tidak. PPF justru dipasang untuk melindungi cat asli kendaraan dari goresan, kerikil, dan kontaminasi jalan.' },
  { q: 'Berapa lama pemasangan full-body PPF?', a: 'Umumnya membutuhkan waktu 3–5 hari kerja, tergantung tipe kendaraan dan cakupan area yang dipasang.' },
  { q: 'Apakah PPF bisa dilepas?', a: 'Bisa. PPF dirancang untuk dapat dilepas oleh installer profesional tanpa merusak cat orisinal di bawahnya.' },
  { q: 'Apa bedanya PPF dengan coating?', a: 'Coating adalah lapisan kimia untuk kilap & kemudahan bersih, sedangkan PPF adalah lapisan film fisik yang menyerap benturan dan goresan.' },
  { q: 'Kapan waktu terbaik memasang PPF pada mobil baru?', a: 'Sebelum kendaraan digunakan sehari-hari — sebelum risiko stone chip dan goresan pertama terjadi.' },
  { q: 'Apakah saya harus langsung memasang full-body PPF untuk mendapatkan complimentary privilege?', a: 'Tidak harus. Privilege ini bisa diklaim terlepas dari paket yang Anda pilih — silakan konsultasikan kebutuhan Anda di GINNVA House.' },
];

export default function GiiasPage() {
  return (
    <main data-page="giias" style={{ backgroundColor: '#fff' }}>
      {/* ================= 1. HERO ================= */}
      <section
        style={{
          position: 'relative',
          padding: '160px 20px 100px',
          textAlign: 'center',
          color: '#fff',
          background: 'linear-gradient(160deg, #14151a 0%, #1f1420 55%, #3a0f22 100%)',
          overflow: 'hidden',
        }}
      >
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
            }}
          >
            GIIAS 2026 · Periode Terbatas
          </div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.15, margin: 0 }}>
            BARU BELI MOBIL DI GIIAS?
            <br />
            <span style={{ color: ACCENT }}>Protect It From Day One.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,.8)', marginTop: '20px', lineHeight: 1.7 }}>
            Nikmati <b>New Car Protection Privilege</b> dari GINNVA — khusus selama periode GIIAS 2026.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '40px',
            }}
          >
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                style={{
                  background: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.14)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  width: '220px',
                }}
              >
                <div style={{ fontSize: '26px' }}>{b.emoji}</div>
                <div style={{ fontWeight: 700, marginTop: '8px', fontSize: '15px' }}>{b.title}</div>
                <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,.6)', marginTop: '4px' }}>{b.sub}</div>
              </div>
            ))}
          </div>

          <a
            href="#klaim"
            className="pill pill--accent"
            style={{ marginTop: '44px', fontSize: '15px', fontWeight: 700, letterSpacing: '.03em' }}
          >
            KLAIM PRIVILEGE SEKARANG
          </a>
          <div style={{ marginTop: '14px', fontSize: '12.5px', color: 'rgba(255,255,255,.55)' }}>
            Kuota terbatas • Berlaku syarat &amp; ketentuan
          </div>
        </div>
      </section>

      {/* ================= 2. EMOSIONAL ================= */}
      <Section>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <div className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 32px)' }}>
            Your Car Will Never Be This New Again.
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.9, marginTop: '18px' }}>
            Sejak kendaraan mulai digunakan, cat akan terpapar stone chip, goresan ringan, kontaminasi jalan,
            dan berbagai risiko penggunaan sehari-hari. Karena itu waktu terbaik untuk melindungi kendaraan
            adalah <b>sebelum</b> risiko tersebut terjadi.
          </p>
        </div>
      </Section>

      {/* ================= 3. WHAT IS PPF ================= */}
      <Section alt>
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <div className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>Apa itu PPF?</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {PPF_FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                padding: '24px 18px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '30px' }}>{f.emoji}</div>
              <div style={{ fontWeight: 700, marginTop: '10px', fontSize: '15px' }}>{f.title}</div>
              <div style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '6px', lineHeight: 1.6 }}>{f.text}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="#klaim" className="pill pill--outline" style={{ fontSize: '14px' }}>
            Lihat Demo di GINNVA House
          </a>
        </div>
      </Section>

      {/* ================= 4. WITHOUT VS WITH ================= */}
      <Section>
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <div className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>Why Protect a New Car?</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', background: '#fafafa' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.1em', color: 'var(--muted-2)', textTransform: 'uppercase' }}>
              Without PPF
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '10px' }}>New Car</div>
            <ul style={{ marginTop: '16px', paddingLeft: '18px', color: 'var(--muted)', lineHeight: 2.1, fontSize: '15px' }}>
              <li>→ Stone Chip</li>
              <li>→ Scratch</li>
              <li>→ Repaint</li>
              <li>→ Original Paint Changed</li>
            </ul>
          </div>
          <div style={{ border: `1px solid ${ACCENT}`, borderRadius: '16px', padding: '28px', background: 'rgba(237,22,81,.04)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.1em', color: ACCENT, textTransform: 'uppercase' }}>
              With PPF
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '10px' }}>New Car</div>
            <ul style={{ marginTop: '16px', paddingLeft: '18px', color: 'var(--ink)', lineHeight: 2.1, fontSize: '15px' }}>
              <li>→ Protected</li>
              <li>→ Original Paint Preserved</li>
              <li>→ Better Appearance</li>
              <li>→ Peace of Mind</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ================= 5 + 6. PRIVILEGE + FORM ================= */}
      <Section alt style={{ scrollMarginTop: '80px' }}>
        <div id="klaim" style={{ scrollMarginTop: '90px' }} />
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <div className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>
            Choose Your Complimentary Protection
          </div>
          <div className="sec-sub" style={{ marginTop: '10px' }}>
            Tersedia khusus untuk customer yang melakukan registrasi selama periode program
          </div>
        </div>

        <GiiasForm />
      </Section>

      {/* ================= 8. WHY GINNVA ================= */}
      <Section>
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <div className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>Why GINNVA</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {WHY_GINNVA.map((w) => (
            <div key={w.title} style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)' }}>{w.title}</div>
              <div style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '8px', lineHeight: 1.7 }}>{w.text}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================= 9. SONAX TRUST BUILDER ================= */}
      <Section alt>
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '10px 0',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.14em', color: ACCENT, textTransform: 'uppercase' }}>
            Premium Preparation Matters
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '15.5px', lineHeight: 1.9, marginTop: '14px' }}>
            Sebelum proses pemasangan PPF, kondisi permukaan kendaraan dipersiapkan menggunakan proses detailing
            profesional dengan <b>SONAX</b>.
          </p>
        </div>
      </Section>

      {/* ================= 11. VISIT GINNVA HOUSE ================= */}
      <Section>
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <div className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>
            Experience GINNVA Before You Decide.
          </div>
          <div className="sec-sub" style={{ marginTop: '10px' }}>
            Lihat langsung bagaimana PPF bekerja, konsultasikan kebutuhan perlindungan kendaraan Anda,
            dan lihat proses instalasi di GINNVA House.
          </div>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>GINNVA House — PIK 2</h3>
            <div className="row"><b>Alamat</b><span>Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2, Kosambi, Selembaran, Tangerang, Banten 15210</span></div>
            <div className="row"><b>Telepon</b><span>+62 811-8681-678</span></div>
            <div style={{ marginTop: '24px' }}>
              <a
                href="https://wa.me/6281186816785?text=Halo%20Ginnva%2C%20saya%20mau%20booking%20konsultasi%20GIIAS%20New%20Car%20Protection%20Privilege"
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill--accent"
                style={{ fontSize: '14px' }}
              >
                BOOK A FREE CONSULTATION
              </a>
            </div>
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

      {/* ================= 12. FAQ ================= */}
      <Section alt>
        <div className="sec-title-box" style={{ display: 'block', textAlign: 'center' }}>
          <div className="sec-title sec-title--no-bar" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>Pertanyaan Umum</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '760px', margin: '0 auto' }}>
          {FAQS.map((f) => (
            <details
              key={f.q}
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '16px 20px',
              }}
            >
              <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '15px', color: 'var(--ink)' }}>
                {f.q}
              </summary>
              <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '14.5px', lineHeight: 1.8 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ================= 13. FINAL CTA ================= */}
      <section
        style={{
          padding: '90px 20px',
          textAlign: 'center',
          color: '#fff',
          background: 'linear-gradient(160deg, #14151a 0%, #1f1420 55%, #3a0f22 100%)',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.3 }}>
            YOUR NEW CAR DESERVES PROTECTION FROM DAY ONE.
          </h2>
          <p style={{ color: 'rgba(255,255,255,.75)', marginTop: '14px', fontSize: '15px' }}>
            GIIAS New Car Protection Privilege — FREE Interior PPF and FREE Sunroof Window Film or FREE Panoramic Window Film
          </p>
          <a
            href="#klaim"
            className="pill pill--accent"
            style={{ marginTop: '30px', fontSize: '15px', fontWeight: 700 }}
          >
            CLAIM YOUR PRIVILEGE
          </a>
          <div style={{ marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,.55)' }}>
            GINNVA House — PIK 2
          </div>
        </div>
      </section>
    </main>
  );
}