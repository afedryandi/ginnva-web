import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function KacaFilmIntro() {
  return (
    <section className="psec">
      <div className="wrap">
        <div className="pd-intro">
          <div className="pic">
            <Image 
              src="/image/product/car-window-film.webp" 
              alt="Ginnva Premium Car Window Film" 
              width={600} 
              height={400}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              priority
            />
          </div>
          <div>
            <div className="name">Ginnva Premium Car Window Film</div>
            <div className="sub">HIGH-PERFORMANCE CAR WINDOW FILM</div>
            <p className="txt">
              Diproduksi menggunakan teknologi pelapisan magnetron sputtering multi-layer tingkat lanjut. 
              Kaca film Ginnva memberikan penolakan panas (Heat Rejection) infra merah yang ekstrem, 
              perlindungan blokade sinar UV hingga 99%, serta menjaga visibilitas berkendara tetap jernih tanpa mengganggu sinyal GPS maupun seluler.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/quote.html" className="pill pill--accent">
                Dapatkan Quotation Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}