import { forwardRef } from 'react';
import { districts, mapData } from '@/lib/data';
import { num } from '@/i18n';
import type { Lang } from '@/lib/types';

export type CardVariant = 'portrait' | 'wide';
export const CARD_SIZE: Record<CardVariant, { w: number; h: number }> = {
  portrait: { w: 1080, h: 1350 },
  wide: { w: 1200, h: 630 },
};

interface Props {
  variant: CardVariant;
  lang: Lang;
  triedCount: number;
  quiz: { score: number; total: number } | null;
  fillFor: (districtId: string) => string;
}

// Theme-independent palette so exports look identical everywhere.
const C = { bg: '#f4f8f3', ink: '#14301f', green: '#0b6b3a', muted: '#5d7566' };

const copy = {
  en: { app: 'Amar Jela Pori-choy', food: 'districts of food', dialect: 'dialect score', cta: 'Find your district' },
  bn: { app: 'আমার জেলা পরিচয়', food: 'জেলার খাবার', dialect: 'ভাষা স্কোর', cta: 'নিজের জেলা খুঁজুন' },
};

export const ShareCard = forwardRef<HTMLDivElement, Props>(function ShareCard(
  { variant, lang, triedCount, quiz, fillFor },
  ref
) {
  const { w, h } = CARD_SIZE[variant];
  const wide = variant === 'wide';
  const c = copy[lang];

  const map = (
    <svg
      viewBox={mapData.viewBox}
      style={{ height: wide ? h - 160 : 520, width: 'auto' }}
      aria-hidden="true"
    >
      {districts.map((d) => (
        <path key={d.id} d={mapData.paths[d.id]} fill={fillFor(d.id)} stroke="#fff" strokeWidth={0.8} />
      ))}
    </svg>
  );

  const stat = (value: string, label: string) => (
    <div style={{ marginBottom: wide ? 24 : 28 }}>
      <div style={{ fontSize: wide ? 80 : 104, fontWeight: 800, lineHeight: 1, color: C.green }}>{value}</div>
      <div style={{ fontSize: wide ? 30 : 38, color: C.muted, marginTop: 8 }}>{label}</div>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        width: w,
        height: h,
        background: C.bg,
        color: C.ink,
        fontFamily: "'Noto Sans Bengali Variable', system-ui, sans-serif",
        padding: wide ? 48 : 72,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontSize: wide ? 44 : 64, fontWeight: 800, color: C.green }}>{c.app}</div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: wide ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: 32,
        }}
      >
        {map}
        <div style={{ textAlign: wide ? 'left' : 'center' }}>
          {stat(`${num(triedCount, lang)} / ${num(64, lang)}`, c.food)}
          {quiz && stat(`${num(quiz.score, lang)} / ${num(quiz.total, lang)}`, c.dialect)}
        </div>
      </div>
      <div style={{ fontSize: wide ? 28 : 36, color: C.muted }}>{c.cta}</div>
    </div>
  );
});
