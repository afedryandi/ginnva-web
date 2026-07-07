'use client';

import React from 'react';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="banner">
      {/* Video background — ganti src ke path video setelah file tersedia */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/image/hero-banner.webp"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="/video/ginnva-hero.mp4" type="video/mp4" />
        {/* Fallback: browser yang tidak support video akan tampil poster image */}
      </video>
      <div className="cap">
        <div className="en">GINNVA</div>
        <div className="cn">WITH YOU ALL THE WAY</div>
      </div>
      <a
        onClick={() => scrollToSection('brand')}
        className="scrolldown"
        aria-label="Gulir ke bawah"
      >
      </a>
    </section>
  );
}