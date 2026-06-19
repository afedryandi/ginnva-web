// components/layout/MobileDrawer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/config/site';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`} id="mobileMenu">
      <div className="mm-top"> 
        <Link href="/" className="brand" onClick={onClose}>
          <img src="image/ginnva-logo-red.webp" alt="Ginnva" className="logo-main" />
        </Link>
        <button className="mm-close" onClick={onClose} aria-label="Tutup">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="mm-nav">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="mm-item">
            <Link 
              href={item.href} 
              target={item.blank ? '_blank' : undefined}
              rel={item.blank ? 'noopener noreferrer' : undefined}
              onClick={onClose}
            >
              {item.label}
            </Link>
            {item.sub && (
              <div className="mm-sub">
                {item.sub.map((subItem) => (
                  <Link key={subItem.label} href={subItem.href} onClick={onClose}>
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="mm-footer"> 
        <a href="https://wa.me/628118681678" target="_blank" rel="noopener noreferrer" className="mm-hotline">
          <img src="/image/contact/whatsapp.png" alt="WhatsApp" className="mm-hotline-icon" />
          {' '}0811 8681 678
        </a>
      </div>
    </div>
  );
}