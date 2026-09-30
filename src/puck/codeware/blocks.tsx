import type { ComponentConfig, Field } from '@puckeditor/core';
import { imageField } from '../fields/image-field';
import * as R from './render';
import { defaults } from './defaults';

/** Raw HTML from the renderers (all dynamic values are escaped there). */
function Html({ html }: { html: string }) {
  return (
    <div
      style={{ display: 'contents' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const text = (label?: string): Field<string> => ({ type: 'text', label });
const area = (label?: string): Field<string> => ({ type: 'textarea', label });
const image = (label?: string) => imageField(label);
const icons = (label = 'Icon'): Field<R.IconId> => ({
  type: 'select',
  label,
  options: (
    ['code', 'web', 'phone', 'design', 'connect', 'marketing'] as const
  ).map((v) => ({
    label: v,
    value: v,
  })),
});
const sel = <T extends string>(
  options: { label: string; value: string }[],
  label?: string
) => ({ type: 'select', label, options }) as unknown as Field<T>;
const list = <T extends object>(
  label: string,
  arrayFields: { [K in keyof T]: Field<T[K]> },
  summary?: (item: T) => string
): Field<T[]> => ({
  type: 'array',
  label,
  arrayFields: arrayFields as never,
  getItemSummary: summary ? (i: T) => summary(i) : undefined,
});
const imgs = (label: string) =>
  list<R.Img>(
    label,
    { src: image('Logo'), alt: text('Name') },
    (i) => i.alt || 'Logo'
  );

type Def<P extends object> = ComponentConfig<{ props: P }>;
/** Define a block: fields + defaults (from the approved design) + HTML renderer. */
function block<P extends object>(
  key: keyof typeof defaults,
  fields: Def<P>['fields'],
  render: (p: P) => string,
  label: string
): Def<P> {
  return {
    label,
    fields,
    defaultProps: defaults[key] as unknown as P,
    render: (props) => <Html html={render(props as P)} />,
  };
}

export const CwHeader = block<R.HeaderProps>(
  'CwHeader',
  {
    logo: image('Logo'),
    productsEyebrow: text(),
    productsNote: text(),
    products: list(
      'Products menu',
      { name: text(), desc: text(), icon: icons() },
      (i) => i.name
    ),
    servicesEyebrow: text(),
    servicesNote: text(),
    servicesLinkLabel: text(),
    servicesLinkHref: text(),
    services: list(
      'Services menu',
      { title: text(), desc: text(), href: text(), icon: icons() },
      (i) => i.title
    ),
    links: list('Nav links', { label: text(), href: text() }, (i) => i.label),
    ctaLabel: text('Button label'),
    mobileCtaLabel: text(),
  },
  R.renderHeader,
  'Site header / navigation'
);

export const CwHero = block<R.HeroProps>(
  'CwHero',
  {
    expStrong: text(),
    expText: text(),
    reachText: text(),
    reachStrong: text(),
    titleLine1: text('Title line 1'),
    titleLine2: text('Title line 2 (accent)'),
    copy: area('Intro (line breaks kept)'),
    primaryLabel: text('Primary button'),
    secondaryLabel: text('Secondary link'),
    secondaryHref: text(),
    ratingLogos: imgs('Rating client logos'),
    ratingCount: text(),
    ratingStars: text(),
    ratingValue: text(),
    projectsLabel: text('Carousel label'),
    projects: list(
      'Project carousel',
      {
        title: text(),
        image: image('Cover'),
        href: text('Link'),
        meta: text('Category'),
        resultValue: text('Result value'),
        resultLabel: text('Result label'),
      },
      (i) => i.title
    ),
  },
  R.renderHero,
  'Hero + project carousel'
);

export const CwProducts = block<R.ProductsProps>(
  'CwProducts',
  {
    kicker: text(),
    heading: area('Heading (line breaks kept)'),
    intro: area(),
    rotationHelp: area('Screen-reader help'),
    items: list(
      'Products',
      {
        name: text(),
        short: text('Tab subtitle'),
        use: text('Eyebrow'),
        title: text(),
        body: area(),
        tags: list('Tags', { tag: text() }, (i) => i.tag),
        href: text('Product link'),
        exploreLabel: text(),
        visualTitle: text(),
        visual: sel<'erp' | 'commerce' | 'hr' | 'image'>(
          [
            { label: 'Illustration: ERP', value: 'erp' },
            { label: 'Illustration: Commerce', value: 'commerce' },
            { label: 'Illustration: HR', value: 'hr' },
            { label: 'Uploaded image', value: 'image' },
          ],
          'Visual'
        ),
        image: image('Image (when visual = image)'),
        caption: text(),
      },
      (i) => i.name
    ),
    askLabel: text(),
    footerLabel: text(),
  },
  R.renderProducts,
  'Products (tabs)'
);

export const CwClientBand = block<R.ClientBandProps>(
  'CwClientBand',
  { title: text(), row1: imgs('Logos row 1'), row2: imgs('Logos row 2') },
  R.renderClientBand,
  'Client logos marquee'
);

export const CwShowcase = block<R.ShowcaseProps>(
  'CwShowcase',
  {
    srTitle: text('Screen-reader title'),
    video: imageField('Video (mp4/webm)', 'video'),
    poster: image('Video poster'),
    reel1: {
      type: 'object',
      label: 'Reel 1',
      objectFields: {
        label: text(),
        title: area(),
        em: text('Emphasised line'),
        steps: list('Steps', { step: text() }, (i) => i.step),
        foot: text(),
      },
    },
    reel2: {
      type: 'object',
      label: 'Reel 2',
      objectFields: {
        label: text(),
        title: area(),
        image: image(),
        foot: text(),
      },
    },
    reel3: {
      type: 'object',
      label: 'Reel 3',
      objectFields: {
        label: text(),
        title: area(),
        image: image(),
        foot: text(),
      },
    },
    kicker: text(),
    titleBefore: text('Title: before video'),
    titleAccent: text('Title: after video'),
    titleLine2: text('Title line 2'),
    intro: area(),
    ctaLabel: text(),
    ctaHref: text(),
  },
  R.renderShowcase,
  'Showcase video + services intro'
);

export const CwServices = block<R.ServicesProps>(
  'CwServices',
  {
    items: list(
      'Services',
      {
        slug: text('Anchor id'),
        title: text(),
        description: area(),
        href: text('Link'),
        image1: image('Image 1'),
        alt1: text('Alt 1'),
        image2: image('Image 2'),
        alt2: text('Alt 2'),
      },
      (i) => i.title
    ),
    footText: area(),
    ctaLabel: text(),
  },
  R.renderServices,
  'Services (sticky stories)'
);

export const CwWork = block<R.WorkProps>(
  'CwWork',
  {
    kicker: text(),
    heading: area(),
    intro: area(),
    filters: list(
      'Filters',
      { label: text(), key: text('Category key') },
      (i) => i.label
    ),
    cards: list(
      'Projects',
      {
        category: text('Category key'),
        name: text('Project name'),
        title: area('Caption'),
        image: image('Cover'),
        alt: text('Alt'),
        href: text('Link'),
        badges: list(
          'Tech badges',
          {
            kind: {
              type: 'select',
              options: ['react', 'code', 'phone', 'web', 'ts'].map((v) => ({
                label: v,
                value: v,
              })),
            } as Field<'react' | 'code' | 'phone' | 'web' | 'ts'>,
            label: text(),
          },
          (i) => i.label
        ),
        impactNumber: text(),
        impactLabel: text(),
      },
      (i) => i.name
    ),
    footText: area(),
    footLabel: text(),
    footHref: text(),
  },
  R.renderWork,
  'Selected work'
);

const quote = {
  title: text(),
  quote: area(),
  name: text(),
  role: text(),
  initials: text(),
};
export const CwTestimonials = block<R.TestimonialsProps>(
  'CwTestimonials',
  {
    kicker: text(),
    heading: area(),
    row1: list('Row 1', quote, (i) => i.name),
    row2: list('Row 2', quote, (i) => i.name),
    footText: text(),
    ctaLabel: text(),
    ctaHref: text(),
  },
  R.renderTestimonials,
  'Testimonials marquee'
);

export const CwWhy = block<R.WhyProps>(
  'CwWhy',
  {
    kicker: text(),
    heading: area(),
    cards: list(
      'Cards',
      {
        value: text(),
        label: text(),
        text: area(),
        art: sel<string>(
          [0, 1, 2, 3, 4, 5].map((n) => ({
            label: `Illustration ${n + 1}`,
            value: String(n),
          })),
          'Illustration'
        ),
      },
      (i) => i.value
    ),
  },
  R.renderWhy,
  'Why us (cards)'
);

export const CwProcess = block<R.ProcessProps>(
  'CwProcess',
  {
    kicker: text(),
    heading: area(),
    text: area(),
    ctaLabel: text(),
    ctaHref: text(),
    fallback: area('Placeholder text'),
    steps: list(
      'Steps',
      { label: text(), image: image(), alt: text('Alt') },
      (i) => i.label
    ),
  },
  R.renderProcess,
  'Process (tabs)'
);

export const CwConsult = block<R.ConsultProps>(
  'CwConsult',
  {
    kicker: text(),
    heading: area(),
    text: area(),
    options: list(
      'Quick options',
      { label: text(), enquiry: text('Enquiry type') },
      (i) => i.label
    ),
    ctaLabel: text(),
    keys: list(
      'Keyboard keys (empty label = blank key)',
      {
        label: text(),
        icon: {
          type: 'select',
          options: [
            'code',
            'web',
            'phone',
            'design',
            'connect',
            'marketing',
            'arrow',
            '',
          ].map((v) => ({
            label: v || '(none)',
            value: v,
          })),
        } as Field<R.ConsultProps['keys'][number]['icon']>,
      },
      (i) => i.label || '(blank)'
    ),
  },
  R.renderConsult,
  'Consultation call-to-action'
);

export const CwFaq = block<R.FaqProps>(
  'CwFaq',
  {
    kicker: text(),
    heading: area(),
    text: area(),
    ctaLabel: text(),
    ctaHref: text(),
    items: list(
      'Questions',
      { q: text('Question'), a: area('Answer') },
      (i) => i.q
    ),
  },
  R.renderFaq,
  'FAQ'
);

export const CwContact = block<R.ContactProps>(
  'CwContact',
  {
    kicker: text(),
    heading: area(),
    intro: area(),
    email: text(),
    phone: text(),
    address: text(),
    noteTitle: text(),
    noteText: area(),
    badge: text(),
    serviceOptions: list('Service options', { name: text() }, (i) => i.name),
    productOptions: list('Product options', { name: text() }, (i) => i.name),
    submitLabel: text(),
    privacyHref: text(),
  },
  R.renderContact,
  'Contact form'
);

export const CwFooter = block<R.FooterProps>(
  'CwFooter',
  {
    globalHeading: text(),
    globalImage: image('Globe image'),
    countries: list(
      'Offices',
      { role: text(), name: text(), address: area(), phone: text() },
      (i) => i.name
    ),
    logo: image('Logo'),
    hqTitle: text(),
    hqAddress: area(),
    email: text(),
    phone: text(),
    messengerHref: text('Messenger link'),
    groups: list(
      'Link groups',
      {
        title: text(),
        links: list('Links', { label: text(), href: text() }, (i) => i.label),
      },
      (i) => i.title
    ),
    copyright: text(),
    privacyHref: text(),
  },
  R.renderFooter,
  'Global presence + footer'
);

export const cwBlocks = {
  CwHeader,
  CwHero,
  CwProducts,
  CwClientBand,
  CwShowcase,
  CwServices,
  CwWork,
  CwTestimonials,
  CwWhy,
  CwProcess,
  CwConsult,
  CwFaq,
  CwContact,
  CwFooter,
};

export const cwOrder = Object.keys(cwBlocks) as (keyof typeof cwBlocks)[];
