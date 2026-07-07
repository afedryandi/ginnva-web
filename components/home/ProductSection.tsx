'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GINNVA_PRODUCTS } from '@/config/site';

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [showTabs, setShowTabs] = useState(false);
  const productRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 720;
    const observer = new IntersectionObserver(
      ([entry]) => setShowTabs(entry.isIntersecting),
      { threshold: isMobile ? 0.1 : 0.3 }
    );
    if (productRef.current) observer.observe(productRef.current);
    return () => observer.disconnect();
  }, []);

  const prod = GINNVA_PRODUCTS[activeTab];

  return (
    <>
      {/* FLOATING TABS */}
      <div className={`tabs-floating ${showTabs ? 'visible' : ''}`}>
        {GINNVA_PRODUCTS.map((p, idx) => (
          <button
            key={idx}
            className={`tab ${activeTab === idx ? 'active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* PRODUCT DISPLAY */}
      <section className="product" id="product" ref={productRef}>
        <div className="pic">
          <Image
            src={prod.img}
            alt={prod.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="wrap">
          <div className="con">
            {/* counter */}
            <div className="prod-counter">
              {String(activeTab + 1).padStart(2, '0')}
              <span className="prod-counter-sep"> / </span>
              {String(GINNVA_PRODUCTS.length).padStart(2, '0')}
            </div>

            <div className="name">{prod.name}</div>
            <div className="subName">{prod.sub}</div>
            <p className="text">{prod.long}</p>

            <div className="prod-actions">
              <Link href={`/product/${prod.slug}`} className="more">
                <span>SELENGKAPNYA</span>
                <span className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>

              {/* dot nav */}
              <div className="prod-dots">
                {GINNVA_PRODUCTS.map((_, idx) => (
                  <button
                    key={idx}
                    className={`prod-dot ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                    aria-label={GINNVA_PRODUCTS[idx].name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}