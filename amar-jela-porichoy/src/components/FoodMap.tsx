'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { DistrictMap } from './DistrictMap';
import { districtById, districts, foodsByDistrict } from '@/lib/data';
import { districtProgress, triedDistricts } from '@/lib/progress';
import { useStore } from '@/lib/store';
import { useT, type Key } from '@/i18n';

// Set NEXT_PUBLIC_SUGGEST_URL to a form or mailto: link; the default opens a blank prefilled email.
const SUGGEST =
  process.env.NEXT_PUBLIC_SUGGEST_URL ??
  'mailto:?subject=Suggest%20a%20food&body=District%3A%20%0AFood%3A%20%0ANote%3A%20';

export function FoodMap() {
  const { t, lang } = useT();
  const params = useSearchParams();
  const initial = params.get('district');
  const [focus, setFocus] = useState<string | null>(
    initial && districtById.has(initial) ? initial : null
  );
  const eatenList = useStore((s) => s.eaten);
  const toggleFood = useStore((s) => s.toggleFood);
  const eaten = useMemo(() => new Set(eatenList), [eatenList]);

  const colorFor = (id: string) =>
    ({ none: 'var(--map-empty)', some: 'var(--map-some)', all: 'var(--map-all)' })[
      districtProgress(id, eaten)
    ];
  const items = focus ? (foodsByDistrict.get(focus) ?? []) : [];
  const tried = triedDistricts(eaten).length;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_20rem]">
      <section>
        <h1 className="text-xl font-bold">{t('food.title')}</h1>
        <p className="mb-3 text-sm text-muted">{t('food.hint')}</p>
        <p className="mb-3 inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold text-accent-fg">
          {t('food.counter', { n: tried })}
        </p>
        <DistrictMap
          selected={focus ? [focus] : []}
          onToggle={setFocus}
          colorFor={colorFor}
        />
        <ul className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
          {(['none', 'some', 'all'] as const).map((p) => (
            <li key={p} className="flex items-center gap-1">
              <span
                className="inline-block h-3 w-3 rounded-sm border border-line"
                style={{ background: `var(--map-${p === 'none' ? 'empty' : p})` }}
              />
              {t(`food.progress.${p}` as Key)}
            </li>
          ))}
        </ul>
      </section>

      <aside className="h-fit rounded-xl border border-line bg-card p-4">
        <label htmlFor="district" className="mb-1 block text-sm font-medium">
          {t('food.pick')}
        </label>
        <select
          id="district"
          value={focus ?? ''}
          onChange={(e) => setFocus(e.target.value || null)}
          className="mb-4 w-full rounded-md border border-line bg-bg px-2 py-2"
        >
          <option value="">—</option>
          {[...districts]
            .sort((a, b) => a[lang].localeCompare(b[lang], lang))
            .map((d) => (
              <option key={d.id} value={d.id}>
                {d[lang]}
              </option>
            ))}
        </select>

        {!focus ? (
          <p className="text-sm text-muted">{t('food.pickFirst')}</p>
        ) : (
          <div>
            <h2 className="text-lg font-bold">{districtById.get(focus)![lang]}</h2>
            <ul className="mt-2 space-y-3">
              {items.map((f) => (
                <li key={f.id}>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={eaten.has(f.id)}
                      onChange={() => toggleFood(f.id)}
                      className="mt-1 h-5 w-5 accent-[var(--accent)]"
                    />
                    <span>
                      <span className="block font-medium">{f[lang]}</span>
                      <span className="block text-sm text-muted">
                        {lang === 'bn' ? f.note_bn : f.note_en}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            {items.some((f) => eaten.has(f.id)) && (
              <Link
                href="/quiz"
                className="mt-4 block rounded-md bg-accent px-3 py-2 text-center text-sm font-medium text-accent-fg"
              >
                {t('food.tryQuiz')}
              </Link>
            )}
          </div>
        )}
        <a href={SUGGEST} className="mt-4 block text-sm text-accent underline">
          {t('food.suggest')}
        </a>
      </aside>
    </div>
  );
}
