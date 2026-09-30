import type { Metadata } from 'next';
import { Render } from '@puckeditor/core/rsc';
import { config } from '@/puck/config';
import { homeTemplate } from '@/puck/codeware/home';
import { getPage } from '@/lib/cms/store';
import { pageMetadata } from '@/lib/cms/seo';

// Home is CMS-managed. Until it is first published, the approved Codeware design is served.
const load = async () => (await getPage('/'))?.data ?? homeTemplate();

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await load(), '/');
}

export default async function Home() {
  return <Render config={config} data={await load()} />;
}
