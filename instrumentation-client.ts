// instrumentation-client.ts
// Sentry error tracking — sisi browser. Dieksekusi sebelum React hydration.
// DSN diambil dari env (kosong = Sentry nonaktif, tidak akan error).
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  tracesSampleRate: 0.2,
  // Session Replay dimatikan default (biaya kuota Sentry free tier terbatas)
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0.1,
  integrations: [Sentry.replayIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;