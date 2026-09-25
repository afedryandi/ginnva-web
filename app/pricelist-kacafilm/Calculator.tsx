'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';

// Backend sementara masih di server DEV (bukan NEXT_PUBLIC_API_URL yang
// dipakai halaman lain di situs ini) -- ganti ke https://api.ginnva.id
// begitu fitur ini sudah dipindah ke production.
const API_BASE = 'https://api-dev.ginnva.id/api/pricelist';

const TOKEN_STORAGE_KEY = 'pricelist_kacafilm_token';

// Pilihan produk per posisi -- HARUS persis sama dengan nama Produk di
// tab "Harga" Google Sheets. Sesuaikan di sini kalau daftar berubah.
const PRODUCT_OPTIONS: Record<'depan' | 'samping' | 'belakang' | 'sunroof', string[]> = {
  depan: ['A70', 'H70', 'H30', 'H15'],
  samping: ['H30', 'H15', 'H08'],
  belakang: ['H30', 'H15', 'H08'],
  sunroof: ['A70', 'H30', 'H15', 'H08'],
};

type CarSqm = {
  sqmDepan: number;
  sqmSamping: number;
  sqmBelakang: number;
  sqmSunroof: number;
};

type Posisi = 'depan' | 'samping' | 'belakang' | 'sunroof';

const POSISI_LABEL: Record<Posisi, string> = {
  depan: 'Depan',
  samping: 'Samping',
  belakang: 'Belakang',
  sunroof: 'Sun Roof',
};

function rupiah(n: number): string {
  return 'Rp' + Math.round(n).toLocaleString('id-ID');
}

async function apiFetch<T>(path: string, token: string | null, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok || !body?.success) {
    const message = body?.message || `Gagal memuat data (${res.status}).`;
    const err = new Error(message) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }

  return body.data as T;
}

export default function Calculator() {
  const [token, setToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loggingIn, setLoggingIn] = useState(false);

  const [brands, setBrands] = useState<string[]>([]);
  const [hargaMap, setHargaMap] = useState<Record<string, number>>({});
  const [dataError, setDataError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(false);

  const [merek, setMerek] = useState('');
  const [tipeList, setTipeList] = useState<string[]>([]);
  const [tipe, setTipe] = useState('');
  const [tipeLoading, setTipeLoading] = useState(false);

  const [carSqm, setCarSqm] = useState<CarSqm | null>(null);
  const [carLoading, setCarLoading] = useState(false);

  const [produk, setProduk] = useState<Record<Posisi, string>>({
    depan: '',
    samping: '',
    belakang: '',
    sunroof: '',
  });
  const [diskon, setDiskon] = useState(0);

  // ---- Restore sesi dari localStorage (tahan reload, tetap ikut expiry 8 jam sisi server) ----
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(TOKEN_STORAGE_KEY);
      if (saved) setToken(saved);
    } catch {
      // localStorage bisa gagal (private mode dll) -- login ulang saja, bukan error fatal.
    }
    setAuthChecked(true);
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // diamkan, lihat catatan di atas
    }
  }, []);

  const handleLoginSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError(null);
      setLoggingIn(true);
      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginForm),
        });
        const body = await res.json().catch(() => null);

        if (!res.ok || !body?.success) {
          if (res.status === 401) {
            // Backend PricelistController::login() balas 401 kalau
            // username/password tidak cocok dgn akun bersama di .env.
            setAuthError(body?.message || 'Username atau password salah.');
          } else if (res.status === 422) {
            setAuthError('Username dan password wajib diisi.');
          } else {
            // Status lain (404/500/dll) berarti ada masalah di server --
            // jangan tampilkan teks mentah dari server (mis. pesan
            // routing Laravel), itu membingungkan utk sales.
            setAuthError('Server sedang bermasalah, coba beberapa saat lagi. Kalau masih gagal, hubungi admin Ginnva.');
          }
          return;
        }

        setToken(body.token);
        try {
          window.localStorage.setItem(TOKEN_STORAGE_KEY, body.token);
        } catch {
          // sesi tetap jalan di memori walau tidak bisa disimpan
        }
      } catch {
        setAuthError('Tidak bisa terhubung ke server. Coba lagi.');
      } finally {
        setLoggingIn(false);
      }
    },
    [loginForm],
  );

  // ---- Muat data awal (merek + harga) begitu sudah login ----
  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    setDataLoading(true);
    setDataError(null);

    Promise.all([
      apiFetch<string[]>('/brands', token),
      apiFetch<Record<string, number>>('/prices', token),
    ])
      .then(([brandList, prices]) => {
        if (cancelled) return;
        setBrands(brandList);
        setHargaMap(prices);
      })
      .catch((err: Error & { status?: number }) => {
        if (cancelled) return;
        if (err.status === 401) {
          handleLogout();
          setAuthError('Sesi Anda sudah berakhir, silakan login ulang.');
          return;
        }
        setDataError(err.message);
      })
      .finally(() => {
        if (!cancelled) setDataLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, handleLogout]);

  // ---- Muat tipe mobil begitu merek berganti ----
  useEffect(() => {
    setTipe('');
    setTipeList([]);
    setCarSqm(null);
    setProduk({ depan: '', samping: '', belakang: '', sunroof: '' });

    if (!merek || !token) return;

    let cancelled = false;
    setTipeLoading(true);

    apiFetch<string[]>(`/models?brand=${encodeURIComponent(merek)}`, token)
      .then((list) => {
        if (!cancelled) setTipeList(list);
      })
      .catch((err: Error & { status?: number }) => {
        if (cancelled) return;
        if (err.status === 401) {
          handleLogout();
          setAuthError('Sesi Anda sudah berakhir, silakan login ulang.');
          return;
        }
        setDataError(err.message);
      })
      .finally(() => {
        if (!cancelled) setTipeLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [merek, token, handleLogout]);

  // ---- Muat SQM mobil begitu tipe berganti ----
  useEffect(() => {
    setCarSqm(null);
    setProduk({ depan: '', samping: '', belakang: '', sunroof: '' });

    if (!merek || !tipe || !token) return;

    let cancelled = false;
    setCarLoading(true);

    apiFetch<CarSqm>(`/car?brand=${encodeURIComponent(merek)}&tipe=${encodeURIComponent(tipe)}`, token)
      .then((sqm) => {
        if (!cancelled) setCarSqm(sqm);
      })
      .catch((err: Error & { status?: number }) => {
        if (cancelled) return;
        if (err.status === 401) {
          handleLogout();
          setAuthError('Sesi Anda sudah berakhir, silakan login ulang.');
          return;
        }
        setDataError(err.message);
      })
      .finally(() => {
        if (!cancelled) setCarLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [merek, tipe, token, handleLogout]);

  const sqmFor = useCallback(
    (posisi: Posisi): number => {
      if (!carSqm) return 0;
      return {
        depan: carSqm.sqmDepan,
        samping: carSqm.sqmSamping,
        belakang: carSqm.sqmBelakang,
        sunroof: carSqm.sqmSunroof,
      }[posisi];
    },
    [carSqm],
  );

  const hargaPerPosisi = useMemo(() => {
    const result: Record<Posisi, number> = { depan: 0, samping: 0, belakang: 0, sunroof: 0 };
    (Object.keys(PRODUCT_OPTIONS) as Posisi[]).forEach((posisi) => {
      const sqm = sqmFor(posisi);
      const p = produk[posisi];
      if (sqm > 0 && p) {
        result[posisi] = Math.round(sqm * (hargaMap[p] || 0));
      }
    });
    return result;
  }, [produk, hargaMap, sqmFor]);

  const subtotal = useMemo(
    () => Object.values(hargaPerPosisi).reduce((a, b) => a + b, 0),
    [hargaPerPosisi],
  );
  const diskonRupiah = Math.round((subtotal * diskon) / 100);
  const total = subtotal - diskonRupiah;

  const noSunroof = carSqm !== null && carSqm.sqmSunroof <= 0;

  const resetForm = () => {
    setMerek('');
    setTipe('');
    setTipeList([]);
    setCarSqm(null);
    setProduk({ depan: '', samping: '', belakang: '', sunroof: '' });
    setDiskon(0);
  };

  // ---- Belum siap cek sesi (hindari flash tombol login) ----
  if (!authChecked) {
    return <Shell><p style={styles.muted}>Memuat...</p></Shell>;
  }

  // ---- Belum login ----
  if (!token) {
    return (
      <Shell>
        <h1 style={styles.h1}>PRICE LIST KACA FILM</h1>
        <p style={styles.muted}>Login untuk tim sales &amp; dealer.</p>

        <form onSubmit={handleLoginSubmit}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            autoComplete="username"
            required
            style={styles.select}
            value={loginForm.username}
            onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            autoComplete="current-password"
            required
            style={styles.select}
            value={loginForm.password}
            onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
          />

          <button type="submit" disabled={loggingIn} style={styles.loginButton}>
            {loggingIn ? 'Memproses...' : 'Login'}
          </button>
        </form>

        {authError && <div style={styles.error}>{authError}</div>}
      </Shell>
    );
  }

  return (
    <Shell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1 style={styles.h1}>PRICE LIST KACA FILM</h1>
        <button onClick={handleLogout} style={styles.linkButton}>Keluar</button>
      </div>

      {dataError && <div style={styles.error}>{dataError}</div>}
      {dataLoading && <p style={styles.muted}>Memuat data...</p>}

      {!dataLoading && (
        <>
          <label style={styles.label}>Merek Mobil</label>
          <select style={styles.select} value={merek} onChange={(e) => setMerek(e.target.value)}>
            <option value="">Pilih merek</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <label style={styles.label}>Tipe Mobil</label>
          <select
            style={styles.select}
            value={tipe}
            disabled={!merek || tipeLoading}
            onChange={(e) => setTipe(e.target.value)}
          >
            <option value="">{tipeLoading ? 'Memuat...' : merek ? 'Pilih tipe' : 'Pilih merek dulu'}</option>
            {tipeList.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {carLoading && <p style={styles.muted}>Memuat ukuran...</p>}

          {(Object.keys(PRODUCT_OPTIONS) as Posisi[]).map((posisi) => (
            <React.Fragment key={posisi}>
              <label style={styles.label}>{POSISI_LABEL[posisi]}</label>
              <div style={styles.row}>
                <select
                  style={styles.select}
                  value={produk[posisi]}
                  disabled={!carSqm || (posisi === 'sunroof' && noSunroof)}
                  onChange={(e) => setProduk((prev) => ({ ...prev, [posisi]: e.target.value }))}
                >
                  <option value="">Pilih produk</option>
                  {PRODUCT_OPTIONS[posisi].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <span style={{ ...styles.hargaPosisi, ...(hargaPerPosisi[posisi] > 0 ? styles.hargaPosisiFilled : {}) }}>
                  {rupiah(hargaPerPosisi[posisi])}
                </span>
              </div>
            </React.Fragment>
          ))}

          {noSunroof && <div style={styles.hint}>Mobil ini tidak punya Sun Roof.</div>}

          <label style={styles.label}>Diskon (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            style={styles.select}
            value={diskon}
            onChange={(e) => setDiskon(Number(e.target.value) || 0)}
          />

          <div style={styles.summary}>
            <Row label="Sub Total" value={rupiah(subtotal)} muted />
            <Row label="Diskon" value={`${diskon}% (${rupiah(diskonRupiah)})`} muted />
            <Row label="Total" value={rupiah(total)} total />
          </div>

          <button onClick={resetForm} style={styles.resetButton}>Reset</button>
        </>
      )}
    </Shell>
  );
}

function Row({ label, value, muted, total }: { label: string; value: string; muted?: boolean; total?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '7px 0',
        color: muted ? '#6b7280' : '#1f2937',
        fontWeight: total ? 700 : 400,
        fontSize: total ? 15 : 13.5,
        borderTop: total ? '2px solid #1f2937' : 'none',
        marginTop: total ? 4 : 0,
        paddingTop: total ? 10 : 7,
      }}
    >
      <span>{label}</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={styles.body}>
      <div style={styles.card}>{children}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: '-apple-system, "Segoe UI", Roboto, sans-serif',
    background: '#f3f4f6',
    minHeight: '100vh',
    margin: 0,
    padding: '20px 14px 60px',
  },
  card: {
    maxWidth: 460,
    margin: '0 auto',
    background: '#fff',
    borderRadius: 14,
    padding: '22px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,.08)',
  },
  h1: {
    fontSize: 18,
    margin: '0 0 6px',
    color: '#16a34a',
    letterSpacing: '.02em',
  },
  muted: { fontSize: 13.5, color: '#6b7280' },
  label: {
    display: 'block',
    fontSize: 12.5,
    fontWeight: 600,
    color: '#4b5563',
    margin: '14px 0 5px',
  },
  select: {
    width: '100%',
    padding: '9px 10px',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    fontSize: 14,
    background: '#fff',
    color: '#1f2937',
  },
  row: { display: 'flex', gap: 10, alignItems: 'center' },
  hargaPosisi: {
    flex: '0 0 auto',
    minWidth: 108,
    textAlign: 'right',
    fontSize: 13.5,
    fontVariantNumeric: 'tabular-nums',
    color: '#6b7280',
  },
  hargaPosisiFilled: { color: '#1f2937', fontWeight: 600 },
  hint: { fontSize: 12, color: '#9ca3af', marginTop: 6 },
  summary: { marginTop: 22, paddingTop: 14, borderTop: '1px solid #e5e7eb' },
  resetButton: {
    width: '100%',
    marginTop: 20,
    padding: 12,
    background: '#6b7280',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  loginButton: {
    width: '100%',
    marginTop: 20,
    padding: 12,
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    fontSize: 13,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  error: {
    background: '#fef2f2',
    color: '#991b1b',
    padding: '10px 12px',
    borderRadius: 8,
    fontSize: 13,
    marginTop: 14,
  },
};
