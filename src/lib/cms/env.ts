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
  apiUrl: () => process.env.CMS_API_URL || '',
  siteUrl: () => process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

export const EDITOR_COOKIE = 'cms_editor_token';
