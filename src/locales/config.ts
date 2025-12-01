export const locales = {
  en: {
    name: "English",
    nativeName: "English",
    dir: "ltr",
    flag: "🇺🇸",
    currency: "USD",
    dateFormat: "MM/dd/yyyy",
  },
  es: {
    name: "Spanish",
    nativeName: "Español",
    dir: "ltr",
    flag: "🇪🇸",
    currency: "EUR",
    dateFormat: "dd/MM/yyyy",
  },
  fr: {
    name: "French",
    nativeName: "Français",
    dir: "ltr",
    flag: "🇫🇷",
    currency: "EUR",
    dateFormat: "dd/MM/yyyy",
  },
  bn: {
    name: "Bangla",
    nativeName: "বাংলা",
    dir: "ltr",
    flag: "🇧🇩",
    currency: "BDT",
    dateFormat: "dd/MM/yyyy",
  },
  ar: {
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    flag: "🇸🇦",
    currency: "SAR",
    dateFormat: "dd/MM/yyyy",
  },
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'en';

export const localesList: Locale[] = Object.keys(locales) as Locale[];

export function getLocaleConfig(locale: Locale) {
  return locales[locale] || locales[defaultLocale];
}

export function isRTL(locale: Locale): boolean {
  return locales[locale]?.dir === 'rtl';
}