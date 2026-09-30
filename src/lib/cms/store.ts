import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { cmsEnv } from './env';
import type { PageData, PageRecord } from './types';

const DIR = path.join(process.cwd(), '.data', 'pages');
const file = (p: string) =>
  path.join(
    DIR,
    (p === '/' ? 'index' : p.slice(1).replace(/\//g, '__')) + '.json'
  );

/**
 * Page storage. Uses the admin's REST API when CMS_API_URL is set,
 * otherwise a local JSON file store (development only).
 */
export async function getPage(
  pagePath: string,
  token?: string
): Promise<PageRecord | null> {
  const api = cmsEnv.apiUrl();
  if (api) {
    const res = await fetch(
      `${api}/pages?path=${encodeURIComponent(pagePath)}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: 'no-store',
      }
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`CMS API ${res.status}`);
    return (await res.json()) as PageRecord;
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
  const api = cmsEnv.apiUrl();
  if (api) {
    const res = await fetch(`${api}/pages`, {
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
