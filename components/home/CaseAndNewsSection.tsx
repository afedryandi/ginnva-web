'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CaseStudyItem {
  id: number;
  title: string;
  short_title: string;
  image: string | null;
}

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
export default function CaseAndNewsSection() {
  const [cases, setCases] = useState<CaseStudyItem[]>([]);
  const [activeCaseId, setActiveCaseId] = useState<number | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Tutup lightbox dengan tombol Escape
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  // Galeri pemasangan — diurutkan sesuai sort_order yang diatur admin
  // lewat drag-reorder di Filament (CaseStudyResource).
  useEffect(() => {
    let cancelled = false;

    fetch(`${baseUrl}/api/case-studies`, { headers: { Accept: 'application/json' } })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok && json.success && !cancelled) {
          const items = json.data as CaseStudyItem[];
          setCases(items);
          if (items.length > 0) setActiveCaseId(items[0].id);
        }
      })
      .catch(() => {
        // Dibiarkan kosong kalau API gagal — tidak fallback ke data
        // dummy lagi, sama seperti pola yang sudah dipakai untuk News.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Hanya butuh 5 berita terbaru: 1 jadi sorotan besar (.media), 4
  // sisanya jadi list ringkas di sampingnya — sesuai layout yang sudah
  // ada di CSS (.news .media + .news .list).
  useEffect(() => {
    let cancelled = false;

    fetch(`${baseUrl}/api/news?limit=5`, { headers: { Accept: 'application/json' } })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok && json.success && !cancelled) {
          setNews(json.data as NewsItem[]);
        }
      })
      .catch(() => {
        // Sama seperti di atas — sengaja dibiarkan kosong, bukan dummy.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const [featuredNews, ...restNews] = news;

  return (
    <>
      {/* ===================== GALERI PEMASANGAN ===================== */}
      <section className="case" id="case">
        <div className="wrap">
          <div className="sec-title-box">
            <div>
              <div className="sec-title">Galeri Pemasangan</div>
              <div className="sec-sub">Case Show</div>
            </div>
            <Link href="/case" className="pill pill--outline">
              Selengkapnya
            </Link>
          </div>

          {cases.length === 0 ? (
            <div className="coming-soon-box">
              <div className="coming-soon-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </div>
              <div className="coming-soon-title">Galeri Segera Hadir</div>
              <p className="coming-soon-text">Kami sedang mengumpulkan dokumentasi hasil pemasangan terbaik. Pantau terus halaman ini.</p>
            </div>
          ) : (
            <div className="case-main">
              <div className="bigPic" onClick={() => setLightboxOpen(true)}>
                <Image
                  src={activeCase.image || FALLBACK_IMAGE}
                  alt={activeCase.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="nameBox"><h3>{activeCase.title}</h3></div>
                <span className="zoom-hint" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </span>
              </div>
              <div className="thumbs">
                {cases.map((item) => (
                  <div
                    key={item.id}
                    className={`thumb ${activeCase.id === item.id ? 'active' : ''}`}
                    onClick={() => setActiveCaseId(item.id)}
                  >
                    <div className="thumb-pic">
                      <Image
                        src={item.image || FALLBACK_IMAGE}
                        alt={item.short_title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="thumb-label">{item.short_title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================== BERITA ===================== */}
      <section className="news" id="news">
        <div className="wrap">
          <div className="sec-title-box">
            <div>
              <div className="sec-title">Berita Terbaru</div>
              <div className="sec-sub">News</div>
            </div>
            <Link href="/news" className="pill pill--outline">Selengkapnya</Link>
          </div>

          {news.length === 0 ? (
            <div className="coming-soon-box">
              <div className="coming-soon-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16v2.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z"/><rect x="4" y="10" width="16" height="10" rx="2"/>
                  <line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="17" x2="13" y2="17"/>
                </svg>
              </div>
              <div className="coming-soon-title">Berita Segera Hadir</div>
              <p className="coming-soon-text">Kami akan segera membagikan berita dan informasi terbaru seputar Ginnva Shield Indonesia.</p>
            </div>
          ) : (
            <div className="news-con">
              {featuredNews && (
                <Link
                  href={featuredNews.source_url || `/news/${featuredNews.slug}`}
                  className="media"
                  target={featuredNews.source_url ? '_blank' : undefined}
                  rel={featuredNews.source_url ? 'noopener noreferrer' : undefined}
                >
                  <div className="pic">
                    <Image
                      src={featuredNews.cover_image || FALLBACK_IMAGE}
                      alt={featuredNews.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="media-body">
                    <div className="news-kicker">
                      <span className="k-label">Sorotan</span>
                      <span className="k-date">{formatDate(featuredNews.published_at)}</span>
                    </div>
                    <div className="nm">{featuredNews.title}</div>
                    {featuredNews.excerpt && <p className="news-excerpt">{featuredNews.excerpt}</p>}
                    <span className="news-readmore">
                      Baca selengkapnya
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )}

              <div className="list">
                {restNews.map((item) => (
                  <Link
                    key={item.id}
                    href={item.source_url || `/news/${item.slug}`}
                    className="news-card"
                    target={item.source_url ? '_blank' : undefined}
                    rel={item.source_url ? 'noopener noreferrer' : undefined}
                  >
                    <div className="card-pic">
                      <Image
                        src={item.cover_image || FALLBACK_IMAGE}
                        alt={item.title}
                        width={320}
                        height={200}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="card-date">{formatDate(item.published_at)}</div>
                    <div className="nm">{item.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================== LIGHTBOX FOTO GALERI ===================== */}
      {lightboxOpen && activeCase && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <button
            className="lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Tutup"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <Image
              src={activeCase.image || FALLBACK_IMAGE}
              alt={activeCase.title}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="lightbox-caption">{activeCase.title}</div>
        </div>
      )}
    </>
  );
}