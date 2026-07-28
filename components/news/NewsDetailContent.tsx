import React from 'react';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';

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

// Regex cleanup dulu (buang <p>/<figcaption> yang isinya cuma URL bare, sisa
// artefak dari embed/paste di Filament RichEditor) — DILAKUKAN SEBELUM
// sanitizeHtml() supaya cleanup pattern-nya tidak perlu tahu-menahu soal
// struktur tag yang sudah disaring sanitizer.
function stripBareUrlArtifacts(html: string): string {
  return html
    .replace(/<p[^>]*>\s*https?:\/\/[^\s<"']+\s*<\/p>/gi, '')
    .replace(/<figcaption[^>]*>\s*https?:\/\/[^\s<"']+\s*<\/figcaption>/gi, '')
    .replace(/(<img[^>]*\/?>)\s*https?:\/\/[^\s<"']+/gi, '$1');
}

// Sanitasi XSS SUNGGUHAN — sebelumnya cuma regex cleanup URL (tidak menyaring
// <script>, event handler onerror/onload, javascript: href, dll), padahal
// halaman ini publik dan kontennya di-render lewat dangerouslySetInnerHTML.
// Kompromi akun admin/Filament atau bug CMS tetap bisa terjadi — sanitizer
// ini jadi lapisan pertahanan terakhir sebelum HTML mentah sampai ke browser
// setiap pengunjung.
function sanitizeContent(html: string): string {
  return sanitizeHtml(stripBareUrlArtifacts(html), {
    allowedTags: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'span', 'div',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
      '*': ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      // Cegah reverse tabnabbing (window.opener) pada link yang buka tab baru.
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  });
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
            sanitizeContent() menyaring lewat allowlist tag/atribut
            (sanitize-html) sebelum dirender — halaman ini publik, jadi
            walau sumbernya "cuma" admin internal, kompromi akun admin atau
            bug CMS tetap bisa jadi stored-XSS ke semua pengunjung tanpa
            sanitasi ini. Dibungkus div terpisah (bukan langsung di
            <article>) supaya gaya .article p/h2 tetap konsisten tanpa ikut
            menimpa elemen lain di luar konten.
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