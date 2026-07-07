'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BuildingImageProps {
  src: string;
  alt: string;
  label: string; // teks placeholder, mis. "Foto Gedung Ginnva Indonesia"
}

export default function BuildingImage({ src, alt, label }: BuildingImageProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--alt)' }}>
      {!errored && (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
          onError={() => setErrored(true)}
        />
      )}

      {/* Placeholder — tampil kalau foto belum ada atau error */}
      {errored && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #f2f5fa 0%, #e8edf5 100%)',
          color: 'var(--muted-2)', fontSize: '14px', gap: '8px',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span>{label}</span>
          <span style={{ fontSize: '12px', color: '#ccc' }}>(segera diperbarui)</span>
        </div>
      )}
    </div>
  );
}