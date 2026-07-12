// instrumentation.ts
// Sentry error tracking — sisi server (Node.js runtime & Edge runtime).
import type { captureRequestError } from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      enabled: Boolean(process.env.SENTRY_DSN),
      tracesSampleRate: 0.2,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      enabled: Boolean(process.env.SENTRY_DSN),
      tracesSampleRate: 0.2,
    });
  }
}

export const onRequestError = async (...args: Parameters<typeof captureRequestError>) => {
  const Sentry = await import('@sentry/nextjs');
  Sentry.captureRequestError(...args);
};