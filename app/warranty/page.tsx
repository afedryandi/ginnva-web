// app/warranty/page.tsx
'use client';

import { useState, FormEvent } from 'react';

interface WarrantyData {
  code: string;
  product_id: string;
  store_id: string;
  owner: string;
  car_info: {
    vin?: string;
    model?: string;
    license_plate?: string;
    [key: string]: any;
  };
  install_date: string;
  status: string;
}

export default function WarrantyPage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<WarrantyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Menghubungkan ke API Laravel via Environment Variable Vercel/VPS
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ginnva.id/api';
      const res = await fetch(`${apiUrl}/warranty/check/${code.trim()}`);
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Nomor garansi tidak ditemukan. Mohon periksa kembali nomor pada kartu garansi Anda.');
        }
        throw new Error('Gagal memuat data dari server.');
      }

      const data: WarrantyData = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Cek Garansi Elektronik</h1>
        <p className="mt-2 text-slate-600">Masukkan nomor garansi resmi Ginnva Anda di bawah ini</p>
      </div>

      {/* Form Pencarian */}
      <form onSubmit={handleSearch} className="flex gap-2 shadow-sm rounded-lg overflow-hidden border">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Contoh: GNV-XXXXXXXXXX"
          className="w-full px-4 py-3 bg-white text-slate-900 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-slate-900 text-white font-medium hover:bg-slate-800 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Mencari...' : 'Periksa'}
        </button>
      </form>

      {/* Tampilan Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm leading-relaxed">
          {error}
        </div>
      )}

      {/* Tampilan Hasil (Mengacu gaya data kartu garansi ginnvafilm) */}
      {result && (
        <div className="mt-8 border border-slate-200 rounded-xl bg-white shadow-md overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white">
            <h3 className="font-semibold tracking-wide uppercase text-sm">Kartu Garansi Elektronik</h3>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
              result.status === 'success' ? 'bg-green-500 text-white' : 'bg-amber-500 text-slate-900'
            }`}>
              {result.status === 'success' ? 'Aktif' : 'Proses Sinkronisasi'}
            </span>
          </div>
          
          <div className="p-6 space-y-4 text-sm text-slate-700">
            <div className="grid grid-cols-3 border-b pb-2">
              <span className="font-medium text-slate-500">No. Garansi:</span>
              <span className="col-span-2 font-mono text-slate-900 font-bold">{result.code}</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-2">
              <span className="font-medium text-slate-500">ID Produk:</span>
              <span className="col-span-2 text-slate-900">{result.product_id}</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-2">
              <span className="font-medium text-slate-500">Pemilik:</span>
              <span className="col-span-2 text-slate-900">{result.owner}</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-2">
              <span className="font-medium text-slate-500">No. Rangka / VIN:</span>
              <span className="col-span-2 text-slate-900 font-mono">{result.car_info.vin || '—'}</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-2">
              <span className="font-medium text-slate-500">Model Kendaraan:</span>
              <span className="col-span-2 text-slate-900">{result.car_info.model || '—'}</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-2">
              <span className="font-medium text-slate-500">Tanggal Pemasangan:</span>
              <span className="col-span-2 text-slate-900">
                {new Date(result.install_date).toLocaleDateString('id-ID', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}