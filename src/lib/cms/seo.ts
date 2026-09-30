import type { Metadata } from 'next';
import type { RootProps } from '@/puck/config';
import type { PageData } from './types';
import { cmsEnv } from './env';

export function pageMetadata(data: PageData, pagePath: string): Metadata {
  const r: Partial<RootProps> = data.root?.props ?? {};
  const canonical =
    r.canonical || new URL(pagePath, cmsEnv.siteUrl()).toString();
  return {
    title: r.title || undefined,
    description: r.description || undefined,
    keywords: r.keywords || undefined,
    alternates: { canonical },
    robots: r.noindex === 'yes' ? { index: false, follow: false } : undefined,
    openGraph: {
      title: r.title || undefined,
      description: r.description || undefined,
      url: canonical,
      images: r.ogImage ? [r.ogImage] : undefined,
    },
    twitter: { card: r.ogImage ? 'summary_large_image' : 'summary' },
  };
}
