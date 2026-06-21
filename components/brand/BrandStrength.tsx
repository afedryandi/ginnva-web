import React from 'react';

export default function BrandStrength() {
  return (
    <>
      {/* ===================== KEKUATAN R&D ===================== */}
      <section className="psec">
        <div className="wrap">
          <div className="head">
            <div className="t">Kekuatan R&amp;D</div>
            <div className="e">Research and Development Strength</div>
          </div>
          <p className="lead">
            Ginnva memiliki kapabilitas dibagian Riset dan Pengembangan (Research & Development) yang tangguh, dengan keahlian teknis mendalam yang dibangun melalui kolaborasi industri, akademik, dan penelitian selama bertahun-tahun.
            <br /><br />
            Teknologi inti kami mencakup: desain struktur spasial polimer, desain struktur silang, teknologi polimerisasi multi-komponen, teknologi biodegradasi, dan teknologi pelapisan presisi.
          </p>
          <div className="stat-row">
            <div className="it"><div className="v">100<small>+</small></div><div className="l">Paten Penemuan</div></div>
            <div className="it"><div className="v">4</div><div className="l">Tim R&amp;D</div></div>
            <div className="it"><div className="v">200<small>+</small></div><div className="l">Instrumen Canggih</div></div>
            <div className="it"><div className="v">240<small>+</small></div><div className="l">Personel R&amp;D</div></div>
          </div>
        </div>
      </section>

      {/* ===================== KEKUATAN MANUFAKTUR CERDAS ===================== */}
      <section className="psec psec--alt">
        <div className="wrap">
          <div className="head">
            <div className="t">Kekuatan Manufaktur Cerdas</div>
            <div className="e">Intelligent Strength</div>
          </div>
          <p className="lead">
            4 basis produksi besar dengan kapasitas material perekat 1,35 miliar m², membangun tenaga baru manufaktur &quot;cerdas&quot; kelas atas.
          </p>
          <div className="stat-row">
            <div className="it"><div className="v">2,5<small> M m²</small></div><div className="l">Produk perekat optik</div></div>
            <div className="it"><div className="v">3,0<small> M m²</small></div><div className="l">Produk perekat elektronik</div></div>
            <div className="it"><div className="v">8,0<small> M m²</small></div><div className="l">Produk perekat industri</div></div>
            <div className="it"><div className="v">50<small> rb ton+</small></div><div className="l">Produk perekat (adhesive)</div></div>
          </div>
        </div>
      </section>
    </>
  );
}