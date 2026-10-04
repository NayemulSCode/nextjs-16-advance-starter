'use client';

import { memo, useState } from 'react';
import { districtById, districts, mapData } from '@/lib/data';
import { useT } from '@/i18n';

interface Props {
  selected?: string[];
  onToggle: (id: string) => void;
  colorFor: (id: string) => string;
}

const ZOOMS = [1, 1.6, 2.4, 3.6];

function DistrictMapBase({ selected = [], onToggle, colorFor }: Props) {
  const { t, lang } = useT();
  const [zoom, setZoom] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const sel = new Set(selected);
  const name = (id: string) => districtById.get(id)?.[lang] ?? id;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2 text-sm">
        <span className="min-h-5 font-medium" aria-live="polite">
          {hover ? name(hover) : ' '}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label={t('map.zoomOut')}
            disabled={zoom === 0}
            onClick={() => setZoom((z) => Math.max(0, z - 1))}
            className="h-8 w-8 rounded-md border border-line bg-card disabled:opacity-40"
          >
            −
          </button>
          <button
            type="button"
            aria-label={t('map.zoomIn')}
            disabled={zoom === ZOOMS.length - 1}
            onClick={() => setZoom((z) => Math.min(ZOOMS.length - 1, z + 1))}
            className="h-8 w-8 rounded-md border border-line bg-card disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
      <div className="max-h-[70vh] overflow-auto rounded-xl border border-line bg-card p-2">
        <svg
          role="group"
          aria-label={t('map.label')}
          viewBox={mapData.viewBox}
          style={{ width: `${ZOOMS[zoom] * 100}%`, maxWidth: 'none', height: 'auto' }}
          className="mx-auto block"
        >
          {districts.map((d) => (
            <path
              key={d.id}
              d={mapData.paths[d.id]}
              className="district"
              role="button"
              tabIndex={0}
              aria-label={d[lang]}
              aria-pressed={sel.has(d.id)}
              fill={colorFor(d.id)}
              style={sel.has(d.id) ? { stroke: 'var(--map-focus)', strokeWidth: 2.5 } : undefined}
              onClick={() => onToggle(d.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggle(d.id);
                }
              }}
              onMouseEnter={() => setHover(d.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(d.id)}
              onBlur={() => setHover(null)}
            >
              <title>{d[lang]}</title>
            </path>
          ))}
        </svg>
      </div>
    </div>
  );
}

export const DistrictMap = memo(DistrictMapBase);
