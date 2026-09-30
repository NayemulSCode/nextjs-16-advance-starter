import type { Config, RichText, Slot } from '@puckeditor/core';
import { imageField } from './fields/image-field';
import { cwBlocks, cwOrder } from './codeware/blocks';
import type * as R from './codeware/render';
import { CwShell } from './codeware/shell';

type CwProps = {
  CwHeader: R.HeaderProps;
  CwHero: R.HeroProps;
  CwProducts: R.ProductsProps;
  CwClientBand: R.ClientBandProps;
  CwShowcase: R.ShowcaseProps;
  CwServices: R.ServicesProps;
  CwWork: R.WorkProps;
  CwTestimonials: R.TestimonialsProps;
  CwWhy: R.WhyProps;
  CwProcess: R.ProcessProps;
  CwConsult: R.ConsultProps;
  CwFaq: R.FaqProps;
  CwContact: R.ContactProps;
  CwFooter: R.FooterProps;
};

export type Props = CwProps & {
  Hero: {
    title: string;
    subtitle: string;
    image: string;
    ctaLabel: string;
    ctaHref: string;
    align: 'left' | 'center';
  };
  Heading: {
    text: string;
    level: 'h1' | 'h2' | 'h3';
    align: 'left' | 'center' | 'right';
  };
  RichText: { content: RichText };
  Image: {
    src: string;
    alt: string;
    width: 'narrow' | 'wide' | 'full';
    rounded: boolean;
  };
  Columns: {
    columns: '2' | '3';
    gap: number;
    col1: Slot;
    col2: Slot;
    col3: Slot;
  };
  Button: { label: string; href: string; variant: 'primary' | 'outline' };
  Spacer: { size: number };
};

export type RootProps = {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonical: string;
  noindex: 'no' | 'yes';
  contactEmail: string;
};

const alignOpts = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
];

const widthClass = {
  narrow: 'max-w-2xl',
  wide: 'max-w-5xl',
  full: 'max-w-none',
} as const;

export const config: Config<{ components: Props; root: RootProps }> = {
  categories: {
    codeware: {
      title: 'Codeware sections',
      components: cwOrder as never,
      defaultExpanded: true,
    },
    layout: { title: 'Layout', components: ['Columns', 'Spacer'] },
    content: {
      title: 'Content',
      components: ['Hero', 'Heading', 'RichText', 'Image', 'Button'],
    },
  },

  // Page-level settings – this is the SEO panel shown when nothing is selected.
  root: {
    fields: {
      title: { type: 'text', label: 'SEO title' },
      description: { type: 'textarea', label: 'Meta description' },
      keywords: { type: 'text', label: 'Keywords (comma separated)' },
      ogImage: imageField('Social share image (OG)'),
      canonical: { type: 'text', label: 'Canonical URL (optional)' },
      contactEmail: { type: 'text', label: 'Contact email (dialogs & form)' },
      noindex: {
        type: 'radio',
        label: 'Search engines',
        options: [
          { label: 'Index', value: 'no' },
          { label: 'Hide (noindex)', value: 'yes' },
        ],
      },
    },
    defaultProps: {
      title: '',
      description: '',
      keywords: '',
      ogImage: '',
      canonical: '',
      noindex: 'no',
      contactEmail: 'info@codewareltd.com',
    },
    render: ({ children, puck, contactEmail }) => (
      <CwShell editing={puck?.isEditing} email={contactEmail}>
        {children}
      </CwShell>
    ),
  },

  components: {
    ...(cwBlocks as unknown as Config<{
      components: Props;
      root: RootProps;
    }>['components']),
    Hero: {
      fields: {
        title: { type: 'text' },
        subtitle: { type: 'textarea' },
        image: imageField('Background image'),
        ctaLabel: { type: 'text', label: 'Button label' },
        ctaHref: { type: 'text', label: 'Button link' },
        align: { type: 'radio', options: alignOpts.slice(0, 2) },
      },
      defaultProps: {
        title: 'Hero title',
        subtitle: 'Supporting text',
        image: '',
        ctaLabel: 'Get started',
        ctaHref: '#',
        align: 'center',
      },
      render: ({ title, subtitle, image, ctaLabel, ctaHref, align }) => (
        <section
          className="relative flex min-h-[420px] items-center bg-zinc-900 bg-cover bg-center px-6 py-20 text-white"
          style={
            image
              ? {
                  backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${image})`,
                }
              : undefined
          }
        >
          <div
            className={`mx-auto w-full max-w-5xl ${align === 'center' ? 'text-center' : ''}`}
          >
            <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
            {subtitle && (
              <p
                className="mt-4 max-w-2xl text-lg opacity-90 md:text-xl"
                style={
                  align === 'center' ? { marginInline: 'auto' } : undefined
                }
              >
                {subtitle}
              </p>
            )}
            {ctaLabel && (
              <a
                href={ctaHref}
                className="mt-8 inline-block rounded-md bg-white px-6 py-3 font-medium text-black"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </section>
      ),
    },

    Heading: {
      fields: {
        text: { type: 'text' },
        level: {
          type: 'select',
          options: [
            { label: 'H1', value: 'h1' },
            { label: 'H2', value: 'h2' },
            { label: 'H3', value: 'h3' },
          ],
        },
        align: { type: 'radio', options: alignOpts },
      },
      defaultProps: { text: 'Heading', level: 'h2', align: 'left' },
      render: ({ text, level: Tag, align }) => (
        <div
          className="mx-auto max-w-5xl px-6 py-4"
          style={{ textAlign: align }}
        >
          <Tag
            className={
              Tag === 'h1'
                ? 'text-4xl font-bold'
                : Tag === 'h2'
                  ? 'text-3xl font-semibold'
                  : 'text-2xl font-semibold'
            }
          >
            {text}
          </Tag>
        </div>
      ),
    },

    // Rich content editor for the page body (bold, lists, links, headings, alignment…)
    RichText: {
      fields: { content: { type: 'richtext', contentEditable: true } },
      defaultProps: { content: '<p>Start writing…</p>' },
      render: ({ content }) => (
        <div className="cms-richtext mx-auto max-w-3xl px-6 py-6">
          {content}
        </div>
      ),
    },

    Image: {
      fields: {
        src: imageField('Image'),
        alt: { type: 'text', label: 'Alt text (SEO/accessibility)' },
        width: {
          type: 'select',
          options: [
            { label: 'Narrow', value: 'narrow' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full width', value: 'full' },
          ],
        },
        rounded: {
          type: 'radio',
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
      },
      defaultProps: { src: '', alt: '', width: 'wide', rounded: true },
      render: ({ src, alt, width, rounded }) =>
        src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`mx-auto my-4 h-auto w-full ${widthClass[width]} ${rounded ? 'rounded-xl' : ''}`}
          />
        ) : (
          <div className="mx-auto my-4 max-w-5xl rounded-xl border border-dashed p-10 text-center text-sm text-zinc-500">
            No image selected
          </div>
        ),
    },

    Columns: {
      fields: {
        columns: {
          type: 'radio',
          options: [
            { label: '2', value: '2' },
            { label: '3', value: '3' },
          ],
        },
        gap: { type: 'number', min: 0, max: 96 },
        col1: { type: 'slot' },
        col2: { type: 'slot' },
        col3: { type: 'slot' },
      },
      defaultProps: { columns: '2', gap: 24, col1: [], col2: [], col3: [] },
      render: ({ columns, gap, col1: C1, col2: C2, col3: C3 }) => (
        <div
          className="mx-auto grid max-w-5xl grid-cols-1 px-6 py-4 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
          style={{ gap, ['--cols' as string]: columns }}
        >
          <C1 />
          <C2 />
          {columns === '3' && <C3 />}
        </div>
      ),
    },

    Button: {
      fields: {
        label: { type: 'text' },
        href: { type: 'text' },
        variant: {
          type: 'radio',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      },
      defaultProps: { label: 'Click me', href: '#', variant: 'primary' },
      render: ({ label, href, variant }) => (
        <div className="mx-auto max-w-5xl px-6 py-2">
          <a
            href={href}
            className={`inline-block rounded-md px-5 py-2.5 font-medium ${variant === 'primary' ? 'bg-black text-white' : 'border border-black'}`}
          >
            {label}
          </a>
        </div>
      ),
    },

    Spacer: {
      fields: { size: { type: 'number', min: 0, max: 400 } },
      defaultProps: { size: 48 },
      render: ({ size }) => <div style={{ height: size }} aria-hidden />,
    },
  },
};

export default config;
