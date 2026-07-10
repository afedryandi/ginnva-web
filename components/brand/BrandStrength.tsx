import React from 'react';

export default function BrandStrength() {
  return (
    <>
      {/* ===================== KEKUATAN R&D ===================== */}
      <section className="psec">
        <div className="wrap">
          <div className="head">
            <div className="t">Kekuatan Riset &amp; Pengembangan</div>
            <div className="e">Research and Development Strength</div>
            <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--muted-2)', letterSpacing: '.04em' }}>
              🇨🇳 Data berikut merupakan informasi dari Ginnva China
            </div>
          </div>
          <p className="lead">
            Ginnva memiliki kapabilitas dibagian Riset dan Pengembangan (Research & Development) yang tangguh, dengan keahlian teknis mendalam yang dibangun melalui kolaborasi industri, akademik, dan penelitian selama bertahun-tahun.
            <br /><br />
            Teknologi inti kami mencakup: desain struktur spasial polimer, desain struktur silang, teknologi polimerisasi multi-komponen, teknologi biodegradasi, dan teknologi pelapisan presisi.
          </p>
          <div className="stat-row">
            <div className="it"><div className="v">100<small>+</small></div><div className="l">Paten Penemuan</div></div>
            <div className="it"><div className="v">4</div><div className="l">Tim Riset & Pengembangan</div></div>
            <div className="it"><div className="v">5</div><div className="l">Teknologi Inti</div></div>
            <div className="it"><div className="v">120<small>+</small></div><div className="l">Personel Riset & Pengembangan</div></div>
          </div>
        </div>
      </section>

      {/* ===================== KEKUATAN MANUFAKTUR CERDAS ===================== */}
      <section className="psec psec--alt">
        <div className="wrap">
          <div className="head">
            <div className="t">Kekuatan Manufaktur Cerdas</div>
            <div className="e">Intelligent Strength</div>
            <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--muted-2)', letterSpacing: '.04em' }}>
              🇨🇳 Data berikut merupakan informasi dari Ginnva China
            </div>
          </div>
          <p className="lead">
            Ginnva memiliki 4 basis produksi yang tersebar di Suzhou, Quzhou, Chuzhou, dan Neijiang. Fasilitas produksi ini dilengkapi dengan robot dan teknologi kecerdasan buatan untuk inspeksi kualitas, logistik, dan perakitan. Menjadikan Ginnva sebagai salah satu produsen material perekat fungsional dengan infrastruktur manufaktur paling modern di industri. Kapasitas produksi mencakup 600 juta m² perekat industri, 170 juta m² perekat elektronik, 150 juta m² perekat optik, dan 50.000 ton perekat.
          </p>
          <div className="stat-row">
            <div className="it"><div className="v">4</div><div className="l">Basis Produksi</div></div>
            <div className="it"><div className="v">600<small> juta m²</small></div><div className="l">Kapasitas Perekat Industri</div></div>
            <div className="it"><div className="v">350<small>+</small></div><div className="l">Instrumen Pengujian</div></div>
            <div className="it"><div className="v">100<small>+</small></div><div className="l">Pengendalian Kualitas</div></div>
          </div>
        </div>
      </section>
    </>
  );
}