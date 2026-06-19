'use client';

import React, { useState } from 'react';

// 1. Definisikan Interface Data Sesuai Kolom Database Laravel Anda
interface WarrantyData {
  id: number;
  warranty_code: string;
  customer_name: string;
  phone_number: string;
  car_plate: string;
  car_type: string;
  product_series: string;
  installation_date: string;
  expiry_date: string;
  dealer_name: string;
  status: string;
  remaining_days: number;
}

export default function WarrantyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<WarrantyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // 2. Fungsi Fetch Data ke API Laravel
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setHasSearched(true);

    try {
      // Mengambil base URL dari env, jika tidak ada fallback ke localhost api
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${baseUrl}/api/warranty/check?code=${encodeURIComponent(searchQuery.trim())}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Nomor garansi tidak ditemukan atau sistem error.');
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menghubungi server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="psec psec--alt" style={{ marginTop: '80px' }}> {/* .psec & .psec--alt dari styles.css */}
      <div className="wrap"> {/* .wrap dari styles.css */}
        
        {/* Kepala Halaman */}
        <div className="head"> {/* .head dari styles.css */}
          <h1 className="t">Cek Garansi Elektronik</h1> {/* .t dari styles.css */}
          <div className="e">E-WARRANTY SYSTEM</div> {/* .e dari styles.css */}
        </div>

        {/* Form Pencarian Menggunakan Kelas .w-search */}
        <form onSubmit={handleSearch} className="w-search"> {/* .w-search dari styles.css */}
          <input
            type="text"
            placeholder="Masukkan Nomor Seri Garansi atau Plat Nomor Kendaraan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="pill pill--accent" disabled={loading}> {/* .pill & .pill--accent */}
            {loading ? 'Memeriksa...' : 'Cek Garansi'}
          </button>
        </form>

        {/* Area Tampilan Hasil */}
        <div className="w-results"> {/* .w-results dari styles.css */}
          
          {/* Status Loading */}
          {loading && (
            <div className="w-none">Sedang memvalidasi data ke server keamanan Ginnva...</div>
          )}

          {/* Status Eror atau Data Tidak Ditemukan */}
          {error && !loading && (
            <div className="w-none" style={{ color: '#ed1651' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Tampilan Jika Garansi Ditemukan (Menggunakan Struktur .w-card asli Anda) */}
          {result && !loading && (
            <div className="w-card"> {/* .w-card dari styles.css */}
              <div className="w-card__top"> {/* .w-card__top dari styles.css */}
                <h3>
                  <span>No. Seri: {result.warranty_code}</span>
                  <span className="w-state">Aktif</span> {/* .w-state dari styles.css */}
                </h3>
                <div className="w-days"> {/* .w-days dari styles.css */}
                  Sisa Masa Berlaku: <b>{result.remaining_days}</b> Hari
                </div>
              </div>

              {/* Grid Baris Data Konsumen & Produk */}
              <div className="w-rows"> {/* .w-rows dari styles.css */}
                <div><span>Nama Pemilik:</span> {result.customer_name}</div>
                <div><span>No. Kendaraan:</span> {result.car_plate}</div>
                <div><span>Tipe Mobil:</span> {result.car_type}</div>
                <div><span>Produk Terpasang:</span> {result.product_series}</div>
                <div><span>Tanggal Pemasangan:</span> {new Date(result.installation_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                <div><span>Tanggal Kedaluwarsa:</span> {new Date(result.expiry_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                <div><span>Dealer Pelaksana:</span> {result.dealer_name}</div>
                <div><span>Status Proteksi:</span> Terjamin Sistem Resmi</div>
              </div>

              <div className="w-view">
                ✓ Jaminan keaslian produk Ginnva Film terverifikasi secara sah.
              </div>
            </div>
          )}

          {/* Kondisi Belum Ada Hasil Nyata */}
          {hasSearched && !loading && !error && !result && (
            <div className="w-none">Data kosong atau format respons API tidak sesuai.</div>
          )}
          
          {!hasSearched && (
            <div className="w-none">Silakan masukkan data kartu garansi resmi Anda untuk memulai pelacakan.</div>
          )}

        </div>

      </div>
    </div>
  );
}