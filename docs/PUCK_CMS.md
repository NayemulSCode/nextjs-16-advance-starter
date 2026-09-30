# Puck page editor (CMS)

The website is content-managed. Pages are created in your **separate admin app**; this app only hosts the
visual editor (Puck) and renders the published pages.

## How it works

```
Admin app                                   This app (Next.js)
─────────                                   ──────────────────
create page "/about"
sign JWT (HS256, exp ≈ 30 min)  ───────►    /editor/about?token=<JWT>
                                            proxy.ts verifies the token, stores it in an
                                            httpOnly cookie (lifetime = token exp, max 30 min)
                                            and strips it from the URL
                                            Puck editor loads  → edit blocks / SEO / images
                                            Publish → PUT /api/editor/pages → CMS API (or local file)
token expired / missing  ◄───────────────   redirect to ADMIN_URL + ADMIN_REDIRECT_PATH
user reopens page in admin                  public page /about re-renders (revalidatePath)
```

### Token (JWT, HS256, signed with `EDITOR_JWT_SECRET`)

| claim  | required | meaning                                                         |
| ------ | -------- | --------------------------------------------------------------- |
| `sub`  | yes      | admin user id                                                   |
| `exp`  | yes      | expiry (unix seconds). Session never outlives it or 30 min      |
| `path` | no       | restrict to one page path, e.g. `/about` (`*`/omitted = any)    |
| `name` | no       | display name                                                    |
| `iss`/`aud` | no  | checked only if `EDITOR_JWT_ISSUER` / `EDITOR_JWT_AUDIENCE` set |

Local development: `EDITOR_JWT_SECRET=... node scripts/dev-token.mjs /about` prints a ready-to-open URL.

### Content backend

Set `CMS_API_URL` to your admin's REST API (Bearer = the editor token):

- `GET  {CMS_API_URL}/pages?path=/about` → `{ path, data, updatedAt }` or `404`
- `PUT  {CMS_API_URL}/pages` body `{ path, data, updatedAt }`
- `POST {CMS_API_URL}/media` multipart `file` → `{ url }` (image/video uploads)

Without `CMS_API_URL`, pages are stored in `.data/pages/*.json` and uploads go to `public/uploads/`
(images are resized and converted to WebP with `sharp`). Development only.

`data` is Puck JSON: `{ root: { props: { title, description, keywords, ogImage, canonical, noindex, contactEmail } }, content: [...] }`.

## What editors can do

- **SEO panel** – click empty canvas / "Page" in the right sidebar: title, meta description, keywords,
  OG image (upload), canonical URL, noindex. Rendered via `generateMetadata` (`src/lib/cms/seo.ts`).
- **Drag & drop blocks** – left sidebar. *Codeware sections* are the homepage design, one block per section
  (header, hero + project carousel, products, logos, showcase video, services, work, testimonials, why us,
  process, consultation CTA, FAQ, contact form, footer). Each section's texts, links, images and repeating
  items are editable. Generic blocks: Hero, Heading, **Rich text**, Image, Columns (nested drop zones), Button, Spacer.
- **Rich text** – the *Rich text* block is an inline WYSIWYG (headings, bold/italic, lists, links, quotes, alignment).
- **Image / video upload** – every image field has *Upload image* (or paste a URL).
- **Outline** tab shows the page tree; **Publish** saves and revalidates the public page.

The `/` page shows the approved Codeware design (`src/puck/codeware/home.ts`) until it is first published.

## Code map

| path | purpose |
| ---- | ------- |
| `src/proxy.ts` | token → cookie exchange, guards `/editor/*` |
| `src/lib/cms/*` | auth (jose), page store, SEO metadata |
| `src/app/editor/[[...slug]]` | editor route + client `<Puck>` |
| `src/app/[...slug]/page.tsx`, `src/app/page.tsx` | public rendering with `<Render>` |
| `src/app/api/editor/pages`, `src/app/api/upload` | publish + upload endpoints (cookie-authenticated) |
| `src/puck/config.tsx` | Puck config: root (SEO), generic blocks |
| `src/puck/codeware/` | Codeware design blocks: `render.ts` (markup), `blocks.tsx` (fields), `defaults.ts` (content) |
| `src/styles/codeware.css`, `public/codeware/` | design CSS (scoped to `.cw`), runtime script, images |

## Adding a block

1. Add an HTML renderer + props type in `src/puck/codeware/render.ts` (or a JSX component in `src/puck/config.tsx`).
2. Register fields/defaults in `blocks.tsx` / `defaults.ts`, and add it to `cwBlocks`.
3. Add its prop type to `CwProps` in `src/puck/config.tsx`.

Notes: the interactive behaviours (menus, carousels, tabs, scroll scene, enquiry form) come from
`public/codeware/runtime.js`, loaded only on the live site (not inside the editor canvas). After a client-side
navigation between CMS pages use a full page load (plain `<a>`), as the script initialises once per load.
