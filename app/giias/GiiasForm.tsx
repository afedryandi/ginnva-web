'use client';

import React, { useState } from 'react';

// Endpoint Google Apps Script Web App (bukan Google Sheets API) — cara paling
// simpel untuk nulis langsung ke satu Google Sheet tanpa perlu backend
// terpisah. URL-nya diset lewat env var supaya tidak hardcode di kode dan
// gampang diganti kalau sheet-nya dipindah. Lihat GIIAS_SHEET_SETUP.md untuk
// script yang perlu ditempel di Google Sheets.
const SHEET_ENDPOINT = process.env.NEXT_PUBLIC_GIIAS_SHEET_URL || '';

const BENEFIT_OPTIONS = [
  { value: 'interior_ppf', label: 'Interior PPF' },
  { value: 'sunroof_film', label: 'Sunroof Window Film' },
  { value: 'panoramic_film', label: 'Panoramic Window Film' },
];

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
  benefit: string;
};

const initialState: FormState = {
  name: '',
  whatsapp: '',
  brand: '',
  model: '',
  purchaseStatus: '',
  delivery: '',
  benefit: '',
};

export default function GiiasForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const isValid =
    form.name.trim() &&
    form.whatsapp.trim() &&
    form.brand.trim() &&
    form.model.trim() &&
    form.purchaseStatus &&
    form.delivery &&
    form.benefit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      if (!SHEET_ENDPOINT) {
        throw new Error('Form belum terhubung ke Google Sheet. Hubungi tim IT untuk setup NEXT_PUBLIC_GIIAS_SHEET_URL.');
      }

      // Google Apps Script Web App tidak mendukung CORS preflight dengan
      // baik untuk JSON body dari browser — 'text/plain' menghindari
      // preflight OPTIONS request supaya submit tidak diblok browser.
      const res = await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: form.name.trim(),
          whatsapp: form.whatsapp.trim(),
          brand: form.brand.trim(),
          model: form.model.trim(),
          purchaseStatus: form.purchaseStatus,
          delivery: form.delivery,
          benefit: form.benefit,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error('Gagal mengirim data. Silakan coba lagi.');

      setDone(true);
      setForm(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="book" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '36px' }}>🎉</div>
        <h3 style={{ marginTop: '12px', fontSize: '20px' }}>Privilege Anda Sudah Diklaim!</h3>
        <p style={{ color: 'var(--muted)', marginTop: '10px', fontSize: '14.5px' }}>
          Tim GINNVA akan segera menghubungi Anda via WhatsApp untuk konfirmasi jadwal.
        </p>
      </div>
    );
  }

  return (
    <form className="book" onSubmit={handleSubmit}>
      <div className="grid">
        <div className="fld full">
          <label>Nama</label>
          <input value={form.name} onChange={set('name')} placeholder="Nama lengkap" required />
        </div>
        <div className="fld full">
          <label>WhatsApp</label>
          <input value={form.whatsapp} onChange={set('whatsapp')} placeholder="08xxxxxxxxxx" inputMode="tel" required />
        </div>
        <div className="fld">
          <label>Merek Mobil</label>
          <input value={form.brand} onChange={set('brand')} placeholder="Mis. BYD, BMW, Toyota" required />
        </div>
        <div className="fld">
          <label>Model Mobil</label>
          <input value={form.model} onChange={set('model')} placeholder="Mis. Sealion 7, X3, Innova Zenix" required />
        </div>
        <div className="fld">
          <label>Status Pembelian</label>
          <select value={form.purchaseStatus} onChange={set('purchaseStatus')} required>
            <option value="" disabled>Pilih status</option>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label>Estimasi Delivery</label>
          <select value={form.delivery} onChange={set('delivery')} required>
            <option value="" disabled>Pilih estimasi</option>
            {DELIVERY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="fld full">
          <label>Pilih Complimentary Benefit</label>
          <select value={form.benefit} onChange={set('benefit')} required>
            <option value="" disabled>Pilih benefit</option>
            {BENEFIT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div style={{ color: '#c0392b', fontSize: '13.5px', marginTop: '14px' }}>{error}</div>}

      <button
        type="submit"
        className="pill pill--accent submit"
        style={{ width: '100%', fontWeight: 700, opacity: submitting ? 0.7 : 1 }}
        disabled={!isValid || submitting}
      >
        {submitting ? 'Mengirim...' : 'KLAIM SEKARANG'}
      </button>
    </form>
  );
}