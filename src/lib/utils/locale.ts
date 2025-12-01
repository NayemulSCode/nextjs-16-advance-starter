import { locales, type Locale, getLocaleConfig } from '@/locales/config';

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCurrency(
  amount: number,
  locale: Locale,
  currencyOverride?: string
): string {
  const config = getLocaleConfig(locale);
  const currency = currencyOverride || config.currency;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(
  date: Date | string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    ...options,
  }).format(dateObj);
}

export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return getLocaleConfig(locale).dir;
}