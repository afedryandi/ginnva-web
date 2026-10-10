// instrumentation-client.ts
// Sentry error tracking — sisi browser. Dieksekusi sebelum React hydration.
// DSN diambil dari env (kosong = Sentry nonaktif, tidak akan error).
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  tracesSampleRate: 0.2,
  // Noise dari browser dalam-aplikasi Instagram/Facebook: skrip yang mereka suntik ke halaman memanggil
  // sendMessageToIFrames() pada iframe yang sudah tidak ada. Bukan kode kita, tidak bisa diperbaiki dari sisi kita.
  ignoreErrors: [/evaluating 'e\.contentWindow\.postMessage'/],
  // Session Replay dimatikan default (biaya kuota Sentry free tier terbatas)
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0.1,
  integrations: [Sentry.replayIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;