import path from 'path';

/** Local-mode media directory (served by /uploads/[name]). */
export const UPLOAD_DIR = path.join(process.cwd(), '.data', 'uploads');
export const MIME: Record<string, string> = {
  webp: 'image/webp',
  gif: 'image/gif',
  mp4: 'video/mp4',
  webm: 'video/webm',
};
