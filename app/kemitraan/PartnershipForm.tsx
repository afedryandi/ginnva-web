'use client';

import React, { useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function PartnershipForm() {
  const [form, setForm] = useState({
    applicant_name: '',
    phone_number: '',
    email: '',
    city: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/api/partnership/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        const firstError = json.errors
          ? Object.values(json.errors as Record<string, string[]>)[0]?.[0]
          : json.message;
        throw new Error(firstError || 'Gagal mengirim pengajuan.');
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan koneksi.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section className="psec">
        <div className="wrap" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="book-ok show" style={{ display: 'block', fontSize: '15px' }}>
            Pengajuan kemitraan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="psec">
      <div className="wrap" style={{ maxWidth: '660px', margin: '0 auto' }}>

        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: 'bold' }}>Formulir Pengajuan Kemitraan</h3>
          <p style={{ margin: '0 0 28px', color: '#666', fontSize: '14px' }}>
            Isi formulir di bawah ini. Tim kami akan menghubungi Anda dalam 1–3 hari kerja.
          </p>

          <form className="book" onSubmit={handleSubmit}>
            <div className="grid">
              <div className="fld full">
                <label htmlFor="applicant_name">Nama Lengkap *</label>
                <input
                  id="applicant_name"
                  name="applicant_name"
                  type="text"
                  required
                  value={form.applicant_name}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                />
              </div>

              <div className="fld">
                <label htmlFor="phone_number">Nomor WhatsApp *</label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  required
                  value={form.phone_number}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div className="fld">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                />
              </div>

              <div className="fld full">
                <label htmlFor="city">Kota / Wilayah yang Diminati *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Mis. Jakarta Selatan, Surabaya"
                />
              </div>

              <div className="fld full">
                <label htmlFor="message">Pesan atau Pertanyaan (opsional)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Ceritakan latar belakang usaha Anda atau pertanyaan terkait kemitraan..."
                  style={{ resize: 'vertical', padding: '10px 14px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {error && (
              <div className="book-ok show" style={{ display: 'block', background: '#fff0f0', borderColor: 'rgba(229,62,62,.3)', color: '#c53030' }}>
                {error}
              </div>
            )}

            <div className="submit">
              <button type="submit" className="pill pill--accent" disabled={submitting} style={{ width: '100%' }}>
                {submitting ? 'Mengirim...' : 'Kirim Pengajuan'}
              </button>
            </div>
          </form>
        </div>

        {/* Info tambahan */}
        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {[
            { icon: '📦', title: 'Produk Premium', desc: 'Akses ke seluruh lini produk Ginnva termasuk PPF, Car Window Film, dan Color Change Film.' },
            { icon: '🛡️', title: 'Dukungan Teknis', desc: 'Pelatihan instalasi, materi marketing, dan support teknis dari tim Ginnva.' },
            { icon: '📈', title: 'Margin Kompetitif', desc: 'Harga grosir dealer dengan margin yang kompetitif dan target yang realistis.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#f9f9f9', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}