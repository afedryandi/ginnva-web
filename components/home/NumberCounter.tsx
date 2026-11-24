'use client';

import React, { useEffect, useRef, useState } from 'react';

interface NumberCounterProps {
  value: number;
  label: string;
  hasPlus?: boolean;
}

const DURATION_MS = 1600;

// Melambat di akhir supaya angka terasa "mendarat", bukan berhenti mendadak.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function NumberCounter({ value, label, hasPlus = false }: NumberCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animasi dengan requestAnimationFrame (mulus mengikuti refresh layar). Bila pengguna meminta kurangi gerakan, langsung tampil angka akhir.
  useEffect(() => {
    if (!isVisible) return;

    let frame = 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      frame = requestAnimationFrame(() => setDisplayValue(value));
      return () => cancelAnimationFrame(frame);
    }

    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setDisplayValue(Math.round(value * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [isVisible, value]);

  return (
    <div ref={counterRef} className="num">
      <div className="v">
        <span className="counter-display" style={{ fontVariantNumeric: 'tabular-nums' }}>{displayValue}</span>
        {hasPlus && <small>+</small>}
      </div>
      <div className="l">{label}</div>
    </div>
  );
}
