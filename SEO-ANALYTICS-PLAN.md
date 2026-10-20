# SEO and analytics automation plan: buffermint.com (landing, blog and /tools/)

Date: 2026-10-20. This is a plan only; nothing in it is implemented yet.
**Hosting update (2026-10-20):** both sites are now served from Cloudflare Pages (`buffermint-pages/`), not
from Caddy on the droplet. GoatCounter stays on the droplet behind `stats.buffermint.com`, and a Pages
Function forwards `/stats/count` to it. Caddy access logs no longer see site traffic, so option A
(GoAccess on Caddy logs) is out; Cloudflare Web Analytics (free, cookieless) replaces it as the baseline.
It covers both sites behind buffermint.com:
- the landing site and blog (this repo);
- Buffermint Tools at `/tools/` (buffermint-tools repo, 822 URLs in its sitemap).

Goal: every deploy is checked for SEO regressions automatically, search performance and traffic are
collected without anyone logging in to dashboards, and a weekly report says what changed and what to fix.

Effort sizes: **XS** < 30 min, **S** about 1 h, **M** half a day, **L** 1 day or more.
**You** marks steps that need your accounts or DNS, which I can't do.

---

## Where things stand today

| | Landing + blog | Tools |
|---|---|---|
| Analytics | GA4 `G-10GHKFV46D` + Hotjar, both cookie-setting | none; the footer promises "no tracking" |
| Search Console | unknown: please check whether `buffermint.com` is verified | same property |
| Sitemap | `/sitemap.xml` (29 URLs, fixed today) | `/tools/sitemap.xml` (822 URLs) |
| robots.txt | static file from `buffermint-pages/static/`, lists both sitemaps | same |
| Pre-deploy checks | none | `check-pages.mjs`: JS errors, 360 px overflow, functional tests |
| Structured data (JSON-LD) | none | none |
| Server logs | none: Cloudflare Pages has no raw logs; use Cloudflare Web Analytics | same |

Droplet capacity: 458 MB RAM, 3.3 GB disk free. That is too small to self-host Plausible or Umami
(Postgres/ClickHouse), but enough for GoAccess (a log analyser) or GoatCounter (one Go binary + SQLite).

---

## 1. Analytics: one cookieless source for both sites (decision needed)

The tools promise "no tracking", and GA4 plus Hotjar on the landing site set cookies and need a consent
banner for EU visitors. I recommend one privacy-friendly setup for both sites, so the numbers live in one
place and the promise stays true.

| Option | What you get | Fits "no tracking"? | Cost / effort |
|---|---|---|---|
| **A. GoAccess on Caddy logs (recommended baseline)** | Page views, referrers, 404s, bots, countries, from the logs that already exist; no JS on the pages | Yes: nothing in the browser | Free; nightly cron renders a private HTML report. **S** |
| **B. GoatCounter, self-hosted** at e.g. `stats.buffermint.com` | A, plus a small cookieless script for events ("tool used", "copied", "downloaded") per tool | Yes, if the wording becomes "no cookies, no personal data" | Free, about 20 MB RAM. **M**, plus a DNS record (**You**) |
| C. Plausible Cloud | Polished dashboard, events, GSC integration | Same as B | About $9/month. **S**, plus an account (**You**) |
| D. Keep GA4 (landing only) | What you have now | No, and it needs a consent banner | — |

**Recommendation:** A now for both sites. Add B later if you want per-tool usage numbers. Remove Hotjar
(it is unused as far as I can tell). Keep GA4 only if you rely on its Search Console link; otherwise
remove it too, which also drops the cookie banner question.

## 2. Search Console and Bing (**You**, about 15 min)

1. Verify `buffermint.com` as a **domain property** in Google Search Console: add the TXT record it gives
   you in Squarespace DNS.
2. Submit `https://buffermint.com/sitemap.xml` and `https://buffermint.com/tools/sitemap.xml`.
3. Bing Webmaster Tools: "import from Google Search Console" (one click). That also covers DuckDuckGo and
   Yahoo results.
4. Create a Google Cloud service account with read access to the GSC property, for the weekly pull (5).
   I can write the steps for this.

## 3. Pre-deploy SEO gate (automatic, both repos): **M**

A shared script, `seo-check.mjs`, crawls the **built** output before `deploy.sh` uploads it, and fails the
deploy on errors:
- every HTML page has a unique `<title>` (≤ 60 chars) and meta description (50–160 chars), one `<h1>`, a
  canonical pointing at itself (no trailing slash for the landing site, trailing slash for `/tools/`), and
  an absolute `og:image` that exists;
- no internal link or image is broken (404), and no relative `assets/…` paths (today's bug);
- every page is in the sitemap and every sitemap URL exists; nothing in the sitemap is `noindex`;
- images have `alt`, and no image above 300 KB is newly added (warning);
- the JSON-LD (item 4) is valid JSON with the required fields.

It reuses the tools repo's static server from `check-pages.mjs`. It lives with the brand source of truth
(see the branding plan), so both repos run the same rules. External links are checked weekly instead
(they are slow and flaky).

## 4. Structured data, generated at build time: **S** per site

- Landing: `Organization` (name, logo, sameAs: social profiles) on every page, and `Article` (headline,
  dates, author, image) on posts, both from front matter. Also add a real `dateModified` front matter field.
- Tools: `WebApplication` (name, category, `offers: price 0`, `operatingSystem: Any (browser)`) on every
  tool page, `BreadcrumbList` matching the existing crumbs, and `ItemList` on category pages.
- Both sites carry the same `Organization` block from the shared brand file, so search engines see one
  entity.

## 5. Weekly monitoring job (automatic): **M**

A scheduled job runs every Monday as a GitHub Actions cron in the brand/ops repo. It:
1. **Search data:** pulls the last 7 and 28 days from the Search Console API (clicks, impressions, CTR,
   position per page and per query) and stores them as dated CSV/JSON in an `seo-data/` folder, so trends
   are in git history.
2. **Indexing:** samples about 50 URLs through the URL Inspection API (all landing pages, plus a rotating
   batch of tools). It flags "Discovered – not indexed", "Crawled – not indexed" and canonical mismatches.
3. **Live crawl:** runs `seo-check` against the live site, plus the external link check.
4. **Lighthouse CI** on 6 fixed URLs (home, /articles, 1 post, /tools/, 1 category, 1 tool) with budgets:
   performance ≥ 80, accessibility ≥ 95, SEO = 100, LCP < 2.5 s on desktop. It records the trend.
5. **Traffic:** reads the GoAccess (or GoatCounter) summary for the week.
6. **Report:** writes `reports/YYYY-MM-DD.md` and opens one GitHub issue titled
   "SEO weekly: N problems, clicks ±x%". It lists new errors, pages that lost more than 30% of clicks,
   queries ranking 5–15 (the quick wins), and tools with impressions but a low CTR (title or description
   to rewrite).

Optional: a Claude scheduled routine that reads that issue and drafts fixes (new titles and descriptions
for low-CTR pages, internal links from blog posts to related tools) as a PR for you to review, so the
loop from data to fix is automatic but nothing ships unreviewed.

## 6. Deploy-time pings (automatic): **XS**

- **IndexNow:** after a successful deploy, POST the changed URLs (diff of the sitemap lastmod values)
  to `api.indexnow.org`. Bing, Yandex, Seznam and Naver pick them up within minutes. This needs a key file
  at the site root (generated once).
- Google no longer accepts sitemap pings, so the Search Console sitemap (2) is enough there.

## 7. Uptime and alerts: **S**

- An UptimeRobot (free) check on `/`, `/tools/`, both sitemaps and `stats.buffermint.com`, alerting you by
  email (**You**: the account).
- In the weekly job: robots.txt or sitemap changes. TLS is Cloudflare's Universal SSL, which renews itself.

## 8. Content SEO that the data will drive (ongoing)

These are not automation, but the report (5) is built to feed them:
- link from blog posts to the matching tools (for example the MVP posts → the business tools), and back
  from tools to related posts;
- refresh the 2021 posts with the most impressions first (PLAN.md item 11);
- give each tool category page a short intro paragraph (thin category pages rank poorly);
- once the brand positioning is decided, set the home page title and description to the new "tools for
  the browser and the internet" message, so the brand query and the tools reinforce each other.

---

## Order and effort

| Step | What | Who | Effort |
|---|---|---|---|
| 1 | Verify GSC + Bing, submit sitemaps | You | XS |
| 2 | Decide analytics (A/B/C), remove Hotjar | You decide, I implement | S |
| 3 | Pre-deploy `seo-check` in both deploy scripts | Me | M |
| 4 | JSON-LD on both sites | Me | S + S |
| 5 | IndexNow on deploy | Me | XS |
| 6 | GSC service account | You (I write the steps) | XS |
| 7 | Weekly monitoring job + report issue | Me | M |
| 8 | Uptime alerts | You (account) + me | S |
| 9 | Optional Claude routine that drafts fixes from the report | Me | S |

About two days of work in total. Steps 3–5 need nothing from you and can start right away.
