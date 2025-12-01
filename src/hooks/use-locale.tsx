'use client';

import { useLocale as useNextIntlLocale } from 'next-intl';
import { getLocaleConfig, type Locale } from '@/locales/config';
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils/locale';

export function useLocale() {
  const locale = useNextIntlLocale() as Locale;
  const config = getLocaleConfig(locale);

  return {
    locale,
    config,
    isRTL: config.dir === 'rtl',
    currency: config.currency,
    formatCurrency: (amount: number, currency?: string) =>
      formatCurrency(amount, locale, currency),
    formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) =>
      formatDate(date, locale, options),
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) =>
      formatNumber(value, locale, options),
  };
}
