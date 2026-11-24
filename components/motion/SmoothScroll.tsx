'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Smooth scroll (Lenis) hanya untuk perangkat dengan mouse. Di layar sentuh gulir bawaan sudah halus, dan pengguna yang meminta kurangi gerakan
 * tidak disentuh sama sekali. Instance disimpan di window.__lenis supaya tombol gulir (mis. panah di hero) bisa memakainya.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || touch) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
