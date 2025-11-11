'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations('common');
  const router = useRouter();

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">{t('errorTitle')}</h2>
          <p className="text-muted-foreground mb-6">{t('errorMessage')}</p>

          <div className="flex gap-3">
            <button
              onClick={() => reset()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
            >
              {t('tryAgain')}
            </button>
            <button
              onClick={() => router.push('/')}
              className="border-primary text-primary hover:bg-primary/10 rounded-md border px-4 py-2"
            >
              {t('goHome')}
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
