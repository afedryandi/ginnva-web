import React from 'react';
import BrandIntro from '@/components/brand/BrandIntro';
import BrandTimeline from '@/components/brand/BrandTimeline';
import BrandStrength from '@/components/brand/BrandStrength';
import BrandHonor from '@/components/brand/BrandHonor';

import type { Metadata } from 'next';
import { seoDefaults } from '@/config/seo';

export const metadata: Metadata = {
  ...seoDefaults,
  title: 'Tentang Ginnva — Brand PPF & Kaca Film Premium',
  description: 'PT. Ginnva Shield Indonesia adalah distributor resmi brand Ginnva di Indonesia. Menghadirkan Paint Protection Film dan Kaca Film Mobil premium berstandar internasional.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Tentang Ginnva — Brand PPF & Kaca Film Premium',
    description: 'PT. Ginnva Shield Indonesia adalah distributor resmi brand Ginnva di Indonesia. Menghadirkan Paint Protection Film dan Kaca Film Mobil premium berstandar internasional.',
    url: 'https://ginnva.id/brand',
  },
  twitter: {
    ...seoDefaults.twitter,
    title: 'Tentang Ginnva — Brand PPF & Kaca Film Premium',
    description: 'PT. Ginnva Shield Indonesia adalah distributor resmi brand Ginnva di Indonesia. Menghadirkan Paint Protection Film dan Kaca Film Mobil premium berstandar internasional.',
  },
};

export default function BrandPage() {
  return (
    <main data-page="brand" data-nav="brand">
      <BrandIntro />
      <BrandTimeline />
      <BrandStrength />
      <BrandHonor />
    </main>
  );
}