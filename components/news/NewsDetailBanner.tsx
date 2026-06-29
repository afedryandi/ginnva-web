import React from 'react';

interface NewsDetailBannerProps {
  title: string;
}

export default function NewsDetailBanner({ title }: NewsDetailBannerProps) {
  return (
    <section className="page-banner">
      <div
        className="bg"
        style={{ backgroundImage: `url('/image/news-banner.webp')` }}
      />
      <div className="inner">
        <h1>{title}</h1>
        <div className="en">Information Centre</div>
      </div>
    </section>
  );
}