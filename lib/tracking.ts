// lib/tracking.ts
// Atribusi lead dan event pengukuran (Marketing/Konten Fase 0, 2026-10-22).
//
// - captureAttribution(): dipanggil sekali saat halaman dibuka; membaca UTM dan click id iklan (gclid/fbclid/ttclid) dari URL, perujuk
//   eksternal, dan halaman asal, lalu menyimpannya di localStorage selama 30 hari. Kunjungan baru yang membawa UTM menggantikan data
//   lama (kampanye terbaru yang dipakai); kunjungan tanpa UTM mempertahankan yang lama.
// - getAttribution(): dikirim bersama formulir lead (objek `attribution` ke API); server menyaring dan menetapkan kanalnya sendiri.
// - trackEvent(): mengirim event GA4 lewat gtag bila tersedia (tidak error bila diblokir/dimatikan).
//
// Hanya data kampanye yang disimpan; tidak ada data pribadi. Perujuk dan halaman asal disimpan tanpa query string.

const STORAGE_KEY = 'ginnva_attribution_v1';
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  click_id?: string;
  landing_path?: string;
  referrer?: string;
};

type Stored = { savedAt: number; data: Attribution };

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
const CLICK_ID_KEYS = ['gclid', 'fbclid', 'ttclid', 'msclkid'] as const;

function readStored(): Stored | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed || typeof parsed.savedAt !== 'number' || Date.now() - parsed.savedAt > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function externalReferrer(): string | undefined {
  try {
    if (!document.referrer) return undefined;
    const url = new URL(document.referrer);
    if (url.host === window.location.host) return undefined;
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}

export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const fresh: Attribution = {};

    for (const key of UTM_KEYS) {
      const value = params.get(key)?.trim();
      if (value) fresh[key] = value.slice(0, 150);
    }

    for (const key of CLICK_ID_KEYS) {
      const value = params.get(key)?.trim();
      if (value) {
        fresh.click_id = value.slice(0, 191);
        break;
      }
    }

    const hasCampaign = Object.keys(fresh).length > 0;
    const existing = readStored();

    // Tanpa data kampanye baru: pertahankan yang lama bila masih berlaku; jika belum ada sama sekali, simpan perujuk/halaman asal
    // hanya kalau perujuknya eksternal (kunjungan dari luar), supaya navigasi internal tidak menimpa sumber asli.
    if (!hasCampaign) {
      if (existing) return;
      const referrer = externalReferrer();
      if (!referrer) return;
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ savedAt: Date.now(), data: { referrer, landing_path: window.location.pathname } } satisfies Stored),
      );
      return;
    }

    const data: Attribution = { ...fresh, landing_path: window.location.pathname };
    const referrer = externalReferrer();
    if (referrer) data.referrer = referrer;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), data } satisfies Stored));
  } catch {
    // localStorage bisa diblokir (mode privat); pengukuran bersifat tambahan, jangan pernah mengganggu halaman.
  }
}

export function getAttribution(): Attribution | undefined {
  try {
    const stored = readStored();
    if (stored && Object.keys(stored.data).length > 0) return stored.data;
  } catch {
    // diabaikan
  }
  return undefined;
}

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function trackEvent(name: string, params: Record<string, string | number | boolean | undefined> = {}): void {
  try {
    const gtag = (window as GtagWindow).gtag;
    if (typeof gtag === 'function') gtag('event', name, params);
  } catch {
    // diabaikan
  }
}
