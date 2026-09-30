import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <>
      {/* ===================== PROFIL PERUSAHAAN ===================== */}
      <section className="brand-sec on-dark" id="brand">
        <div 
          className="bg" 
          style={{ backgroundImage: `url('/image/building-image.webp')` }}
        />
        <div className="wrap">
          <div className="sec-title">Profil Perusahaan</div>
          <div className="sec-sub">Enterprise Introduction</div>
          <p className="text">
            <strong>PT. Ginnva Shield Indonesia</strong> adalah distributor resmi dan perwakilan eksklusif brand Ginnva di Indonesia. Kami menghadirkan solusi <strong>Paint Protection Film (PPF)</strong> dan <strong>Kaca Film Mobil</strong> premium berstandar internasional yang dirancang khusus untuk menghadapi tantangan iklim tropis Indonesia.
          </p>
          <p className="text">
            Menggabungkan material canggih, manufaktur presisi, dan pemahaman mendalam akan pasar lokal, kami berkomitmen menjaga estetika, kenyamanan, serta nilai investasi kendaraan premium Anda.
          </p>
          {/* Konten SEO (audit 2026-09-30, "butuh 800 kata supaya SEO maksimal") --
              2 paragraf di atas cuma ~60 kata, terlalu tipis untuk halaman paling
              penting di situs ini. Ditambahkan di sini (bukan section baru) supaya
              tetap 1 narasi utuh section "Profil Perusahaan" yang sudah ada. */}
          <p className="text">
            Iklim tropis Indonesia — panas matahari intens sepanjang tahun, kelembapan tinggi, dan paparan debu jalanan — adalah tantangan nyata bagi cat dan kaca kendaraan. Paint Protection Film Ginnva menggunakan TPU (Thermoplastic Polyurethane) generasi ketiga dengan lapisan self-healing: goresan halus akibat kerikil, sikat cuci otomatis, atau ranting pohon dapat pulih sendiri hanya dengan panas matahari atau air hangat, tanpa meninggalkan bekas permanen pada cat orisinal kendaraan. Di sisi kaca, teknologi Bi-silver Sputtering dan Nano-Ceramic kami menolak hingga 61% energi panas matahari dan memblokir 99% sinar UV, menjaga interior tetap sejuk sekaligus melindungi kulit dan material jok dari pemudaran warna — tanpa mengganggu sinyal GPS, radio, maupun e-Toll.
          </p>
          <p className="text">
            Setiap produk Ginnva yang beredar di Indonesia diproduksi oleh Shanghai Smith Adhesive New Material Co., Ltd. — perusahaan material perekat pertama di China yang tercatat di Bursa Efek Shanghai (kode saham 603683), berdiri sejak 1994 dan melayani lebih dari 110 negara. Riset dan pengembangan material inilah yang menjadi dasar seluruh lini produk PPF dan kaca film yang kami distribusikan secara eksklusif di Indonesia. Pemasangan dilakukan langsung oleh installer bersertifikasi di GINNVA House, PIK 2, dengan standar presisi yang sama di setiap kendaraan — mulai dari city car harian hingga kendaraan premium dan listrik.
          </p>
          <p className="text">
            Kami juga menerbitkan <strong>E-Warranty</strong> digital untuk setiap pemasangan — mencatat data kendaraan, produk yang dipakai, tanggal pasang, dan masa berlaku garansi, yang dapat diverifikasi kapan saja lewat sistem resmi Ginnva. Garansi berlaku hingga 10 tahun untuk seri kaca film unggulan dan hingga 8 tahun untuk Paint Protection Film, mencakup perlindungan dari gelembung, korosi, dan perubahan warna akibat cacat produk. Bagi kami, hubungan dengan pelanggan tidak berhenti di hari pemasangan — dukungan purnajual, jaringan dealer resmi, dan tim layanan pelanggan kami tetap siap mendampingi selama masa garansi berlangsung.
          </p>
          <Link href="/brand" className="pill pill--accent">
            Selengkapnya
          </Link>
        </div>
      </section>

      {/* ===================== MITRA ===================== */}
      <section 
        className="cooperation"
        style={{ backgroundImage: `url('/image/partners-background.webp')` }}
      >
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="sec-title">Mitra</div>
            <div className="sec-sub">Partners</div>
          </div>
          <div className="partners-wrapper">
            <Image 
              className="partners" 
              src="/image/partners.webp"
              alt="Mitra"
              width={1200}
              height={300}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </section>
    </>
  );
}