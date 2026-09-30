import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { cmsEnv } from './env';
import type { PageData, PageRecord } from './types';

/**
 * Page storage with two interchangeable modes:
 *  - local  (CMS_API_URL empty): JSON files in ./.data/pages  – works out of the box
 *  - remote (CMS_API_URL set):   your admin/backend REST API
 *
 * Remote contract (paths configurable via CMS_PAGES_PATH):
 *   GET {api}{pages}?path=/about -> { path, data } | { page: { data } } | Puck data | 404
 *   PUT {api}{pages}             -> body { path, data, updatedAt }
 */
const DIR = path.join(process.cwd(), '.data', 'pages');
const file = (p: string) =>
  path.join(
    DIR,
    (p === '/' ? 'index' : p.slice(1).replace(/\//g, '__')) + '.json'
  );

export const isRemote = () => !!cmsEnv.apiUrl();

/** Accept the common response shapes so the backend does not have to match exactly. */
function toRecord(pagePath: string, json: unknown): PageRecord | null {
  const j = json as Record<string, unknown> | null;
  if (!j || typeof j !== 'object') return null;
  const inner = (j.page ?? j) as Record<string, unknown>;
  const data = (inner.data ??
    (inner.content ? inner : null)) as PageData | null;
  if (!data || !Array.isArray((data as PageData).content)) return null;
  return {
    path: (inner.path as string) ?? pagePath,
    data,
    updatedAt: inner.updatedAt as string | undefined,
  };
}

/**
 * @param token editor token: reads through the editor use it (no cache, sees drafts);
 *              public reads omit it and are cached for CMS_REVALIDATE_SECONDS.
 */
export async function getPage(
  pagePath: string,
  token?: string
): Promise<PageRecord | null> {
  if (isRemote()) {
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    else if (cmsEnv.apiKey()) headers['X-API-Key'] = cmsEnv.apiKey();
    const res = await fetch(
      `${cmsEnv.apiUrl()}${cmsEnv.pagesPath()}?path=${encodeURIComponent(pagePath)}`,
      {
        headers,
        ...(token
          ? { cache: 'no-store' as const }
          : {
              next: {
                revalidate: cmsEnv.revalidateSeconds(),
                tags: ['cms-pages'],
              },
            }),
      }
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`CMS API ${res.status}`);
    return toRecord(pagePath, await res.json());
  }
  try {
    return JSON.parse(await fs.readFile(file(pagePath), 'utf8'));
  } catch {
    return null;
  }
}

export async function savePage(
  pagePath: string,
  data: PageData,
  token: string
): Promise<PageRecord> {
  const record: PageRecord = {
    path: pagePath,
    data,
    updatedAt: new Date().toISOString(),
  };
  if (isRemote()) {
    const res = await fetch(`${cmsEnv.apiUrl()}${cmsEnv.pagesPath()}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error(`CMS API ${res.status}`);
    return record;
  }
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(file(pagePath), JSON.stringify(record, null, 2));
  return record;
}
