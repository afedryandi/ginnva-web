'use client';

import { useEffect, useState } from 'react';

// Grand Opening Ginnva House — 18 Juli 2026, 09.00 WIB. WIB = UTC+7, jadi
// offset ditulis eksplisit di string ISO supaya tidak tergantung timezone
// server/browser yang menjalankan kode ini. Dipakai bareng oleh
// GrandOpeningBanner (section di beranda) dan GrandOpeningPopup (modal
// saat halaman dibuka) — SATU sumber tanggal, tidak didefinisikan ulang.
export const GRAND_OPENING_EVENT_DATE = new Date('2026-07-18T09:00:00+07:00');

export interface CountdownTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): CountdownTimeLeft | null {
  const diff = GRAND_OPENING_EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * Hitung mundur live ke GRAND_OPENING_EVENT_DATE, update tiap detik.
 * `null` dulu saat render pertama (server & client harus sama persis
 * untuk hindari hydration mismatch), dihitung sungguhan di useEffect
 * yang cuma jalan di browser. `started` jadi true begitu tanggal acara
 * terlewati (dipakai buat sembunyikan komponen atau ganti pesan).
 */
export function useCountdown(): { timeLeft: CountdownTimeLeft | null; started: boolean } {
  const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const tick = () => {
      const t = getTimeLeft();
      if (t) {
        setTimeLeft(t);
      } else {
        setStarted(true);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return { timeLeft, started };
}

export function pad(n: number): string {
  return n.toString().padStart(2, '0');
}