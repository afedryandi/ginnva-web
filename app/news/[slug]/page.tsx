import React from 'react';
import { Metadata } from 'next';
import { seoDefaults, SITE_URL } from '@/config/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NewsDetailBanner from '@/components/news/NewsDetailBanner';
import NewsDetailContent from '@/components/news/NewsDetailContent';

interface NewsDetail {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  source_url: string | null;
  published_at: string | null;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Next.js 16: params adalah Promise, bukan object langsung (beda dari
// Next 14 ke bawah) — wajib di-await sebelum dipakai.
interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getNews(slug: string): Promise<NewsDetail | null> {
  try {
    const res = await fetch(`${baseUrl}/api/news/${slug}`, {
      headers: { Accept: 'application/json' },
      // Data berita tidak perlu realtime per detik — revalidate tiap 60
      // detik supaya tidak membebani API tapi tetap cukup segar.
      next: { revalidate: 60 },
    });

    if (res.status === 404) {
      return null;
    }

    const json = await res.json();

    if (!res.ok || !json.success) {
      return null;
    }

    return json.data as NewsDetail;
  } catch {
    // Kegagalan koneksi ke API juga diperlakukan sebagai "tidak
    // ditemukan" di level render — bukan dilempar sebagai error 500,
    // supaya pengalaman pengguna tetap berupa halaman 404 yang wajar.
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNews(slug);

  if (!news) {
    return { title: 'Berita Tidak Ditemukan | Ginnva Shield Indonesia' };
  }

  const url = `${SITE_URL}/news/${slug}`;
  const image = news.cover_image || undefined;
  const description = news.excerpt || news.title;

  return {
    ...seoDefaults,
    title: news.title,
    description,
    openGraph: {
      ...seoDefaults.openGraph,
      type: 'article',
      title: news.title,
      description,
      url,
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: news.title }] }),
      ...(news.published_at && { publishedTime: news.published_at }),
    },
    twitter: {
      ...seoDefaults.twitter,
      title: news.title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  // Berita yang dibuat sebagai "link keluar" (source_url diisi di
  // Filament) seharusnya tidak punya halaman detail sendiri yang bisa
  // diakses langsung — NewsGrid.tsx sudah mengarahkan kartunya langsung
  // ke source_url, tapi kalau slug ini diakses manual, redirect saja
  // demi konsistensi alih-alih menampilkan halaman kosong.
  if (news.source_url) {
    const { redirect } = await import('next/navigation');
    redirect(news.source_url);
  }

  return (
    <main data-page="news-detail" data-nav="brand">
      <NewsDetailBanner title={news.title} coverImage={news.cover_image} />

      <div className="crumb-bar">
        <div className="wrap">
          <Link href="/news">Berita</Link>
          <span className="sep">/</span>
          <span>{news.title}</span>
        </div>
      </div>

      <NewsDetailContent
        title={news.title}
        publishedAt={news.published_at}
        coverImage={news.cover_image}
        excerpt={news.excerpt}
        content={news.content}
      />
    </main>
  );
}