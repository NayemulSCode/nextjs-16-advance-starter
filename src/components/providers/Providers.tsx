// src/components/providers/Providers.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { getQueryClient } from '@/lib/query/client';
import { useEffect } from 'react';
import { getLocaleConfig, type Locale } from '@/locales/config';

export default function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const queryClient = getQueryClient();
  const localeConfig = getLocaleConfig(locale as Locale);

  // Set locale in localStorage for API calls & maintain direction
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);

      // Ensure document direction is set (fallback if HTML attr fails)
      if (document.documentElement.dir !== localeConfig.dir) {
        document.documentElement.dir = localeConfig.dir;
      }
    }
  }, [locale, localeConfig.dir]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        duration={4000}
        dir={localeConfig.dir}
      />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
