'use client';

import React, { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';

type SignupState = {
  name: string;
  phone: string;
  email: string;
  carBrand: string;
  dealerName: string;
};

const initialState: SignupState = { name: '', phone: '', email: '', carBrand: '', dealerName: '' };

// Tombol "Become a Partner" HANYA muncul di link master (tanpa ?ref=...)
// yang dipakai sales GINNVA saat approach sales dealer di GIIAS — begitu
// sales dealer sudah punya link referral sendiri (/giias?ref=KODE) untuk
// dibagikan ke customer, tombol ini otomatis disembunyikan supaya
// customer tidak salah klik daftar jadi partner. `hasReferralCode`
// ditentukan di server (lewat searchParams di page.tsx) supaya HTML
// pertama sudah final — tidak ada layout shift dari deteksi client-side.
export default function BecomePartnerBar({ hasReferralCode }: { hasReferralCode: boolean }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<SignupState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ referral_code: string; referral_link: string; qr_data_uri: string } | null>(null);

  if (hasReferralCode) return null;

  const set = (key: keyof SignupState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const isValid = form.name.trim() && form.phone.trim() && form.email.trim() && form.carBrand.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/giias/partner-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          car_brand: form.carBrand.trim(),
          dealer_name: form.dealerName.trim() || null,
        }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        throw new Error(json?.message || 'Gagal mendaftar. Silakan coba lagi.');
      }

      setResult(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setResult(null);
    setError(null);
    setForm(initialState);
  };

  return (
    <>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: '#14151a',
          color: '#fff',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.75)' }}>
          Kamu Sales mobil di GIIAS? Dapatkan link referral Anda sendiri.
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pill pill--accent"
          style={{ height: '36px', padding: '0 18px', fontSize: '13px', fontWeight: 700 }}
        >
          Become a Partner
        </button>
      </div>

      {open && (
        <div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="become-partner-title">
          <div className="quote-modal__backdrop" onClick={closeModal} />
          <div className="quote-modal__panel">
            <button type="button" className="quote-modal__close" onClick={closeModal} aria-label="Tutup formulir">
              ✕
            </button>

            <div className="book" style={{ maxWidth: 'none', border: 'none', boxShadow: 'none' }}>
              {result ? (
                <div style={{ textAlign: 'center' }} role="status">
                  <div style={{ fontSize: '36px' }}>🎉</div>
                  <h3 id="become-partner-title" style={{ marginTop: '12px', fontSize: '20px' }}>
                    Kode Referral Anda Sudah Aktif!
                  </h3>

                  {/* eslint-disable-next-line @next/next/no-img-element -- data URI base64, next/image tidak berlaku untuk ini */}
                  <img
                    src={result.qr_data_uri}
                    alt={`QR referral ${result.referral_code}`}
                    width={180}
                    height={180}
                    style={{ margin: '18px auto 0', display: 'block', border: '1px solid var(--line)', borderRadius: '10px' }}
                  />

                  <div
                    style={{
                      marginTop: '18px',
                      fontSize: '22px',
                      fontWeight: 800,
                      letterSpacing: '.05em',
                      color: 'var(--accent)',
                      border: '1px dashed var(--accent)',
                      borderRadius: '10px',
                      padding: '12px',
                    }}
                  >
                    {result.referral_code}
                  </div>
                  <p style={{ color: 'var(--muted)', marginTop: '14px', fontSize: '13.5px', wordBreak: 'break-all' }}>
                    Link Anda: <b>{result.referral_link}</b>
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '14px' }}>
                    <a
                      href={result.qr_data_uri}
                      download={`QR-Referral-${result.referral_code}.png`}
                      className="pill pill--accent"
                      style={{ fontSize: '13px' }}
                    >
                      Unduh QR
                    </a>
                    <button
                      type="button"
                      className="pill pill--outline"
                      style={{ fontSize: '13px' }}
                      onClick={() => navigator.clipboard?.writeText(result.referral_link)}
                    >
                      Salin Link
                    </button>
                  </div>
                  <p style={{ color: 'var(--muted)', marginTop: '18px', fontSize: '12.5px' }}>
                    Bagikan link atau QR ini ke customer Anda — setiap klaim lewat link ini otomatis tercatat sebagai referral Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 id="become-partner-title" style={{ fontSize: '19px', marginBottom: '16px' }}>
                    Become a Partner GINNVA
                  </h3>
                  <div className="grid">
                    <div className="fld full">
                      <label htmlFor="bp-name">Nama <span style={{ color: '#c0392b' }}>*</span></label>
                      <input id="bp-name" value={form.name} onChange={set('name')} placeholder="Nama lengkap" required />
                    </div>
                    <div className="fld full">
                      <label htmlFor="bp-phone">No. WhatsApp <span style={{ color: '#c0392b' }}>*</span></label>
                      <input id="bp-phone" value={form.phone} onChange={set('phone')} placeholder="08xxxxxxxxxx" inputMode="tel" required />
                    </div>
                    <div className="fld full">
                      <label htmlFor="bp-email">Email <span style={{ color: '#c0392b' }}>*</span></label>
                      <input id="bp-email" type="email" value={form.email} onChange={set('email')} placeholder="nama@email.com" required />
                    </div>
                    <div className="fld">
                      <label htmlFor="bp-brand">Merek Kendaraan tempat Anda bekerja <span style={{ color: '#c0392b' }}>*</span></label>
                      <input id="bp-brand" value={form.carBrand} onChange={set('carBrand')} placeholder="Mis. BYD, BMW, Toyota" required />
                    </div>
                    <div className="fld">
                      <label htmlFor="bp-dealer">Nama Dealer tempat Anda bertugas (opsional)</label>
                      <input id="bp-dealer" value={form.dealerName} onChange={set('dealerName')} placeholder="Nama dealer" />
                    </div>
                  </div>

                  {error && <div role="alert" style={{ color: '#c0392b', fontSize: '13.5px', marginTop: '14px' }}>{error}</div>}

                  <button
                    type="submit"
                    className="pill pill--accent submit"
                    style={{ width: '100%', fontWeight: 700, opacity: submitting ? 0.7 : 1 }}
                    disabled={!isValid || submitting}
                  >
                    {submitting ? 'Mendaftarkan...' : 'DAFTAR & DAPATKAN LINK REFERRAL'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}