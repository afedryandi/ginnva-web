'use client';

import React from 'react';
import Image from 'next/image';
import { useCountdown, pad } from '@/lib/grandOpening';

export default function GrandOpeningBanner() {
  const { timeLeft, started } = useCountdown();

  return (
    <section className="grand-opening-banner">
      <div className="go-banner-desktop">
        <Image
          src="/image/grand-opening-banner-landscape.png"
          alt="Grand Opening Ginnva House — 18 Juli 2026"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          preload
        />
      </div>
      <div className="go-banner-mobile">
        <Image
          src="/image/grand-opening-banner-portrait.png"
          alt="Grand Opening Ginnva House — 18 Juli 2026"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          preload
        />
      </div>

      {/* Diposisikan di area langit kosong pojok kanan atas — konsisten
          kosong di kedua versi gambar (landscape & portrait), jadi tidak
          menutupi judul, foto toko, maupun kartu tanggal/lokasi. */}
      <div className="go-countdown">
        <span className="go-countdown-label">
          {timeLeft || !started ? 'Grand Opening dalam' : 'Grand Opening telah dimulai!'}
        </span>
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
    </section>
  );
}