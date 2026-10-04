import { districts, foodsByDistrict } from './data';

export type Progress = 'none' | 'some' | 'all';

export function districtProgress(id: string, eaten: Set<string>): Progress {
  const items = foodsByDistrict.get(id) ?? [];
  const n = items.filter((f) => eaten.has(f.id)).length;
  if (n === 0) return 'none';
  return n === items.length ? 'all' : 'some';
}

export function triedDistricts(eaten: Set<string>): string[] {
  return districts
    .filter((d) => (foodsByDistrict.get(d.id) ?? []).some((f) => eaten.has(f.id)))
    .map((d) => d.id);
}

export function triedDivisions(eaten: Set<string>): Set<string> {
  const tried = new Set(triedDistricts(eaten));
  return new Set(districts.filter((d) => tried.has(d.id)).map((d) => d.division));
}

export interface Badge {
  id: string;
  labelKey: string;
  earned: boolean;
}

export function computeBadges(
  eaten: Set<string>,
  best: { score: number; total: number } | null
): Badge[] {
  const tried = triedDistricts(eaten);
  return [
    { id: 'first', labelKey: 'badge.firstBite', earned: eaten.size >= 1 },
    { id: 'ten', labelKey: 'badge.ten', earned: tried.length >= 10 },
    { id: 'half', labelKey: 'badge.half', earned: tried.length >= 32 },
    { id: 'eight', labelKey: 'badge.eight', earned: triedDivisions(eaten).size >= 8 },
    { id: 'doi', labelKey: 'badge.doi', earned: eaten.has('bogura-doi') },
    {
      id: 'perfect',
      labelKey: 'badge.perfect',
      earned: !!best && best.total >= 5 && best.score === best.total,
    },
  ];
}
