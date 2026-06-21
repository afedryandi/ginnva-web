import React from 'react';
import BrandIntro from '@/components/brand/BrandIntro';
import BrandTimeline from '@/components/brand/BrandTimeline';
import BrandStrength from '@/components/brand/BrandStrength';
import BrandHonor from '@/components/brand/BrandHonor';

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