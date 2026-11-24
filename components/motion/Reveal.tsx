'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Elemen muncul perlahan sambil naik sedikit saat masuk layar.
 *
 * Keadaan awal (tersembunyi) HANYA berlaku bila kelas `js-motion` terpasang di <html> (lihat MotionInit di layout), yaitu bila JavaScript jalan dan
 * pengguna tidak meminta kurangi gerakan. Tanpa itu konten langsung tampil penuh, jadi crawler, pembaca layar, dan perangkat tanpa JS tidak
 * pernah melihat halaman kosong. Animasinya sendiri murni CSS (lihat bagian "Gerak" di globals.css); komponen ini hanya menandai kapan elemen
 * terlihat.
 *
 * `as` boleh elemen HTML atau komponen yang meneruskan ref (mis. next/link). `delay` (ms) untuk membuat deretan item muncul berurutan.
 */
type RevealProps = {
  as?: React.ElementType;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: unknown;
};

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.setAttribute('data-in', '');

    if (typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
