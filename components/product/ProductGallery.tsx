import React from 'react';
import Image from 'next/image';

interface FaqItem {
  q: string;
  a: string;
}

interface GalleryProps {
  images: string[];
  faqs: FaqItem[];
}

export default function ProductGallery({ images, faqs }: GalleryProps) {
  return (
    <>
      <section className="psec">
        <div className="wrap">
          <div className="head">
            <div className="t">Galeri Hasil Pasang</div>
            <div className="e">Installation Gallery</div>
          </div>
          <div className="pd-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '24px' }}>
            {images.map((src, idx) => (
              <div key={idx} className="pic" style={{ overflow: 'hidden', borderRadius: '4px' }}>
                <Image 
                  src={src} 
                  alt={`Hasil Pasang Case ${idx + 1}`} 
                  width={400} 
                  height={280} 
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="psec psec--alt">
        <div className="wrap">
          <div className="head">
            <div className="t">Pertanyaan Umum</div>
            <div className="e">Frequently Asked Questions</div>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{faq.q}</h4>
                <p style={{ margin: 0, color: '#666' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}