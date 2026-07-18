'use client';

import React, { useState } from 'react';

type Step = 'email' | 'otp' | 'confirm' | 'done';

// Wajib per kebijakan Google Play — app dengan sistem akun harus sediakan
// cara hapus akun/data yang bisa diakses TANPA install app. Alurnya reuse
// endpoint OTP login yang sudah ada (request-otp -> verify-otp -> dapat
// token), lalu panggil endpoint hapus akun pakai token itu — supaya cuma
// pemilik akun sesungguhnya (yang bisa terima OTP ke email terdaftar)
// yang bisa memicu penghapusan, bukan sekadar tahu email orang lain.
export default function DeleteAccountForm() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/customer/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal mengirim kode verifikasi.');
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/customer/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) throw new Error(data.message || 'Kode verifikasi salah atau kedaluwarsa.');
      setToken(data.token);
      setStep('confirm');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/customer/auth/account`, {
        method: 'DELETE',
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menghapus akun.');
      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="psec" style={{ padding: '60px 20px' }}>
      <div className="wrap" style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          {step === 'email' && (
            <>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold' }}>
                Hapus Akun Ginnva House
              </h3>
              <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '14px', lineHeight: 1.6 }}>
                Masukkan email yang terdaftar di akun Ginnva House Anda. Kami akan kirim kode
                verifikasi untuk memastikan permintaan ini benar dari pemilik akun.
              </p>
              <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  required
                  style={inputStyle}
                />
                <button type="submit" disabled={loading} className="pill pill--accent" style={buttonStyle(loading)}>
                  {loading ? 'Mengirim...' : 'Kirim Kode Verifikasi'}
                </button>
              </form>
            </>
          )}

          {step === 'otp' && (
            <>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold' }}>Masukkan Kode Verifikasi</h3>
              <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '14px', lineHeight: 1.6 }}>
                Kode 6 digit telah dikirim ke <strong>{email}</strong>. Masukkan di bawah ini.
              </p>
              <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  required
                  style={{ ...inputStyle, letterSpacing: '4px', textAlign: 'center', fontSize: '20px' }}
                />
                <button type="submit" disabled={loading} className="pill pill--accent" style={buttonStyle(loading)}>
                  {loading ? 'Memverifikasi...' : 'Verifikasi'}
                </button>
                <button
                  type="button"
                  onClick={() => { setStep('email'); setError(null); }}
                  style={{ background: 'none', border: 'none', color: '#666', fontSize: '13px', cursor: 'pointer', padding: '4px' }}
                >
                  ← Ganti email
                </button>
              </form>
            </>
          )}

          {step === 'confirm' && (
            <>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold', color: '#c53030' }}>
                Konfirmasi Hapus Akun
              </h3>
              <div
                style={{
                  backgroundColor: '#fff0f0',
                  borderLeft: '4px solid #e53e3e',
                  padding: '16px',
                  borderRadius: '4px',
                  color: '#c53030',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  margin: '16px 0 24px',
                }}
              >
                Tindakan ini <strong>permanen dan tidak bisa dibatalkan</strong>. Nama, email, dan
                nomor WhatsApp Anda akan dihapus dari sistem kami. Riwayat booking &amp; garansi
                tetap tersimpan di toko untuk keperluan layanan purnajual, tapi tidak lagi
                terhubung ke identitas Anda.
              </div>
              <button
                onClick={handleDelete}
                disabled={loading}
                style={{
                  ...buttonStyle(loading),
                  width: '100%',
                  backgroundColor: loading ? '#999' : '#c53030',
                }}
              >
                {loading ? 'Menghapus...' : 'Ya, Hapus Akun Saya Permanen'}
              </button>
            </>
          )}

          {step === 'done' && (
            <>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold', color: '#276749' }}>
                Akun Berhasil Dihapus
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: 1.6 }}>
                Data pribadi Anda sudah dihapus dari sistem kami. Terima kasih pernah menggunakan
                Ginnva House.
              </p>
            </>
          )}

          {!!error && (
            <div
              style={{
                marginTop: '16px',
                backgroundColor: '#fff0f0',
                borderLeft: '4px solid #e53e3e',
                padding: '12px 16px',
                borderRadius: '4px',
                color: '#c53030',
                fontSize: '13px',
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '12px 16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '15px',
  outline: 'none',
};

function buttonStyle(loading: boolean): React.CSSProperties {
  return {
    padding: '12px 24px',
    backgroundColor: loading ? '#999' : '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
  };
}