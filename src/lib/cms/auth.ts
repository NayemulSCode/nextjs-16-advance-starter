import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { cmsEnv, EDITOR_COOKIE } from './env';

export type EditorClaims = {
  sub: string;
  exp: number;
  name?: string;
  /** Optional: restrict the token to one page path (or "*" for all). */
  path?: string;
};

/** Verify a token from the admin app. Returns null when invalid/expired. */
export async function verifyEditorToken(
  token: string | undefined | null
): Promise<EditorClaims | null> {
  if (!token) return null;
  // A missing secret is a setup error, not a bad token: let it throw loudly.
  const key = cmsEnv.jwtSecret();
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
      issuer: cmsEnv.issuer(),
      audience: cmsEnv.audience(),
    });
    if (!payload.sub || !payload.exp) return null;
    return payload as unknown as EditorClaims;
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[cms] editor token rejected: ${(e as Error).message}`);
    }
    return null;
  }
}

/** Read the session set by /api/editor/session (server components / route handlers). */
export async function getEditorSession() {
  const token = (await cookies()).get(EDITOR_COOKIE)?.value;
  const claims = await verifyEditorToken(token);
  return claims ? { token: token as string, claims } : null;
}

export function pathAllowed(claims: EditorClaims, pagePath: string) {
  return !claims.path || claims.path === '*' || claims.path === pagePath;
}

export function adminRedirectUrl(pagePath: string) {
  const tpl = cmsEnv
    .adminRedirectPath()
    .replace('{path}', encodeURIComponent(pagePath));
  return new URL(tpl, cmsEnv.adminUrl()).toString();
}
