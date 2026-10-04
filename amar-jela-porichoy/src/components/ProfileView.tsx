'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { computeBadges, districtProgress, triedDistricts } from '@/lib/progress';
import { useStore } from '@/lib/store';
import { useT, type Key } from '@/i18n';

// Share-card code (html-to-image) loads only when the profile page opens.
const ShareExport = dynamic(() => import('./ShareExport'), {
  ssr: false,
  loading: () => <div className="h-40 animate-pulse rounded-lg bg-line" />,
});

const CARD_FILL = { none: '#dce8de', some: '#8fcf9f', all: '#0b6b3a' };

export function ProfileView() {
  const { t, lang } = useT();
  const eatenList = useStore((s) => s.eaten);
  const best = useStore((s) => s.bestQuiz);
  const last = useStore((s) => s.lastQuiz);
  const reset = useStore((s) => s.reset);
  const eaten = useMemo(() => new Set(eatenList), [eatenList]);
  const tried = triedDistricts(eaten).length;
  const badges = computeBadges(eaten, best);
  const shown = last ?? best;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">{t('profile.title')}</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-card p-4">
          <p className="text-sm text-muted">{t('profile.food')}</p>
          <p className="text-2xl font-bold text-accent">{t('profile.foodValue', { n: tried, m: eaten.size })}</p>
        </div>
        <div className="rounded-xl border border-line bg-card p-4">
          <p className="text-sm text-muted">{t('profile.quiz')}</p>
          <p className="text-2xl font-bold text-accent">
            {shown ? t('profile.quizValue', { score: shown.score, total: shown.total }) : t('profile.quizNone')}
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-2 font-bold">{t('profile.badges')}</h2>
        <ul className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <li
              key={b.id}
              className={`rounded-full border px-3 py-1 text-sm ${
                b.earned ? 'border-accent bg-accent text-accent-fg' : 'border-line text-muted opacity-60'
              }`}
            >
              {t(b.labelKey as Key)}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 font-bold">{t('profile.share')}</h2>
        <ShareExport
          lang={lang}
          triedCount={tried}
          quiz={shown}
          fillFor={(id) => CARD_FILL[districtProgress(id, eaten)]}
        />
        <p className="mt-3 text-xs text-muted">{t('profile.privacy')}</p>
      </section>

      <button
        type="button"
        onClick={() => {
          if (window.confirm(t('profile.resetConfirm'))) reset();
        }}
        className="text-sm text-muted underline"
      >
        {t('profile.reset')}
      </button>
    </div>
  );
}
