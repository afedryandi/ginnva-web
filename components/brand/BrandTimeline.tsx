import React from 'react';

const TIMELINE_DATA = [
  { year: '1989', body: 'Pendiri memanfaatkan peluang reformasi, keterbukaan dan memulai bisnis di Shantou.' },
  { year: '1994', body: 'Mendirikan Guangdong Ginnva Technology Co., Ltd., meresmikan operasional bisnis yang terstruktur.' },
  { year: '1995', body: 'Mencapai kemampuan manufaktur mandiri, membangun merek, memulai produksi serentak di 10 lini produksi.' },
  { year: '2006', body: 'Mendirikan Shanghai Ginnva Adhesive New Materials Co., Ltd. sebagai kantor pusat Grup.' },
  { year: '2008', body: 'Memperluas lini produksi ke konsumen disektor elektronik.' },
  { year: '2017', body: 'Berhasil tercatat di bursa saham utama Shanghai, menjadi perusahaan material perekat pertama yang go public di Tiongkok.' },
  { year: '2018', body: 'Basis produksi Jiangsu (Suzhou) selesai dibangun dan mulai beroperasi, total luas kawasan mencapai sekitar 10,7 hektar.' },
  { year: '2021', body: 'Basis manufaktur Jiangsu (Suzhou) dan Anhui (Chuzhou) secara bertahap diperluas dan beroperasi, mencakup material elektronik dan material optik.' },
  { year: '2022', body: 'Menetapkan arah strategi baru sebagai "ahli solusi perekat", memulai transformasi cerdas digital perusahaan.' },
  { year: '2023', body: 'Divisi bisnis optik didirikan, ekspansi dalam skala besar ke sektor layar (optik).' },
  { year: '2024', body: 'Pabrik berbasis kecerdasan buatan menjadi benchmark pada industri ini dan Ginnva Sichuan resmi beroperasi.' },
  { year: '2025', body: 'Mendirikan anak perusahaan Beijing Jingzhigan New Materials Co., Ltd., yang berfokus pada solusi sistem sensor taktil kulit elektronik.' },
  { year: '2026', body: 'Ekspansi bisnis ke Indonesia (Jakarta). Berfokus pada premium PPF dan Car Window Film.' },
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