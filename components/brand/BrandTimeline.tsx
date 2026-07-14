import React from 'react';

const TIMELINE_DATA = [
  { year: '1989', body: 'Pendiri Ginnva memulai bisnis di Shantou, China.' },
  { year: '1994', body: 'Guangdong Ginnva resmi didirikan.' },
  { year: '1995', body: 'Ginnva mengembangkan 10 lini produksi.' },
  { year: '2006', body: 'Kantor Pusat Shanghai didirikan.' },
  { year: '2008', body: 'Ekspansi ke industri elektronik konsumen.' },
  { year: '2010', body: 'Transformasi perusahaan berteknologi tinggi.' },
  { year: '2017', body: 'Tercatat di bursa saham Shanghai (SSE: 603683).' },
  { year: '2018', body: 'Basis produksi di Suzhou beroperasi sepenuhnya.' },
  { year: '2022', body: 'Transformasi bisnis berbasis digital dan AI.' },
  { year: '2023', body: 'Divisi optik didirikan.' },
  { year: '2024', body: 'Pabrik smart digital di Sichuan beroperasi.' },
  { year: '2025', body: 'Anak usaha baru di bidang electronic skin & tactile sensing didirikan.' },
  { year: '2026', body: 'Ekspansi ke Indonesia (Jakarta), fokus di bidang otomotif.' },
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