import { redirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getEditorSession,
  pathAllowed,
  adminRedirectUrl,
} from '@/lib/cms/auth';
import { cmsEnv } from '@/lib/cms/env';
import { isSafePath, slugToPath } from '@/lib/cms/paths';
import { getPage } from '@/lib/cms/store';
import { emptyPage, homeTemplate } from '@/puck/codeware/home';
import { Editor } from './editor';

export const metadata: Metadata = {
  title: 'Page editor',
  robots: { index: false },
};
export const dynamic = 'force-dynamic';

export default async function EditorPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const path = slugToPath((await params).slug);
  if (!isSafePath(path)) notFound();

  const session = await getEditorSession();
  if (!session) redirect(adminRedirectUrl(path));
  if (!pathAllowed(session.claims, path)) notFound();

  const page = await getPage(path, session.token);

  return (
    <Editor
      path={path}
      initialData={page?.data ?? (path === '/' ? homeTemplate() : emptyPage())}
      adminUrl={cmsEnv.adminUrl()}
      expiresAt={session.claims.exp}
    />
  );
}
