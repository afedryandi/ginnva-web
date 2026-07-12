import React from 'react';
import type { Metadata } from 'next';
import { seoDefaults, canonical } from '@/config/seo';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/legal'),
  title: 'Pernyataan Hukum — Ginnva Shield Indonesia',
  description: 'Pernyataan Hukum PT. Ginnva Shield Indonesia mencakup ketentuan penggunaan, hak kekayaan intelektual, dan pembatasan tanggung jawab.',
};

export default function LegalPage() {
  return (
    <main data-page="legal">
      <section className="page-banner">
        <div className="bg" style={{ backgroundImage: `url('/image/building-image.webp')` }} />
        <div className="inner">
          <h1>Pernyataan Hukum</h1>
          <div className="en">Legal Statement</div>
        </div>
      </section>

      <section className="psec">
        <div className="wrap">
          <article className="article" style={{ paddingBottom: '80px' }}>
            <div className="upd">Berlaku sejak: 1 Januari 2026</div>

            <h2>1. Identitas Perusahaan</h2>
            <p>
              Situs web ini (<strong>ginnva.id</strong>) dioperasikan oleh <strong>PT. Ginnva Shield Indonesia</strong>,
              perusahaan yang terdaftar dan berkedudukan hukum di Indonesia, beralamat di Thamrin Business Center,
              Jl. M.H Thamrin Blok 1 No. 52, PIK 2, Kosambi, Selembaran, Tangerang, Banten 15210.
              PT. Ginnva Shield Indonesia merupakan mitra resmi dan perwakilan dari Shanghai Smith Adhesive New Material Co., Ltd.
              (SSE: 603683) di Indonesia.
            </p>

            <h2>2. Ketentuan Penggunaan</h2>
            <p>
              Dengan mengakses dan menggunakan situs web ini, Anda menyetujui untuk terikat oleh ketentuan
              penggunaan yang berlaku. Situs web dan seluruh kontennya disediakan semata-mata untuk keperluan
              informasi mengenai produk dan layanan Ginnva. Penggunaan informasi dari situs ini untuk tujuan
              komersial tanpa izin tertulis dari kami dilarang.
            </p>
            <p>
              Kami berhak mengubah, menangguhkan, atau menghentikan layanan situs web ini sewaktu-waktu
              tanpa pemberitahuan sebelumnya. Kami tidak bertanggung jawab atas kerugian yang timbul akibat
              perubahan, gangguan, atau penghentian layanan tersebut.
            </p>

            <h2>3. Hak Kekayaan Intelektual</h2>
            <p>
              Seluruh konten yang terdapat di situs web ini — termasuk namun tidak terbatas pada teks, gambar,
              logo, grafis, ikon, video, desain antarmuka, dan perangkat lunak — merupakan milik PT. Ginnva
              Shield Indonesia dan/atau Shanghai Smith Adhesive New Material Co., Ltd., serta dilindungi oleh hukum hak cipta,
              merek dagang, dan kekayaan intelektual yang berlaku.
            </p>
            <p>
              Dilarang untuk menyalin, mereproduksi, mendistribusikan, menampilkan, atau membuat karya turunan
              dari konten situs ini tanpa izin tertulis sebelumnya dari kami.
            </p>

            <h2>4. Keakuratan Informasi</h2>
            <p>
              Kami berupaya menyajikan informasi yang akurat dan terkini di situs ini. Namun, kami tidak
              memberikan jaminan atas kelengkapan, keakuratan, atau kesesuaian informasi untuk tujuan tertentu.
              Spesifikasi produk, harga, dan ketersediaan dapat berubah sewaktu-waktu tanpa pemberitahuan.
              Untuk informasi terkini, silakan hubungi tim kami secara langsung.
            </p>

            <h2>5. Tautan ke Situs Pihak Ketiga</h2>
            <p>
              Situs web ini dapat memuat tautan menuju situs web pihak ketiga yang tidak berada di bawah
              kendali kami. Tautan tersebut disediakan semata-mata sebagai kemudahan dan tidak berarti
              kami mendukung atau bertanggung jawab atas konten, kebijakan privasi, atau praktik situs
              pihak ketiga tersebut.
            </p>

            <h2>6. Pembatasan Tanggung Jawab</h2>
            <p>
              Sejauh diizinkan oleh hukum yang berlaku, PT. Ginnva Shield Indonesia tidak bertanggung jawab
              atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari
              penggunaan atau ketidakmampuan menggunakan situs web ini, termasuk namun tidak terbatas pada
              kehilangan data, keuntungan, atau goodwill.
            </p>

            <h2>7. Hukum yang Berlaku</h2>
            <p>
              Pernyataan Hukum ini tunduk pada dan ditafsirkan sesuai dengan hukum yang berlaku di wilayah
              Republik Indonesia. Setiap sengketa yang timbul dari atau berkaitan dengan penggunaan situs
              web ini akan diselesaikan melalui jalur hukum yang berlaku di yurisdiksi Indonesia.
            </p>

            <h2>8. Hubungi Kami</h2>
            <p>
              Untuk pertanyaan hukum atau izin penggunaan konten, silakan hubungi kami:
            </p>
            <p>
              <strong>PT. Ginnva Shield Indonesia</strong><br />
              Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2<br />
              Kosambi, Selembaran, Tangerang, Banten 15210<br />
              Email: <a href="mailto:marketing@ginnva.id" style={{ color: 'var(--accent)' }}>marketing@ginnva.id</a><br />
              Telepon: +62 811-8681-678
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}