// components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/config/site';
import MobileDrawer from './MobileDrawer';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/90 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl tracking-wider text-slate-900">
          GINNVA
        </Link>

        {/* Desktop Navigation with Dropdown */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative group py-2">
              <Link
                href={item.href}
                target={item.blank ? '_blank' : undefined}
                rel={item.blank ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                {item.label}
                {item.sub && (
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </Link>

              {/* Dropdown Menu Container */}
              {item.sub && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {item.sub.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button onClick={() => setIsDrawerOpen(true)} className="p-2 text-slate-600 hover:text-slate-900 md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}