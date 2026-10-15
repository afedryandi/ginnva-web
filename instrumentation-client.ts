// instrumentation-client.ts
// Sentry error tracking — sisi browser. Dieksekusi sebelum React hydration.
// DSN diambil dari env (kosong = Sentry nonaktif, tidak akan error).
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  tracesSampleRate: 0.2,
  // Noise dari browser dalam-aplikasi Instagram/Facebook: skrip yang mereka suntik ke halaman (mis. sendMessageToIFrames di
  // iOS, navigation_performance_logger_android di Android) memanggil postMessage ke iframe/bridge yang sudah tidak ada.
  // Bukan kode kita, tidak bisa diperbaiki dari sisi kita.
  ignoreErrors: [
    /evaluating 'e\.contentWindow\.postMessage'/,
    // iOS: skrip Instagram (sendDataToNative/sendPageShowMessage) memanggil jembatan native WebKit yang tidak ada di luar aplikasinya.
    /evaluating 'window\.webkit\.messageHandlers'/,
    /Error invoking postMessage: Java exception was raised during method invocation/,
  ],
  // Session Replay dimatikan default (biaya kuota Sentry free tier terbatas)
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0.1,
  integrations: [Sentry.replayIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;