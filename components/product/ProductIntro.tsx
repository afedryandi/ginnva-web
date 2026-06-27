import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IntroProps {
  title: string;
  subTitle: string;
  description: string;
  imgUrl: string;
}

export default function ProductIntro({ title, subTitle, description, imgUrl }: IntroProps) {
  // Gunakan gambar fallback jika string kosong, atau setel null agar Next.js tidak mengeksekusinya
  const imageSource = imgUrl && imgUrl.trim() !== "" ? imgUrl : '/image/image-coming-soon.webp';

  return (
    <section className="psec">
      <div className="wrap">
        <div className="pd-intro">
          <div className="pic">
            {imageSource ? (
              <Image 
                src={imageSource} 
                alt={title || "Produk Ginnva"} 
                width={600} 
                height={400}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                priority
              />
            ) : null}
          </div>
          <div>
            <div className="name">{title}</div>
            <div className="sub">{subTitle}</div>
            <p className="txt">{description}</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/quote" className="pill pill--accent">
                Dapatkan Quotation Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}