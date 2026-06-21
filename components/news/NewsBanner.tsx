import React from 'react';

export default function NewsBanner() {
  return (
    <section className="page-banner">
      <div 
        className="bg" 
        style={{ backgroundImage: `url('/image/news-banner.webp')` }}
      />
      <div className="inner">
        <h1>Berita</h1>
        <div className="en">Information Centre</div>
      </div>
    </section>
  );
}