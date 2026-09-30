import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { getEditorSession } from '@/lib/cms/auth';
import { cmsEnv } from '@/lib/cms/env';
import { isRemote } from '@/lib/cms/store';
import { UPLOAD_DIR } from '@/lib/cms/uploads';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 64 * 1024 * 1024;
const VIDEO = ['video/mp4', 'video/webm'];
const ALLOWED = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
];

/**
 * Image upload for the editor. Returns { url }.
 *  - CMS_API_URL set: forwards to `POST {CMS_API_URL}/media` (multipart, expects { url }).
 *  - otherwise: optimises with sharp and writes to public/uploads (dev only).
 */
export async function POST(req: Request) {
  const session = await getEditorSession();
  if (!session) {
    return NextResponse.json({ error: 'session_expired' }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File) || ![...ALLOWED, ...VIDEO].includes(file.type)) {
    return NextResponse.json({ error: 'invalid_file' }, { status: 400 });
  }
  const isVideo = VIDEO.includes(file.type);
  if (file.size > (isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES)) {
    return NextResponse.json({ error: 'file_too_large' }, { status: 413 });
  }

  if (isRemote()) {
    // Forward to the live backend; it returns the stored file's URL.
    const res = await fetch(cmsEnv.mediaUrl(), {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.token}` },
      body: form,
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'upload_failed' }, { status: 502 });
    }
    const j = await res.json().catch(() => ({}));
    const raw =
      j?.url ?? j?.data?.url ?? j?.location ?? j?.file?.url ?? j?.path;
    if (typeof raw !== 'string') {
      return NextResponse.json(
        { error: 'bad_media_response' },
        { status: 502 }
      );
    }
    const base = cmsEnv.mediaBase() || new URL(cmsEnv.apiUrl()).origin;
    return NextResponse.json({ url: new URL(raw, base).toString() });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const raw = file.type === 'image/gif' || isVideo;
  const out = raw
    ? buf
    : await sharp(buf)
        .rotate()
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
  const ext = isVideo ? file.type.split('/')[1] : raw ? 'gif' : 'webp';
  const name = `${randomUUID()}.${ext}`;
  const dir = UPLOAD_DIR;
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), out);
  return NextResponse.json({ url: `/uploads/${name}` });
}
