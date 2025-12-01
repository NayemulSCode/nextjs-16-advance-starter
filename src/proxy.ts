import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware({
  ...routing,
  localeDetection: true,
  alternateLinks: true,
});

export const config = {
  matcher: [
    '/',
    '/(en|es|fr|bn|ar)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};