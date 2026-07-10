'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CaseStudyItem {
  id: number;
  title: string;
  short_title: string;
  image: string | null;
  vehicle: { id: number; brand: string; model: string } | null;
  film_product: { id: number; name: string; product_type: string } | null;
}

interface Props {
  /** Nilai product_type di tabel film_products: 'window_film' | 'ppf' | 'color_change' */
  productType: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const FALLBACK_IMAGE = '/image/image-coming-soon.webp';

export default function ProductGalleryDynamic({ productType }: Props) {
  const [cases, setCases] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<CaseStudyItem | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${baseUrl}/api/case-studies?product_type=${encodeURIComponent(productType)}`, {
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || 'Gagal memuat galeri.');
        }
        if (!cancelled) setCases(json.data as CaseStudyItem[]);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || 'Terjadi kesalahan koneksi ke server.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [productType]);

  // Tutup lightbox dengan Escape
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
        <div className="head">
          <div className="t">Galeri Hasil Pasang</div>
          <div className="e">Installation Gallery</div>
        </div>

        {loading && (
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '24px' }}>
            Memuat galeri...
          </p>
        )}

        {error && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#fff0f0',
            border: '1px solid rgba(229,62,62,.3)',
            borderRadius: '8px',
            color: '#c53030',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        {!loading && !error && cases.length === 0 && (
          <div style={{
            marginTop: '24px',
            padding: '40px 24px',
            border: '1.5px dashed var(--line, #e6e6e6)',
            borderRadius: '8px',
            textAlign: 'center',
            background: 'var(--alt, #f2f5fa)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
            <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--ink, #333)' }}>
              Segera Hadir
            </div>
            <div style={{ fontSize: '14px', color: 'var(--muted, #666)', marginTop: '4px' }}>
              Foto hasil pemasangan sedang disiapkan oleh tim kami.
            </div>
          </div>
        )}

        {!loading && !error && cases.length > 0 && (
          <div className="pd-gallery">
            {cases.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className="pd-shot"
                onClick={() => setSelected(item)}
              >
                <Image
                  src={item.image || FALLBACK_IMAGE}
                  alt={item.short_title}
                  fill
                  style={{ objectFit: 'cover' }}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                />
                {(item.vehicle || item.film_product) && (
                  <div className="pd-shot-caption">
                    {[
                      item.vehicle ? `${item.vehicle.brand} ${item.vehicle.model}` : null,
                      item.film_product?.name,
                    ].filter(Boolean).join(' · ')}
                  </div>
                )}
                <span className="zoom-hint" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox — pakai class yang sama dengan galeri di halaman lain
          supaya pengalaman melihat foto konsisten di seluruh situs. */}
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Tutup">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selected.image || FALLBACK_IMAGE}
              alt={selected.title}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="lightbox-caption">
            {selected.title}
            {(selected.vehicle || selected.film_product) && (
              <span className="lightbox-caption-sub">
                {[
                  selected.vehicle ? `${selected.vehicle.brand} ${selected.vehicle.model}` : null,
                  selected.film_product?.name,
                ].filter(Boolean).join(' · ')}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}