'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCountdown, pad } from '@/lib/grandOpening';

// Muncul tiap kali halaman dibuka/di-refresh (TIDAK dicek via
// localStorage/sessionStorage — ini permintaan eksplisit, bukan lupa
// ditambahkan) supaya terus mengingatkan acara yang tinggal beberapa
// hari lagi. Otomatis tidak pernah muncul lagi begitu tanggal acara
// terlewati (started === true), jadi tidak perlu dicabut manual nanti.
export default function GrandOpeningPopup() {
  const { timeLeft, started } = useCountdown();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!started) setOpen(true);
  }, [started]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!open || started) return null;

  return (
    <div className="go-popup-backdrop" onClick={() => setOpen(false)}>
      <div className="go-popup-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="go-popup-close"
          onClick={() => setOpen(false)}
          aria-label="Tutup"
        >
          ✕
        </button>

        {/* Landscape (desktop) & portrait (mobile) di-swap murni via CSS,
            sama seperti GrandOpeningBanner di beranda — lihat .go-banner-*
            di globals.css. */}
        <div className="go-popup-image-wrap">
          <div className="go-banner-desktop">
            <Image
              src="/image/grand-opening-banner-landscape.png"
              alt="Grand Opening Ginnva House — 18 Juli 2026"
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="go-banner-mobile">
            <Image
              src="/image/grand-opening-banner-portrait.png"
              alt="Grand Opening Ginnva House — 18 Juli 2026"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="go-countdown go-popup-countdown">
            <span className="go-countdown-label">Grand Opening dalam</span>
            {timeLeft && (
              <div className="go-countdown-clock">
                <div className="go-countdown-unit">
                  <span className="go-countdown-num">{pad(timeLeft.days)}</span>
                  <span className="go-countdown-unit-label">Hari</span>
                </div>
                <span className="go-countdown-sep">:</span>
                <div className="go-countdown-unit">
                  <span className="go-countdown-num">{pad(timeLeft.hours)}</span>
                  <span className="go-countdown-unit-label">Jam</span>
                </div>
                <span className="go-countdown-sep">:</span>
                <div className="go-countdown-unit">
                  <span className="go-countdown-num">{pad(timeLeft.minutes)}</span>
                  <span className="go-countdown-unit-label">Menit</span>
                </div>
                <span className="go-countdown-sep">:</span>
                <div className="go-countdown-unit">
                  <span className="go-countdown-num">{pad(timeLeft.seconds)}</span>
                  <span className="go-countdown-unit-label">Detik</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}