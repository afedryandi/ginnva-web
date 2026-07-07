import React from 'react';

interface NewsDetailBannerProps {
  title: string;
  coverImage?: string | null;
}

export default function NewsDetailBanner({ title, coverImage }: NewsDetailBannerProps) {
  const bg = coverImage || '/image/news-banner.webp';

  return (
    <section className="page-banner">
      <div
        className="bg"
        style={{ backgroundImage: `url('${bg}')` }}
      />
      <div className="inner">
        <h1>{title}</h1>
        <div className="en">Information Centre</div>
      </div>
    </section>
  );
}