# buffermint-landing — status

Last updated: 2026-10-28. The master plan is in `../PLAN.md`.

## Security (2026-10-28, BM-48)
- **Vue 2 is gone** (lane `lane/t-20261028-landing-drop-vue2`, reviewed and merged 2026-10-28, not deployed yet): `vue`, `vue-loader` and `vue-template-compiler` are out of package.json and yarn.lock. The one Vue part in use, the blog search box on /articles/, is now plain JS (`source/_assets/js/blog-search.js` + `_partials/articles/search.blade.php`, fuse.js as before); the unused Index/ArticleCard/SearchBasic components are deleted (BM-46's WebP `<picture>` lived in that never-mounted ArticleCard; the visible cards are Blade, and `tests/cards.test.mjs` keeps only the index.json/featured.json checks). `main.js` 123,549 → 18,741 B (43.2 → 6.6 KB gzip). Correction to the 2026-10-24 note: main.js shipped the *full* Vue build (template compiler included) and compiled every page's `<main id="app">` at runtime, which also dropped `<style>`/`<script>` tags inside `<main>` (the careers page's Workable list style now applies again).
- `yarn audit` before → after: 6 (4 low, 1 moderate, 1 high; 914 packages) → **4** (3 low, 1 high; 899). Left, all build-time or unused: `body-parser` (high, laravel-mix > webpack-dev-server > express; dev server only, new since 2026-10-24), `elliptic` (low, no patch), `quill` (low, CSS only), `deepmerge` (low, via choices.js, new; nothing ships it). `composer audit` unchanged.
- Layout check: full-page and search-open screenshots of /articles/ before/after, desktop identical, phone same layout (only lazy-image timing differs). The same e2e passes on the old Vue build (`ALLOW_VUE=1 LANDING_BUILD=…`).
- Test: `tests/blog-search.test.mjs` (no Vue in package/lock/bundle, plus `tests/e2e/blog-search.e2e.mjs` in headless Chromium at desktop and phone through `bin/one-chrome`; needs `playwright-core` 1.64.1 and its cached Chromium).

## Security (2026-10-24)
- GitHub's "146 vulnerabilities" (11 critical, 61 high, 54 moderate, 20 low) could not be read from the VPS: no `gh` or token there, and the deploy key can't call the Dependabot API. Local audits were used instead.
- Local audit on `main` (d94798c): `composer audit` clean (0). `yarn audit` (914 packages): **4 open** (3 low, 1 moderate), 0 high or critical. Before this check it was the same 4, so no change was made and the build output is unchanged. The 146 is most likely a stale count from before d3c2542; Dependabot recounts after the next push.
- The 4 left, all with no patched release in the version line we use:
  - `vue` 2.6.14 (low, ReDoS in the template parser): fix only in Vue 3. Vue 2 runtime ships in main.js, but the vulnerable `parseHTML` is the template compiler, which is not shipped (no runtime compile).
  - `vue-template-compiler` (moderate, XSS via prototype pollution): no patch. Build-time only, so nothing ships.
  - `elliptic` via laravel-mix > node-libs-browser (low): no patch. Build-time only; not in any built JS.
  - `quill` 2.0.3 (low, XSS in HTML export): no patched version. Only quill's CSS is bundled; the library isn't in the built JS and no page uses `data-quill`.
- Not dismissed on GitHub (no access). The owner can dismiss the 4 as "not used / tolerable risk" in the GitHub UI if they still show; a Vue 3 migration is the only real fix for the Vue pair.

## State
- Jigsaw site for buffermint.com, covering every path except /tools/. Publish it through `../buffermint-pages/publish.sh`.
- `main` = origin, clean. Live = `main` as of 2026-10-26 (Pages 443cf329, deployed from buffermint-vps through `sudo bm-www`; before that d4b2bff1).
- **Recent work:**
  - 2026-10-27 (lane `lane/t-20261027-landing-small-fixes`, not merged or deployed yet): **BM-46** post covers get `image-set()` with the WebP copy after a plain `url()` fallback (`listeners/PostProcessHtml.php`), and the Vue blog cards render `<picture>` with a WebP `<source>` from a new `webp` field in `index.json`/`featured.json` (`listeners/GenerateIndex.php`, `ArticleCard.vue`). **BM-47** `posts.js` no longer throws on pages without `#blog-scroll-position`. **BM-45** PLAN 14 now names buffermint-vps and `sudo bm-publish` instead of the droplet. First test suite: `tests/*.test.mjs` (`node:test` over `build_production/`; `npm test`, Node 20 and 22).
  - 2026-10-26: `deploy.sh` copies into the web root through `sudo bm-www` (5017371; root-owned web root, no links; security audit 2026-10-25). Redeployed from `main` 2026-10-26 14:50: Pages 443cf329, `/var/www/buffermint-landing` root-owned. The brand submodule now points at `rishpandey/buffermint-brand` (92136d8; repo moved and renamed). PLAN 12B is done on branch `jigsaw-1.8` (43b978f, 6400df1: Jigsaw 1.3.37 → 1.8.8); not merged or deployed (owner call).
  - 2026-10-25 (landing leftovers, fd33e24 + 2368247): **PLAN 9 finished:** 39 WebP copies next to the uploads (3.0 → 1.8 MB for those files; originals kept as the fallback). A new afterBuild listener, `listeners/PostProcessHtml.php`, wraps every `/assets/img/uploads/` `<img>` in `<picture>` with a WebP `<source>` and adds `width`/`height` from the file (`img[data-dim] { height: auto }` keeps the ratio). **axe leftovers fixed:** the same listener renumbers headings inside `#post-content` so they never skip a level (a renumbered heading keeps its look, e.g. `<h2 class="h3">`); the post CTA is a `<section aria-label>` with an `<h2>` instead of an `<aside>`; links in post/About text are underlined. **PLAN 13:** `vendor.js` 479 → 104 KB (jQuery for blog search + jarallax for post covers; Bootstrap JS, fancybox, AOS, choices, flickity, imagesloaded, isotope, smooth-scroll, typed dropped: no page uses them), `vendor.css` 92 KB → jarallax only (no more quill ×4, hljs), `theme.js` polyfills only, Feather WOFF only. Checks (local build, same tooling before/after): axe-core 4.14 light+dark on all 29 pages **76 → 0** violations; Lighthouse 12.2.1 mobile median home 65 → 67 (LCP 10.3 → 7.0 s, 1742 → 1105 KB), post 63 → 68 (LCP 8.5 → 5.0 s, 1350 → 714 KB, a11y 98 → 100), About 66 → 76 (a11y 94 → 100). Screenshots before/after match (desktop + phone, 7 pages). Live check: 10 pages 200, WebP and JPEG fallbacks 200 with the right types.
  - 2026-10-24: reproducible build, verified from a fresh GitHub clone (same 29 pages; only sitemap/feed/index.json order differs). The 29 files that existed only in gitignored `source/assets/build/` (27 legacy favicons, `brand.svg`, `logo_square.png`; unlinked but still requested, 200 live) now live in `source/_assets/img/` and are copied by `webpack.mix.js`. **Fonts decision (director):** Hanken Grotesk from the brand repo only; HK Grotesk Pro stays out for good (README). PLAN 12 option A (`php -d error_reporting`), PLAN 10 (ISO dates, heading order, alt text, figcaption contrast, `<main>` landmark; axe-core light+dark on 6 pages: no contrast issues, only in-post heading order, an aside in main and one underlined-link nit left), PLAN 9 (uploads capped at 1600 px: 7.4 → 3.6 MB; card thumbnails, lazy loading, Feather `font-display: swap`, careers Unsplash at w=400), PLAN 11 mechanical (7 Calendly links use `discovery_call_url`). SEO-ANALYTICS table refreshed.
  - 2026-10-23: live at 694 free tools (Pages 140b7a7f, deployed from buffermint-vps). The unused commercial HK Grotesk Pro files (54, gitignored `source/assets/build/css/fonts/HKGroteskPro`) are out of the build and now 404 live; the site font is Hanken Grotesk (OFL) from the brand repo. The files are archived on the VPS in `~agent/archive/landing-hkgroteskpro/`. Still open: the other assets in gitignored `source/assets/build/` (favicons, logos, theme images, Feather icons) aren't reproducible from git yet.
  - Removed GA4, so GoatCounter is the only analytics.
  - Fixed blog search and cleared the critical Dependabot alerts (commit d3c2542 said "142 of 146"; see Security below).
  - New home, about and contact copy, with the shared brand chrome.
  - SEO automation, and the move to Cloudflare Pages.
- **PLAN.md:** items 1–10 and 13 are done; 11 is done where mechanical (the rest needs the owner); 12 option A is done; 12B is done on branch `jigsaw-1.8`, waiting on the owner to merge. Open: 11 (owner), 14.

## Build assets (resolved 2026-10-24)
- `source/assets/build/` stays gitignored and is fully rebuilt by `yarn run prod`. The archived HK Grotesk Pro files stay in `~agent/archive/landing-hkgroteskpro/` on the VPS, unused.

## Next steps
1. PLAN 11, needs the owner: post dates (all 2021), the `-copy` slug (option a or b), the empty `/our-pricing` page (write or delete), the copy questions.
2. PLAN 12B: merge `jigsaw-1.8` once the owner says so, then deploy; 14 (optional). Ship the 2026-10-27 lane (BM-45/46/47) after review.
3. Footer: Twitter → X and Facebook links live in the brand repo chrome, not here.

## Waiting on you
- Merging `jigsaw-1.8` (PLAN 12B, ready).
- 2026-10-26 (BM-189): `deploy.sh` no longer defaults to a root login; Mac emergency path uses `agent@buffermint-vps` + `sudo bm-www` (OWNER-TODO 30 unblocked).
- Search Console and Bing verification.
- The 3 unanswered questions in `../COPY-REVIEW.md`: the "45 days" claim, the testimonial, and the Work-with-us target.

## Tests
- `npm run prod && ./vendor/bin/jigsaw build production && npm test` (node:test over the built site).

## Read first
1. PLAN.md
2. SEO-ANALYTICS-PLAN.md
3. README.md
