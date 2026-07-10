'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Pagination from '@/components/shared/Pagination';

const PER_PAGE = 9;

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  source_url: string | null;
  published_at: string | null;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const FALLBACK_IMAGE = '/image/image-coming-soon.webp';

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function NewsGrid() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    fetch(`${baseUrl}/api/news`, { headers: { Accept: 'application/json' } })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || 'Gagal memuat data berita.');
        }
        if (!cancelled) {
          setNews(json.data as NewsItem[]);
        }
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

  return (
    <section className="psec">
      <div className="wrap">
        {loading && (
          <p style={{ color: 'var(--muted)', fontSize: '14px', padding: '0 4px' }}>
            Memuat berita...
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

        {!loading && !error && news.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: '14px', padding: '0 4px' }}>
            Belum ada berita yang dipublikasikan.
          </p>
        )}

        {!loading && !error && news.length > 0 && (() => {
          // Kalau source_url diisi, berita dianggap "link keluar" —
          // perilaku ini sengaja dipertahankan dari hardcode lama,
          // supaya admin tetap bisa posting berita yang cuma nge-link
          // ke artikel asli (mis. di ginnvafilm.com) tanpa nulis ulang.
          const [hero, ...rest] = news;
          const heroHref = hero.source_url || `/news/${hero.slug}`;
          const heroExternal = Boolean(hero.source_url);
          const totalPages = Math.ceil(rest.length / PER_PAGE);
          const pageItems = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);

          return (
            <>
              {/* Berita terbaru sebagai hero */}
              <a
                className="news-hero"
                href={heroHref}
                target={heroExternal ? '_blank' : undefined}
                rel={heroExternal ? 'noopener noreferrer' : undefined}
              >
                <div className="hero-pic">
                  <Image
                    src={hero.cover_image || FALLBACK_IMAGE}
                    alt={hero.title}
                    width={760}
                    height={450}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    priority
                  />
                </div>
                <div className="hero-body">
                  <div className="hero-kicker">
                    <span className="k-label">Terbaru</span>
                    <span className="k-date">{formatDate(hero.published_at)}</span>
                  </div>
                  <div className="hero-title">{hero.title}</div>
                  {hero.excerpt && <p className="hero-excerpt">{hero.excerpt}</p>}
                  <span className="hero-readmore">
                    Baca selengkapnya
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </a>

              {rest.length > 0 && (
                <>
                  <div className="news-divider">
                    <span className="lbl">Semua Berita</span>
                  </div>

                  <div className="news-grid">
                    {pageItems.map((item, idx) => {
                      const href = item.source_url || `/news/${item.slug}`;
                      const isExternal = Boolean(item.source_url);

                      return (
                        <a
                          key={item.id}
                          className="ncard"
                          href={href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                        >
                          <div className="pic">
                            <Image
                              src={item.cover_image || FALLBACK_IMAGE}
                              alt={item.title}
                              width={400}
                              height={250}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              priority={idx < 3}
                            />
                          </div>
                          <div className="b">
                            <div className="d">{formatDate(item.published_at)}</div>
                            <div className="t">{item.title}</div>
                            {item.excerpt && <p className="ncard-excerpt">{item.excerpt}</p>}
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                </>
              )}
            </>
          );
        })()}
      </div>
    </section>
  );
}