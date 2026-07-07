import React from 'react';
import Image from 'next/image';

interface NewsDetailContentProps {
  title: string;
  publishedAt: string | null;
  coverImage: string | null;
  excerpt: string | null;
  content: string | null;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function sanitizeContent(html: string): string {
  return html
    // <p> with only a URL
    .replace(/<p[^>]*>\s*https?:\/\/[^\s<"']+\s*<\/p>/gi, '')
    // <figcaption> with only a URL
    .replace(/<figcaption[^>]*>\s*https?:\/\/[^\s<"']+\s*<\/figcaption>/gi, '')
    // bare URL text node immediately after <img ...>
    .replace(/(<img[^>]*\/?>)\s*https?:\/\/[^\s<"']+/gi, '$1');
}

export default function NewsDetailContent({
  title,
  publishedAt,
  coverImage,
  excerpt,
  content,
}: NewsDetailContentProps) {
  return (
    <section className="psec">
      <div className="wrap">
        <article className="article">
          <h2>{title}</h2>
          <div className="upd">{formatDate(publishedAt)}</div>
          {excerpt && <p className="article-excerpt">{excerpt}</p>}

          {coverImage && (
            <div style={{ margin: '0 0 28px', borderRadius: '14px', overflow: 'hidden' }}>
              <Image
                src={coverImage}
                alt={title}
                width={920}
                height={520}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                priority
              />
            </div>
          )}

          {/*
            content berasal dari Filament RichEditor (HTML), bukan plain
            text/markdown — wajib dirender lewat dangerouslySetInnerHTML.
            Sumber konten ini hanya admin internal (bukan input publik),
            jadi risiko XSS rendah, tapi tetap dibungkus div terpisah
            (bukan langsung di <article>) supaya gaya .article p/h2 tetap
            konsisten tanpa ikut menimpa elemen lain di luar konten.
          */}
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizeContent(content) }} />
          ) : (
            <p>Konten berita ini belum tersedia.</p>
          )}
        </article>
      </div>
    </section>
  );
}