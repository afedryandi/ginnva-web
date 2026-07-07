import React from 'react';

const TIMELINE_DATA = [
  { year: '1989', body: 'Pendiri Ginnva memulai bisnis di Shantou, China.' },
  { year: '1994', body: 'Guangdong Ginnva resmi didirikan.' },
  { year: '1995', body: '10 lini produksi beroperasi, mulai membangun merek secara aktif.' },
  { year: '2006', body: 'Kantor pusat Shanghai didirikan untuk memperkuat posisi di pasar nasional.' },
  { year: '2008', body: 'Ekspansi ke industri elektronik konsumen.' },
  { year: '2017', body: 'Menjadi perusahaan material perekat pertama yang IPO di bursa China (SSE: 603683).' },
  { year: '2018', body: 'Basis produksi Suzhou beroperasi penuh, kapasitas produksi meningkat signifikan.' },
  { year: '2022', body: 'Strategi baru ditetapkan: transformasi manufaktur berbasis teknologi digital cerdas.' },
  { year: '2023', body: 'Divisi optik didirikan, ekspansi ke sektor layar dan panel display.' },
  { year: '2024', body: 'Pabrik manufaktur digital cerdas di Sichuan mulai beroperasi.' },
  { year: '2025', body: 'Anak usaha baru di bidang electronic skin & tactile sensing didirikan.' },
  { year: '2026', body: 'Ekspansi resmi ke Indonesia melalui PT. Ginnva Shield Indonesia, fokus pada segmen otomotif.' },
];

export default function BrandTimeline() {
  return (
      <section className="psec psec--alt">
        <div className="wrap">
          <div className="head">
            <div className="t">Perjalanan Pertumbuhan Berbasis Inovasi</div>
            <div className="e">Innovation-Driven Growth</div>
          </div>
          <div className="timeline">
            {TIMELINE_DATA.map((item, index) => (
              <div className="tl-item" key={index}>
                <div className="tl-year">{item.year}</div>
                <div className="tl-dot"></div>
                <div className="tl-body">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}