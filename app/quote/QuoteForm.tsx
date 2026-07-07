'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GINNVA_PRODUCTS, ProductItem } from '@/config/site';

// ------------------------------------------------------------------
// Tipe data dari backend (GET /api/quotation/options)
// ------------------------------------------------------------------
interface VehicleOption {
  id: number;
  brand: string;
  model: string;
  variant: string | null;
}

interface FilmProductOption {
  id: number;
  name: string;
  product_type: 'window_film' | 'ppf' | 'color_change';
}

interface QuotationOptions {
  brands: string[];
  vehicles: VehicleOption[];
  products: FilmProductOption[];
}

// ------------------------------------------------------------------
// Produk yang sudah dijual (punya flow quotation lengkap dengan
// pilihan mobil & varian film) vs. yang belum dijual (cuma availability
// inquiry). id mengacu pada GINNVA_PRODUCTS.id di config/site.ts.
// ------------------------------------------------------------------
const AVAILABLE_PRODUCT_IDS = ['1', '2']; // Film Kaca Mobil, Film Pelindung Cat

// Pemetaan dari GINNVA_PRODUCTS.id -> product_type di backend Laravel,
// dipakai untuk memfilter dropdown varian produk sesuai kartu yang diklik.
const PRODUCT_ID_TO_TYPE: Record<string, FilmProductOption['product_type']> = {
  '1': 'window_film',
  '2': 'ppf',
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function QuoteForm() {
  const [selected, setSelected] = useState<ProductItem | null>(null);
  const [options, setOptions] = useState<QuotationOptions | null>(null);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const isAvailable = selected ? AVAILABLE_PRODUCT_IDS.includes(selected.id) : false;

  const retryLoadOptions = () => {
    setOptionsError(null);
    setRetryCount((c) => c + 1);
  };

  // Ambil data dropdown (vehicles & products) hanya saat dibutuhkan,
  // yaitu ketika customer memilih produk yang sudah dijual.
  useEffect(() => {
    if (!selected || !isAvailable || options) return; // `options` is null on retry since we never set it on error

    let cancelled = false;
    setOptionsLoading(true);
    setOptionsError(null);

    fetch(`${baseUrl}/api/quotation/options`, {
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || 'Gagal memuat data formulir.');
        }
        if (!cancelled) setOptions(json.data as QuotationOptions);
      })
      .catch((err: Error) => {
        if (!cancelled) setOptionsError(err.message || 'Terjadi kesalahan koneksi ke server.');
      })
      .finally(() => {
        if (!cancelled) setOptionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, isAvailable, retryCount]);

  return (
    <>
      {/* GRID 4 KARTU PRODUK */}
      <div className="quote-grid">
        {GINNVA_PRODUCTS.map((prod) => {
          const available = AVAILABLE_PRODUCT_IDS.includes(prod.id);
          return (
            <button
              key={prod.id}
              type="button"
              className="quote-card"
              onClick={() => setSelected(prod)}
              aria-label={`Minta penawaran ${prod.name}`}
            >
              <Image src={prod.img} alt={prod.name} fill sizes="(max-width: 720px) 100vw, 50vw" />
              <div className="b">
                <div className="n">{prod.name}</div>
                <div className="e">{prod.sub}</div>
                <span className="pill pill--light" style={{ height: '40px', padding: '0 22px', fontSize: '14px' }}>
                  {available ? 'Minta Penawaran' : 'Tanya Ketersediaan'}
                </span>
              </div>
              {!available && <span className="quote-card__badge">Coming Soon</span>}
            </button>
          );
        })}
      </div>

      {/* MODAL FORM */}
      {selected && (
        <div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
          <div className="quote-modal__backdrop" onClick={() => setSelected(null)} />
          <div className="quote-modal__panel">
            <button
              type="button"
              className="quote-modal__close"
              onClick={() => setSelected(null)}
              aria-label="Tutup formulir"
            >
              ✕
            </button>

            {isAvailable ? (
              <QuotationFormPanel
                product={selected}
                options={options}
                loading={optionsLoading}
                error={optionsError}
                onRetry={retryLoadOptions}
                onDone={() => setSelected(null)}
              />
            ) : (
              <AvailabilityInquiryPanel product={selected} onDone={() => setSelected(null)} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ====================================================================
// PANEL 1 — Quotation lengkap untuk Window Film & PPF
// ====================================================================
function QuotationFormPanel({
  product,
  options,
  loading,
  error,
  onRetry,
  onDone,
}: {
  product: ProductItem;
  options: QuotationOptions | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onDone: () => void;
}) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [filmProductId, setFilmProductId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quotationNumber, setQuotationNumber] = useState<string | null>(null);

  const filmType = PRODUCT_ID_TO_TYPE[product.id];
  const filteredProducts = options?.products.filter((p) => p.product_type === filmType) ?? [];

  // Cascading vehicle helpers
  const modelsForBrand = options
    ? [...new Set(options.vehicles.filter((v) => v.brand === selectedBrand).map((v) => v.model))]
    : [];

  const variantsForModel = options
    ? options.vehicles
        .filter((v) => v.brand === selectedBrand && v.model === selectedModel && v.variant)
        .map((v) => v.variant as string)
    : [];

  const hasVariants = variantsForModel.length > 0;

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setSelectedVariant('');
    setVehicleId('');
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedVariant('');
    // Jika tidak ada varian, langsung resolve vehicle id
    if (options) {
      const variants = options.vehicles.filter(
        (v) => v.brand === selectedBrand && v.model === model && v.variant
      );
      if (variants.length === 0) {
        const match = options.vehicles.find(
          (v) => v.brand === selectedBrand && v.model === model
        );
        setVehicleId(match ? String(match.id) : '');
      } else {
        setVehicleId('');
      }
    }
  };

  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant);
    if (options) {
      const match = options.vehicles.find(
        (v) => v.brand === selectedBrand && v.model === selectedModel && v.variant === variant
      );
      setVehicleId(match ? String(match.id) : '');
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`${baseUrl}/api/quotation/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          vehicle_id: Number(vehicleId),
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          license_plate: licensePlate || undefined,
          message: message || undefined,
          items: [{ film_product_id: Number(filmProductId) }],
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal mengirim permintaan penawaran.');
      }
      setQuotationNumber(json.data?.quotation_number ?? null);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Terjadi kesalahan koneksi.');
    } finally {
      setSubmitting(false);
    }
  }

  // STATE SUKSES
  if (quotationNumber) {
    return (
      <div className="book" style={{ textAlign: 'center' }}>
        <h3 id="quote-modal-title" className="sec-title" style={{ fontSize: '24px' }}>
          Permintaan Terkirim
        </h3>
        <div className="book-ok show" style={{ display: 'block' }}>
          Nomor referensi Anda: <b>{quotationNumber}</b>. Tim sales kami akan segera menghubungi Anda
          untuk {product.name}.
        </div>
        <button type="button" className="pill pill--accent" style={{ marginTop: '20px' }} onClick={onDone}>
          Tutup
        </button>
      </div>
    );
  }

  return (
    <form className="book" onSubmit={handleSubmit}>
      <h3 id="quote-modal-title" className="sec-title" style={{ fontSize: '24px', marginBottom: '4px' }}>
        Minta Penawaran
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>{product.name}</p>

      {loading && <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Memuat pilihan mobil & produk...</p>}
      {error && (
        <div className="book-ok show" style={{ display: 'block', background: '#fff0f0', borderColor: 'rgba(229,62,62,.3)', color: '#c53030', marginBottom: '16px' }}>
          {error}
          <button
            type="button"
            onClick={onRetry}
            style={{ display: 'block', marginTop: '8px', fontSize: '13px', color: '#c53030', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Coba lagi
          </button>
        </div>
      )}

      {options && (
        <div className="grid">
          {/* Cascade Level 1 — Merek */}
          <div className="fld">
            <label htmlFor="vehicle-brand">Merek Mobil</label>
            <select
              id="vehicle-brand"
              required
              value={selectedBrand}
              onChange={(e) => handleBrandChange(e.target.value)}
            >
              <option value="" disabled>Pilih merek...</option>
              {options.brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Cascade Level 2 — Tipe */}
          <div className="fld">
            <label htmlFor="vehicle-model">Tipe Mobil</label>
            <select
              id="vehicle-model"
              required
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              disabled={!selectedBrand}
            >
              <option value="" disabled>
                {selectedBrand ? 'Pilih tipe...' : 'Pilih merek dulu'}
              </option>
              {modelsForBrand.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Cascade Level 3 — Varian (hanya jika ada) */}
          {selectedModel && hasVariants && (
            <div className="fld full">
              <label htmlFor="vehicle-variant">Varian</label>
              <select
                id="vehicle-variant"
                required
                value={selectedVariant}
                onChange={(e) => handleVariantChange(e.target.value)}
              >
                <option value="" disabled>Pilih varian...</option>
                {variantsForModel.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          )}

          {/* Produk film */}
          <div className="fld full">
            <label htmlFor="film-product">Varian {product.name}</label>
            <select
              id="film-product"
              required
              value={filmProductId}
              onChange={(e) => setFilmProductId(e.target.value)}
            >
              <option value="" disabled>Pilih varian produk</option>
              {filteredProducts.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Data kontak */}
          <div className="fld">
            <label htmlFor="customer-name">Nama Lengkap *</label>
            <input
              id="customer-name"
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nama Anda"
            />
          </div>

          <div className="fld">
            <label htmlFor="customer-email">Email *</label>
            <input
              id="customer-email"
              type="email"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="nama@email.com"
            />
          </div>

          <div className="fld">
            <label htmlFor="customer-phone">Nomor WhatsApp *</label>
            <input
              id="customer-phone"
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div className="fld">
            <label htmlFor="license-plate">Plat Nomor (opsional)</label>
            <input
              id="license-plate"
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="B 1234 ABC"
            />
          </div>

          <div className="fld full">
            <label htmlFor="message">Catatan (opsional)</label>
            <textarea
              id="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mis. mau tanya harga depan saja"
            />
          </div>
        </div>
      )}

      {submitError && (
        <div className="book-ok show" style={{ display: 'block', background: '#fff0f0', borderColor: 'rgba(229,62,62,.3)', color: '#c53030' }}>
          {submitError}
        </div>
      )}

      <div className="submit">
        <button type="submit" className="pill pill--accent" disabled={submitting || !options} style={{ width: '100%' }}>
          {submitting ? 'Mengirim...' : 'Kirim Permintaan Penawaran'}
        </button>
      </div>
    </form>
  );
}

// ====================================================================
// PANEL 2 — Availability inquiry sederhana untuk Color Change & Architectural
// ====================================================================
function AvailabilityInquiryPanel({ product, onDone }: { product: ProductItem; onDone: () => void }) {
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inquiryNumber, setInquiryNumber] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`${baseUrl}/api/inquiry/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          customer_contact: customerContact,
          // Jenis produk disisipkan di awal catatan supaya tim sales tahu
          // produk apa yang ditanyakan, tanpa perlu kolom product_type khusus.
          message: `[${product.name}] ${message}`.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal mengirim pertanyaan.');
      }
      setInquiryNumber(json.data?.inquiry_number ?? null);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Terjadi kesalahan koneksi.');
    } finally {
      setSubmitting(false);
    }
  }

  if (inquiryNumber) {
    return (
      <div className="book" style={{ textAlign: 'center' }}>
        <h3 id="quote-modal-title" className="sec-title" style={{ fontSize: '24px' }}>
          Pertanyaan Terkirim
        </h3>
        <div className="book-ok show" style={{ display: 'block' }}>
          Nomor referensi Anda: <b>{inquiryNumber}</b>. Tim kami akan menghubungi Anda begitu ada info
          terbaru soal {product.name}.
        </div>
        <button type="button" className="pill pill--accent" style={{ marginTop: '20px' }} onClick={onDone}>
          Tutup
        </button>
      </div>
    );
  }

  return (
    <form className="book" onSubmit={handleSubmit}>
      <h3 id="quote-modal-title" className="sec-title" style={{ fontSize: '24px', marginBottom: '4px' }}>
        Tanya Ketersediaan
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>
        {product.name} belum tersedia saat ini. Tinggalkan kontak Anda dan kami akan menghubungi
        begitu produk ini siap dipasarkan.
      </p>

      <div className="grid">
        <div className="fld full">
          <label htmlFor="inq-name">Nama Lengkap</label>
          <input
            id="inq-name"
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nama Anda"
          />
        </div>

        <div className="fld full">
          <label htmlFor="inq-contact">Nomor WhatsApp atau Email</label>
          <input
            id="inq-contact"
            type="text"
            required
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
            placeholder="08xxxxxxxxxx atau nama@email.com"
          />
        </div>

        <div className="fld full">
          <label htmlFor="inq-message">Catatan (opsional)</label>
          <textarea
            id="inq-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mis. tertarik warna apa, untuk mobil apa, dsb."
          />
        </div>
      </div>

      {submitError && (
        <div className="book-ok show" style={{ display: 'block', background: '#fff0f0', borderColor: 'rgba(229,62,62,.3)', color: '#c53030' }}>
          {submitError}
        </div>
      )}

      <div className="submit">
        <button type="submit" className="pill pill--accent" disabled={submitting} style={{ width: '100%' }}>
          {submitting ? 'Mengirim...' : 'Kirim Pertanyaan'}
        </button>
      </div>
    </form>
  );
}