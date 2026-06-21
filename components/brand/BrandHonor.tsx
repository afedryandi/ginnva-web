import React from 'react';
import Image from 'next/image';

// Data Array untuk Penghargaan (Honor Grid)
const HONOR_IMAGES = [
  '/image/certification/certification-1.webp',
  '/image/certification/certification-2.webp',
  '/image/certification/certification-3.webp',
  '/image/certification/certification-4.webp',
  '/image/certification/certification-5.webp',
  '/image/certification/certification-6.webp',
  '/image/certification/certification-7.webp',
  '/image/certification/certification-8.webp',
  '/image/certification/certification-9.webp',
  '/image/certification/certification-10.webp',
  '/image/certification/certification-11.webp',
  '/image/certification/certification-12.webp',
];

export default function BrandHonor() {
  return (
    <>
      {/* ===================== MITRA UTAMA ===================== */}
            <section className="psec">
              <div className="wrap">
                <div className="head">
                  <div className="t">Mitra Utama</div>
                  <div className="e">Key Partners</div>
                </div>
                <div className="partners-img-wrapper">
                  <Image 
                    className="partners-img" 
                    src="/image/partners.webp" 
                    alt="Mitra Utama" 
                    width={1200}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </section>
      
            {/* ===================== PENGHARGAAN ===================== */}
            <section className="psec psec--alt">
              <div className="wrap">
                <div className="head">
                  <div className="t">Penghargaan Perusahaan</div>
                  <div className="e">Enterprise Honor</div>
                </div>
                <div className="honor-grid">
                  {HONOR_IMAGES.map((url, idx) => (
                    <div className="h" key={idx}>
                      <Image 
                        src={url} 
                        alt={`Penghargaan ${idx + 1}`} 
                        width={280} 
                        height={200}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
    </>
  );
}