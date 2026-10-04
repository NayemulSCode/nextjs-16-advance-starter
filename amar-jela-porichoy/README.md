# আমার জেলা পরিচয় · Amar Jela Pori-choy

A no-login, no-backend browser app on a 64-district map of Bangladesh:

- **Food Map** — tick the districts whose famous food you have eaten.
- **Dialect Quiz** — guess the district from a word or sentence.
- **Profile + share card** — both results, badges, and a PNG card (1080×1350 and 1200×630) with no personal data.

English / বাংলা toggle, 3 colour themes, state saved in `localStorage` (key `ajp:v1`).

## Stack (latest at time of writing)

Next.js 16.3 · React 19.3 · Tailwind CSS 4.3 · TypeScript 6 · Zustand 5 · html-to-image · self-hosted Noto Sans Bengali (`@fontsource-variable`).
TypeScript 7 is not used yet because `typescript-eslint` does not support it.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Data (all in `src/data`, edit by pull request)

| File | What |
| --- | --- |
| `districts.json` | 64 districts: id, English + Bangla name, division |
| `map.json` | SVG path per district id (generated) |
| `foods.json` | 1–3 foods per district with EN/BN names and notes |
| `quiz.json` | Dialect questions with answers, decoys, notes and a `verified` flag |

Regenerate the map with `npm run build:map` (source: `scripts/source`, geoBoundaries gbOpen BGD ADM2, **CC BY 4.0** — credit is in the footer).

## Known gaps — please read

- **Quiz pool has 6 questions, all `verified: false`.** The plan calls for 40+ questions reviewed by local speakers before launch. Add questions to `quiz.json` and set `verified` only after a local speaker confirms. A round uses up to 10 questions.
- **Several `foods.json` entries are generic placeholders** (e.g. "Local rice", "Local snacks", "Sweets"). Replace them with well-known specialities of that district.
- Set `NEXT_PUBLIC_SUGGEST_URL` to your suggestion form (or a `mailto:` link) for the "Suggest a food" link.
- Share-card export still needs testing on low-end Android and Safari (done only in desktop Chromium here).
- Not started: Vercel deploy + custom domain, analytics, per-language link-preview images (plan phase 6).
