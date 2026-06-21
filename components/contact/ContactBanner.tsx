import React from 'react';

export default function ContactBanner() {
  return (
    <section className="page-banner">
      <div 
        className="bg" 
        style={{ backgroundImage: `url('/image/image-coming-soon.webp')` }}
      />
      <div className="inner">
        <h1>Kontak</h1>
        <div className="en">Contact Us</div>
      </div>
    </section>
  );
}