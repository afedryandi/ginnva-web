// components/layout/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/config/site';
import MobileDrawer from './MobileDrawer';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Halaman beranda (/) biasanya memiliki hero transparan, halaman lain solid
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60 || !isHomePage) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll(); // Jalankan sekali di awal
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const caretSvg = (
    <svg className="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );

  return (
    <>
      <header className={`header ${isScrolled || !isHomePage ? 'solid' : ''} ${isScrolled ? 'scrolled' : ''}`} id="site-header">
        <div className="wrap bar">
          <Link href="/" className="brand">
          <img 
          src={isScrolled || !isHomePage ? 'image/Asset 2.png' : 'image/Asset 4.png'} 
          alt="Ginnva Logo" className="logo-main" 
          />
          </Link>

          <nav className="nav">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.label} className="item"> 
                  <Link 
                    href={item.href}
                    className={isActive ? 'on' : ''}
                    target={item.blank ? '_blank' : undefined}
                    rel={item.blank ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                    {item.sub && <> {caretSvg}</>}
                  </Link>
                  {item.sub && (
                    <div className="dd">
                      {item.sub.map((subItem) => (
                        <Link key={subItem.label} href={subItem.href}>
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="header-right"> 
            <Link href="../ginnva-web/index.html" title="Sistem Toko">
              <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
            </Link>
            <a className="lang" href="https://en.ginnvafilm.com/" target="_blank" rel="noopener noreferrer">
              EN
            </a>
            <button className="hamburger" onClick={() => setIsDrawerOpen(true)} aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}