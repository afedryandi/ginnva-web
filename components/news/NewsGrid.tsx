import React from 'react';
import Image from 'next/image';

const NEWS_DATA = [
  {
    url: 'https://www.ginnvafilm.com/news/show-81.html',
    img: '/image/image-coming-soon.webp',
    date: '25 Mar 2026',
    title: 'Bersama Cahaya — Pameran Jiuzhou Shenzhen sukses digelar',
  },
  {
    url: 'https://www.ginnvafilm.com/news/show-80.html',
    img: '/image/image-coming-soon.webp',
    date: '25 Mar 2026',
    title: 'Pameran AAITF Beijing ditutup — sorotan momen gemilang Ginnva',
  },
  {
    url: 'https://www.ginnvafilm.com/news/show-79.html',
    img: '/image/image-coming-soon.webp',
    date: '25 Mar 2026',
    title: 'Rapat tahunan dealer nasional film mobil Ginnva 2026 sukses digelar',
  },
  {
    url: 'https://www.ginnvafilm.com/news/show-78.html',
    img: '/image/image-coming-soon.webp',
    date: '25 Mar 2026',
    title: 'Peluncuran produk baru Ginnva & kunjungan pabrik bersama kreator',
  },
  {
    url: 'https://www.ginnvafilm.com/news/show-77.html',
    img: '/image/image-coming-soon.webp',
    date: '05 Feb 2026',
    title: 'Program edukasi Douyin Ginnva — menjangkau arus baru industri',
  },
  {
    url: 'https://www.ginnvafilm.com/news.html',
    img: '/image/image-coming-soon.webp',
    date: 'Selengkapnya',
    title: 'Kunjungi pusat berita Ginnva untuk kabar brand lainnya →',
  },
];

export default function NewsGrid() {
  return (
    <section className="psec">
      <div className="wrap">
        <div className="news-grid">
          {NEWS_DATA.map((news, idx) => (
            <a 
              key={idx} 
              className="ncard" 
              href={news.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="pic">
                <Image 
                  src={news.img} 
                  alt={news.title} 
                  width={400} 
                  height={250}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  priority={idx < 2} // Memberikan prioritas muat pada gambar teratas
                />
              </div>
              <div className="b">
                <div className="d">{news.date}</div>
                <div className="t">{news.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}