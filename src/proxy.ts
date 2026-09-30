import { NextResponse, type NextRequest } from 'next/server';
import { verifyEditorToken, adminRedirectUrl } from '@/lib/cms/auth';
import { cmsEnv, EDITOR_COOKIE } from '@/lib/cms/env';
import { slugToPath } from '@/lib/cms/paths';

/**
 * Guards /editor/*.
 *  1. Admin links to /editor/<page>?token=<JWT>  -> token is verified, stored in an
 *     httpOnly cookie (lifetime = token exp, capped by EDITOR_SESSION_MAX_AGE) and the
 *     token is stripped from the URL.
 *  2. Otherwise the cookie must hold a valid token, else the user is sent back to the admin.
 */
export async function proxy(req: NextRequest) {
  if (!process.env.EDITOR_JWT_SECRET) {
    return new NextResponse(
      'EDITOR_JWT_SECRET is not set. Copy .env.example to .env.local, set it to the same value used to sign the token, then restart the dev server.',
      { status: 500 }
    );
  }
  const { pathname, searchParams } = req.nextUrl;
  const pagePath = slugToPath(pathname.replace(/^\/editor\/?/, '').split('/'));

  const urlToken = searchParams.get('token');
  if (urlToken) {
    const claims = await verifyEditorToken(urlToken);
    if (!claims) return NextResponse.redirect(adminRedirectUrl(pagePath));

    const clean = req.nextUrl.clone();
    clean.searchParams.delete('token');
    const res = NextResponse.redirect(clean);
    res.cookies.set(EDITOR_COOKIE, urlToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: Math.min(
        claims.exp - Math.floor(Date.now() / 1000),
        cmsEnv.maxAge()
      ),
    });
    return res;
  }

  const claims = await verifyEditorToken(req.cookies.get(EDITOR_COOKIE)?.value);
  if (!claims) return NextResponse.redirect(adminRedirectUrl(pagePath));
  return NextResponse.next();
}

export const config = { matcher: ['/editor/:path*'] };
