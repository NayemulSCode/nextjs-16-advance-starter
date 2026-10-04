'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

// Restores saved state after mount (avoids SSR/CSR mismatch) and mirrors
// language + theme onto <html>.
export function StoreHydrator() {
  const lang = useStore((s) => s.lang);
  const theme = useStore((s) => s.theme);

  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
  }, [lang, theme]);

  return null;
}
