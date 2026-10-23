# buffermint-landing — status

Last audited: 2026-10-23. The master plan is in `../PLAN.md`.

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
- `main` = origin, clean. Latest commit is d94798c (2026-10-23).
- **Recent work:**
  - 2026-10-23: live at 694 free tools (Pages 140b7a7f, deployed from buffermint-vps). The unused commercial HK Grotesk Pro files (54, gitignored `source/assets/build/css/fonts/HKGroteskPro`) are out of the build and now 404 live; the site font is Hanken Grotesk (OFL) from the brand repo. The files are archived on the VPS in `~agent/archive/landing-hkgroteskpro/`. Still open: the other assets in gitignored `source/assets/build/` (favicons, logos, theme images, Feather icons) aren't reproducible from git yet.
  - Removed GA4, so GoatCounter is the only analytics.
  - Fixed blog search and cleared the critical Dependabot alerts (commit d3c2542 said "142 of 146"; see Security below).
  - New home, about and contact copy, with the shared brand chrome.
  - SEO automation, and the move to Cloudflare Pages.
- **PLAN.md:** items 1–8 are done. Items 9–14 are open: images, accessibility, a content refresh, upgrading Jigsaw for PHP 8.4, the vendor bundle, and auto-deploy/CMS.

## Untracked build assets (found 2026-10-23)
- 83 files under `source/assets/build/` exist only on disk: `css/fonts/HKGroteskPro/` (54), `img/favicons/` (27) and 2 logos in `img/logos/`. That folder is gitignored, and webpack.mix.js doesn't produce these files, so a fresh clone builds a site without its fonts and favicons. They were copied by hand to buffermint-vps.
- **Owner's call:** HK Grotesk Pro is a commercial font and this repo is public. Options: commit the favicons and logos and keep the fonts out of git (copied per machine), or move the fonts to a private place such as the brand repo.

## Next steps
0. **Security alerts: done (2026-10-24).** See the Security section. Nothing more to fix without a Vue 3 migration; the owner can confirm the GitHub count after Dependabot recounts.
1. Refresh the "Where things stand today" table in SEO-ANALYTICS-PLAN.md. It still lists GA4 and Hotjar.
2. Work through PLAN items 9–12.

## Waiting on you
- Search Console and Bing verification.
- The 3 unanswered questions in `../COPY-REVIEW.md`: the "45 days" claim, the testimonial, and the Work-with-us target.

## Read first
1. PLAN.md
2. SEO-ANALYTICS-PLAN.md
3. README.md
