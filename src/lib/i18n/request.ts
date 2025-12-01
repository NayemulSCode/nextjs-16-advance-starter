import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { localesList } from '@/locales/config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !localesList.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../../public/locales/${locale}/common.json`))
      .default,
    timeZone: 'UTC',
    now: new Date(),
  };
});