'use client';

import React, { useEffect, useState } from 'react';

// Endpoint Google Apps Script Web App yang SAMA dengan /giias — datanya
// masuk ke sheet yang sama, dibedakan lewat field `source` di bawah
// (lihat GIIAS_SHEET_SETUP.md untuk skrip yang perlu ditempel di Google
// Sheets, sudah diupdate untuk baca field ini).
const SHEET_ENDPOINT = process.env.NEXT_PUBLIC_GIIAS_SHEET_URL || '';

// Beda dari /giias — benefit-nya cuma 1 (Free Interior PPF), jadi tidak
// perlu dropdown pilihan kombinasi seperti di sana. Nilai ini dikirim
// tetap sebagai penanda di sheet, bukan dipilih user.
const BENEFIT_VALUE = 'interior_ppf';

const STATUS_OPTIONS = [
  { value: 'sudah_spk', label: 'Sudah SPK' },
  { value: 'akan_spk', label: 'Akan SPK' },
  { value: 'masih_memilih', label: 'Masih memilih mobil' },
];

const DELIVERY_OPTIONS = [
  { value: 'sudah_terima', label: 'Sudah menerima mobil' },
  { value: 'lt_30_hari', label: '< 30 hari' },
  { value: '1_3_bulan', label: '1–3 bulan' },
  { value: 'gt_3_bulan', label: '> 3 bulan' },
  { value: 'belum_tahu', label: 'Belum tahu' },
];

type FormState = {
  name: string;
  whatsapp: string;
  brand: string;
  model: string;
  purchaseStatus: string;
  delivery: string;
};

const initialState: FormState = {
  name: '',
  whatsapp: '',
  brand: '',
  model: '',
  purchaseStatus: '',
  delivery: '',
};

function readReferralCodeFromUrl(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('ref')?.trim() ?? '';
}

export default function PartnerForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    setReferralCode(readReferralCodeFromUrl());
  }, []);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const isValid =
    form.name.trim() &&
    form.whatsapp.trim() &&
    form.brand.trim() &&
    form.model.trim() &&
    form.purchaseStatus &&
    form.delivery;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      if (!SHEET_ENDPOINT) {
        throw new Error('Form belum terhubung ke Google Sheet. Hubungi tim IT untuk setup NEXT_PUBLIC_GIIAS_SHEET_URL.');
      }

      await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: form.name.trim(),
          whatsapp: form.whatsapp.trim(),
          brand: form.brand.trim(),
          model: form.model.trim(),
          purchaseStatus: form.purchaseStatus,
          delivery: form.delivery,
          benefit: BENEFIT_VALUE,
          referralCode,
          submittedAt: new Date().toISOString(),
          // Pembeda utama dari submission /giias di sheet yang sama.
          source: 'partner',
        }),
      });

      setDone(true);
      setForm(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {done && (
        <div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="partner-success-title">
          <div className="quote-modal__backdrop" onClick={() => setDone(false)} />
          <div className="quote-modal__panel">
            <button
              type="button"
              className="quote-modal__close"
              onClick={() => setDone(false)}
              aria-label="Tutup"
            >
              ✕
            </button>
            <div className="book" role="status" style={{ maxWidth: 'none', border: 'none', boxShadow: 'none', textAlign: 'center' }}>
              <div style={{ fontSize: '36px' }}>🎉</div>
              <h3 id="partner-success-title" style={{ marginTop: '12px', fontSize: '20px' }}>Privilege Anda Sudah Diklaim!</h3>
              <p style={{ color: 'var(--muted)', marginTop: '10px', fontSize: '14.5px' }}>
                Tim GINNVA akan segera menghubungi Anda via WhatsApp untuk konfirmasi jadwal.
              </p>
            </div>
          </div>
        </div>
      )}

      <form className="book" onSubmit={handleSubmit}>
        <div className="grid">
          <div className="fld full">
            <label htmlFor="partner-name">Nama</label>
            <input id="partner-name" value={form.name} onChange={set('name')} placeholder="Nama lengkap" required />
          </div>
          <div className="fld full">
            <label htmlFor="partner-whatsapp">WhatsApp</label>
            <input id="partner-whatsapp" value={form.whatsapp} onChange={set('whatsapp')} placeholder="08xxxxxxxxxx" inputMode="tel" required />
          </div>
          <div className="fld">
            <label htmlFor="partner-brand">Merek Mobil</label>
            <input id="partner-brand" value={form.brand} onChange={set('brand')} placeholder="Mis. BYD, BMW, Toyota" required />
          </div>
          <div className="fld">
            <label htmlFor="partner-model">Model Mobil</label>
            <input id="partner-model" value={form.model} onChange={set('model')} placeholder="Mis. Sealion 7, X3, Innova Zenix" required />
          </div>
          <div className="fld">
            <label htmlFor="partner-purchase-status">Status Pembelian</label>
            <select id="partner-purchase-status" value={form.purchaseStatus} onChange={set('purchaseStatus')} required>
              <option value="" disabled>Pilih status</option>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="fld">
            <label htmlFor="partner-delivery">Estimasi Delivery</label>
            <select id="partner-delivery" value={form.delivery} onChange={set('delivery')} required>
              <option value="" disabled>Pilih estimasi</option>
              {DELIVERY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <div role="alert" style={{ color: '#c0392b', fontSize: '13.5px', marginTop: '14px' }}>{error}</div>}

        <button
          type="submit"
          className="pill pill--accent submit"
          style={{ width: '100%', fontWeight: 700, opacity: submitting ? 0.7 : 1 }}
          disabled={!isValid || submitting}
        >
          {submitting ? 'Mengirim...' : 'KLAIM SEKARANG'}
        </button>
      </form>
    </>
  );
}