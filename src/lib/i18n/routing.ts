import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { localesList, defaultLocale } from '@/locales/config';

export const routing = defineRouting({
  locales: localesList,
  defaultLocale: defaultLocale,
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/tours': '/tours',
    '/hotels': '/hotels',
    '/buses': '/buses',
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);