# buffermint-landing — status

Last updated: 2026-10-24. The master plan is in `../PLAN.md`.

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
- `main` = origin, clean. Live = `main` as of 2026-10-24 (Pages 853ee214, deployed from buffermint-vps).
- **Recent work:**
  - 2026-10-24: reproducible build, verified from a fresh GitHub clone (same 29 pages; only sitemap/feed/index.json order differs). The 29 files that existed only in gitignored `source/assets/build/` (27 legacy favicons, `brand.svg`, `logo_square.png`; unlinked but still requested, 200 live) now live in `source/_assets/img/` and are copied by `webpack.mix.js`. **Fonts decision (director):** Hanken Grotesk from the brand repo only; HK Grotesk Pro stays out for good (README). PLAN 12 option A (`php -d error_reporting`), PLAN 10 (ISO dates, heading order, alt text, figcaption contrast, `<main>` landmark; axe-core light+dark on 6 pages: no contrast issues, only in-post heading order, an aside in main and one underlined-link nit left), PLAN 9 (uploads capped at 1600 px: 7.4 → 3.6 MB; card thumbnails, lazy loading, Feather `font-display: swap`, careers Unsplash at w=400), PLAN 11 mechanical (7 Calendly links use `discovery_call_url`). SEO-ANALYTICS table refreshed.
  - 2026-10-23: live at 694 free tools (Pages 140b7a7f, deployed from buffermint-vps). The unused commercial HK Grotesk Pro files (54, gitignored `source/assets/build/css/fonts/HKGroteskPro`) are out of the build and now 404 live; the site font is Hanken Grotesk (OFL) from the brand repo. The files are archived on the VPS in `~agent/archive/landing-hkgroteskpro/`. Still open: the other assets in gitignored `source/assets/build/` (favicons, logos, theme images, Feather icons) aren't reproducible from git yet.
  - Removed GA4, so GoatCounter is the only analytics.
  - Fixed blog search and cleared the critical Dependabot alerts (commit d3c2542 said "142 of 146"; see Security below).
  - New home, about and contact copy, with the shared brand chrome.
  - SEO automation, and the move to Cloudflare Pages.
- **PLAN.md:** items 1–8 and 10 are done; 9 is done except optional WebP; 11 is done where mechanical (the rest needs the owner); 12 option A is done. Open: 11 (owner), 12B, 13, 14.

## Build assets (resolved 2026-10-24)
- `source/assets/build/` stays gitignored and is fully rebuilt by `yarn run prod`. The archived HK Grotesk Pro files stay in `~agent/archive/landing-hkgroteskpro/` on the VPS, unused.

## Next steps
1. PLAN 11, needs the owner: post dates (all 2021), the `-copy` slug (option a or b), the empty `/our-pricing` page (write or delete), the copy questions.
2. PLAN 9 leftovers: WebP versions and `width`/`height` on post images (optional; Lighthouse re-run to measure).
3. PLAN 12 option B (Jigsaw 1.8) when the templates are next touched; PLAN 13 (vendor bundle), 14 (optional).
4. Footer: Twitter → X and Facebook links live in the brand repo chrome, not here.

## Waiting on you
- Search Console and Bing verification.
- The 3 unanswered questions in `../COPY-REVIEW.md`: the "45 days" claim, the testimonial, and the Work-with-us target.

## Read first
1. PLAN.md
2. SEO-ANALYTICS-PLAN.md
3. README.md
