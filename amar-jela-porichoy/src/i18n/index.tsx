'use client';

import bn from './bn.json';
import en from './en.json';
import { useStore } from '@/lib/store';
import type { Lang } from '@/lib/types';

export type Key = keyof typeof en;
const dict: Record<Lang, Record<string, string>> = { en, bn };

const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const num = (n: number | string, lang: Lang) =>
  lang === 'bn' ? String(n).replace(/\d/g, (d) => bnDigits[Number(d)]) : String(n);

export function useT() {
  const lang = useStore((s) => s.lang);
  const t = (key: Key, vars?: Record<string, string | number>) => {
    let s = dict[lang][key] ?? dict.en[key] ?? key;
    if (vars)
      for (const [k, v] of Object.entries(vars))
        s = s.replaceAll(`{${k}}`, num(v, lang));
    return s;
  };
  return { t, lang };
}
