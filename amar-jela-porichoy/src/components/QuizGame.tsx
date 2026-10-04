'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DistrictMap } from './DistrictMap';
import { districtById, quiz } from '@/lib/data';
import { useStore } from '@/lib/store';
import { useT } from '@/i18n';
import type { QuizQuestion } from '@/lib/types';

const ROUND = 10;

const shuffle = <T,>(a: T[]): T[] => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

interface Round {
  questions: QuizQuestion[];
  options: string[][];
}

function newRound(): Round {
  const questions = shuffle(quiz).slice(0, ROUND);
  const options = questions.map((q) =>
    shuffle([shuffle(q.answers)[0], ...shuffle(q.decoys).slice(0, 3)])
  );
  return { questions, options };
}

export function QuizGame() {
  const { t, lang } = useT();
  const recordQuiz = useStore((s) => s.recordQuiz);
  const [round, setRound] = useState<Round | null>(null);
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = round?.questions[index];
  const correct = useMemo(() => !!q && !!guess && q.answers.includes(guess), [q, guess]);
  const name = (id: string) => districtById.get(id)![lang];

  const start = () => {
    setRound(newRound());
    setIndex(0);
    setGuess(null);
    setScore(0);
    setDone(false);
  };

  const answer = (id: string) => {
    if (!q || guess) return;
    setGuess(id);
    if (q.answers.includes(id)) setScore((s) => s + 1);
  };

  const next = () => {
    if (!round) return;
    if (index + 1 >= round.questions.length) {
      recordQuiz({ score, total: round.questions.length });
      setDone(true);
    } else {
      setIndex(index + 1);
      setGuess(null);
    }
  };

  if (!round) {
    return (
      <section className="mx-auto max-w-xl text-center">
        <h1 className="text-xl font-bold">{t('quiz.title')}</h1>
        <p className="my-4 text-muted">{t('quiz.intro')}</p>
        <button
          type="button"
          onClick={start}
          className="rounded-md bg-accent px-6 py-3 font-semibold text-accent-fg"
        >
          {t('quiz.start')}
        </button>
      </section>
    );
  }

  if (done) {
    const total = round.questions.length;
    const ratio = score / total;
    const title = ratio >= 0.8 ? 'quiz.title.high' : ratio >= 0.5 ? 'quiz.title.mid' : 'quiz.title.low';
    return (
      <section className="mx-auto max-w-xl rounded-xl border border-line bg-card p-6 text-center">
        <p className="text-sm text-muted">{t('quiz.score', { score, total })}</p>
        <h1 className="my-2 text-3xl font-bold text-accent">{t(title)}</h1>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={start} className="rounded-md border border-line px-4 py-2">
            {t('quiz.again')}
          </button>
          <Link href="/profile" className="rounded-md bg-accent px-4 py-2 text-accent-fg">
            {t('quiz.toProfile')}
          </Link>
        </div>
      </section>
    );
  }

  const colorFor = (id: string) => {
    if (guess) {
      if (q!.answers.includes(id)) return 'var(--map-all)';
      if (id === guess) return 'var(--map-guess)';
    }
    return 'var(--map-empty)';
  };

  return (
    <section className="grid gap-6 md:grid-cols-[1fr_20rem]">
      <div className="md:order-2">
        <p className="text-sm text-muted">
          {t('quiz.q', { n: index + 1, total: round.questions.length })}
        </p>
        <p className="my-3 rounded-xl border border-line bg-card p-4 text-2xl font-bold" lang="bn">
          {q!.text_bn}
        </p>
        {lang === 'en' && <p className="mb-3 text-sm text-muted">{q!.text_en}</p>}

        <p className="mb-2 text-sm font-medium">{t('quiz.options')}</p>
        <div className="grid grid-cols-2 gap-2">
          {round.options[index].map((id) => (
            <button
              key={id}
              type="button"
              disabled={!!guess}
              onClick={() => answer(id)}
              className={`rounded-md border px-3 py-3 font-medium disabled:cursor-default ${
                guess && q!.answers.includes(id)
                  ? 'border-accent bg-accent text-accent-fg'
                  : guess === id
                    ? 'border-[var(--map-guess)] bg-[var(--map-guess)] text-white'
                    : 'border-line bg-card'
              }`}
            >
              {name(id)}
            </button>
          ))}
        </div>

        {guess && (
          <div className="mt-4 rounded-xl border border-line bg-card p-4 text-sm" aria-live="polite">
            <p className="text-base font-bold">{correct ? t('quiz.correct') : t('quiz.wrong')}</p>
            <p className="mt-1">{t('quiz.reveal', { names: q!.answers.map(name).join(', ') })}</p>
            {q!.answers.length > 1 && <p className="mt-1 text-muted">{t('quiz.shared')}</p>}
            <p className="mt-1 text-muted">{lang === 'bn' ? q!.note_bn : q!.note_en}</p>
            {!q!.verified && <p className="mt-1 text-xs italic text-muted">{t('quiz.unverified')}</p>}
            {!correct && (
              <Link
                href={`/?district=${q!.answers[0]}`}
                className="mt-2 inline-block text-accent underline"
              >
                {t('quiz.seeFood', { name: name(q!.answers[0]) })}
              </Link>
            )}
            <button
              type="button"
              onClick={next}
              className="mt-3 block w-full rounded-md bg-accent px-3 py-2 font-medium text-accent-fg"
            >
              {index + 1 >= round.questions.length ? t('quiz.finish') : t('quiz.next')}
            </button>
          </div>
        )}
      </div>
      <div className="md:order-1">
        <DistrictMap selected={guess ? [guess] : []} onToggle={answer} colorFor={colorFor} />
        {guess && (
          <ul className="mt-3 flex gap-4 text-xs text-muted">
            <li className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm" style={{ background: 'var(--map-all)' }} />{t('quiz.legend.right')}</li>
            {!correct && <li className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm" style={{ background: 'var(--map-guess)' }} />{t('quiz.legend.guess')}</li>}
          </ul>
        )}
      </div>
    </section>
  );
}
