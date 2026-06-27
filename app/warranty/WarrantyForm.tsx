'use client';

import React, { useState } from 'react';

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
}

export default function WarrantyForm() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<WarrantyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Jalur pemanggilan API
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setHasSearched(true);

    try {
      const response = await fetch(`${baseUrl}/api/warranty/check?code=${encodeURIComponent(searchQuery.trim())}`, {
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
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    // Mengarahkan ke endpoint cetak PDF bawaan API backend Laravel
    window.open(`${baseUrl}/api/warranty/download/${result.warranty_code}`, '_blank');
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

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Contoh: GNV-2026XXXXXXXX" 
              required
              style={{
                flex: 1,
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

              {/* Tombol Unduh PDF */}
              <div style={{ marginTop: '24px', textAlign: 'right' }}>
                <button
                  onClick={handleDownloadPDF}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#2b6cb0',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  📥 Unduh Sertifikat PDF
                </button>
              </div>
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