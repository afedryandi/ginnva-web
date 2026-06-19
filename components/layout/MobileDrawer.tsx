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
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`} id="mobileMenu"> {/* .mobile-menu & .open dari styles.css */}
      <div className="mm-top"> {/* .mm-top dari styles.css */}
        <Link href="/" className="brand" onClick={onClose}>
          <img src="image/Asset 2.png" alt="Ginnva" className="logo-main" />
        </Link>
        <button className="mm-close" onClick={onClose} aria-label="Tutup"> {/* .mm-close dari styles.css */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="mm-nav"> {/* .mm-nav dari styles.css */}
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="mm-item"> {/* .mm-item dari styles.css */}
            <Link 
              href={item.href} 
              target={item.blank ? '_blank' : undefined}
              rel={item.blank ? 'noopener noreferrer' : undefined}
              onClick={onClose}
            >
              {item.label}
            </Link>
            {item.sub && (
              <div className="mm-sub"> {/* .mm-sub dari styles.css */}
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

      <div className="mm-footer"> {/* .mm-footer dari styles.css */}
        <a href="tel:400-116-1165" className="mm-hotline"> {/* .mm-hotline dari styles.css */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.67 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {' '}400-116-1165
        </a>
      </div>
    </div>
  );
}