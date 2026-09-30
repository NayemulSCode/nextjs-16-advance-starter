import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Render } from '@puckeditor/core/rsc';
import { config } from '@/puck/config';
import { getPage } from '@/lib/cms/store';
import { isSafePath, slugToPath } from '@/lib/cms/paths';
import { pageMetadata } from '@/lib/cms/seo';

type Params = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const path = slugToPath((await params).slug);
  const page = isSafePath(path) ? await getPage(path) : null;
  return page ? pageMetadata(page.data, path) : {};
}

export default async function CmsPage({ params }: Params) {
  const path = slugToPath((await params).slug);
  const page = isSafePath(path) ? await getPage(path) : null;
  if (!page) notFound();
  return <Render config={config} data={page.data} />;
}
