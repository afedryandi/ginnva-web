'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Pagination from '@/components/shared/Pagination';

const PER_PAGE = 9;

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
  const [page, setPage] = useState(1);

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

        {!loading && !error && cases.length > 0 && (() => {
          const totalPages = Math.ceil(cases.length / PER_PAGE);
          const pageItems = cases.slice((page - 1) * PER_PAGE, page * PER_PAGE);

          return (
        <>
          <div className="case-page-grid">
            {pageItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className="case-page-card"
                onClick={() => setSelected(item)}
              >
                <div className="cpc-pic">
                  <Image
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={idx < 3}
                  />
                </div>
                <div className="cpc-body">
                  <span className="cpc-tag">{item.film_product?.name || 'Ginnva Shield'}</span>
                  <div className="cpc-title">{item.title}</div>
                </div>
                <span className="zoom-hint" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </span>
              </button>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
          );
        })()}
      </div>

      {/* Lightbox — pakai class yang sama dengan galeri di beranda supaya
          pengalaman melihat foto konsisten di seluruh situs. */}
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
          <div className="lightbox-caption">{selected.title}</div>
        </div>
      )}
    </section>
  );
}