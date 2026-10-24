# buffermint.com landing + blog: audit and fix plan

Audit date: 2026-10-20, the day the site moved from Netlify to the droplet (Caddy).
**Hosting update (2026-10-20, later that day):** buffermint.com moved off the droplet to Cloudflare Pages
(free). The droplet answered in 15–35 s because InvoiceShelf shares its single CPU; Pages answers in
0.15–0.6 s. DNS is on Cloudflare now (nameservers moved from Squarespace), with the Google Workspace
MX/SPF/DKIM records carried over. `deploy.sh` still builds here, then publishes through
`../buffermint-pages/publish.sh`. Mentions of Caddy below describe the setup at audit time.
Scope: this repo (buffermint/landing-blog), live at https://buffermint.com/ (every path except `/tools/`).
**Status (2026-10-20):** items 1–8 are done in the commit after this plan (newsletter: option B).
Hotjar was removed in 781501e (replaced by cookie-free GoatCounter); GA4 was removed later, so GoatCounter is the only analytics. For item 7, webpack is pinned to `~5.104.1` (5.112+
breaks laravel-mix's build output plugin; see README), with laravel-mix 6.0.49 and vue-loader 15.11.1.
**Status (2026-10-24):** 10 done; 9 done except optional WebP and `width`/`height` on post images; 11 done where
mechanical (Calendly links), the rest needs your input; 12 option A done. Open: the rest of 11, 12B, 13, 14.

How it was checked:
- read every template, partial, Vue component and config file;
- crawled all 31 URLs in the live `sitemap.xml` and checked their 139 link and image targets;
- ran a local build (`yarn run prod`, `jigsaw build production`) with Node 20.20 and PHP 8.4.25;
- ran Lighthouse 12.2.1 (mobile) on `/` and on `/articles/launch-your-micro-saas-product`;
- loaded `/careers` in a browser to check the embeds.

Effort sizes: **XS** < 30 min, **S** about 1 h, **M** half a day, **L** 1 day or more.

---

## Priority order (summary)

| # | Item | Priority | Effort |
|---|------|----------|--------|
| 1 | Replace the broken HubSpot newsletter form (on every page) | P0 | S (CTA) to M (new form) |
| 2 | Fix 3 broken post images, 1 broken link and the share links | P0 | XS |
| 3 | Remove the Netlify leftovers (Identity widget, `/admin`, `netlify.toml`) | P0 | S |
| 4 | Fix the meta tags: description, canonical, absolute og:image, robots | P1 | S |
| 5 | Fix the sitemap: drop `/admin` URLs, use real lastmod dates | P1 | XS |
| 6 | Add a "Free tools" link to the nav and footer | P1 | XS |
| 7 | Make the build work without `--openssl-legacy-provider`, and document it | P1 | S |
| 8 | Remove unused third-party JS/CSS (Mapbox, HubSpot, Netlify; review Hotjar) | P1 | S |
| 9 | Optimise images (responsive thumbnails, sizes, lazy loading) | P2 | M |
| 10 | Accessibility fixes (alt text, link names, contrast, heading order) | P2 | S |
| 11 | Content refresh: the "2021" post, the 2021 Calendly links, the empty pricing page, old copy | P2 | M (plus writing time) |
| 12 | Upgrade Jigsaw for PHP 8.4 (or pin PHP 8.2) | P2 | M |
| 13 | Prune the vendor JS bundle and fonts | P3 | M |
| 14 | Optional: auto-deploy from GitHub, or a CMS for non-developers | P3 | M |

Items 1 to 8 are about one day of work in total and fix everything that is visibly broken.

---

## 1. Broken HubSpot newsletter form (P0)

**Findings**
- The HubSpot form no longer exists. Every page logs two console errors:
  `forms-eu1.hsforms.com/embed/v3/form/24917138/27b9a8e8-…/json` returns **404**, and
  `hubspot-forms-static-embed-eu1.s3.amazonaws.com/prod/24917138/27b9a8e8-…` returns **403**.
- `source/_partials/scripts.blade.php:4-12` loads `js-eu1.hsforms.net/forms/shell.js` and calls
  `hbspt.forms.create(...)` **on every page**. There is no `target`, so the form is injected at the end of
  `<body>`. `source/_assets/scss/_user.scss:63` (`.hbspt-form { display: none }`) hides it.
- What visitors actually see is the Vue `<newsletter>` component
  (`source/_assets/js/components/Newsletter.vue`): "Get our articles delivered / From us to your inbox weekly".
  Its `submit()` (lines 78-106) reads the hidden HubSpot iframe (`$(".hbspt-form iframe")[0]`) and re-posts
  the iframe form's `action`. The iframe now never renders, so `iframe.contentWindow` throws a TypeError.
  The button shows a spinner forever, and **no signup is sent anywhere**. (I confirmed `.hbspt-form` has
  0 iframes on the live site and read the code path; I did not submit an address.)
- The component is used on the home page (`source/index.blade.php:440`), on the blog index
  (`source/_partials/articles/blog.blade.php:52`, `source/_assets/js/components/Blog/Index.vue:54`) and at the
  end of every post (`source/_layouts/post.blade.php:112`).
- Lighthouse also flags `shell.js` for a third-party cookie and as the largest piece of unused JS on both pages.

**Options**
- **A. A new HubSpot form.** Create a form in HubSpot portal 24917138 (only you can do this, it needs your
  login), then embed it with `hbspt.forms.create({ ..., target: '#newsletter-form' })` inside the component.
  Drop the iframe-scraping code, which breaks whenever HubSpot changes its markup. Choose this if you
  actually use HubSpot as your CRM. Effort **M**.
- **B. No form: a plain CTA (recommended unless you send a newsletter).** The copy promises a weekly
  newsletter, but the newest post is from Sep 2021. Replace the component with a short CTA block:
  "Building a SaaS? Book a 30-min discovery call" (the existing `discovery_call_url`, Calendly), plus
  `mailto:sales@buffermint.com` and, optionally, "Try our free tools → /tools/". No third-party JS, no
  cookies, nothing that can break. Effort **S**.
- **C. A newsletter with no backend.** Use a hosted list provider that accepts a plain HTML
  `<form method="post" action="…">` (for example Buttondown or Kit/ConvertKit), or Formspree to email you
  the signups. No JS is needed and it is about 20 lines of markup. It needs an account (you create it).
  Effort **S**.

**Recommendation:** B now, so nothing is broken today. Move to C later if you restart a newsletter.
Whichever you pick, delete the `hsforms` script, the `.hbspt-form` CSS rule and the iframe code in
`Newsletter.vue`.

---

## 2. Broken images and links inside posts (P0)

**Findings** (from the crawl; every other internal link and image returned 200)
- 3 images are 404 because their Markdown path is relative (no leading `/`), so on `/articles/slug` it
  resolves to `/articles/assets/...`:
  - `source/_posts/how-to-achieve-a-product-market-fit-with-your-product.blade.md:70` (`product-market-fit-buffermint.jpeg`)
  - `source/_posts/how-to-get-successful-startup-ideas.blade.md:67` (`have-a-future-aspect.jpeg`)
  - `source/_posts/10-predictions-for-the-saas-marketplace-future-trends.blade.md:39` (`photo-1485827404703-….jpeg`)
- One link goes to `https://buffermint.com/articles/buffermint.com` (404):
  `source/_posts/things-to-know-before-launching-your-first-tech-startup.blade.md:79`, `[BufferMint](buffermint.com)`.
- The Twitter and LinkedIn share links on all 21 posts put the raw title, with spaces, `?` and `:`, into
  the query string. `source/_components/share-social.blade.php` does not URL-encode `$url` or `$title`.
  Titles with `?` or `&` get cut off.
- External links: only crunchbase.com returned an error (403), and that is its bot blocking, not a dead link.

**Fix:** add the leading `/` to the 3 images. Change the link to `/` (or `https://buffermint.com/`). Wrap
`$url` and `$title` in `rawurlencode()` in `share-social.blade.php`, and change `twitter.com/share` to
`x.com/intent/post`. Effort **XS**.

---

## 3. Netlify leftovers (P0)

**Findings**
- `source/_partials/head.blade.php:73` loads `identity.netlify.com/v1/netlify-identity-widget.js` on every
  page, and `source/_partials/scripts.blade.php:32-42` listens for Identity logins to redirect to `/admin/`.
  It is dead code that costs a request and some JS on every page view.
- `source/admin.blade.php`, `source/admin/config.yml` and `source/admin/script.js` are the Netlify CMS
  (`backend: git-gateway`, `netlify-cms@^2` from unpkg). `deploy.sh` already skips `admin/`, so `/admin`
  is a 404, but the sitemap still lists it (see 5).
- `netlify.toml` (PHP 8.2, Node 15) and `config.staging.php` (default URL
  `jigsaw-blog-netlify-netlifycms-template.netlify.com`) are unused.
- The Netlify site itself: once DNS is confirmed on the droplet, delete or pause the old Netlify site in the
  Netlify dashboard so it stops building on every push and does not serve a stale copy at `*.netlify.app`.
  This is a dashboard action, so you would do it.

**Fix:** delete the widget script and the Identity listener, `source/admin*`, `netlify.toml` and
`config.staging.php`. Remove the `--exclude admin/` workaround and its comment from `deploy.sh`.
Effort **S**.

**How posts get edited from now on**
- **Recommended: Markdown in git, then `./deploy.sh`.** Posts are `source/_posts/<slug>.blade.md` with the
  front matter listed in `README.md`. Images go in `source/assets/img/uploads/`. Preview with
  `yarn watch` (localhost:3000). Commit, push, run `./deploy.sh`. I would expand `README.md` into a short
  "write a post" guide with a front-matter template, because the CMS field list in `admin/config.yml` was
  the only record of which fields are required.
- **Optional, if a non-developer writes posts:** Decap CMS (the renamed successor of Netlify CMS) with
  `local_backend: true`. The writer runs `npx decap-server` and `yarn watch` and gets the same editor UI
  locally, with no hosting and no auth. Hosting Decap on the droplet with the GitHub backend would instead
  need an OAuth proxy, which is more moving parts than this blog needs.
- **Optional:** a GitHub Action that runs the build and rsyncs on every push to `main`, so an edit made
  on github.com goes live by itself (see item 14).

---

## 4. Meta tags: description, canonical, OG (P1)

**Findings** (`source/_layouts/main.blade.php:7`, `source/_partials/head.blade.php`)
- **No meta description** (the tag is there but `content=""`) on `/`, `/articles`, `/contact-us`,
  `/careers`, `/startup-ideas` and `/idea-validation`. The fallback expression
  `$page->seo_description ?? ($page->excerpt ? $page->excerpt . ' - ' : '') . $page->excerpt` never falls
  back to the site `description` in `config.php`. It also prints the excerpt twice: `/about-us` has
  "We turn your idea into reality. - We turn your idea into reality."
- **No `<link rel="canonical">`** anywhere. Caddy serves both `/articles/slug` and `/articles/slug/` with
  200 (by design, see `buffermint-tools/deploy/buffermint.caddy`), so every page has a duplicate URL.
  (On Cloudflare Pages, `/articles/slug/` now 308-redirects to `/articles/slug`, so the duplicate is gone.)
- **og:image / twitter:image are not absolute URLs.** Posts emit `assets/img/uploads/….jpeg` (no slash, no
  host), and other pages emit `/assets/build/img/logos/logo_square.png?id=…`. Facebook, LinkedIn, X and
  Slack need an absolute `https://` URL, so shared links show no image today.
- `og:type` is `article` on every page, including the home page. There is no `twitter:card`, so X falls
  back to a small summary card.
- Line 16 has `<meta name=”robots” …>` with typographic quotes, so the attribute is invalid. It has no
  effect, since index/follow is the default anyway.
- `/articles` has no `<h1>` (Lighthouse/SEO).

**Fix:** in `main.blade.php`, use `description => $page->seo_description ?? $page->excerpt ?? $page->description`
and give the pages without one their own `description` front matter or section. In `head.blade.php`:
- add `<link rel="canonical" href="{{ rtrim($page->getUrl(), '/') ?: $page->baseUrl }}">` (no trailing slash, matching the sitemap and internal links);
- make the images absolute with `$page->baseUrl . ltrim($page->featured_image, '/')`;
- set `og:type` to `article` only for posts, otherwise `website`;
- add `twitter:card` = `summary_large_image`;
- delete the broken robots tag.

Effort **S**.

---

## 5. Sitemap (P1)

**Findings** (`listeners/GenerateSitemap.php`, live `/sitemap.xml`)
- It lists `/admin`, `/admin/script.js` and `/admin/config.yml`, which are all 404 now.
- `lastmod` is the build time (`time()`) for every URL, and `changefreq` is `daily` for every URL. Search
  engines learn to ignore lastmod values like these.
- The URLs have no trailing slash. That is correct and consistent with how Caddy serves them and with the
  internal links. Keep it, and make the canonicals match (item 4).
- `/our-pricing` is listed but has no content (see 11).

**Fix:** add `'/admin*'` to `$exclude` (or drop the admin files, item 3). Use the post's `date` for lastmod
on posts. Drop `changefreq`. Effort **XS**.

---

## 6. Link to the free tools (P1)

There is no link from the landing site to https://buffermint.com/tools/.
**Fix:** add `"Free tools" => "/tools/"` to `nav_menu` in `config.php`. The navbar
(`source/_partials/navbar.blade.php:26`) and the footer (`source/_partials/footer.blade.php:36`) both loop
over it, so one line covers both. Optionally add a "Free tools for founders" card on the home page, and in
the CTA that replaces the newsletter (item 1B). Effort **XS**.

---

## 7. Build health (P1 for Node, P2 for PHP: see 12)

**Findings**
- `yarn run prod` on Node 20 fails with `error:0308010C:digital envelope routines::unsupported`. The cause
  is `yarn.lock` pinning **webpack 5.41.1**, which hashes with MD4. `deploy.sh:14` works around it with
  `NODE_OPTIONS=--openssl-legacy-provider`. Webpack 5.61 and later do not need this, and laravel-mix 6.0.25
  accepts any `webpack@^5.60`.
- Dart Sass prints `/` division deprecation warnings (Bootstrap 4.6 + theme `_variables.scss`). They are
  harmless. Do not upgrade `sass` past the locked version, because newer versions add `@import`
  deprecation warnings and Sass 2/3 will drop `@import`.
- PHP 8.4 prints about 50 `Deprecated:` lines from Jigsaw 1.3.37 and illuminate 8 (item 12).
  `deploy.sh` hides them with `2>/dev/null`, which would also hide a real error message (the exit code
  still fails the deploy).
- Nothing pins the versions: there is no `.nvmrc` or `engines`, and `README.md` has no build steps.
- The production build is fast (about 5 s for mix, which also runs Jigsaw, then Jigsaw again for production).

**Fix (pinning, low risk):** `yarn upgrade webpack@^5.94` (stays within laravel-mix 6), then drop the
`NODE_OPTIONS` workaround. Add `.nvmrc` (`20`) and `"engines"` to `package.json`. Add build, preview and
deploy steps to `README.md`. Effort **S**.

**Not recommended right now:** moving from laravel-mix to Vite, or from Bootstrap 4 to 5. Both touch
every template and SCSS file, for a blog that is not changing much. Revisit only if the design is redone.

---

## 8. Third-party scripts loaded on every page (P1)

**Findings** (Lighthouse mobile: performance **68** home / **65** post, LCP 9.7 s / 8.9 s,
3.0 MB / 2.3 MB transferred)
- `head.blade.php:10` and `scripts.blade.php:17` load **Mapbox GL JS v0.53 (about 750 KB) and its CSS**
  on every page. No template uses a map: no `data-map` anywhere outside the theme's `map.js`.
- HubSpot `shell.js` (item 1) and the Netlify Identity widget (item 3) load on every page.
- Hotjar (`hjid 2570179`) and GA4 (`G-10GHKFV46D`) load on every page. Keep GA4. Check whether Hotjar is
  still used; if not, remove it. If you keep it, consider a cookie notice, since it sets cookies for EU
  visitors.

**Fix:** remove Mapbox, HubSpot and the Netlify widget, and decide on Hotjar. This alone removes about
1 MB of JS and most of the "unused JavaScript" (about 427 KB flagged). Effort **S** (it overlaps 1 and 3).

---

## 9. Images (P2)

**Done 2026-10-24:** uploads over 1600 px resized in place (same names and formats, 7.4 → 3.6 MB, the 868 KB
AVIF is 67 KB); article cards, home cards and the feature-card placeholder use `featured_thumbnail`
(feature-card backgrounds keep the cover, since they show at about 550 px); `loading="lazy"` on card and
`<x-image>` images; careers Unsplash at `w=400`; Feather `font-display: swap` (HK Grotesk is gone).
**Done 2026-10-25:** WebP copies of the uploads, served through `<picture>` with the JPEG/PNG fallback, and `width`/`height` on every upload `<img>` (afterBuild listener `listeners/PostProcessHtml.php`).

**Findings**
- `source/assets/img/uploads/` is 7.2 MB of unresized originals. The largest:
  `photo-1589561253898-768105ca91a8.avif` (868 KB, the newest post's cover, shown as a card on the home
  page), `rocket-launch-title-image-.jpeg` (646 KB), several files around 400 KB.
- Lighthouse: "properly size images" would save **1.9 MB** on the home page and 1.1 MB on the post.
  "Modern formats" would save 540 KB. Images have no `width`/`height` attributes and no `loading="lazy"`.
- The home page hotlinks Unsplash at `w=1950` and `w=2063` (`source/index.blade.php:47,65`) for images
  displayed about 150 px wide. Careers does the same (`source/careers.blade.php:66,76,86`).
- The feature cards use `featured_image` (the large cover) even where a `featured_thumbnail` exists
  (`source/_partials/articles/feature-card.blade.php:18,21`).
- Fonts: `font-display` is missing for HK Grotesk and Feather, so text is invisible while the fonts load.

**Fix:**
- use `featured_thumbnail` in the cards;
- resize uploads to at most 1600 px for covers and about 600 px for thumbnails, as WebP (a one-off
  `sharp`/`cwebp` script, keeping the originals in git history);
- change the Unsplash URLs to `&w=400`;
- add `width`/`height` and `loading="lazy"` to images below the fold;
- add `font-display: swap`.

Effort **M**.

On caching: Caddy already sends `Cache-Control: public, max-age=604800` for `/assets/*`, plus zstd/gzip.
The mix files carry `?id=` hashes and could be `immutable, max-age=31536000`. That change goes in
`buffermint-tools/deploy/buffermint.caddy`, in the other repo, so it is listed here only as an optional
follow-up.

---

## 10. Accessibility (P2)

**Done 2026-10-25:** the axe leftovers (headings skipping a level in post content, the CTA `<aside>` inside `<main>`, links in text not underlined): axe-core light+dark on all 29 pages shows 0 violations.

**Done 2026-10-24:** real ISO `datetime` everywhere (the Vue card reads `iso_date` from `index.json`);
eyebrow and author `<h6>` → `<p class="h6">`; `alt=""` on decorative careers photos and the post avatar;
`figcaption` uses the brand muted colour (other muted text already did, via `_site.scss`). The navbar,
footer and hero findings no longer apply: those are the brand repo's chrome and the new hero now.

Lighthouse accessibility: **89** home, **94** post.
- `alt="..."` on the navbar logo (`navbar.blade.php:7`), the footer social icons (`footer.blade.php:21,27`),
  the testimonial avatars and the Unsplash photos (`index.blade.php:48,66,219`, `careers.blade.php:67,77,87`).
  The fix is meaningful alt text, or `alt=""` for decorative images.
- The hero scroll button `<a href="#what-we-do" data-scroll …>` has no accessible name (in
  `_partials/hero.blade.php`). The fix is an `aria-label`.
- Contrast fails on `.text-muted` small caps headings, the card `<time>`, `.category-pill` and post
  `figcaption`. The fix is to darken those grays in `_user.scss`.
- Heading order skips levels (h1 → h6 "What we do?", h3 inside cards). The fix is to swap the eyebrow
  `<h6>` for `<p class="h6">`.
- `<time datetime="2019-05-02">` / `"2019-05-20"` is hardcoded in `ArticleCard.vue:31`,
  `article-card.blade.php:39`, `feature-card.blade.php:66` and `post.blade.php:59`. The fix is to emit the
  real ISO date (this also helps SEO).
- The footer uses `document.write` for the copyright year (`footer.blade.php:48`; Lighthouse warns). The
  fix is to render it at build time with `{{ date('Y') }}`.

Effort **S**.

---

## 11. Content (P2, needs your input on the copy)

**Done 2026-10-24 (mechanical part):** the 7 Calendly links use `{{ $page->discovery_call_url }}` (no
`?month=2021-08`). Everything else below still needs your decision.

- **All 21 posts are dated 10 Jul to 1 Sep 2021**, including the one added in March 2024
  (`the-ultimate-guide-…`, `date: 2021-09-01`). The home page and the blog show "01 Sep 2021" as the
  newest post.
- **`/articles/10-micro-saas-ideas-in-2021-copy`** (`source/_posts/10-micro-saas-ideas-in-2021-copy.blade.md`,
  featured): the "-copy" slug looks like a CMS duplicate, and the original `/articles/10-micro-saas-ideas-in-2021`
  is 404. Options:
  - (a) refresh it as "Micro-SaaS ideas for 2026" at a clean slug such as `/articles/micro-saas-ideas`, with
    a 301 from the old URL. The redirect goes in the Caddy file in buffermint-tools;
  - (b) keep the URL and just retitle it "10 Micro-SaaS Ideas" without the year.

  Recommendation: (a), if you want it to rank.
- **7 posts link to Calendly with `?month=2021-08`.** That opens the calendar on August 2021. The posts are
  `how-to-achieve-…`, `how-ai-and-machine-learning-…`, `how-to-leverage-ai-…`, `10-predictions-…` (twice)
  and `what-is-the-difference-…`. The fix is to strip the parameter; better, use `{{ $page->discovery_call_url }}`.
- **`/our-pricing`** (`source/_pages/our-pricing.md`) has a title and no body. It is in the sitemap but not
  linked from anywhere. Write it, or delete it (and its sitemap entry).
- **Copy to review** (your call, I would not rewrite it unasked):
  - "Launch your SaaS in 45 days" (`config.php` description, about-us);
  - "In 2019, before the COVID pandemic…" (`source/_pages/about-us.blade.md:22`);
  - the two testimonials (Zen Mind Maps, Shas Illuminated): are they still current?
  - "From us to your inbox weekly" (item 1);
  - the Careers page shows "No positions available" from the Workable embed (account 491143). Fine if
    you are not hiring; otherwise remove the page from the nav;
  - the footer still links Facebook and Twitter. Check that they are current, and update Twitter to X.

Effort **M** for the mechanical fixes, plus writing time.

---

## 12. Jigsaw / PHP (P2)

`composer.lock` has tightenco/jigsaw **1.3.37** (2021) with illuminate 8. It works on PHP 8.4 but prints
about 50 deprecations (dynamic properties, implicit nullable parameters). PHP 9 will turn some of these
into errors.

- **Option A, pin (XS):** document "PHP 8.2 to 8.4", and change `deploy.sh` to
  `php -d error_reporting='E_ALL & ~E_DEPRECATED' vendor/bin/jigsaw build production`. That silences only
  deprecations and stops discarding all of stderr.
- **Option B, upgrade (M):** `composer require tightenco/jigsaw:^1.8` (PHP 8.2+, illuminate 10/11). Things
  to check: the `<x-quote>`/`<x-image>` Blade components, the `mix()` helper, the
  `afterBuild` listeners and the `laravel-mix-jigsaw` plugin. Then compare the old and new
  `build_production` output with a diff.

Recommendation: A now, B when you next touch the templates.

**Done 2026-10-24:** option A in `deploy.sh`; README says PHP 8.2 to 8.5 (the VPS runs 8.5.4, which prints
no deprecations with this setup).

---

## 13. Vendor bundle (P3)

`webpack.mix.js` combines a 469 KB `vendor.js`: jQuery, Bootstrap, fancybox, AOS, choices.js, flickity,
imagesloaded, isotope, jarallax (+video, element), smooth-scroll, typed. The templates only use AOS,
jarallax, flickity (carousel component), smooth-scroll, typed (hero) and Bootstrap collapse. `vendor.css`
also includes `quill.core.css` four times, and the highlight.js CSS. Feather ships SVG, TTF and WOFF files;
WOFF alone is enough.
**Fix:** drop the unused libraries, the duplicate CSS and the extra font formats. Effort **M**, because each
removal needs a visual check of all pages.

**Done 2026-10-25:** `vendor.js` 479 → 104 KB (jQuery + jarallax), `vendor.css` jarallax only, `theme.js` polyfills
only, Feather WOFF only. Screenshots of 7 pages (desktop + phone) match before/after; no new console errors.

---

## 14. Optional: deploy automation / CMS (P3)

- A GitHub Action on push to `main` that runs `composer install`, `yarn install`, `yarn prod` and
  `jigsaw build production`, then rsyncs to `/var/www/buffermint-landing`. It needs a dedicated deploy SSH
  key on the droplet, restricted to that directory. You would add the key and the secret. Effort **M**.
- A local Decap CMS, as described in item 3. Effort **S**.

---

## Not covered / not verified

- I checked the external links (Calendly, Unsplash, partner sites) for HTTP status only, not for whether
  their content is still accurate.
- I did not submit the newsletter form. The failure comes from reading the code plus the live 404/403 and
  the missing iframe.
- Lighthouse ran once per page, on mobile emulation from this machine. Scores vary by ±5 between runs.
- The category pages and `/careers` were crawled for links and meta tags, but Lighthouse was not run on them.
