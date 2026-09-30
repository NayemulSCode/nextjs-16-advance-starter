export const cmsEnv = {
  jwtSecret: () => {
    const s = process.env.EDITOR_JWT_SECRET;
    if (!s) throw new Error('EDITOR_JWT_SECRET is not set');
    return new TextEncoder().encode(s);
  },
  issuer: () => process.env.EDITOR_JWT_ISSUER || undefined,
  audience: () => process.env.EDITOR_JWT_AUDIENCE || undefined,
  maxAge: () => Number(process.env.EDITOR_SESSION_MAX_AGE) || 1800,
  adminUrl: () => process.env.ADMIN_URL || 'http://localhost:4000',
  adminRedirectPath: () =>
    process.env.ADMIN_REDIRECT_PATH || '/pages/edit?path={path}',
  /** Empty = local mode (files in .data / public/uploads). Set = use the live backend. */
  apiUrl: () => (process.env.CMS_API_URL || '').replace(/\/+$/, ''),
  pagesPath: () => process.env.CMS_PAGES_PATH || '/pages',
  /** Full URL override, else {CMS_API_URL}{CMS_MEDIA_PATH}. */
  mediaUrl: () =>
    process.env.CMS_MEDIA_URL ||
    `${(process.env.CMS_API_URL || '').replace(/\/+$/, '')}${process.env.CMS_MEDIA_PATH || '/media'}`,
  /** Prefix for relative media URLs returned by the backend (default: API origin). */
  mediaBase: () => process.env.CMS_MEDIA_BASE_URL || '',
  /** Optional server-to-server key for reading published pages (X-API-Key). */
  apiKey: () => process.env.CMS_API_KEY || '',
  revalidateSeconds: () => Number(process.env.CMS_REVALIDATE_SECONDS ?? 60),
  revalidateSecret: () => process.env.CMS_REVALIDATE_SECRET || '',
  siteUrl: () => process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

export const EDITOR_COOKIE = 'cms_editor_token';
