// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { localesList, getLocaleConfig, type Locale } from '@/locales/config';
import Providers from '@/components/providers/Providers';

export function generateStaticParams() {
  return localesList.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const config = getLocaleConfig(locale as Locale);

  return {
    alternates: {
      languages: Object.fromEntries(localesList.map((loc) => [loc, `/${loc}`])),
    },
    other: {
      'accept-language': locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!localesList.includes(locale as Locale)) {
    notFound();
  }

  // Get locale configuration
  const localeConfig = getLocaleConfig(locale as Locale);
  const direction = localeConfig.dir;

  // Load messages
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers locale={locale}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
