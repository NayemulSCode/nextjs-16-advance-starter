import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getEditorSession, pathAllowed } from '@/lib/cms/auth';
import { isSafePath } from '@/lib/cms/paths';
import { savePage } from '@/lib/cms/store';

/** Publish from the editor. Body: { path: string, data: PuckData } */
export async function PUT(req: Request) {
  const session = await getEditorSession();
  if (!session) {
    return NextResponse.json({ error: 'session_expired' }, { status: 401 });
  }

  const { path, data } = await req.json().catch(() => ({}));
  if (typeof path !== 'string' || !isSafePath(path) || !data?.content) {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }
  if (!pathAllowed(session.claims, path)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  try {
    const record = await savePage(path, data, session.token);
    revalidatePath(path);
    return NextResponse.json({ ok: true, updatedAt: record.updatedAt });
  } catch {
    return NextResponse.json({ error: 'save_failed' }, { status: 502 });
  }
}
