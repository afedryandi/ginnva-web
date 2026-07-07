import React from 'react';
import type { Metadata } from 'next';
import { seoDefaults } from '@/config/seo';

export const metadata: Metadata = {
  ...seoDefaults,
  title: 'Kebijakan Privasi — Ginnva House',
  description: 'Kebijakan Privasi PT. Ginnva Shield Indonesia tentang pengumpulan, penggunaan, dan perlindungan data pribadi pengguna.',
};

export default function PrivacyPage() {
  return (
    <main data-page="privacy">
      <section className="page-banner">
        <div className="bg" style={{ backgroundImage: `url('/image/building-image.webp')` }} />
        <div className="inner">
          <h1>Kebijakan Privasi</h1>
          <div className="en">Privacy Policy</div>
        </div>
      </section>

      <section className="psec">
        <div className="wrap">
          <article className="article" style={{ paddingBottom: '80px' }}>
            <div className="upd">Berlaku sejak: 1 Januari 2026</div>

            <h2>1. Pendahuluan</h2>
            <p>
              PT. Ginnva Shield Indonesia (&ldquo;Ginnva House&rdquo;, &ldquo;kami&rdquo;) berkomitmen untuk melindungi privasi Anda.
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi
              pribadi Anda saat menggunakan layanan, situs web (<strong>ginnva.id</strong>), dan aplikasi mobile kami.
            </p>

            <h2>2. Informasi yang Kami Kumpulkan</h2>
            <p>
              Kami dapat mengumpulkan informasi berikut ketika Anda menggunakan layanan kami:
            </p>
            <p>
              <strong>Informasi yang Anda berikan secara langsung:</strong> Nama lengkap, alamat email, nomor telepon/WhatsApp,
              kota domisili, dan informasi kendaraan (merek, tipe, varian, plat nomor) yang Anda masukkan
              saat mengajukan penawaran, pendaftaran garansi, atau pengajuan kemitraan.
            </p>
            <p>
              <strong>Informasi teknis:</strong> Alamat IP, jenis perangkat, sistem operasi, dan data penggunaan aplikasi
              yang dikumpulkan secara otomatis untuk keperluan peningkatan layanan dan analitik.
            </p>

            <h2>3. Penggunaan Informasi</h2>
            <p>
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <p>
              (a) Memproses dan merespons permintaan penawaran produk Ginnva; (b) Mengelola pendaftaran dan
              validasi garansi produk; (c) Mengirimkan informasi promosi, berita produk, dan pembaruan layanan
              (dengan persetujuan Anda); (d) Meningkatkan kualitas layanan dan pengalaman pengguna; serta
              (e) Memenuhi kewajiban hukum yang berlaku di wilayah Republik Indonesia.
            </p>

            <h2>4. Pengungkapan kepada Pihak Ketiga</h2>
            <p>
              Kami tidak menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga
              tanpa persetujuan Anda, kecuali dalam kondisi berikut: (a) Diperlukan oleh hukum atau perintah
              pengadilan; (b) Diteruskan kepada mitra dealer resmi Ginnva yang telah menandatangani perjanjian
              kerahasiaan, semata-mata untuk keperluan pemenuhan layanan yang Anda minta.
            </p>

            <h2>5. Keamanan Data</h2>
            <p>
              Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi
              informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Data autentikasi
              disimpan menggunakan enkripsi standar industri.
            </p>

            <h2>6. Hak Anda</h2>
            <p>
              Sesuai dengan ketentuan yang berlaku, Anda memiliki hak untuk: (a) Mengakses dan memperbarui
              informasi pribadi Anda melalui aplikasi atau dengan menghubungi kami; (b) Meminta penghapusan
              data pribadi Anda, selama tidak bertentangan dengan kewajiban hukum; (c) Menarik persetujuan
              atas penggunaan data untuk keperluan pemasaran.
            </p>

            <h2>7. Cookie dan Teknologi Pelacakan</h2>
            <p>
              Situs web kami menggunakan cookie dan teknologi analitik (termasuk Google Analytics) untuk
              memahami cara pengunjung menggunakan layanan kami. Anda dapat menonaktifkan cookie melalui
              pengaturan browser Anda, namun hal ini mungkin memengaruhi fungsionalitas situs.
            </p>

            <h2>8. Perubahan Kebijakan</h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan signifikan akan
              diberitahukan melalui situs web atau aplikasi kami. Penggunaan layanan secara berkelanjutan
              setelah perubahan dianggap sebagai penerimaan atas kebijakan yang diperbarui.
            </p>

            <h2>9. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan atau kekhawatiran terkait kebijakan privasi ini, silakan hubungi kami:
            </p>
            <p>
              <strong>PT. Ginnva Shield Indonesia</strong><br />
              Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2<br />
              Kosambi, Tangerang, Banten 15210<br />
              Email: <a href="mailto:marketing@ginnva.id" style={{ color: 'var(--accent)' }}>marketing@ginnva.id</a><br />
              Telepon: +62 811-8681-678
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}