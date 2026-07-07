import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IntroProps {
  title: string;
  subTitle: string;
  description: string;
  imgUrl: string;
  ctaLabel?: string;
  comingSoon?: boolean;
}

export default function ProductIntro({ title, subTitle, description, imgUrl, ctaLabel, comingSoon }: IntroProps) {
  const imageSource = imgUrl && imgUrl.trim() !== "" ? imgUrl : '/image/image-coming-soon.webp';
  const buttonLabel = ctaLabel ?? 'Minta Penawaran';

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

            {comingSoon && (
              <div className="coming-soon-badge" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f2f5fa',
                border: '1.5px dashed #ccd5e0',
                borderRadius: '8px',
                padding: '12px 18px',
                marginTop: '16px',
                marginBottom: '4px',
              }}>
                <span style={{ fontSize: '18px' }}>🔔</span>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#333' }}>Segera Hadir</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                    Produk ini sedang dalam persiapan. Hubungi kami untuk info ketersediaan.
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/quote" className="pill pill--accent">
                {buttonLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}