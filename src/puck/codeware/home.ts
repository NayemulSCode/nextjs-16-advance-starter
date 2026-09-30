import type { PageData } from '@/lib/cms/types';
import { cwOrder } from './blocks';
import { defaults } from './defaults';

/** The approved Codeware homepage, as Puck data. Seeds "/" until a page is saved. */
export function homeTemplate(): PageData {
  return {
    root: {
      props: {
        title: 'Codeware — Software, Products & Digital Experiences',
        description:
          'Codeware develops custom software, websites, mobile apps, and business solutions.',
        keywords:
          'software development, custom software, mobile apps, ERP, Bangladesh',
        ogImage: '',
        canonical: '',
        noindex: 'no',
        contactEmail: 'info@codewareltd.com',
      },
    },
    content: cwOrder.map((type) => ({
      type,
      props: { id: `${type}-1`, ...defaults[type] },
    })) as PageData['content'],
  };
}

export const emptyPage = (): PageData =>
  ({ content: [], root: { props: {} } }) as unknown as PageData;
