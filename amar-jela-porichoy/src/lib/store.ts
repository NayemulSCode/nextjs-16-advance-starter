'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Lang, Theme } from './types';

export const STORAGE_KEY = 'ajp:v1';

export interface QuizResult {
  score: number;
  total: number;
}

interface State {
  lang: Lang;
  theme: Theme;
  eaten: string[];
  lastQuiz: QuizResult | null;
  bestQuiz: QuizResult | null;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  toggleFood: (foodId: string) => void;
  recordQuiz: (r: QuizResult) => void;
  reset: () => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      lang: 'bn',
      theme: 'delta',
      eaten: [],
      lastQuiz: null,
      bestQuiz: null,
      setLang: (lang) => set({ lang }),
      setTheme: (theme) => set({ theme }),
      toggleFood: (id) =>
        set((s) => ({
          eaten: s.eaten.includes(id)
            ? s.eaten.filter((x) => x !== id)
            : [...s.eaten, id],
        })),
      recordQuiz: (r) =>
        set((s) => ({
          lastQuiz: r,
          bestQuiz:
            !s.bestQuiz || r.score / r.total > s.bestQuiz.score / s.bestQuiz.total
              ? r
              : s.bestQuiz,
        })),
      reset: () => set({ eaten: [], lastQuiz: null, bestQuiz: null }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        lang: s.lang,
        theme: s.theme,
        eaten: s.eaten,
        lastQuiz: s.lastQuiz,
        bestQuiz: s.bestQuiz,
      }),
    }
  )
);
