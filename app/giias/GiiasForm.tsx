'use client';

import React, { useEffect, useState } from 'react';

// Endpoint Google Apps Script Web App (bukan Google Sheets API) — cara paling
// simpel untuk nulis langsung ke satu Google Sheet tanpa perlu backend
// terpisah. URL-nya diset lewat env var supaya tidak hardcode di kode dan
// gampang diganti kalau sheet-nya dipindah. Lihat GIIAS_SHEET_SETUP.md untuk
// script yang perlu ditempel di Google Sheets.
const SHEET_ENDPOINT = process.env.NEXT_PUBLIC_GIIAS_SHEET_URL || '';

// Complimentary benefit sekarang berupa KOMBINASI 2 dari 3 pilihan
// (Interior PPF / Sunroof Window Film / Panoramic Window Film), bukan
// pilih 1 saja — jadi opsinya adalah tiap kombinasi 2-dari-3, bukan
// item tunggal.
const BENEFIT_OPTIONS = [
  { value: 'interior_sunroof', label: 'Interior PPF + Sunroof Window Film' },
  { value: 'interior_panoramic', label: 'Interior PPF + Panoramic Window Film' },
  { value: 'sunroof_panoramic', label: 'Sunroof Window Film + Panoramic Window Film' },
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

// Sales Advisor mendapat link unik: /giias?ref=BYD-A001 — kode ini murni
// ditangkap & diteruskan apa adanya ke CRM Sheet (kolom "Referral Code"),
// TANPA mapping ke nama/brand/dealer di sini. Mapping kode → Sales
// Advisor/Brand/Dealer dikelola tim Ginnva sendiri lewat tab terpisah di
// Google Sheet pakai VLOOKUP, supaya menambah Sales Advisor baru cukup
// nambah 1 baris di sheet — tidak perlu deploy ulang web ini. Lihat
// GIIAS_SHEET_SETUP.md.
function readReferralCodeFromUrl(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('ref')?.trim() ?? '';
}

export default function GiiasForm() {
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

      // Google Apps Script Web App menjalankan doPost lalu redirect ke
      // script.googleusercontent.com untuk mengirim baliknya — browser
      // kadang gagal membaca response hasil redirect itu dengan bersih
      // walau doPost di server sudah selesai nulis ke sheet. 'no-cors'
      // membuat kita tidak perlu (dan tidak bisa) baca response-nya sama
      // sekali; request tetap terkirim & dieksekusi di server, yang
      // penting untuk fitur ini. 'text/plain' juga menghindari preflight
      // OPTIONS request yang tidak ditangani Apps Script.
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
          benefit: form.benefit,
          referralCode,
          submittedAt: new Date().toISOString(),
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
      {/* Popup sukses — form di baliknya TETAP ada (sudah kosong lagi
          lewat setForm(initialState)), supaya sales/booth yang dipakai
          bergantian banyak customer bisa langsung isi submission
          berikutnya tanpa reload halaman, cukup tutup popup ini. */}
      {done && (
        <div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="giias-success-title">
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
              <h3 id="giias-success-title" style={{ marginTop: '12px', fontSize: '20px' }}>Privilege Anda Sudah Diklaim!</h3>
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
          <label htmlFor="giias-name">Nama</label>
          <input id="giias-name" value={form.name} onChange={set('name')} placeholder="Nama lengkap" required />
        </div>
        <div className="fld full">
          <label htmlFor="giias-whatsapp">WhatsApp</label>
          <input id="giias-whatsapp" value={form.whatsapp} onChange={set('whatsapp')} placeholder="08xxxxxxxxxx" inputMode="tel" required />
        </div>
        <div className="fld">
          <label htmlFor="giias-brand">Merek Mobil</label>
          <input id="giias-brand" value={form.brand} onChange={set('brand')} placeholder="Mis. BYD, BMW, Toyota" required />
        </div>
        <div className="fld">
          <label htmlFor="giias-model">Model Mobil</label>
          <input id="giias-model" value={form.model} onChange={set('model')} placeholder="Mis. Sealion 7, X3, Innova Zenix" required />
        </div>
        <div className="fld">
          <label htmlFor="giias-purchase-status">Status Pembelian</label>
          <select id="giias-purchase-status" value={form.purchaseStatus} onChange={set('purchaseStatus')} required>
            <option value="" disabled>Pilih status</option>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label htmlFor="giias-delivery">Estimasi Delivery</label>
          <select id="giias-delivery" value={form.delivery} onChange={set('delivery')} required>
            <option value="" disabled>Pilih estimasi</option>
            {DELIVERY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="fld full">
          <label htmlFor="giias-benefit">Pilih Complimentary Benefit</label>
          <select id="giias-benefit" value={form.benefit} onChange={set('benefit')} required>
            <option value="" disabled>Pilih kombinasi benefit</option>
            {BENEFIT_OPTIONS.map((o) => (
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