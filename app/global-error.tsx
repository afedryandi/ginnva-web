'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import NextError from 'next/error';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* NextError adalah komponen default Next.js untuk halaman error, dipakai di sini sebagai fallback minimal. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}