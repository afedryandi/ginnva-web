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
          <div
            className="pd-gallery"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            {cases.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className="pic"
                onClick={() => setSelected(item)}
                style={{
                  overflow: 'hidden',
                  borderRadius: '4px',
                  cursor: 'zoom-in',
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                  textAlign: 'left',
                  display: 'block',
                }}
              >
                <Image
                  src={item.image || FALLBACK_IMAGE}
                  alt={item.short_title}
                  width={400}
                  height={280}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                />
                {(item.vehicle || item.film_product) && (
                  <div style={{
                    padding: '8px 4px 4px',
                    fontSize: '13px',
                    color: 'var(--muted, #666)',
                  }}>
                    {[
                      item.vehicle ? `${item.vehicle.brand} ${item.vehicle.model}` : null,
                      item.film_product?.name,
                    ].filter(Boolean).join(' · ')}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
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
            {(selected.vehicle || selected.film_product) && (
              <div style={{ color: 'rgba(255,255,255,.6)', marginTop: '4px', fontSize: '14px' }}>
                {[
                  selected.vehicle ? `${selected.vehicle.brand} ${selected.vehicle.model}` : null,
                  selected.film_product?.name,
                ].filter(Boolean).join(' · ')}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}