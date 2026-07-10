'use client';

import React from 'react';

// Video di-host di server API sendiri (public/video/ di project ginnva-api),
// BUKAN di Cloudflare R2 (r2.dev) — domain r2.dev sering diblokir ISP
// Indonesia karena reputasi domain publik bersama. api.ginnva.id sudah
// terbukti stabil untuk seluruh trafik API, jadi dipakai juga untuk ini.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="banner">
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