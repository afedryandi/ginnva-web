import React from 'react';
import ContactBanner from '@/components/contact/ContactBanner';
import ContactContent from '@/components/contact/ContactContent';

import type { Metadata } from 'next';
import { seoDefaults } from '@/config/seo';

export const metadata: Metadata = {
  ...seoDefaults,
  title: 'Hubungi Kami — Ginnva Shield Indonesia',
  description: 'Hubungi tim Ginnva Shield Indonesia untuk pertanyaan produk, garansi, atau kemitraan dealer. Kami siap membantu.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Hubungi Kami — Ginnva Shield Indonesia',
    description: 'Hubungi tim Ginnva Shield Indonesia untuk pertanyaan produk, garansi, atau kemitraan dealer. Kami siap membantu.',
    url: 'https://ginnva.id/contact',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Hubungi Kami — Ginnva Shield Indonesia',
    description: 'Hubungi tim Ginnva Shield Indonesia untuk pertanyaan produk, garansi, atau kemitraan dealer. Kami siap membantu.',
  },
};

export default function ContactPage() {
  return (
    <main data-page="contact" data-nav="brand">
      <ContactBanner />
      <ContactContent />
    </main>
  );
}