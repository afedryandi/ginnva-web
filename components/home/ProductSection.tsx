'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GINNVA_PRODUCTS } from '@/config/site';

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [showTabs, setShowTabs] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if mobile on initial render
    const isMobile = window.innerWidth <= 720;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTabs(entry.isIntersecting);
      },
      { threshold: isMobile ? 0.1 : 0.3 }
    );

    if (productRef.current) {
      observer.observe(productRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* FLOATING TABS */}
      <div className={`tabs-floating ${showTabs ? 'visible' : ''}`} id="prodTabs" ref={tabsRef}>
        {GINNVA_PRODUCTS.map((prod, idx) => (
          <button
            key={idx}
            className={`tab ${activeTab === idx ? 'active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {prod.name}
          </button>
        ))}
      </div>

      {/* PRODUCT DISPLAY */}
      <section className="product" id="product" ref={productRef}>
        <div className="pic">
          <Image 
            src={GINNVA_PRODUCTS[activeTab].img} 
            alt={GINNVA_PRODUCTS[activeTab].name}
            width={800}
            height={600}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="wrap">
          <div className="con">
            <div className="name">{GINNVA_PRODUCTS[activeTab].name}</div>
            <div className="subName">{GINNVA_PRODUCTS[activeTab].sub}</div>
            <Image 
              className="logoImg" 
              src="/image/ginnva-logo-red.webp" 
              alt="Ginnva" 
              width={150}
              height={40}
            />
            <p className="text">{GINNVA_PRODUCTS[activeTab].text}</p>
            <Link href={`/product?id=${GINNVA_PRODUCTS[activeTab].id}`} className="more">
              <span>SELENGKAPNYA</span>
              <span className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}