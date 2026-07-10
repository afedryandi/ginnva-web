'use client';

import React from 'react';

export default function ContactContent() {
  return (
    <section className="psec">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-card">
            <h3>PT. Ginnva Shield Indonesia</h3>
            <div className="row"><b>Telepon</b><span>+62 811-8681-678</span></div>
            <div className="row"><b>Email</b><span>marketing@ginnva.id</span></div>
            <div className="row"><b>Alamat</b><span>Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2. Kosambi, Selembaran, Tangerang, Banten 15210</span></div>
            <div className="row"><b>Website</b><span>www.ginnva.id</span></div>
          </div>

          <div className="contact-map" style={{ position: 'relative', minHeight: '320px', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.459351816242!2d106.70506227361535!3d-6.068620459549684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a030025c42b81%3A0xab33d6b0eb2e1130!2sFlagship%20Store%20Ginnva%20Indonesia!5e0!3m2!1sid!2sid!4v1783226085997!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Ginnva Indonesia"
            />
          </div>
        </div>
      </div>
    </section>
  );
}