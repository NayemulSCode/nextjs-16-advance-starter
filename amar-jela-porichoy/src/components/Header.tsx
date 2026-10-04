'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useT, type Key } from '@/i18n';
import type { Theme } from '@/lib/types';

const links: { href: string; key: Key }[] = [
  { href: '/', key: 'nav.food' },
  { href: '/quiz', key: 'nav.quiz' },
  { href: '/profile', key: 'nav.profile' },
];
const themes: Theme[] = ['delta', 'sunrise', 'night'];

export function Header() {
  const { t, lang } = useT();
  const pathname = usePathname();
  const setLang = useStore((s) => s.setLang);
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);

  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link href="/" className="mr-auto leading-tight">
          <span className="block text-lg font-bold text-accent">{t('appName')}</span>
          <span className="block text-xs text-muted">{t('tagline')}</span>
        </Link>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="theme">
            {t('theme')}
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="rounded-md border border-line bg-bg px-2 py-1 text-sm"
          >
            {themes.map((x) => (
              <option key={x} value={x}>
                {t(`theme.${x}` as Key)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            title={t('lang')}
            lang={lang === 'bn' ? 'en' : 'bn'}
            className="rounded-md border border-line bg-bg px-3 py-1 text-sm font-medium"
          >
            {lang === 'bn' ? 'English' : 'বাংলা'}
          </button>
        </div>
        <nav className="flex w-full gap-1" aria-label="Main">
          {links.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`flex-1 rounded-md px-3 py-2 text-center text-sm font-medium ${
                  active ? 'bg-accent text-accent-fg' : 'hover:bg-bg'
                }`}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
