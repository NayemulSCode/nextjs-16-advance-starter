import { art_commerce, art_erp, art_hr, whyArt } from './art';

/**
 * HTML renderers for the Codeware homepage blocks.
 * Markup and class names are copied 1:1 from the approved design so the shipped
 * stylesheet (codeware.css) and behaviours (public/codeware/runtime.js) apply unchanged.
 */

export const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const br = (s: unknown) => esc(s).replace(/\r?\n/g, '<br>');
/** Blocks `javascript:` and similar schemes. */
const url = (s: unknown) => {
  const v = String(s ?? '').trim();
  return /^\s*(javascript|data|vbscript):/i.test(v) ? '#' : esc(v);
};
const icon = (id: string) =>
  `<svg aria-hidden="true"><use href="#${id}"></use></svg>`;
const arrow = icon('arrow');
const ext = (href: string) =>
  /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener"' : '';
const join = <T>(items: T[] | undefined, fn: (item: T, i: number) => string) =>
  (items ?? []).map(fn).join('');

export type Img = { src: string; alt: string };
export type IconId =
  'code' | 'web' | 'phone' | 'design' | 'connect' | 'marketing';

// ---------------------------------------------------------------- Shell
export const SPRITE = `<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs><symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"></path></symbol><symbol id="chevron" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></symbol><symbol id="menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></symbol><symbol id="close" viewBox="0 0 24 24"><path d="m6 6 12 12M6 18 18 6"></path></symbol><symbol id="code" viewBox="0 0 24 24"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"></path></symbol><symbol id="web" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 9h18M7 6.5h.1M10 6.5h.1"></path></symbol><symbol id="phone" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="3"></rect><path d="M10 5h4M11 19h2"></path></symbol><symbol id="design" viewBox="0 0 24 24"><path d="M4 4h16v16H4ZM4 9h16M9 9v11"></path></symbol><symbol id="connect" viewBox="0 0 24 24"><rect x="2" y="8" width="7" height="8" rx="2"></rect><rect x="15" y="8" width="7" height="8" rx="2"></rect><path d="M9 12h6"></path></symbol><symbol id="marketing" viewBox="0 0 24 24"><path d="m3 9 17-5v16L3 15V9Zm5 7 1 5h4l-1-4M20 9h2m-2 6h2"></path></symbol><symbol id="pause" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"></path></symbol><symbol id="play" viewBox="0 0 24 24"><path d="m8 4 12 8-12 8V4Z"></path></symbol><symbol id="check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"></path></symbol><symbol id="down" viewBox="0 0 24 24"><path d="M12 4v16m-6-6 6 6 6-6"></path></symbol></defs></svg>`;

/** Contact + product dialogs, viewport blur, and the hidden preview panel the runtime script expects. */
export const shellTail = (email: string) =>
  `<dialog id="contact-dialog" aria-labelledby="contact-title"><button class="icon-button dialog-close" aria-label="Close contact dialog">${icon('close')}</button><p class="eyebrow">Let’s discuss your project</p><h2 id="contact-title">What would you like<br>to make work better?</h2><p>Tell us about the problem, who the software is for, and any existing tools it needs to connect with.</p><a class="button" href="mailto:${esc(email)}?subject=Project%20enquiry">Write to Codeware ${arrow}</a><small>Opens your email app.</small></dialog>
<dialog id="product-dialog" aria-labelledby="product-title"><button class="icon-button dialog-close" aria-label="Close product dialog">${icon('close')}</button><p class="eyebrow" id="product-category">Software product</p><h2 id="product-title">Codeware software</h2><p id="product-description"></p><a class="button" id="product-enquiry" href="mailto:${esc(email)}">Ask about this product ${arrow}</a><small>Explore the Products section for current product links.</small></dialog>
<div class="viewport-blur" aria-hidden="true"></div>
<details class="build-review" hidden=""><summary>Preview settings</summary><aside class="review"><div class="container"><p class="review-status" id="motion-status" role="status"></p><button class="review-button" id="loop-toggle" aria-pressed="false">Pause loops</button><button class="review-button" id="motion-mode" aria-pressed="false">Use reduced motion</button><input id="video-upload" type="file" accept="video/*"><button class="review-button" id="reset-video" hidden>Restore video</button><p class="review-status" id="video-status" role="status"></p></div></aside></details>`;

// ---------------------------------------------------------------- Header
export type HeaderProps = {
  logo: string;
  productsEyebrow: string;
  productsNote: string;
  products: { name: string; desc: string; icon: IconId }[];
  servicesEyebrow: string;
  servicesNote: string;
  servicesLinkLabel: string;
  servicesLinkHref: string;
  services: { title: string; desc: string; href: string; icon: IconId }[];
  links: { label: string; href: string }[];
  ctaLabel: string;
  mobileCtaLabel: string;
};

export const renderHeader = (
  p: HeaderProps
) => `<a class="skip" href="#main">Skip to content</a>
<header class="site-header dark"><div class="header-inner container">
 <a class="logo" href="/" aria-label="Home"><span class="logo-plate"><img src="${url(p.logo)}" alt="Codeware" width="1477" height="173"></span></a>
 <nav class="desktop-nav" aria-label="Main navigation">
 <div class="nav-item"><button class="nav-trigger" aria-expanded="false" aria-controls="products-menu">Products <svg aria-hidden="true"><use href="#chevron"></use></svg></button><div class="dropdown" id="products-menu" hidden><div class="dropdown-title"><span class="eyebrow">${esc(p.productsEyebrow)}</span><p>${esc(p.productsNote)}</p></div><div class="dropdown-grid">
 ${join(p.products, (x) => `<button class="product-trigger" data-product="${esc(x.name)}"><span class="menu-icon">${icon(x.icon)}</span><span><strong>${esc(x.name)}</strong><small>${esc(x.desc)}</small></span></button>`)}
 </div></div></div>
 <div class="nav-item"><button class="nav-trigger" aria-expanded="false" aria-controls="services-menu">Services <svg aria-hidden="true"><use href="#chevron"></use></svg></button><div class="dropdown" id="services-menu" hidden><div class="dropdown-title"><span class="eyebrow">${esc(p.servicesEyebrow)}</span><p>${esc(p.servicesNote)}</p><a class="all-services-link" href="${url(p.servicesLinkHref)}">${esc(p.servicesLinkLabel)} ${arrow}</a></div><div class="dropdown-grid">
 ${join(p.services, (x) => `<a href="${url(x.href)}"><span class="menu-icon">${icon(x.icon)}</span><span><strong>${esc(x.title)}</strong><small>${esc(x.desc)}</small></span></a>`)}
 </div></div></div>
 ${join(p.links, (l) => `<a class="nav-link" href="${url(l.href)}">${esc(l.label)}</a>`)}</nav>
 <button class="button contact-trigger" data-contact="call">${esc(p.ctaLabel)} ${arrow}</button>
 <button class="icon-button mobile-toggle" id="mobile-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav">${icon('menu')}</button>
 </div><nav class="mobile-nav container" id="mobile-nav" aria-label="Mobile navigation" hidden><details><summary>Services</summary><a href="${url(p.servicesLinkHref)}">All services</a>${join(p.services, (x) => `<a href="${url(x.href)}">${esc(x.title)}</a>`)}</details><details><summary>Products</summary>${join(p.products, (x) => `<button class="product-trigger" data-product="${esc(x.name)}">${esc(x.name)}</button>`)}</details>${join(p.links, (l) => `<a href="${url(l.href)}">${esc(l.label)}</a>`)}<button class="button contact-trigger" style="width:100%;margin-top:16px">${esc(p.mobileCtaLabel)} ${arrow}</button></nav></header>`;

// ---------------------------------------------------------------- Hero (+ previous work carousel)
export type HeroProps = {
  expStrong: string;
  expText: string;
  reachText: string;
  reachStrong: string;
  titleLine1: string;
  titleLine2: string;
  copy: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
  ratingLogos: Img[];
  ratingCount: string;
  ratingStars: string;
  ratingValue: string;
  projectsLabel: string;
  projects: {
    title: string;
    image: string;
    href: string;
    meta: string;
    resultValue: string;
    resultLabel: string;
  }[];
};

export const renderHero = (
  p: HeroProps
) => `<div class="hero-v2"><section class="hero container" aria-labelledby="hero-title"><div class="hero-experience"><span><strong>${esc(p.expStrong)}</strong> ${esc(p.expText)}</span><i aria-hidden="true"></i><span>${esc(p.reachText)} <strong>${esc(p.reachStrong)}</strong></span></div><h1 id="hero-title"><span>${esc(p.titleLine1)}</span><span class="hero-accent">${esc(p.titleLine2)}</span></h1><p class="hero-copy">${br(p.copy)}</p><div class="hero-actions"><button class="button contact-trigger" data-contact="call"><span class="button-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M8 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-4l-5-2-2 2a14 14 0 0 1-6-6l2-2-2-5Z"></path></svg></span>${esc(p.primaryLabel)}</button><a class="secondary-button" href="${url(p.secondaryHref)}">${esc(p.secondaryLabel)} <span class="button-icon">${arrow}</span></a></div><div class="hero-rating"><div class="rating-brands" aria-label="Some of our clients">${join(p.ratingLogos, (l) => `<span class="rating-brand"><img src="${url(l.src)}" alt="${esc(l.alt)}" width="160" height="64" loading="lazy" decoding="async"></span>`)}<span class="rating-brand">${esc(p.ratingCount)}</span></div><div class="rating-copy"><div class="rating-stars" aria-hidden="true">${esc(p.ratingStars)}</div><p>Average <strong>${esc(p.ratingValue)}</strong> reviews</p></div></div></section>
<section class="hero-projects" aria-label="Previous work"><p class="hero-projects-label">${esc(p.projectsLabel)}</p><div class="project-marquee" tabindex="0" aria-label="Previous projects. Use arrow keys to browse. Keyboard focus pauses movement." data-hero-carousel=""><div class="hero-project-track">${join(p.projects, (x) => `<a class="hero-project-card" href="${url(x.href)}"${ext(x.href)} aria-label="View project: ${esc(x.title)}"><div class="hero-project-image"><img src="${url(x.image)}" alt="Project cover for ${esc(x.title)}" width="529" height="406" decoding="async"><span class="view-project-pill">View Project ↗</span></div><div class="hero-project-caption"><strong>${esc(x.title)}</strong><div class="hero-project-meta"><small>${esc(x.meta)}</small><span class="hero-project-result"><b>${esc(x.resultValue)}</b> ${esc(x.resultLabel)}</span></div></div></a>`)}</div></div><span class="hero-project-cursor" aria-hidden="true"><span>View Project ↗</span></span></section></div>`;

// ---------------------------------------------------------------- Products
export type ProductsProps = {
  kicker: string;
  heading: string;
  intro: string;
  rotationHelp: string;
  items: {
    name: string;
    short: string;
    use: string;
    title: string;
    body: string;
    tags: { tag: string }[];
    href: string;
    exploreLabel: string;
    visualTitle: string;
    visual: 'erp' | 'commerce' | 'hr' | 'image';
    image: string;
    caption: string;
  }[];
  askLabel: string;
  footerLabel: string;
};

const ART = { erp: art_erp, commerce: art_commerce, hr: art_hr } as const;

export const renderProducts = (p: ProductsProps) => {
  const items = p.items ?? [];
  const tabs = join(
    items,
    (x, i) =>
      `<button class="product-tab" type="button" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-product-name="${esc(x.name)}"><span class="tab-num">${String(i + 1).padStart(2, '0')}</span><span><strong>${esc(x.name)}</strong><small>${esc(x.short)}</small></span>${arrow}<span class="product-progress" aria-hidden="true"><span></span></span></button>`
  );
  const panes = join(items, (x, i) => {
    const stage =
      x.visual === 'image'
        ? `<div class="product-stage "><span class="product-visual-title">${esc(x.visualTitle)}</span><img src="${url(x.image)}" alt="${esc(x.name)} artwork" loading="lazy" decoding="async" width="783" height="650"><small class="stage-caption">${esc(x.caption)}</small></div>`
        : `<div class="product-stage concept"><span class="product-visual-title">${esc(x.visualTitle)}</span>${ART[x.visual](`p${i}`)}<small class="stage-caption">${esc(x.caption)}</small></div>`;
    return `<article class="product-pane" role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" tabindex="0"${i === items.length - 1 && i > 0 ? ' hidden' : ''}>${stage}<div class="product-detail" tabindex="0" aria-label="Product details"><p class="product-use">${esc(x.use)}</p><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p><ul class="tag-list">${join(x.tags, (t) => `<li>${esc(t.tag)}</li>`)}</ul><div class="product-actions"><a class="button" href="${url(x.href)}"${ext(x.href)}>${esc(x.exploreLabel)} ${arrow}</a><button class="text-link enquiry-shortcut" type="button" data-enquiry="Explore a product" data-product="${esc(x.name)}">${esc(p.askLabel)} ${arrow}</button></div></div></article>`;
  });
  const catalog = join(
    items,
    (x) =>
      `<a class="product-catalog-card" href="${url(x.href)}"${ext(x.href)}><h3>${esc(x.name)}</h3><p>${esc(x.body)}</p><span>Explore product ${arrow}</span></a>`
  );
  return `<section class="home-section light-section" id="products" aria-labelledby="products-heading"><div class="container"><div class="section-top"><div><span class="section-kicker">${esc(p.kicker)}</span><h2 id="products-heading">${br(p.heading)}</h2></div><p>${esc(p.intro)}</p></div><div class="product-shell"><p class="sr-only" id="product-rotation-help">${esc(p.rotationHelp)}</p><div class="product-tabs" role="tablist" aria-label="Featured products" aria-describedby="product-rotation-help" aria-orientation="vertical">${tabs}</div><div class="product-panes">${panes}</div></div><div class="products-footer"><button class="text-link outline-cta" type="button" id="explore-products" aria-expanded="false" aria-controls="product-catalog">${esc(p.footerLabel)} ${arrow}</button></div><div class="product-catalog" id="product-catalog" hidden aria-label="All products">${catalog}</div></div></section>`;
};

// ---------------------------------------------------------------- Client logos
export type ClientBandProps = { title: string; row1: Img[]; row2: Img[] };
export const renderClientBand = (p: ClientBandProps) => {
  const row = (imgs: Img[], dir: string, n: number) =>
    `<div class="logo-marquee edge-fade" data-marquee="${dir}" data-speed="32" tabindex="0" aria-label="Client logos, row ${n}">${join(imgs, (l) => `<div class="client-logo"><img src="${url(l.src)}" alt="${esc(l.alt)}" width="160" height="64" loading="lazy" decoding="async"></div>`)}</div>`;
  return `<section class="client-band" aria-label="Previous clients"><div class="container"><p>${esc(p.title)}</p><div class="client-logo-rows">${row(p.row1, 'left', 1)}${row(p.row2, 'right', 2)}</div></div></section>`;
};

// ---------------------------------------------------------------- Showcase scene (video reel + services intro)
export type ShowcaseProps = {
  srTitle: string;
  video: string;
  poster: string;
  reel1: {
    label: string;
    title: string;
    em: string;
    steps: { step: string }[];
    foot: string;
  };
  reel2: { label: string; title: string; image: string; foot: string };
  reel3: { label: string; title: string; image: string; foot: string };
  kicker: string;
  titleBefore: string;
  titleAccent: string;
  titleLine2: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
};

export const renderShowcase = (
  p: ShowcaseProps
) => `<section class="scene" id="showcase" aria-labelledby="showcase-title"><h2 class="sr-only" id="showcase-title">${esc(p.srTitle)}</h2><div class="scene-flow"><div class="showcase-space" aria-hidden="true"></div>
 <div class="media-frame" id="media-frame" aria-hidden="true"><div class="reel" id="reel" hidden=""><div class="reel-slide reel-one active"><span class="reel-label">${esc(p.reel1.label)}</span><div class="reel-title">${br(p.reel1.title)}<br><em>${esc(p.reel1.em)}</em></div><div class="workflow">${join(p.reel1.steps, (s, i) => `<div class="flow-step"><span>${String(i + 1).padStart(2, '0')}</span>${esc(s.step)}</div>`)}</div><div class="reel-foot"><span>${esc(p.reel1.foot)}</span><span>Codeware</span></div></div><div class="reel-slide reel-two"><span class="reel-label">${esc(p.reel2.label)}</span><div class="reel-title">${br(p.reel2.title)}</div><img class="reel-art" src="${url(p.reel2.image)}" alt="" width="783" height="650" decoding="async"><div class="reel-foot"><span>${esc(p.reel2.foot)}</span><span>Codeware</span></div></div><div class="reel-slide reel-three"><span class="reel-label">${esc(p.reel3.label)}</span><div class="reel-title">${br(p.reel3.title)}</div><img class="reel-art" src="${url(p.reel3.image)}" alt="" width="635" height="402" decoding="async"><div class="reel-foot"><span>${esc(p.reel3.foot)}</span><span>Codeware</span></div></div><div class="reel-dots"><i class="active"></i><i></i><i></i></div></div><video class="local-video" id="local-video" muted playsinline loop preload="none" poster="${url(p.poster)}" src="${url(p.video)}" autoplay=""></video></div>
 <div class="services-intro" id="services"><div><p class="eyebrow section-kicker">${esc(p.kicker)}</p><h2 id="services-title"><span class="title-line docking-line"><span>${esc(p.titleBefore)} </span><span class="dock-slot" id="dock-slot" aria-hidden="true"></span><span class="dock-words">${esc(p.titleAccent)}</span></span><span class="title-line">${esc(p.titleLine2)}</span></h2></div><div><p>${esc(p.intro)}</p><a class="text-link outline-cta" href="${url(p.ctaHref)}">${esc(p.ctaLabel)} ${arrow}</a></div></div>
</div></section>`;

// ---------------------------------------------------------------- Services list
export type ServicesProps = {
  items: {
    slug: string;
    title: string;
    description: string;
    href: string;
    image1: string;
    alt1: string;
    image2: string;
    alt2: string;
  }[];
  footText: string;
  ctaLabel: string;
};

export const renderServices = (p: ServicesProps) =>
  `<section class="service-section container" id="service-list" aria-labelledby="services-title"><div class="service-layout" id="service-layout"><div class="service-text-window" id="service-text-window"></div><div class="service-stories" id="service-stories">${join(
    p.items,
    (x, i) =>
      `<article class="service-story" id="${esc(x.slug)}" aria-labelledby="service-heading-${i}"><div class="service-summary"><h3 class="service-heading" id="service-heading-${i}">${esc(x.title)}</h3><p class="service-description">${esc(x.description)}</p><a class="text-link service-more" href="${url(x.href)}"><span>See More</span>${arrow}<span class="sr-only"> about ${esc(x.title)}</span></a></div><div class="service-pair"><figure class="service-image mockup"><img src="${url(x.image1)}" alt="${esc(x.alt1)}" width="395" height="500" loading="lazy" decoding="async"></figure><figure class="service-image mockup"><img src="${url(x.image2)}" alt="${esc(x.alt2)}" width="395" height="500" loading="lazy" decoding="async"></figure></div></article>`
  )}</div></div><div class="service-foot"><p>${br(p.footText)}</p><button class="button contact-trigger">${esc(p.ctaLabel)} ${arrow}</button></div></section>`;

// ---------------------------------------------------------------- Work
type BadgeKind = 'react' | 'code' | 'phone' | 'web' | 'ts';
export type WorkProps = {
  kicker: string;
  heading: string;
  intro: string;
  filters: { label: string; key: string }[];
  cards: {
    category: string;
    image: string;
    alt: string;
    href: string;
    title: string;
    name: string;
    badges: { kind: BadgeKind; label: string }[];
    impactNumber: string;
    impactLabel: string;
  }[];
  footText: string;
  footLabel: string;
  footHref: string;
};

const badgeIcon = (k: BadgeKind) =>
  k === 'react'
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><ellipse cx="12" cy="12" rx="10" ry="4"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"></ellipse><circle cx="12" cy="12" r="1.4" fill="currentColor"></circle></svg>`
    : k === 'ts'
      ? `<span class="stack-monogram" aria-hidden="true">TS</span>`
      : icon(k);

export const renderWork = (p: WorkProps) =>
  `<section class="home-section white-section" id="work" aria-labelledby="work-heading"><div class="container"><div class="section-top"><div><span class="section-kicker">${esc(p.kicker)}</span><h2 id="work-heading">${br(p.heading)}</h2></div><p>${esc(p.intro)}</p></div><div class="work-filters" role="group" aria-label="Filter selected work">${join(p.filters, (f, i) => `<button type="button" class="filter-chip" data-work-filter="${esc(f.key)}" aria-pressed="${i === 0}">${esc(f.label)}</button>`)}</div><p class="sr-only" role="status" id="work-status"></p><div class="work-grid">${join(
    p.cards,
    (c) =>
      `<article class="work-card" data-work-category="${esc(c.category)}"><a class="work-project-link" href="${url(c.href)}"${ext(c.href)} aria-label="See full project: ${esc(c.name)}"><div class="work-visual"><img class="work-cover" src="${url(c.image)}" alt="${esc(c.alt)}" width="529" height="406" loading="lazy" decoding="async"><div class="work-stack">${join(c.badges, (b) => `<span class="stack-badge">${badgeIcon(b.kind)}<span>${esc(b.label)}</span></span>`)}</div><span class="cover-label">Project cover</span></div><div class="work-caption"><h3>${esc(c.title)}</h3><div class="work-impact-row"><div class="work-impact"><span class="work-impact-number">${esc(c.impactNumber)}</span><div class="work-impact-detail"><span>${esc(c.impactLabel)}</span></div></div><span class="impact-rule" aria-hidden="true"></span><span class="read-case">Read case ${arrow}</span></div></div></a><span class="project-cursor" aria-hidden="true"><span>View Project ${arrow}</span></span></article>`
  )}</div><div class="work-footer"><p>${esc(p.footText)}</p><a class="text-link outline-cta" href="${url(p.footHref)}"${ext(p.footHref)}>${esc(p.footLabel)} ${arrow}</a></div></div></section>`;

// ---------------------------------------------------------------- Testimonials
type Quote = {
  title: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
};
export type TestimonialsProps = {
  kicker: string;
  heading: string;
  row1: Quote[];
  row2: Quote[];
  footText: string;
  ctaLabel: string;
  ctaHref: string;
};

export const renderTestimonials = (p: TestimonialsProps) => {
  const row = (qs: Quote[], dir: string, speed: number, n: number) =>
    `<div class="testimonial-row edge-fade" data-marquee="${dir}" data-speed="${speed}" tabindex="0" aria-label="Testimonials, row ${n}">${join(qs, (q) => `<article class="quote-card"><span class="quote-mark" aria-hidden="true">“</span><h3>${esc(q.title)}</h3><blockquote>${esc(q.quote)}</blockquote><div class="quote-person"><span class="quote-avatar" aria-hidden="true">${esc(q.initials)}</span><span><strong>${esc(q.name)}</strong><small>${esc(q.role)}</small></span></div></article>`)}</div>`;
  return `<section class="home-section light-section" id="testimonials" aria-labelledby="testimonials-heading"><div class="container"><div class="center-heading"><span class="section-kicker">${esc(p.kicker)}</span><h2 id="testimonials-heading">${br(p.heading)}</h2></div><div class="testimonial-rows">${row(p.row1, 'left', 22, 1)}${row(p.row2, 'right', 26, 2)}</div><div class="testimonials-foot"><p>${esc(p.footText)}</p><a class="text-link outline-cta" href="${url(p.ctaHref)}">${esc(p.ctaLabel)} ${arrow}</a></div></div></section>`;
};

// ---------------------------------------------------------------- Why
export type WhyProps = {
  kicker: string;
  heading: string;
  cards: { value: string; label: string; text: string; art: string }[];
};
export const renderWhy = (p: WhyProps) =>
  `<section class="home-section light-section why-section" id="why-codeware" aria-labelledby="why-heading"><div class="container"><div class="center-heading"><span class="section-kicker">${esc(p.kicker)}</span><h2 id="why-heading">${br(p.heading)}</h2></div><div class="why-grid">${join(
    p.cards,
    (c, i) => {
      const a =
        whyArt[Math.max(0, Math.min(whyArt.length - 1, Number(c.art) || i))];
      return `<article class="why-card"><h3 class="why-value">${esc(c.value)}</h3><p class="why-label">${esc(c.label)}</p>${a(`why-${i}`)}<p>${esc(c.text)}</p></article>`;
    }
  )}</div></div></section>`;

// ---------------------------------------------------------------- Process
export type ProcessProps = {
  kicker: string;
  heading: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  fallback: string;
  steps: { label: string; image: string; alt: string }[];
};
export const renderProcess = (p: ProcessProps) =>
  `<section class="home-section process-section" id="process" aria-labelledby="process-heading"><div class="container process-grid"><div class="process-copy"><span class="section-kicker">${esc(p.kicker)}</span><h2 id="process-heading">${br(p.heading)}</h2><p>${esc(p.text)}</p><a class="text-link outline-cta" href="${url(p.ctaHref)}">${esc(p.ctaLabel)} ${arrow}</a></div><div><div class="process-nav" role="tablist" aria-label="Delivery process">${join(p.steps, (s, i) => `<button type="button" role="tab" id="step-tab-${i}" aria-controls="step-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" aria-label="${esc(s.label)}"><span>${esc(s.label)}</span><i class="step-progress" aria-hidden="true"></i></button>`)}</div><div class="process-stage"><div class="process-photo"><span class="photo-fallback" aria-hidden="true">${br(p.fallback)}</span>${join(p.steps, (s, i) => `<figure class="process-image${i === 0 ? ' is-active' : ''}" aria-hidden="${i !== 0}" id="step-panel-${i}" role="tabpanel" aria-labelledby="step-tab-${i}" tabindex="${i === 0 ? 0 : -1}"><img src="${url(s.image)}" alt="${esc(s.alt)}" width="1200" height="775" loading="lazy" decoding="async"></figure>`)}</div></div></div></div></section>`;

// ---------------------------------------------------------------- Consult
export type ConsultProps = {
  kicker: string;
  heading: string;
  text: string;
  options: { label: string; enquiry: string }[];
  ctaLabel: string;
  keys: { icon: IconId | 'arrow' | ''; label: string }[];
};
export const renderConsult = (p: ConsultProps) =>
  `<section class="consult-section" aria-labelledby="consult-heading"><div class="container consult-card"><div><span class="section-kicker">${esc(p.kicker)}</span><h2 id="consult-heading">${br(p.heading)}</h2><p>${esc(p.text)}</p><div class="consult-options">${join(p.options, (o) => `<button class="enquiry-shortcut" data-enquiry="${esc(o.enquiry)}">${esc(o.label)}</button>`)}</div><button class="button contact-trigger" data-contact="call">${esc(p.ctaLabel)} ${arrow}</button></div><div class="consult-artwork" aria-hidden="true"><div class="consult-keyboard">${join(p.keys, (k) => (k.label ? `<div class="consult-key key-labelled">${icon(k.icon || 'arrow')}<span>${esc(k.label)}</span></div>` : `<div class="consult-key key-blank"><span>⌘</span></div>`))}</div></div></div></section>`;

// ---------------------------------------------------------------- FAQ
export type FaqProps = {
  kicker: string;
  heading: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  items: { q: string; a: string }[];
};
export const renderFaq = (p: FaqProps) =>
  `<section class="home-section white-section" id="faq" aria-labelledby="faq-heading"><div class="container faq-grid"><div class="faq-intro"><span class="section-kicker">${esc(p.kicker)}</span><h2 id="faq-heading">${br(p.heading)}</h2><p>${esc(p.text)}</p><a class="text-link outline-cta" href="${url(p.ctaHref)}">${esc(p.ctaLabel)} ${arrow}</a></div><div class="faq-list">${join(p.items, (f, i) => `<details name="codeware-faq"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}<span aria-hidden="true">+</span></summary><p>${esc(f.a)}</p></details>`)}</div></div></section>`;

// ---------------------------------------------------------------- Contact
export type ContactProps = {
  kicker: string;
  heading: string;
  intro: string;
  email: string;
  phone: string;
  address: string;
  noteTitle: string;
  noteText: string;
  badge: string;
  serviceOptions: { name: string }[];
  productOptions: { name: string }[];
  submitLabel: string;
  privacyHref: string;
};
export const renderContact = (p: ContactProps) => {
  const tel = '+' + p.phone.replace(/\D/g, '');
  return `<section class="home-section light-section" id="contact" aria-labelledby="contact-heading"><div class="container contact-grid"><div class="contact-intro"><span class="section-kicker">${esc(p.kicker)}</span><h2 id="contact-heading">${br(p.heading)}</h2><p>${esc(p.intro)}</p><div class="contact-direct"><a href="mailto:${esc(p.email)}">${esc(p.email)} ↗</a><a href="tel:${esc(tel)}">${esc(p.phone)} ↗</a><span class="field-helper">${esc(p.address)}</span></div><div class="contact-note"><h3>${esc(p.noteTitle)}</h3><p>${esc(p.noteText)}</p><span class="review-badge">${esc(p.badge)}</span></div></div><form class="contact-form" id="homepage-contact" data-email="${esc(p.email)}" novalidate><div class="form-row"><div class="contact-field"><label for="contact-name">Your name *</label><input id="contact-name" name="name" autocomplete="name" placeholder="Your full name" required maxlength="120" aria-describedby="contact-name-error"><span class="field-error" id="contact-name-error" hidden>Enter your name.</span></div><div class="contact-field"><label for="contact-email">Work email *</label><input id="contact-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required maxlength="254" aria-describedby="contact-email-error"><span class="field-error" id="contact-email-error" hidden>Enter a valid email address.</span></div></div><div class="form-row"><div class="contact-field company-field"><label for="contact-company">Company <span class="field-helper">(optional)</span></label><input id="contact-company" name="company" autocomplete="organization" placeholder="Your company" maxlength="160"></div><input type="hidden" id="contact-type" name="enquiry" value="General enquiry"></div><div class="contact-field" id="contact-product-field" hidden><label for="contact-product">Which product?</label><select id="contact-product" name="product" disabled><option value="">Help me choose</option>${join(p.productOptions, (o) => `<option>${esc(o.name)}</option>`)}</select></div><div class="contact-field"><label for="contact-services-trigger" id="contact-services-label">I need help with <span class="field-helper">(select any)</span></label><div class="service-picker" id="contact-service-picker"><button type="button" id="contact-services-trigger" aria-expanded="false" aria-controls="contact-service-options"><span id="contact-services-summary">Select services</span><svg aria-hidden="true"><use href="#chevron"></use></svg></button><div class="service-picker-list" id="contact-service-options" role="group" aria-labelledby="contact-services-label" hidden>${join(p.serviceOptions, (o) => `<label><input type="checkbox" name="services" value="${esc(o.name)}"><span>${esc(o.name)}</span></label>`)}</div></div><div class="contact-chips" id="contact-service-chips" aria-label="Selected services"></div><span class="sr-only" id="contact-services-status" role="status"></span></div><div class="contact-field" id="call-time-field" hidden><label for="call-time">Preferred time and time zone <span class="field-helper">(optional)</span></label><input id="call-time" name="preferredTime" placeholder="e.g. Tuesday afternoon, Bangladesh time" maxlength="160" disabled><span class="field-helper">A call request is not a confirmed booking.</span></div><div class="contact-field"><label for="contact-message">Tell us about your project or question *</label><textarea id="contact-message" name="message" required maxlength="5000" placeholder="What are you building or trying to improve?" aria-describedby="contact-message-error"></textarea><span class="field-error" id="contact-message-error" hidden>Add a short description of what you need.</span></div><label class="phone-check"><input id="contact-phone-check" type="checkbox">I would prefer a phone response.</label><div class="contact-field" id="contact-phone-field" hidden><label for="contact-phone">Phone number, including country code *</label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+880…" disabled aria-describedby="contact-phone-error"><span class="field-error" id="contact-phone-error" hidden>Enter your phone number.</span></div><button class="button" type="submit">${esc(p.submitLabel)} ${arrow}</button><p class="form-privacy">Prepare an email to review and send to our team. Nothing is submitted or stored by this page. Read our <a href="${url(p.privacyHref)}" target="_blank" rel="noopener">privacy policy</a>.</p><div class="draft-result" id="draft-result" hidden><h3>Your draft is ready.</h3><p id="draft-status" role="status">Review your enquiry below, then open it in your email app. It has not been sent.</p><label class="sr-only" for="draft-text">Enquiry draft</label><textarea id="draft-text" readonly></textarea><div class="draft-actions"><a id="draft-email" href="mailto:${esc(p.email)}">Open email app ↗</a><button type="button" id="copy-draft">Copy enquiry</button></div></div></form></div></section>`;
};

// ---------------------------------------------------------------- Footer (+ global presence)
export type FooterProps = {
  globalHeading: string;
  globalImage: string;
  countries: { role: string; name: string; address: string; phone: string }[];
  logo: string;
  hqTitle: string;
  hqAddress: string;
  email: string;
  phone: string;
  messengerHref: string;
  groups: { title: string; links: { label: string; href: string }[] }[];
  copyright: string;
  privacyHref: string;
};
export const renderFooter = (p: FooterProps) =>
  `<footer class="site-footer"><section class="global-presence" aria-labelledby="global-heading">${p.globalImage ? `<img class="global-earth" src="${url(p.globalImage)}" alt="" width="1800" height="1100" loading="lazy" decoding="async">` : ''}<div class="container"><div class="global-heading"><h2 id="global-heading">${esc(p.globalHeading)}</h2></div><div class="country-grid">${join(p.countries, (c) => `<article class="country-card"><p>${esc(c.role)}</p><h3>${esc(c.name)}</h3><address>${br(c.address)}</address><a href="tel:+${esc(c.phone.replace(/\D/g, ''))}">${esc(c.phone)}</a></article>`)}</div></div></section><div class="container footer-panel"><div class="footer-top"><div class="footer-brand"><a class="logo" href="/" aria-label="Home"><span class="logo-plate"><img src="${url(p.logo)}" alt="Codeware" width="1477" height="173" loading="lazy"></span></a><h3>${esc(p.hqTitle)}</h3><address>${br(p.hqAddress)}</address><a class="footer-contact" href="mailto:${esc(p.email)}">${esc(p.email)}</a><a class="footer-contact" href="tel:+${esc(p.phone.replace(/\D/g, ''))}">${esc(p.phone)}</a><div class="footer-socials">${p.messengerHref ? `<a href="${url(p.messengerHref)}" target="_blank" rel="noopener" aria-label="Message us on Messenger"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3C6.5 3 3 6.5 3 11c0 2.5 1.1 4.6 3 6v4l3.5-2A11 11 0 0012 19c5.5 0 9-3.5 9-8s-3.5-8-9-8z" stroke="currentColor" stroke-width="1.5"></path><path d="M6.5 14l5-5 3 2 3-2-5 5-3-2z" fill="currentColor"></path></svg></a>` : ''}<a href="mailto:${esc(p.email)}" aria-label="Email us"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M3 6l9 7 9-7"></path></svg></a></div></div>${join(p.groups, (g) => `<div class="footer-group"><h3>${esc(g.title)}</h3>${join(g.links, (l) => `<a href="${url(l.href)}"${ext(l.href)}>${esc(l.label)}${/^https?:\/\//i.test(l.href) ? ' ↗' : ''}</a>`)}</div>`)}</div><div class="footer-bottom"><span>${esc(p.copyright)}</span><div><button class="footer-motion" id="page-motion-toggle" type="button" aria-pressed="false">Pause animations</button><a href="${url(p.privacyHref)}"${ext(p.privacyHref)}>Privacy policy ↗</a><a href="#main">Back to top ↑</a></div></div></div></footer>`;
