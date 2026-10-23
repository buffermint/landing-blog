# buffermint-landing — status

Last audited: 2026-10-23. The master plan is in `../PLAN.md`.

## State
- Jigsaw site for buffermint.com, covering every path except /tools/. Publish it through `../buffermint-pages/publish.sh`.
- `main` = origin, clean. Latest commit is d94798c (2026-10-23).
- **Recent work:**
  - 2026-10-23: live at 694 free tools (Pages 140b7a7f, deployed from buffermint-vps). The unused commercial HK Grotesk Pro files (54, gitignored `source/assets/build/css/fonts/HKGroteskPro`) are out of the build and now 404 live; the site font is Hanken Grotesk (OFL) from the brand repo. The files are archived on the VPS in `~agent/archive/landing-hkgroteskpro/`. Still open: the other assets in gitignored `source/assets/build/` (favicons, logos, theme images, Feather icons) aren't reproducible from git yet.
  - Removed GA4, so GoatCounter is the only analytics.
  - Fixed blog search and cleared Dependabot alerts (142 of 146).
  - New home, about and contact copy, with the shared brand chrome.
  - SEO automation, and the move to Cloudflare Pages.
- **PLAN.md:** items 1–8 are done. Items 9–14 are open: images, accessibility, a content refresh, upgrading Jigsaw for PHP 8.4, the vendor bundle, and auto-deploy/CMS.

## Untracked build assets (found 2026-10-23)
- 83 files under `source/assets/build/` exist only on disk: `css/fonts/HKGroteskPro/` (54), `img/favicons/` (27) and 2 logos in `img/logos/`. That folder is gitignored, and webpack.mix.js doesn't produce these files, so a fresh clone builds a site without its fonts and favicons. They were copied by hand to buffermint-vps.
- **Owner's call:** HK Grotesk Pro is a commercial font and this repo is public. Options: commit the favicons and logos and keep the fonts out of git (copied per machine), or move the fonts to a private place such as the brand repo.

## Next steps
0. **Check the security alerts (2026-10-23):** on push, GitHub reported 146 vulnerabilities on `buffermint/landing-blog` main (11 critical, 61 high, 54 moderate, 20 low), but the cleanup above says 142 of 146 were cleared. Find out which is true (`gh api repos/buffermint/landing-blog/dependabot/alerts`), fix what is real in the build toolchain (yarn/composer), rebuild, and confirm the SEO gate and the live site.
1. Refresh the "Where things stand today" table in SEO-ANALYTICS-PLAN.md. It still lists GA4 and Hotjar.
2. Work through PLAN items 9–12.

## Waiting on you
- Search Console and Bing verification.
- The 3 unanswered questions in `../COPY-REVIEW.md`: the "45 days" claim, the testimonial, and the Work-with-us target.

## Read first
1. PLAN.md
2. SEO-ANALYTICS-PLAN.md
3. README.md
