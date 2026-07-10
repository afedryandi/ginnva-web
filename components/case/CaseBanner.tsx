import React from 'react';

export default function CaseBanner() {
  return (
    <section className="page-banner">
      <div
        className="bg"
        style={{ backgroundImage: `url('/image/case-banner.webp')` }}
      />
      <div className="inner">
        <h1>Galeri Pemasangan</h1>
        <div className="en">Case Show</div>
      </div>
    </section>
  );
}