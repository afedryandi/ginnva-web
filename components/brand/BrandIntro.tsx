import React from 'react';

export default function BrandIntro() {
  return (
    <>
      {/* ===================== PAGE BANNER ===================== */}
      <section className="page-banner">
        <div 
          className="bg" 
          style={{ backgroundImage: `url('/image/image-coming-soon.webp')` }}
        />
        <div className="inner">
          <h1>Profil Brand</h1>
          <div className="en">Brand Introduction</div>
        </div>
      </section>

      {/* ===================== PROFIL PERUSAHAAN ===================== */}
      <section className="psec">
        <div className="wrap">
          <div className="head">
            <div className="t">Profil Perusahaan</div>
            <div className="e">Enterprise Introduction</div>
          </div>
          <p className="lead">
            <strong>PT. Ginnva Shield Indonesia</strong> merupakan mitra resmi dan perwakilan dari teknologi advanced functional film Ginnva di Indonesia. Kami menghadirkan teknologi perlindungan otomotif kelas dunia dari China ke Indonesia, dengan solusi <strong>Premium Paint Protection Film (PPF)</strong> dan <strong>Kaca Film Mobil</strong> yang dirancang untuk performa, daya tahan, dan estetika.
            <br /><br />
            Dikembangkan dengan material canggih dan inovasi mutakhir, produk kami dirancang untuk menghadapi iklim tropis Indonesia, memberikan penolakan panas yang optimal, perlindungan terhadap sinar UV, serta ketahanan jangka panjang terhadap goresan, noda, dan kerusakan lingkungan. Mulai dari menjaga kesempurnaan cat kendaraan hingga meningkatkan kenyamanan berkendara, kami membantu melindungi hal yang paling berharga pada kendaraan dan pengalaman Anda.
            <br /><br />
            Kami bermitra dengan para profesional otomotif, dealer, dan pemilik kendaraan premium di seluruh Indonesia untuk menghadirkan kualitas yang konsisten dan hasil yang unggul. Didukung oleh proses manufaktur presisi dan standar kualitas yang ketat, solusi kami menggabungkan keahlian internasional dengan pemahaman mendalam terhadap pasar lokal.
            <br /><br />
            Inti dari merek kami adalah komitmen terhadap keunggulan melalui inovasi, keandalan, dan kepuasan pelanggan.
          </p>
          <div className="stat-row">
            <div className="it"><div className="v">4</div><div className="l">Pusat R&amp;D</div></div>
            <div className="it"><div className="v">4</div><div className="l">Basis Produksi</div></div>
            <div className="it"><div className="v">10<small>+</small></div><div className="l">Anak/Cabang Perusahaan</div></div>
            <div className="it"><div className="v">20<small>+</small></div><div className="l">Pusat Layanan</div></div>
          </div>
        </div>
      </section>
    </>
  );
}