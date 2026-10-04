'use client';

import { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { CARD_SIZE, ShareCard, type CardVariant } from './ShareCard';
import { useT } from '@/i18n';
import type { Lang } from '@/lib/types';

interface Props {
  lang: Lang;
  triedCount: number;
  quiz: { score: number; total: number } | null;
  fillFor: (id: string) => string;
}

export default function ShareExport(props: Props) {
  const { t } = useT();
  const [variant, setVariant] = useState<CardVariant>('portrait');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [scale, setScale] = useState(0.3);
  const cardRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const { w, h } = CARD_SIZE[variant];

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / w)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  const render = async (): Promise<Blob> => {
    await document.fonts.ready;
    const node = cardRef.current!;
    const opts = { width: w, height: h, pixelRatio: 1, cacheBust: true, style: { transform: 'none' } };
    // Some mobile browsers draw fonts/images only on the second pass.
    await toPng(node, opts);
    const url = await toPng(node, opts);
    return (await fetch(url)).blob();
  };

  const run = async (share: boolean) => {
    setBusy(true);
    setError(false);
    try {
      const blob = await render();
      const file = new File([blob], `amar-jela-porichoy-${variant}.png`, { type: 'image/png' });
      if (share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: t('appName') });
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = file.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) setError(true);
    } finally {
      setBusy(false);
    }
  };

  const canShare = typeof navigator !== 'undefined' && !!navigator.canShare;

  return (
    <div>
      <div className="mb-3 flex gap-2" role="group">
        {(['portrait', 'wide'] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={variant === v}
            onClick={() => setVariant(v)}
            className={`flex-1 rounded-md border px-2 py-2 text-sm ${
              variant === v ? 'border-accent bg-accent text-accent-fg' : 'border-line bg-card'
            }`}
          >
            {t(v === 'portrait' ? 'profile.portrait' : 'profile.wide')}
          </button>
        ))}
      </div>
      <div ref={boxRef} className="w-full max-w-md overflow-hidden rounded-lg border border-line" style={{ height: h * scale }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: w, height: h }}>
          <ShareCard ref={cardRef} variant={variant} {...props} />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button type="button" disabled={busy} onClick={() => run(false)} className="rounded-md bg-accent px-4 py-2 font-medium text-accent-fg disabled:opacity-60">
          {busy ? t('profile.exporting') : t('profile.download')}
        </button>
        {canShare && (
          <button type="button" disabled={busy} onClick={() => run(true)} className="rounded-md border border-line bg-card px-4 py-2 font-medium disabled:opacity-60">
            {t('profile.shareBtn')}
          </button>
        )}
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{t('profile.exportFail')}</p>}
    </div>
  );
}
