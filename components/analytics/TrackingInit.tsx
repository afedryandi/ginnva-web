'use client';

import { useEffect } from 'react';
import { captureAttribution, trackEvent } from '@/lib/tracking';

// Dipasang sekali di layout (Marketing/Konten Fase 0, 2026-10-22):
//  1. menyimpan sumber kunjungan (UTM, click id iklan, perujuk) untuk dikirim bersama formulir lead;
//  2. menghitung klik tautan WhatsApp sebagai event `whatsapp_click` di GA4 (tautan WhatsApp tersebar di banyak halaman kampanye,
//     jadi satu pendengar klik di tingkat dokumen menggantikan pemasangan per tombol).
export default function TrackingInit() {
  useEffect(() => {
    captureAttribution();

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      if (!/(^|\/\/)(api\.whatsapp\.com\/send|wa\.me\/|web\.whatsapp\.com)/i.test(href)) return;

      trackEvent('whatsapp_click', {
        page_path: window.location.pathname,
        link_text: (anchor.textContent ?? '').trim().slice(0, 60) || undefined,
      });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
