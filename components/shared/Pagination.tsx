'use client';

import React from 'react';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// Bikin daftar nomor halaman yang ditampilkan, dengan "..." kalau
// jumlah halamannya banyak (mis. 1 2 3 ... 8 9 10).
function getPageNumbers(page: number, totalPages: number): (number | '...')[] {
  const delta = 1;
  const range: (number | '...')[] = [];
  const left = Math.max(2, page - delta);
  const right = Math.min(totalPages - 1, page + delta);

  range.push(1);
  if (left > 2) range.push('...');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < totalPages - 1) range.push('...');
  if (totalPages > 1) range.push(totalPages);

  return range;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  const go = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
    // Scroll ke atas grid supaya user langsung lihat halaman baru,
    // bukan cuma konten berganti di luar layar.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="pagination" aria-label="Navigasi halaman">
      <button
        type="button"
        className="pg-btn pg-arrow"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`dots-${idx}`} className="pg-dots">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={`pg-btn ${p === page ? 'active' : ''}`}
            onClick={() => go(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        className="pg-btn pg-arrow"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Halaman berikutnya"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </nav>
  );
}