'use client';

import React from 'react';

// Video di-host di server API sendiri (public/video/ di project ginnva-api),
// BUKAN di Cloudflare R2 (r2.dev) — domain r2.dev sering diblokir ISP
// Indonesia karena reputasi domain publik bersama. api.ginnva.id sudah
// terbukti stabil untuk seluruh trafik API, jadi dipakai juga untuk ini.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';

// Sembunyi-visual (bukan display:none, supaya tetap terbaca screen reader
// & crawler) -- pola umum "visually-hidden"/"sr-only".
const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="banner">
      {/* Gap SEO (audit 2026-09-30): hero sebelumnya cuma video, tidak ada
          heading sama sekali -- H1 di sini murni sinyal SEO, konten
          identik dengan metadata.title halaman ini. */}
      <h1 style={visuallyHidden}>Ginnva Shield Indonesia — PPF & Kaca Film Otomotif Premium</h1>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/image/hero-banner.webp"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={`${API_BASE}/video/ginnva-hero.mp4`} type="video/mp4" />
        {/* Fallback: browser yang tidak support video akan tampil poster image */}
      </video>
      <a
        onClick={() => scrollToSection('brand')}
        className="scrolldown"
        aria-label="Gulir ke bawah"
      >
      </a>
    </section>
  );
}