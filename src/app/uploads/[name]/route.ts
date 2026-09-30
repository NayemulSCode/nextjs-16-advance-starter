import { promises as fs } from 'fs';
import path from 'path';
import { MIME, UPLOAD_DIR } from '@/lib/cms/uploads';

/** Serves locally uploaded media (local mode). Works in dev and after `next build`. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const m = /^[a-f0-9-]{36}\.(webp|gif|mp4|webm)$/.exec(name);
  if (!m) return new Response('Not found', { status: 404 });
  try {
    const buf = await fs.readFile(path.join(UPLOAD_DIR, name));
    return new Response(new Uint8Array(buf), {
      headers: {
        'Content-Type': MIME[m[1]],
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
