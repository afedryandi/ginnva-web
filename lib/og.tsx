import { ImageResponse } from 'next/og';

// Helper generator OG image dinamis — dipakai oleh tiap opengraph-image.tsx
// per route segment, supaya link yang di-share (WhatsApp, LinkedIn, dst)
// menampilkan judul halaman yang relevan, bukan satu gambar generik yang
// sama untuk semua halaman.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

export function buildOgImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b0b16 0%, #1a1332 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: '#ed1651',
            }}
          />
          <div style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Ginnva
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: '960px',
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: 'flex',
              marginTop: '24px',
              fontSize: '28px',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '900px',
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    ),
    { ...ogSize }
  );
}