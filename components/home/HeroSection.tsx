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
      <img 
        src="/image/hero-banner.webp" 
        alt="Ginnva Banner" 
        className="banner-img"
      />
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
