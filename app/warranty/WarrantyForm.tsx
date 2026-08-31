'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

interface WarrantyData {
  id: number;
  warranty_code: string;
  customer_name: string;
  phone_number: string;
  car_plate: string;
  car_type: string;
  product_series: string;
  product_category: string | null;
  vin: string | null;
  installation_position: string | null;
  installation_position_detail: string | null;
  installation_date: string;
  expiry_date: string;
  dealer_name: string;
  status: string;
  // 'pending_review' | 'approved' | 'rejected' -- cuma 'approved' yang
  // sertifikat PDF-nya boleh diunduh (WarrantyController::download()).
  // Field ini sebelumnya juga tidak ada di interface & tidak pernah
  // dicek -- tombol unduh tetap tampil aktif untuk garansi yang belum
  // di-approve, diklik langsung buka tab baru berisi JSON error mentah
  // ke customer (bukan pesan yang manusiawi). Ditemukan lewat testing
  // manual 2026-08-31.
  review_status: string;
  // true kalau match lewat nomor telepon (WarrantyController::check())
  // -- warranty_code & sebagian data SENGAJA disamarkan (bukan kode
  // asli), jadi tidak bisa dipakai untuk unduh sertifikat. Field ini
  // sebelumnya tidak ada di interface & tidak pernah dicek sama sekali
  // di halaman ini -- tombol unduh tetap tampil aktif dan memakai teks
  // placeholder masking ("GNV-••••• hubungi toko...") sebagai kode
  // asli, dikirim ke endpoint download & gagal dengan respons JSON
  // mentah. Ditemukan lewat testing manual 2026-08-31.
  masked?: boolean;
}

export default function WarrantyForm() {
  // Baca query param ?code= dari URL — ini dipakai saat customer scan QR
  // fisik di stiker pemasangan (QR berisi link ke halaman ini dengan
  // kode terlampir), supaya kode otomatis terisi & langsung dicari,
  // bukan customer harus ketik ulang manual.
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get('code');

  const [searchQuery, setSearchQuery] = useState(codeFromUrl || '');
  const [result, setResult] = useState<WarrantyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Jalur pemanggilan API
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';

  const runSearch = useCallback(
    async (rawCode: string) => {
      const trimmed = rawCode.trim();
      if (!trimmed) return;

      setLoading(true);
      setError(null);
      setResult(null);
      setHasSearched(true);

      try {
        const response = await fetch(`${baseUrl}/api/warranty/check?code=${encodeURIComponent(trimmed)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Kode garansi tidak terdaftar atau tidak valid.');
        }

        if (data && data.success && data.data) {
          setResult(data.data);
        } else if (data && data.warranty_code) {
          setResult(data);
        } else {
          throw new Error('Format data yang diterima dari server tidak sesuai.');
        }
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan koneksi saat menghubungi server.');
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  // Auto-cari begitu halaman dibuka kalau ada ?code= di URL (hasil scan
  // QR). Hanya jalan sekali saat mount / saat nilai query param berubah.
  useEffect(() => {
    if (codeFromUrl) {
      runSearch(codeFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeFromUrl]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(searchQuery);
  };

  const handleDownloadPDF = async () => {
    if (!result) return;

    // SEBELUMNYA window.open() langsung ke URL API mentah -- kalau
    // gagal (belum approved/tidak ditemukan), browser cuma menampilkan
    // JSON error mentah ke customer, bukan pesan yang manusiawi. Fetch
    // dulu di sini supaya kegagalan bisa ditangkap & ditampilkan
    // sebagai pesan biasa, PDF cuma dibuka kalau responsnya benar file.
    // Sama pola dengan mobile app (app/warranty/check.tsx).
    setDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch(`${baseUrl}/api/warranty/download/${result.warranty_code}`);

      if (!response.ok) {
        let message = 'Sertifikat garansi ini belum bisa diunduh.';
        try {
          const data = await response.json();
          message = data.message || message;
        } catch {
          // Respons bukan JSON (mis. HTML 404 bawaan server) -- pakai pesan default.
        }
        throw new Error(message);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `E-Warranty-Ginnva-${result.warranty_code}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setDownloadError(err.message || 'Gagal mengunduh sertifikat. Periksa koneksi internet Anda.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="psec" style={{ padding: '60px 20px' }}>
      <div className="wrap" style={{ maxWidth: '650px', margin: '0 auto' }}>
        
        {/* Formulir Input */}
        <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold' }}>Periksa Kartu Garansi</h3>
          <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '14px' }}>
            Masukkan nomor kode E-Warranty resmi yang Anda dapatkan dari dealer resmi Ginnva saat pemasangan.
          </p>

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Masukkan kode garansi Anda"
              required
              style={{
                flex: '1 1 200px',
                minWidth: 0,
                padding: '12px 16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '15px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="pill pill--accent"
              style={{
                flexShrink: 0,
                padding: '12px 24px',
                backgroundColor: loading ? '#999' : '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Memproses...' : 'Cari Data'}
            </button>
          </form>
        </div>

        {/* Area Output Berdasarkan State */}
        <div style={{ marginTop: '24px' }}>
          
          {/* STATE 1: LOADING */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                display: 'inline-block',
                width: '30px',
                height: '30px',
                border: '3px solid rgba(0,0,0,0.1)',
                borderTopColor: '#111',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ marginTop: '12px', color: '#666' }}>Sedang menyinkronkan data dengan server e-warranty...</p>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes spin { to { transform: rotate(360deg); } }
              `}} />
            </div>
          )}

          {/* STATE 2: ERROR (GAGAL) */}
          {hasSearched && !loading && error && (
            <div style={{ backgroundColor: '#fff0f0', borderLeft: '4px solid #e53e3e', padding: '16px', borderRadius: '4px', color: '#c53030' }}>
              <strong style={{ display: 'block', marginBottom: '4px' }}>Pencarian Gagal</strong>
              <p style={{ margin: 0, fontSize: '14px' }}>{error}</p>
            </div>
          )}

          {/* STATE 3: SUKSES (DETAIL LENGKAP) */}
          {hasSearched && !loading && !error && result && (
            <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', borderBottom: '2px solid #111', paddingBottom: '12px', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', letterSpacing: '0.5px' }}>NOMOR SERTIFIKAT</span>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#111' }}>{result.warranty_code}</h4>
                </div>
                <div style={{ marginLeft: 'auto', backgroundColor: '#e6fffa', color: '#234e52', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                  {result.status || 'Terjamin Sistem'}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', fontSize: '14px', color: '#333' }}>
                <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '2px' }}>Nama Pemilik</span>
                  <span style={{ fontWeight: '600' }}>{result.customer_name}</span>
                </div>
                <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '2px' }}>Spesifikasi Produk Terpasang</span>
                  <span style={{ fontWeight: '600', color: '#2b6cb0' }}>{result.product_series}</span>
                </div>
                <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '2px' }}>Identitas Kendaraan</span>
                  <span style={{ fontWeight: '600' }}>{result.car_type} ({result.car_plate})</span>
                </div>
                {result.vin && (
                  <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                    <span style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '2px' }}>VIN (Nomor Rangka)</span>
                    <span style={{ fontWeight: '600' }}>{result.vin}</span>
                  </div>
                )}
                {result.product_category === 'ppf' && result.installation_position && (
                  <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                    <span style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '2px' }}>Posisi Pemasangan</span>
                    <span style={{ fontWeight: '600' }}>
                      {result.installation_position === 'full_body' ? 'Seluruh Bodi' : 'Parsial'}
                      {result.installation_position === 'partial' && result.installation_position_detail
                        ? ` (${result.installation_position_detail})`
                        : ''}
                    </span>
                  </div>
                )}
                <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '2px' }}>Dealer Pelaksana</span>
                  <span style={{ fontWeight: '600' }}>{result.dealer_name}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '2px' }}>Tanggal Pemasangan</span>
                    <span style={{ fontWeight: '600' }}>
                      {new Date(result.installation_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '12px', color: '#718096', marginBottom: '2px' }}>Masa Berlalu Garansi</span>
                    <span style={{ fontWeight: '600', color: '#e53e3e' }}>
                      {new Date(result.expiry_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tombol Unduh PDF -- disembunyikan kalau hasil masking
                  (match lewat nomor telepon, warranty_code cuma teks
                  placeholder) ATAU garansinya belum approved (belum sah
                  diunduh, lihat WarrantyController::download()). SEBELUMNYA
                  status ini tidak pernah dicek sama sekali -- tombol
                  tetap aktif untuk garansi pending/rejected, diklik
                  langsung buka JSON error mentah ke customer. */}
              {result.masked ? (
                <div style={{ marginTop: '20px', backgroundColor: '#fffaf0', borderLeft: '4px solid #dd6b20', padding: '14px 16px', borderRadius: '4px', color: '#7b341e', fontSize: '13px' }}>
                  Hasil pencarian lewat nomor telepon disamarkan sebagian demi keamanan data. Untuk melihat data lengkap &amp; mengunduh sertifikat, cari dengan nomor E-Warranty, plat nomor, atau VIN yang tertera di kendaraan/sertifikat.
                </div>
              ) : result.review_status !== 'approved' ? (
                <div style={{ marginTop: '20px', backgroundColor: '#fffaf0', borderLeft: '4px solid #dd6b20', padding: '14px 16px', borderRadius: '4px', color: '#7b341e', fontSize: '13px' }}>
                  {result.review_status === 'rejected'
                    ? 'Pendaftaran garansi ini ditolak admin. Hubungi dealer pemasangan untuk info lebih lanjut.'
                    : 'Garansi ini sedang diverifikasi admin. Sertifikat PDF tersedia setelah disetujui.'}
                </div>
              ) : (
                <div style={{ marginTop: '24px', textAlign: 'right' }}>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={downloading}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: downloading ? '#999' : '#2b6cb0',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      cursor: downloading ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {downloading ? 'Mengunduh...' : '📥 Unduh Sertifikat PDF'}
                  </button>
                  {downloadError && (
                    <p style={{ marginTop: '10px', color: '#c53030', fontSize: '13px', textAlign: 'right' }}>{downloadError}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Kondisi Default Sebelum Melakukan Pencarian */}
          {!hasSearched && (
            <div style={{ textAlign: 'center', padding: '30px', color: '#888', fontSize: '14px', border: '2px dashed #ddd', borderRadius: '8px' }}>
              Silakan masukkan nomor e-warranty resmi Anda untuk memulai pelacakan data keaslian unit.
            </div>
          )}

        </div>
      </div>
    </section>
  );
}