'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface Store {
  id: number;
  name: string;
  city: string;
  address: string;
  phone: string | null;
  opening_hours: string | null;
  latitude: number | null;
  longitude: number | null;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function DealersList() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${baseUrl}/api/stores`, { headers: { Accept: 'application/json' } })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || 'Gagal memuat data dealer.');
        }
        if (!cancelled) {
          setStores(json.data as Store[]);
          if (json.data.length > 0) setSelectedId(json.data[0].id);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || 'Terjadi kesalahan koneksi ke server.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredStores = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return stores;
    return stores.filter(
      (s) => s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
    );
  }, [stores, search]);

  const selectedStore = stores.find((s) => s.id === selectedId) ?? filteredStores[0] ?? null;

  const mapSrc =
    selectedStore && selectedStore.latitude && selectedStore.longitude
      ? `https://www.google.com/maps?q=${selectedStore.latitude},${selectedStore.longitude}&output=embed`
      : null;

  // Schema LocalBusiness per dealer — penting untuk muncul di Google
  // Maps/local search dan membantu AI search memahami lokasi & jam buka
  // tiap toko.
  const dealersSchema = stores.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: stores.map((store, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'AutomotiveBusiness',
        name: store.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: store.address,
          addressLocality: store.city,
          addressCountry: 'ID',
        },
        telephone: store.phone ?? undefined,
        openingHours: store.opening_hours ?? undefined,
        ...(store.latitude && store.longitude
          ? { geo: { '@type': 'GeoCoordinates', latitude: store.latitude, longitude: store.longitude } }
          : {}),
      },
    })),
  } : null;

  return (
    <div className="dealer-wrap">
      {dealersSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dealersSchema) }}
        />
      )}
      <div className="dealer-side">
        <div className="w-search">
          <input
            id="dealerSearch"
            placeholder="Cari kota / nama toko"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="dealer-list" id="dealerList">
          {loading && <p style={{ color: 'var(--muted)', fontSize: '14px', padding: '0 4px' }}>Memuat data dealer...</p>}

          {error && (
            <div className="book-ok show" style={{ display: 'block', background: '#fff0f0', borderColor: 'rgba(229,62,62,.3)', color: '#c53030' }}>
              {error}
            </div>
          )}

          {!loading && !error && filteredStores.length === 0 && (
            <p style={{ color: 'var(--muted)', fontSize: '14px', padding: '0 4px' }}>
              Tidak ada dealer yang cocok dengan pencarian Anda.
            </p>
          )}

          {filteredStores.map((store) => (
            <button
              key={store.id}
              type="button"
              className="dealer"
              onClick={() => setSelectedId(store.id)}
              style={
                selectedStore?.id === store.id
                  ? { borderColor: 'var(--accent)', boxShadow: '0 8px 22px rgba(0,0,0,.06)' }
                  : undefined
              }
            >
              <span className="dealer__ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.4" />
                </svg>
              </span>
              <span className="dealer__info">
                <span className="dealer__name" style={{ display: 'block' }}>
                  {store.name}
                </span>
                <span className="dealer__meta" style={{ display: 'block' }}>
                  {store.city}
                  {store.opening_hours ? ` · ${store.opening_hours}` : ''}
                </span>
                <span className="dealer__addr" style={{ display: 'block' }}>
                  {store.address}
                </span>
              </span>
              {store.phone && (
                <a
                  className="dealer__tel"
                  href={`tel:${store.phone}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {store.phone}
                </a>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="dealer-map">
        {mapSrc ? (
          <iframe
            key={selectedStore?.id}
            src={mapSrc}
            width="100%"
            height="460"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={selectedStore ? `Peta lokasi ${selectedStore.name}` : 'Peta lokasi dealer'}
          />
        ) : (
          <div
            style={{
              minHeight: '460px',
              background: 'var(--alt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted-2)',
              fontSize: '14px',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            {loading ? 'Memuat peta...' : 'Pilih dealer di samping untuk melihat lokasinya di peta.'}
          </div>
        )}
      </div>
    </div>
  );
}