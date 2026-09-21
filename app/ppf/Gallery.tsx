'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// Galeri "Kenapa Mereka Percaya Ginnva" — dibuat client component
// terpisah cuma supaya foto bisa diklik untuk diperbesar (lightbox),
// tanpa membuat seluruh page.tsx jadi client component (perlu tetap
// server component untuk export `metadata`).
type GalleryPhoto = { src: string; alt: string; cap: string };

export default function Gallery({ photos, center }: { photos: GalleryPhoto[]; center?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      <div className={styles.galleryScroll} style={center ? { justifyContent: 'center' } : undefined}>
        {photos.map((g, i) => (
          <button
            key={g.cap}
            type="button"
            className={styles.galleryItem}
            onClick={() => setOpenIndex(i)}
            aria-label={`Perbesar foto ${g.cap}`}
            style={{ cursor: 'zoom-in', border: 'none', padding: 0 }}
          >
            <Image src={g.src} alt={g.alt} fill sizes="230px" style={{ objectFit: 'cover' }} />
            <div className={styles.galleryCap}>{g.cap}</div>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.cap}
          onClick={() => setOpenIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(10,11,16,.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Tutup"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,.12)',
              color: '#fff',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: '100%', maxWidth: '900px', maxHeight: '85vh', aspectRatio: '4/3' }}
          >
            <Image src={active.src} alt={active.alt} fill sizes="900px" style={{ objectFit: 'contain' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '28px', left: 0, right: 0, textAlign: 'center', color: '#fff', fontSize: '14px' }}>
            {active.cap}
          </div>
        </div>
      )}
    </>
  );
}
