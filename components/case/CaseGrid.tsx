'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CaseStudyItem {
  id: number;
  title: string;
  short_title: string;
  image: string | null;
  film_product: { id: number; name: string } | null;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const FALLBACK_IMAGE = '/image/image-coming-soon.webp';

export default function CaseGrid() {
  const [cases, setCases] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<CaseStudyItem | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${baseUrl}/api/case-studies`, { headers: { Accept: 'application/json' } })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || 'Gagal memuat data galeri.');
        }
        if (!cancelled) setCases(json.data as CaseStudyItem[]);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || 'Terjadi kesalahan koneksi ke server.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Tutup lightbox dengan tombol Escape, supaya konsisten dengan
  // ekspektasi pengguna pada modal/lightbox umumnya.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="psec">
      <div className="wrap">
        {loading && (
          <p style={{ color: 'var(--muted)', fontSize: '14px', padding: '0 4px' }}>
            Memuat galeri...
          </p>
        )}

        {error && (
          <div
            className="book-ok show"
            style={{
              display: 'block',
              background: '#fff0f0',
              borderColor: 'rgba(229,62,62,.3)',
              color: '#c53030',
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && cases.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: '14px', padding: '0 4px' }}>
            Belum ada galeri pemasangan yang ditambahkan.
          </p>
        )}

        {!loading && !error && cases.length > 0 && (
          <div className="news-grid">
            {cases.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className="ncard"
                onClick={() => setSelected(item)}
                style={{ cursor: 'zoom-in', textAlign: 'left', border: 'none', padding: 0, font: 'inherit' }}
              >
                <div className="pic">
                  <Image
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.title}
                    width={400}
                    height={250}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    priority={idx < 3}
                  />
                </div>
                <div className="b">
                  <div className="d">{item.film_product?.name || 'Ginnva Shield'}</div>
                  <div className="t">{item.title}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox sederhana — overlay fullscreen, klik di luar gambar
          atau tombol close untuk menutup. Tidak memakai library eksternal,
          konsisten dengan pola state lokal yang sudah dipakai di project ini
          (mis. activeCase di home page). */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            zIndex: 1000,
          }}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Tutup"
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '32px',
              lineHeight: 1,
              cursor: 'pointer',
            }}
          >
            &times;
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '80vh', textAlign: 'center' }}
          >
            <Image
              src={selected.image || FALLBACK_IMAGE}
              alt={selected.title}
              width={1000}
              height={650}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
            <div style={{ color: '#fff', marginTop: '16px', fontSize: '16px' }}>
              {selected.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}