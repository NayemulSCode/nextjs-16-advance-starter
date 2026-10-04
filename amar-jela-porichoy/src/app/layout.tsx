import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/noto-sans-bengali';
import './globals.css';
import { Header } from '@/components/Header';
import { StoreHydrator } from '@/components/StoreHydrator';

export const metadata: Metadata = {
  title: 'আমার জেলা পরিচয় · Amar Jela Pori-choy',
  description:
    'Tick the districts whose famous food you have eaten, guess the district from a word, and share your Bangladesh card. / ৬৪ জেলার খাবার ম্যাপ ও ভাষা কুইজ।',
  openGraph: {
    title: 'আমার জেলা পরিচয় · Amar Jela Pori-choy',
    description: 'Food map + dialect quiz for all 64 districts of Bangladesh.',
    locale: 'bn_BD',
    type: 'website',
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <StoreHydrator />
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 pb-8 text-xs text-muted">
          <p>Boundaries: geoBoundaries (CC BY 4.0) · সীমানা: geoBoundaries</p>
        </footer>
      </body>
    </html>
  );
}
