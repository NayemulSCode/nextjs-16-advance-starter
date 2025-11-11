import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'bn'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/tours': {
      en: '/tours',
      es: '/tours',
      fr: '/tours',
      bn: '/tours',
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);