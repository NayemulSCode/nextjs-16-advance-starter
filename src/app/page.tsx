// src/app/page.tsx
// Redirects root path to default locale

import { redirect } from 'next/navigation';
import { defaultLocale } from '@/locales/config';

export default function RootPage() {
  // User visits: yoursite.com
  // Redirects to: yoursite.com/en (or default locale)
  redirect(`/${defaultLocale}`);
}
