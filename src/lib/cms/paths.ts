/** Normalise URL slug segments into a page path like "/about/team". */
export function slugToPath(slug?: string[]) {
  const segs = (slug ?? []).map((s) => decodeURIComponent(s)).filter(Boolean);
  return '/' + segs.join('/');
}

export function isSafePath(p: string) {
  return /^\/[a-z0-9\-_/]*$/i.test(p) && !p.includes('//') && !p.includes('..');
}
