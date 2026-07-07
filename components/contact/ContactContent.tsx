'use client';

import React, { useState } from 'react';

export default function ContactContent() {
  const [activeTab, setActiveTab] = useState<'produsen' | 'distributor'>('produsen');

  return (
    <section className="psec">
      <div className="wrap">
        {/* TABS CONTROLLER */}
        <div className="contact-tabs">
          <button 
            className={`ct ${activeTab === 'produsen' ? 'active' : ''}`}
            onClick={() => setActiveTab('produsen')}
          >
            Distributor Utama
          </button>
          <button 
            className={`ct ${activeTab === 'distributor' ? 'active' : ''}`}
            onClick={() => setActiveTab('distributor')}
          >
            Produsen
          </button>
        </div>

        {/* CONTACT GRID */}
        <div className="contact-grid">
          {activeTab === 'produsen' ? (
            <div className="contact-card">
              <h3>PT. Ginnva Shield Indonesia</h3>
              <div className="row"><b>Telepon</b><span>+62 811-8681-678</span></div>
              <div className="row"><b>Email</b><span>marketing@ginnva.id</span></div>
              <div className="row"><b>Alamat</b><span>Thamrin Business Center, Jl. M.H Thamrin Blok 1 No. 52, PIK 2. Kosambi, Selembaran, Tangerang, Banten 15210</span></div>
              <div className="row"><b>Website</b><span>www.ginnva.id</span></div>
            </div>
          ) : (
            /* DATA PRODUSEN (ASLI FROM HTML) */
            <div className="contact-card">
              <h3>Shanghai Ginnva Hengye New Material Co., Ltd.</h3>
              <div className="row"><b>Telepon</b><span>400-116-1165</span></div>
              <div className="row"><b>Email</b><span>info@ginnvafilm.cn</span></div>
              <div className="row"><b>Alamat</b><span>Dalian, Provinsi Liaoning, Tiongkok</span></div>
              <div className="row"><b>Website</b><span>www.ginnvafilm.com</span></div>
            </div>
          )}

          {/* GOOGLE MAPS EMBED IFRAME - Only for Ginnva Indonesia */}
          {activeTab === 'produsen' && (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}