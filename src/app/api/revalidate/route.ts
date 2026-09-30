import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cmsEnv } from '@/lib/cms/env';
import { isSafePath } from '@/lib/cms/paths';

/**
 * Webhook for the backend: call after a page changes so the live site updates immediately.
 *   POST /api/revalidate   header: x-revalidate-secret: <CMS_REVALIDATE_SECRET>
 *   body: { "path": "/about" }   (omit path to refresh every page)
 */
export async function POST(req: Request) {
  const secret = cmsEnv.revalidateSecret();
  if (!secret || req.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { path } = await req.json().catch(() => ({}));
  if (path !== undefined) {
    if (typeof path !== 'string' || !isSafePath(path)) {
      return NextResponse.json({ error: 'invalid_path' }, { status: 400 });
    }
    revalidatePath(path);
  }
  revalidateTag('cms-pages', 'max');
  return NextResponse.json({ ok: true });
}
