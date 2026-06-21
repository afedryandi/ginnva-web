import React from 'react';
import Image from 'next/image';

const GALLERY_IMAGES = [
  '/image/image-coming-soon.webp',
  '/image/image-coming-soon.webp',
  '/image/image-coming-soon.webp',
  '/image/image-coming-soon.webp'
];

export default function KacaFilmGallery() {
  return (
    <>
      {/* GALERI PEMASANGAN */}
      <section className="psec">
        <div className="wrap">
          <div className="head">
            <div className="t">Galeri Hasil Pasang</div>
            <div className="e">Installation Gallery</div>
          </div>
          <div className="pd-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '24px' }}>
            {GALLERY_IMAGES.map((src, idx) => (
              <div key={idx} className="pic" style={{ overflow: 'hidden', borderRadius: '4px' }}>
                <Image 
                  src={src} 
                  alt={`Kaca Film Ginnva Case ${idx + 1}`} 
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

      {/* FAQ SINGKAT */}
      <section className="psec psec--alt">
        <div className="wrap">
          <div className="head">
            <div className="t">Pertanyaan Umum</div>
            <div className="e">Frequently Asked Questions</div>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Apakah kaca film Ginnva mengganggu sinyal GPS?</h4>
              <p style={{ margin: 0, color: '#666' }}>Tidak. Formulasi sputtering material kami tidak memblokir gelombang elektromagnetik, sehingga sinyal HP, e-Toll, dan GPS tetap berfungsi normal.</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Berapa lama masa garansi resmi Ginnva?</h4>
              <p style={{ margin: 0, color: '#666' }}>Setiap pemasangan produk tipe premium mendapatkan perlindungan E-Warranty resmi hingga 5-10 tahun dari risiko gelembung, korosi, maupun perubahan warna.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}