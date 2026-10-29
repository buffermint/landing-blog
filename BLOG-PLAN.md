# Blog plan: buffermint.com/articles

Research lane `t-20261029-blog-research-seo`, 2026-10-29. The article lanes (`t-20261029-blog-articles-1`, `-2`), the refresh lane (`t-20261029-blog-refresh-old-posts`) and the scheduled post lanes (`company/templates/blog-post.md`) all work from this file. **Update the topic's `Status:` when you start (`writing`) and when you publish (`published <date>`).** `tests/posts.test.mjs` enforces the mechanical half of the rules below on every post dated 2026-10-29 or later, and on every post with `updated:`.

## Editorial rules (the owner's, 2026-10-29; every lane and review holds to them)
- **Not generic.** If a post could have been written without research, it doesn't ship. Each post brings something new: our own numbers (tool usage, build experience, research data), a comparison or calculation we did, or a synthesis of 4+ sources from different publishers showing where they agree, where they disagree and why.
- **Never copy.** No passage longer than a sentence from any source: paraphrase and cite. Quotes stay under 25 words, attributed and linked. Never invent a number, quote, study, company or person. Every fact links to its source in the text and again in `## Sources`.
- **For the readers.** Give concrete steps, real costs and numbers, and examples from small SaaS. No filler intros, and no "in today's fast-paced world".
- **Public copy stays neutral.** We're "BufferMint, we build useful software". Link the free tools where they genuinely help the reader. Write about third-party examples, never about our own plans, and mention only what is already public on buffermint.com. The full public-copy rule is in each blog lane's task file.
- **Dates.** Write what's true on the publish date, and say "as of <month year>" for prices and stats.

### What `tests/posts.test.mjs` checks (so a lane can't merge a thin post)
- Title ≤ 65 characters, and `seo_description` 70–160 characters.
- At least 1,200 words of body, not counting `## Sources`.
- A `## Sources` section linking at least 4 distinct external sites (subdomains of one publisher count once).
- At least 2 internal links to distinct pages, outside Sources.
- Alt text on every image (`![alt](…)`, `<img alt>`, `<x-image alt|caption>`).
- No lorem/TODO/TBD/XXX/`[insert …]`/`{{SLOT}}` placeholders. ("Coming soon" in prose is allowed: a vendor's roadmap can say it; the review catches a stub section.)
- A `keyword:` front-matter field, and no two posts (old ones included) share a title or a keyword.
- The test can't judge whether the angle is new, whether the sources say what the post claims, or copying. The review lane checks those by hand, per the "Review" section of each task.

### Front matter for a new post
```yaml
---
title: "…"                 # ≤ 65 chars
seo_description: "…"       # 70–160 chars
keyword: compress pdf to 100kb   # the topic's target keyword below; unique across posts
featured_image: assets/img/uploads/<file>.jpeg      # ≤1600 px, with a .webp copy next to it
featured_thumbnail: assets/img/uploads/<file>.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-11-02
category: startup_ideas    # optional: idea_validation | startup_ideas (config.php)
extends: _layouts.post
---
```
A refresh adds `updated: <date>` and keeps `date:`. Updating shows "Updated on …" under the publish date and drives the JSON-LD `dateModified`, `article:modified_time`, the feed's `<updated>` and the sitemap `lastmod`.

### Voice (from the current home, about and post copy)
- Plain, short sentences in first person plural ("we"). Concrete before abstract: say what we did and what happened.
- No hype words ("revolutionary", "game-changer", "ultimate"), and no exclamation marks. Titles state the finding or the question, not "The Ultimate Guide to …".
- Numbers carry the argument, each with its date and source. Where a number is ours, say how we measured it.
- British and American spelling both appear in old posts. New posts use American spelling (the readers are mostly US/global).
- Headings start at `##`; the layout renumbers old `###` starts, but new posts should be right in the source.

## Readers and what they use

1. **SaaS founders**: indie and small teams, often solo or non-technical. They are pricing, launching, staying compliant and paying for AI. The old posts (2021) speak to them in generic terms.
2. **People who use the free tools**: 752 in-browser tools (693 listed; `buffermint-tools/TOOL-STATUS.json`, 2026-10-28) across PDF, photo, video/audio, text, dev, SEO, business calculators and AI. Most visitors come for one task (compress a PDF, convert HEIC) and leave.

**Our own traffic (GoatCounter, read from `/var/log/caddy/stats.log`, 23–29 Oct 2026, our own and headless traffic excluded):**
- 530 counted pageviews in 7 days. The site is new to search, so the blog has to win long-tail queries first.
- Home 29; top tool pages: `/tools/dev/dummy-file-generator/` 13, `/tools/dev/binary-to-text/` 8, `/tools/files/unzip/` 4, `/tools/math/foot-pounds-to-newton-meters/` 4, `/tools/seo/product-schema-generator/` 4, `/tools/pdf/compress-pdf-to-100kb/` 3 (+ 8 use events: file, run, download).
- Blog: `/articles` 3; the busiest posts got 3 views each (10-predictions, how-to-get-successful-startup-ideas, why-speed-to-market, the-4-types-of-products).
- The API token (OWNER-TODO 3) would give referrers and per-day data; until then, rerun the log count (`python3 -I` over `stats.log`, `/count?p=` hits with status 2xx, no `b=` bot flag).

## How demand was measured

Our keyless keyword tooling (the workspace evidence CLI: `node planner.mjs assess --idea <file> --json --evidence`, METHOD.md §1; run 2026-10-29, cache `PLANNER_CACHE_DIR`):
- **Autosuggest level 1–5** (Google, Bing, YouTube): 5 = the whole phrase is suggested after typing only its first word on every engine; 4 = suggested from a shorter prefix on 2+ engines; 3 = on one engine; 2 = the phrase has completions but isn't suggested from a prefix; 1 = no trace. It proves people type the phrase, not how many. One-word head terms ("dmarc", "peppol") can't score above 2 by construction.
- **HN mentions**: stories + comments containing the exact phrase in the last 24 months (Algolia API). A founder/developer interest signal.
- **Wikipedia**: average monthly views of the matching article over the last 3 full months. Topic interest, not search volume. Shown only where the article really matches the topic.
- **Not available yet:** absolute search volume. Bing Webmaster keyword research and Search Console need the owner's setup (the evidence CLI's NEXT-STEPS A2–A4). When they exist, rerun `node planner.mjs demand` for each `now`/`next` keyword and put the volumes here.
- Full table: [Appendix A](#appendix-a-demand-evidence-2026-10-29).

## Topics (ranked)

Rank = demand evidence × how well we can add something new × fit with the readers. `now` = the next 10 to write (lanes `-articles-1` takes 1–5, `-articles-2` takes 6–10). Sources marked *(read 2026-10-29)* were opened in this lane; *(found 2026-10-29)* were found in search, and the writing lane must open and check them. Search results on several topics were mostly vendor blogs: prefer the primary source listed, and treat vendor figures as claims to check.

### 1. Compress a PDF to 100 KB without wrecking it · `now`
- **Keyword:** `compress pdf to 100kb`. Autosuggest level 4 (suggested after "compress pdf to" on Google, Bing and YouTube; 9/12/2 completions). Also `pdf compressor` (level 4, 21 Bing completions). Our page is one of the most-used tools (3 views + 8 use events in our first week of counting).
- **Reader / question:** someone whose upload portal (job, visa, exam, government form) rejects a PDF over 100 KB. Which setting gets under the limit and stays readable?
- **New angle:** our own benchmark (`buffermint-tools/QUALITY-DOCUMENTS.md`): to 100 KB, an 8-page photo PDF came out at 90 KB with SSIM 0.761, against Ghostscript's best of 100 KB at 0.676. A 10-page text report reached 97 KB with every word still extractable, where Ghostscript couldn't get under 150 KB. Show the trade-off (dpi vs. image quality vs. text) with before/after crops, and say which kinds of PDF can't reach 100 KB at all (scans with many pages).
- **Sources:** Ghostscript pdfwrite docs (ghostscript.com/docs), Adobe Acrobat help on reducing PDF size (helpx.adobe.com), the PDF Association on image compression in PDF (pdfa.org), qpdf manual (qpdf.readthedocs.io), and 2+ official portals that state a 100 KB limit in their instructions (e.g. Indian exam/visa portals; cite the page itself).
- **Internal links:** /tools/pdf/compress-pdf-to-100kb/, /tools/pdf/compress-pdf-to-size/, /tools/pdf/compress-pdf/, /tools/photo/compress-image-to-100kb/, /tools/pdf/grayscale-pdf/.
- **Status:** published 2026-10-29 → `/articles/compress-pdf-to-100kb` (own Ghostscript 10.06 resolution sweep on the benchmark corpus, KB per page at 36–150 dpi; font hinting measured at 81% of the report's font bytes)

### 2. Are online PDF converters safe? We watched where the file goes · `now`
- **Keyword:** `are online pdf converters safe`. Level 4 (suggested after "are online pdf" on Google and Bing).
- **Reader / question:** a tools user with a contract, payslip or ID scan. Does the file leave my computer, and what happens to it?
- **New angle:** a repeatable test. Open DevTools → Network on 6 popular PDF sites and on ours, run the same task, and record whether the file is uploaded (request size), to which host, and what each privacy policy says about retention. Put the findings next to the documented incident: Cybernews found 89,062 user files exposed by two PDF services in 2024 (check the original report). Readers get a 2-minute check they can run on any tool.
- **Sources:** the Cybernews research article (cybernews.com; find the original), TechRadar coverage (techradar.com/pro/security/two-top-pdf-tools-have-been-found-leaking-user-documents-and-data-online, found 2026-10-29), BGR (bgr.com/tech/online-pdf-converters-leaked-thousands-of-user-uploaded-documents, found 2026-10-29), each tested site's privacy policy (dated), MDN on the File API (developer.mozilla.org), the UK NCSC or CISA guidance on handling sensitive documents.
- **Internal links:** /tools/pdf/, /tools/pdf/redact-pdf/, /tools/pdf/protect-pdf/, /tools/photo/exif-stripper/, post 2 ↔ topic 12.
- **Status:** published 2026-10-29 → `/articles/are-online-pdf-converters-safe` (own Playwright run 29 Oct 2026, one per site: iLovePDF, Smallpdf, PDF24 and Sejda uploaded 0.8–2.5 s after the file was chosen; FreeConvert after Compress, 224 hosts contacted; Adobe refused the headless browser; ours no upload)

### 3. The EU AI Act for a small SaaS that calls an LLM API · `now`
- **Keyword:** `eu ai act` (level 4; HN 349 mentions/24 mo; Wikipedia "Artificial Intelligence Act" 10,986 views/mo), `eu ai act small business` (level 3).
- **Reader / question:** a 1–5 person SaaS with an AI feature built on a third-party model, selling to EU users. What applies to me, and from when, now that the Digital Omnibus has changed the dates?
- **New angle:** the sources disagree. Early-2026 commentary says the 2 August 2026 transparency duties hold; later reports say the omnibus (adopted June 2026) moved Annex III high-risk duties to 2 December 2027 and gave systems already on the market until 2 December 2026 for marking. Reconcile them from the Official Journal text, then give a dated checklist for the "deployer of a general-purpose model" case: Art. 4 AI literacy (in force since Feb 2025), Art. 50 disclosure, what does *not* apply. Show which sources were right and why the others went wrong (they predate the final text).
- **Sources:** Regulation (EU) 2024/1689 on EUR-Lex, the omnibus amending act in the Official Journal (eur-lex.europa.eu), the European Commission AI Act Service Desk / FAQ (digital-strategy.ec.europa.eu), DLA Piper (knowledge.dlapiper.com, found 2026-10-29), Stephenson Harwood (perspectives.stephensonharwood.com/post/102msaw, found 2026-10-29), JD Supra (jdsupra.com/legalnews/eu-legislators-agree-to-delay-for-high-5617765, found 2026-10-29).
- **Internal links:** /tools/ai/pii-redactor/, /tools/ai/llm-cost/, /articles/how-ai-and-machine-learning-is-changing-the-saas-space, topic 6.
- **Status:** published 2026-10-29 → `/articles/eu-ai-act-small-saas-llm-api` (proposal vs. final Regulation (EU) 2026/1744 table, dated checklist, SME fine table)

### 4. Does the European Accessibility Act apply to your small SaaS? · `now`
- **Keyword:** `european accessibility act` (level 4; Wikipedia 1,080 views/mo; HN 20). The longer `european accessibility act saas` has no autosuggest trace (level 1), so target the head term and answer the SaaS question in the H2s.
- **Reader / question:** a small SaaS selling to EU consumers. Am I exempt as a microenterprise, and if not, what do I fix first?
- **New angle:** (a) a decision tree built from the directive text. Sources disagree on which article holds the microenterprise exemption (Art. 4(5) vs. Art. 22 in different guides) and on whether both tests (<10 staff *and* ≤€2M) apply, so settle it from EUR-Lex. (b) Our own fix log: axe-core on buffermint.com went from 76 to 0 violations across 29 pages (light and dark), plus what the violations were (heading order, contrast, landmarks, an aside in main) and what each fix took (`buffermint-landing/STATUS.md`, 2026-10-25).
- **Sources:** Directive (EU) 2019/882 on EUR-Lex; Ireland's CCPC microenterprise guidelines (ccpc.ie, found 2026-10-29); the European Commission EAA page; W3C WAI on WCAG 2.1 and EN 301 549 (w3.org/WAI); Level Access on 2026 enforcement (levelaccess.com/blog/eaa-compliance-in-2026…, found 2026-10-29). Treat fine figures from vendor blogs as unverified.
- **Internal links:** /tools/design/contrast-checker/, /tools/design/color-blindness/, /tools/seo/heading-checker/, /tools/health/color-blind-test/, topic 26.
- **Status:** published 2026-10-29 → `/articles/european-accessibility-act-small-saas` (decision tree from Art. 2, 3(23), 3(30), 4(5), 14, 32; the exemption is Art. 4(5) with the definition in 3(23), both tests apply; ACM's 61% webshop finding; our axe fix log)

### 5. Merchant of record fees at $9, $29 and $99 a month, worked out · `now`
- **Keyword:** `merchant of record` (level 4; HN 84), `paddle vs stripe` (level 4).
- **Reader / question:** a founder choosing how to take payments and handle sales tax. What does each provider keep from my actual price, and what do I get for it?
- **New angle:** most comparisons online are written by one of the competitors (Dodo's blog writes most of the search results). We work out a neutral table from each provider's own pricing page: fee per sale and per $1,000 of revenue at $9, $29 and $99. It includes the small-ticket penalty (Paddle's 5% + 50¢ is 10.6% of a $9 sale; Paddle asks under-$10 sellers to contact them for pricing, *read 2026-10-29*), tax filing coverage, payouts to India, and when plain Stripe + Stripe Tax is cheaper.
- **Sources:** paddle.com/pricing *(read 2026-10-29)*, lemonsqueezy.com/pricing, polar.sh docs on fees, dodopayments.com/pricing, creem.io pricing, stripe.com/pricing and Stripe Tax pricing, flaviocopes.com/payment-provider-fees (found 2026-10-29; an independent calculation to compare with). Date every price "as of <month year>".
- **Internal links:** /tools/business/mrr-calculator/, /tools/business/profit-margin-calculator/, /tools/business/vat-calculator/, /tools/business/pricing-tier-calculator/, topic 18.
- **Status:** published 2026-10-29 → `/articles/merchant-of-record-fees` (six pricing pages read 29 Oct 2026; fee per sale at $9/$29/$99 for US and non-US cards; $2,900 MRR example incl. Stripe Tax Complete; break-evens)

### 6. What an AI feature really costs per user · `now`
- **Keyword:** `llm cost calculator` (level 4), `llm api pricing` (level 3; HN 7), `token counter` (level 3; HN 37).
- **Reader / question:** a founder adding AI to a $19/month plan. What will one user cost me per month, and where does the margin go?
- **New angle:** three common feature shapes (summarize a 10-page PDF, answer a support ticket with 5 help articles as context, classify 1,000 short texts). Count the tokens with our token counter, price them from the official pages of 3 providers (input, output, cached input, batch), and show cost per user at light/median/heavy use against a $19 plan. Then show what prompt caching and a smaller model change. Nobody publishes this per-feature with measured tokens.
- **Sources:** anthropic.com/pricing, openai.com/api/pricing, ai.google.dev/pricing (all dated), the GitHub blog post on Copilot's 1 June 2026 move to usage billing (found 2026-10-29), Monetizely or PricingSaaS on AI pricing models (found 2026-10-29).
- **Internal links:** /tools/ai/llm-cost/, /tools/ai/token-counter/, /tools/ai/context-planner/, /tools/business/unit-economics-calculator/, /articles/how-ai-and-machine-learning-is-changing-the-saas-space.
- **Status:** writing

### 7. AI Overviews and zero-click search: why the studies disagree, and what still gets clicks · `now`
- **Keyword:** `ai overviews` (level 2: a one/two-word head term; HN 501; Wikipedia "AI Overviews" 9,129 views/mo), `zero click searches` (level 2; Wikipedia "Zero-click result" 1,289/mo).
- **Reader / question:** a founder deciding whether SEO and a blog are still worth it in 2026.
- **New angle:** put the main studies side by side with sample, dates and method, and explain the gaps:
  - Ahrefs found a 34.5% CTR drop on 300k keywords (Mar 2024 vs Mar 2025 data, *read 2026-10-29*), and 58% in its 2026 rerun.
  - Seer measured 0.61% vs 1.62% organic CTR.
  - Pew measured 8% vs 15% of users clicking.
  - An SSRN randomized trial (not yet peer-reviewed) measured −39.8%.
  - SparkToro/Similarweb measured 68% zero-click searches.

  Then list which query types still send clicks (transactional, tool, brand, local), with our own split: in our first counted week, tool pages got far more views than articles (GoatCounter).
- **Sources:** ahrefs.com/blog/ai-overviews-reduce-clicks *(read 2026-10-29)* and its 2026 rerun, seerinteractive.com, pewresearch.org, the SSRN paper, sparktoro.com (via searchengineland.com/google-zero-click-searches-2026-study-479717, found 2026-10-29), Google Search Central blog on AI features.
- **Internal links:** /tools/seo/serp-preview/, /tools/seo/title-length-checker/, /tools/seo/meta-tag-generator/, topic 24.
- **Status:** writing

### 8. Vibe-coded SaaS security: the holes every scan keeps finding · `now`
- **Keyword:** `supabase row level security` (level 4; HN 8), `vibe coding security` (level 2; HN 13; Wikipedia "Vibe coding" 42,898/mo).
- **Reader / question:** a non-technical founder who built on Lovable/Bolt/Supabase. Is my app leaking data, and how do I check in 15 minutes?
- **New angle:** six scans with different methods (Symbiotic: 1,072 apps; Escape: 2k vulnerabilities; CVE-2025-48757 with 170+ apps; The Register's 18k-user case; smaller audits), normalized into one table by hole type (RLS off, keys in client code, missing auth on functions, open storage buckets). Then a self-check with exact commands: query a table with the public anon key and see what comes back. Explain why scan numbers differ (definitions, samples).
- **Sources:** symbioticsec.ai/blog/we-scanned-1-072-vibe-coded-apps-98-had-security-flaws (found 2026-10-29), escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding (found 2026-10-29), theregister.com/2026/02/27/lovable_app_vulnerabilities (found 2026-10-29), nvd.nist.gov CVE-2025-48757, supabase.com/docs/guides/database/postgres/row-level-security, OWASP Top 10.
- **Internal links:** /tools/dev/jwt-decoder/, /tools/privacy/password-generator/, /tools/dev/hash/, /articles/launching-a-saas-product-as-a-non-technical-founder, topic 28.
- **Status:** writing

### 9. Credits, seats or usage: how 12 SaaS tools define a "credit" · `now`
- **Keyword:** `credit based pricing` (level 2; HN 18), `saas pricing` (level 2; HN 48). Weak autosuggest but a live trend (GitHub Copilot moved to usage billing on 1 June 2026; one index counts 79 credit-priced companies, +126% year over year, *found 2026-10-29*, check at the source).
- **Reader / question:** a founder pricing an AI feature, and a buyer comparing tools. What does a credit actually buy?
- **New angle:** read the public pricing pages of 12 tools small founders use (e.g. GitHub Copilot, Cursor, Lovable, Bolt, Replit, Notion AI, Zapier, Intercom Fin, Clay, ElevenLabs, Midjourney, Canva), all on the same date. Tabulate how a credit is defined, its price, and how many one typical task burns. Close with what we'd copy and what confuses buyers.
- **Sources:** the 12 pricing pages (dated), PricingSaaS (pricingsaas.com), the GitHub blog / docs on Copilot billing, Growth Unhinged (Kyle Poyar) on credit pricing, dev.to/heysash/credit-based-vs-classic-saas-pricing… (found 2026-10-29).
- **Internal links:** /tools/business/pricing-tier-calculator/, /tools/business/price-increase-calculator/, /tools/business/mrr-calculator/, topics 5 and 6.
- **Status:** writing

### 10. Remove a background in the browser: 6 open models measured · `now`
- **Keyword:** `remove background from image` (level 4; suggested after "remove" on Google and Bing), `background remover` (level 3; HN 63).
- **Reader / question:** a tools user or a founder adding cut-outs to an app. How good are free, private (in-browser) models compared with the paid services, and which licence lets me ship one?
- **New angle:** our own benchmark (`buffermint-tools/QUALITY-MEDIA.md`, re-measured 2026-10-22). On 8 CC0/CC-BY cut-outs on plain, busy and similar-colour backgrounds:
  - mask IoU, boundary F and hair-edge error for ORMBG, BiRefNet-lite (our 68 MB int8 build), full BiRefNet, BEN2, isnet and u2net;
  - model size, speed (2.0 s per 12 MP warm) and memory (1.04 GB peak);
  - remove.bg's free tier caps output at 0.25 MP;
  - the licence trap: RMBG-1.4/2.0 are non-commercial.
- **Sources:** BiRefNet paper and GitHub repo, the Hugging Face model cards (ORMBG, BEN2, briaai RMBG licence), transformers.js docs (huggingface.co/docs/transformers.js), ONNX Runtime Web WebGPU docs (onnxruntime.ai), remove.bg pricing page.
- **Internal links:** /tools/photo/background-remover/, /tools/photo/remove-white-background/, /tools/photo/product-photo-studio/, /tools/photo/image-compress/.
- **Status:** writing

### 11. HEIC to JPG: when to convert and what you lose · `next`
- **Keyword:** `heic to jpg` (level 5, the strongest in this set; HN 11).
- **Reader / question:** an iPhone user whose upload form rejects HEIC.
- **New angle:** measured quality (our converter: SSIM 0.982/0.970 on real iPhone HEICs, QUALITY-MEDIA.md) and file sizes before/after on 10 photos. Add a table of which big platforms accept HEIC, each from its own help page.
- **Sources:** Apple support on HEIF/HEVC, the MPEG HEIF spec page / Nokia HEIF docs, caniuse.com for HEIC/AVIF support, 2+ platform help pages (Google Photos, Windows/Microsoft Store HEIF extension).
- **Internal links:** /tools/files/heic-to-jpg/, /tools/files/heic-to-png/, /tools/photo/resize-image/, topic 13.
- **Status:** todo

### 12. Your photos carry your location: which apps strip EXIF (tested) · `next`
- **Keyword:** `remove exif data` (level 4; Wikipedia "Exif" 7,697/mo), `exif viewer` (level 4).
- **New angle:** upload one geotagged test photo to 8 apps and sites (WhatsApp, Telegram as file vs photo, Slack, Gmail, Discord, X, Facebook, Google Drive), download it again, and read the EXIF with our viewer. A dated table nobody keeps current.
- **Sources:** the platforms' own help pages, the CIPA EXIF spec, EFF on photo metadata, a news case of location leaked through EXIF.
- **Internal links:** /tools/photo/exif-stripper/, /tools/photo/exif-viewer/, topic 2.
- **Status:** todo

### 13. WebP on a real site: 3.0 → 1.8 MB and what it did to LCP · `next`
- **Keyword:** `convert images to webp` (level 4; Wikipedia "WebP" 10,119/mo), `image compressor` (level 4; HN 47).
- **New angle:** our numbers from buffermint.com (STATUS, 2026-10-25): 39 images 3.0 → 1.8 MB with WebP copies; LCP on the home page 10.3 → 7.0 s, on a post 8.5 → 5.0 s (Lighthouse 12.2.1 mobile, median). Show what WebP did and what the other changes did. Add an AVIF comparison on the same images.
- **Sources:** Google's WebP docs (developers.google.com/speed/webp), web.dev on LCP, caniuse WebP/AVIF, Cloudflare or Jake Archibald on AVIF vs WebP, the HTTP Archive Web Almanac (media chapter).
- **Internal links:** /tools/photo/jpg-to-webp/, /tools/photo/png-to-webp/, /tools/photo/image-compress/, /tools/photo/resize-image/, topic 14.
- **Status:** todo

### 14. Core Web Vitals on a small marketing site: what actually moved ours · `next`
- **Keyword:** `core web vitals` (level 4; HN 68).
- **New angle:** our before/after log: vendor.js 479 → 104 KB, Vue removed (main.js 123,549 → 18,741 B), Lighthouse home 65 → 67, post 63 → 68, About 66 → 76. Include what didn't help. Every number is from STATUS.md with its date and tool version.
- **Sources:** web.dev Core Web Vitals, the Chrome UX Report docs, the Lighthouse scoring docs, HTTP Archive Web Almanac (performance chapter), Google Search Central on page experience.
- **Internal links:** /tools/dev/minifier/, /tools/dev/js-minifier/, /tools/photo/image-compress/, topic 13.
- **Status:** todo

### 15. Cookieless analytics for a small SaaS: GoatCounter vs Plausible vs Umami · `next`
- **Keyword:** `cookieless analytics` (level 4), `plausible analytics` (level 4; HN 44).
- **New angle:** we run GoatCounter self-hosted. Give the real setup, server footprint (measure RAM/disk on the VPS) and what it can't tell you. Compare with Plausible and Umami's documented features and prices, and state the consent rules: the CNIL exemption conditions for audience measurement, and what the ePrivacy Directive says.
- **Sources:** goatcounter.com docs, plausible.io docs + pricing, umami.is docs, CNIL guidance on audience measurement (cnil.fr), the ePrivacy Directive on EUR-Lex.
- **Internal links:** /tools/seo/utm-builder/, /tools/seo/privacy-policy-generator/, topic 31.
- **Status:** todo

### 16. Gmail, Yahoo and Outlook sender rules for a SaaS's email · `next`
- **Keyword:** `gmail bulk sender requirements` (level 4), `dmarc` (level 2 head term; HN 690; Wikipedia 16,517/mo).
- **New angle:** one checklist reconciled from the three providers' own pages. Check the much-quoted 0.3% spam-rate figure at its source: search found it only in vendor blogs. Add the DNS records a typical small SaaS needs, with transactional and marketing mail on separate subdomains.
- **Sources:** Google's sender guidelines (support.google.com/a/answer/81126), Yahoo Sender Hub (senders.yahooinc.com), the Microsoft Defender/Outlook announcement for high-volume senders (techcommunity.microsoft.com), RFC 8058 and RFC 7489, Red Sift guide (redsift.com/guides/bulk-email-sender-requirements, found 2026-10-29).
- **Internal links:** /tools/privacy/email-header-analyzer/, /tools/business/cold-email-template/, /tools/seo/email-subject-tester/.
- **Status:** todo

### 17. E-invoicing in 2026–27: what a small SaaS selling into the EU must do · `next`
- **Keyword:** `e invoicing france` (level 4), `e invoicing belgium` (level 3), `peppol` (level 2; HN 50; Wikipedia 1,135/mo).
- **New angle:** a dated country table from government sources: Belgium B2B since 1 Jan 2026, France receiving from 1 Sep 2026 and SME issuing from Sep 2027, Germany receiving since 2025, Poland KSeF, and ViDA 2030. Most mandates are domestic B2B, so say which ones touch a non-EU SaaS selling cross-border, and which don't.
- **Sources:** Belgian FPS Finance (einvoice.belgium.be), the French impots.gouv.fr e-invoicing pages, the German BMF letter on E-Rechnung, the European Commission ViDA page, OpenPeppol.
- **Internal links:** /tools/everyday/invoice-generator/, /tools/business/vat-calculator-belgium/, /tools/business/vat-calculator-france/, topic 18.
- **Status:** todo

### 18. EU VAT on SaaS: OSS, the €10,000 threshold and when a merchant of record is simpler · `next`
- **Keyword:** `eu vat digital services` (level 3), `oss vat` (level 2). Note: `vat on saas eu` has no autosuggest trace, so don't target it.
- **New angle:** two worked examples (a non-EU founder selling to EU consumers; the same founder selling B2B with reverse charge). Count the filings, cost and work each way against an MoR's fee from topic 5.
- **Sources:** European Commission OSS pages (vat-one-stop-shop.ec.europa.eu), Council Directive 2006/112/EC (EUR-Lex), HMRC on digital services (gov.uk), Stripe Tax docs on EU VAT, Paddle's tax docs.
- **Internal links:** /tools/business/vat-calculator/, /tools/business/vat-calculator-germany/, topic 5.
- **Status:** todo

### 19. GST on SaaS exports from India: LUT, zero-rating and FIRA · `next`
- **Keyword:** `gst on export of services` (level 4; Wikipedia "Goods and Services Tax (India)" 16,572/mo).
- **New angle:** the steps with dates and forms (LUT on the GST portal, invoice wording, FIRA/FIRC from the payout provider). Show how Stripe/Paddle payouts map to each step, and the cost of getting it wrong (18% IGST), as a worked example.
- **Sources:** CBIC circulars (cbic-gst.gov.in), the IGST Act s.2(6) on export of services (indiacode.nic.in), the GST portal LUT help, RBI on FIRA, Stripe India docs.
- **Internal links:** /tools/business/gst-calculator-india/, /tools/business/income-tax-calculator-india/, topic 5.
- **Status:** todo

### 20. One data set, three churn numbers: why Stripe, ChartMogul and Baremetrics disagree · `next`
- **Keyword:** `churn rate` (level 4; HN 81; Wikipedia 1,728/mo).
- **New angle:** take one public or self-made sample subscription data set (say so), compute logo and revenue churn with each vendor's *documented* formula, and show the spread and why.
- **Sources:** Stripe Billing analytics docs, ChartMogul's churn docs, Baremetrics' metric docs, ProfitWell/Paddle research on churn benchmarks, a SaaS benchmarks report (e.g. KeyBanc/SaaS Capital).
- **Internal links:** /tools/business/churn-rate-calculator/, /tools/business/mrr-calculator/, /tools/business/clv-calculator/, topic 21.
- **Status:** todo

### 21. LTV for a SaaS under a year old: why the formula lies, and what to use instead · `next`
- **Keyword:** `ltv calculator` (level 4).
- **New angle:** a sensitivity table. With 6 months of data, a churn estimate of 3% vs. 5% changes LTV by 67%. Show cohort-based alternatives from the sources.
- **Sources:** SaaS Capital on LTV, a16z on 16 startup metrics, ChartMogul docs, Christoph Janz's SaaS metrics posts.
- **Internal links:** /tools/business/clv-calculator/, /tools/business/unit-economics-calculator/, /tools/business/payback-period-calculator/.
- **Status:** todo

### 22. Startup runway when your costs are in dollars and your bank is not · `later`
- **Keyword:** `startup runway calculator` (level 4).
- **New angle:** a runway model with FX and price-change scenarios, worked through for an INR-based founder paying USD tools (our own stack's cost categories, no private amounts).
- **Sources:** RBI reference rates, the Stripe/Paddle payout FX docs, Carta or Pilot on runway, YC's "default alive" (paulgraham.com).
- **Internal links:** /tools/business/startup-runway-calculator/, /tools/business/break-even-calculator/, /tools/business/self-employment-tax-calculator/.
- **Status:** todo

### 23. Programmatic SEO after the March 2026 spam update: what we noindexed and why · `later`
- **Keyword:** `programmatic seo` (level 4; HN 46).
- **New angle:** our decision rule for 752 tool pages: 59 hidden until they reach grade A, and an index list of about 150 (buffermint-tools `ops/SEO-INDEX-PROPOSAL.md`, `src/hidden.json`). Explain the criteria, and where sources disagree on what the update targeted.
- **Sources:** Google Search Central spam policies (scaled content abuse), the Search Status Dashboard entry, Search Engine Roundtable, Ahrefs or Semrush volatility data, Lily Ray / Glenn Gabe analyses.
- **Internal links:** /tools/, /tools/seo/sitemap-generator/, /tools/seo/robots-txt-generator/, topic 7.
- **Status:** todo

### 24. Getting cited by ChatGPT and AI search: what the citation studies actually measured · `later`
- **Keyword:** `get cited by chatgpt` (level 3).
- **New angle:** the studies contradict each other. One synthesis says only 4% of citations come from the brand's own site; Ahrefs data says homepages hold 23.8%; Muck Rack says 84% are earned media; Yext says 47.6% for retail. Line up their definitions and samples, and explain why each is right about something different.
- **Sources:** Ahrefs, Muck Rack Generative Pulse, Yext, Previsible's AI traffic study (via searchengineland.com/chatgpt-ai-referral-traffic-sessions-data-481630, found 2026-10-29), SE Ranking (seranking.com/blog/chatgpt-referral-traffic-may-2026, found 2026-10-29).
- **Internal links:** /tools/seo/schema-generator/, /tools/seo/organization-schema-generator/, topic 7.
- **Status:** todo

### 25. FAQ and HowTo schema in 2026: what still shows in Google · `later`
- **Keyword:** `faq schema` (level 3; Wikipedia "Schema.org" 1,654/mo).
- **New angle:** Google's 2023 changes (FAQ rich results limited to authoritative government/health sites; HowTo removed) checked against the current docs. Test our generator's output in the Rich Results Test and say what each type earns today.
- **Sources:** Google Search Central structured data docs + the Aug 2023 blog post, schema.org, Bing Webmaster guidelines, an independent SERP-feature tracker.
- **Internal links:** /tools/seo/faq-schema-generator/, /tools/seo/article-schema-generator/, /tools/seo/product-schema-generator/ (one of our most-visited tools).
- **Status:** todo

### 26. Making PDFs accessible: the ADA Title II dates and what a small office can fix itself · `later`
- **Keyword:** `make pdf accessible` (level 2; Wikipedia "PDF/UA" 1,047/mo).
- **New angle:** the dates after the DOJ's 20 April 2026 interim final rule (April 2027 for 50k+ population, April 2028 for smaller ones; check the Federal Register text), plus a checklist of what can be done without paid software (title, language, tags, reading order, alt text) and what can't.
- **Sources:** the Federal Register doc 2026-07663, ada.gov, W3C WCAG 2.1, the PDF Association on PDF/UA, HHS Section 504 rule.
- **Internal links:** /tools/pdf/pdf-metadata/, /tools/pdf/ocr-pdf/, topic 4.
- **Status:** todo

### 27. Should your SaaS ship an MCP server? · `later`
- **Keyword:** `mcp server` (level 4; HN 5,505; Wikipedia "Model Context Protocol" 38,585/mo). `mcp server for saas` has no trace (level 2), so target the head term with a founder angle.
- **New angle:** count which tools small SaaS depend on now ship official MCP servers (Stripe, Xero, Intuit, Etsy…, from each vendor's docs). Give the build cost from the spec and SDKs, and the security issues documented so far.
- **Sources:** modelcontextprotocol.io spec, the official MCP registry, vendor MCP docs (3+), a security write-up on MCP prompt injection (e.g. Invariant Labs or Simon Willison).
- **Internal links:** /tools/ai/tool-schema/, /tools/dev/json-to-json-schema/, topic 6.
- **Status:** todo

### 28. Building a SaaS without code in 2026: Lovable, Bolt and Replit by price and limits · `later`
- **Keyword:** `build an app without coding` (level 4), `lovable vs bolt` (level 4).
- **New angle:** a dated table of plans, credits and what a typical build burns, plus the security baseline from topic 8. This is the **refresh of** `how-to-leverage-ai-and-build-an-app-without-coding` (keep its URL; see old posts).
- **Sources:** the three pricing pages, their docs on deployment/export, a 2026 hands-on review from an independent publisher, The Next Web on the Lovable exposure (found 2026-10-29).
- **Internal links:** /articles/launching-a-saas-product-as-a-non-technical-founder, topic 8, /tools/dev/json-formatter/.
- **Status:** todo (refresh lane)

### 29. Testing file upload limits with dummy files: the real limits of 12 services · `later`
- **Keyword:** `dummy file generator` (level 4). Our most-visited tool page in the first counted week (13 views).
- **New angle:** a table of documented upload/attachment limits (Gmail, Outlook, Slack, WhatsApp, Discord, Google Forms, Typeform, S3 single PUT, Cloudflare Workers request body…), each from the vendor's docs. Add how to test the edges (exactly at the limit, 1 byte over) with generated files.
- **Sources:** each vendor's docs page (dated), MDN on File/Blob, RFC 9110 on 413 responses.
- **Internal links:** /tools/dev/dummy-file-generator/, /tools/dev/file-checksum/, /tools/files/file-type-checker/.
- **Status:** todo

### 30. Transcribing audio privately: Whisper in the browser vs the cloud APIs · `later`
- **Keyword:** `whisper transcription` (level 3; HN 26; Wikipedia 3,599/mo). `transcribe audio offline` is weak (level 2).
- **New angle:** Whisper base/small in-browser was *unmeasured* in QUALITY-MEDIA.md. Measure word error rate and speed on 3 clips (CC-licensed) for our tool vs. 2 cloud APIs, and their per-minute prices.
- **Sources:** the Whisper paper (arXiv), the openai/whisper repo, transformers.js docs, cloud STT pricing pages (2), a CC audio corpus page (e.g. LibriSpeech / Common Voice).
- **Internal links:** /tools/media/transcribe-audio/, /tools/media/auto-subtitle-generator/, /tools/media/subtitle-editor/.
- **Status:** todo

### 31. A privacy policy for a small SaaS: what GDPR Art. 13 asks and what generators miss · `later`
- **Keyword:** `privacy policy generator` (level 4: suggested after "privacy policy" on all 3 engines).
- **New angle:** run 4 free generators (ours included) with the same inputs, and score each output against an Art. 13/14 checklist. Ours gets the same treatment and the same honesty.
- **Sources:** GDPR on EUR-Lex, the EDPB transparency guidelines, the ICO's privacy notice guidance (ico.org.uk), CNIL, the generators' pages.
- **Internal links:** /tools/seo/privacy-policy-generator/, topic 15.
- **Status:** todo

### 32. Raising SaaS prices: notice periods and grandfathering, from 15 public announcements · `later`
- **Keyword:** `saas price increase` (level 2). Weak autosuggest: measure in Bing first, and drop it if it stays weak.
- **New angle:** a table of 15 public price-increase announcements (notice given, grandfathering, discount offered), each linked, plus what the research says about churn after increases.
- **Sources:** the 15 announcements (vendor blogs/changelogs), Paddle/ProfitWell pricing research, Patrick Campbell's talks, OpenView or Kyle Poyar on pricing changes.
- **Internal links:** /tools/business/price-increase-calculator/, /tools/business/pricing-tier-calculator/, topic 9.
- **Status:** todo

**Measured and dropped as targets** (no autosuggest trace): `micro saas costs`, `schema markup for saas`, `vat on saas eu`, `dmarc for cold email`, `european accessibility act saas`, `how much does it cost to build a saas`, `how to validate a saas idea`. Fold them into the topics above as H2s, not titles.

## Old posts (21, all dated 2021)

None of the old posts has a `## Sources` section or an external citation, except `how-ai-and-machine-learning…` (3 links) and `how-to-get-successful-startup-ideas` (1). Three images have no alt text (in `how-to-achieve-a-product-market-fit…`, `10-predictions…` and `how-to-get-successful-startup-ideas`). The refresh lane:
- adds `updated:` and `keyword:`, and keeps `date:` and the slug;
- brings each refreshed post to the quality bar (the test applies as soon as `updated:` is set);
- fixes the alt text.

**Merging** = move the useful paragraphs into the target post, then add a 301 from the old URL. Pages reads redirects only from `buffermint-pages/static/_redirects` (another repo: the refresh lane's task must own that file, or hand the lines to the coordinator). Remove the merged post's file in the same release, so the sitemap drops it.

| Post (slug) | Words | Decision | Why / keyword overlap |
|---|---|---|---|
| launch-your-micro-saas-product | 2,074 | **Keep, refresh** (target `how to start a micro saas`, level 2) | The micro-SaaS pillar. It absorbs `micro-saas-is-the-future`. Update with 2026 evidence: what earns now (one trade, one country, a local rule) with third-party examples and their verified revenue from public sources. |
| micro-saas-is-the-future | 407 | **Merge** → launch-your-micro-saas-product | Thin opinion piece; same keyword. |
| 10-micro-saas-ideas-in-2021-copy | 1,159 | **Leave** until the owner answers PLAN 11 (slug) | `-copy` slug and 2021 ideas; don't touch (PLAN 11). Afterwards: refresh as dated ideas with evidence, or merge into the pillar. |
| when-is-the-right-time-to-launch-an-mvp | 952 | **Keep, refresh** (target `mvp development`, level 2; HN 57) | The MVP post. It absorbs the two below. |
| 5-reasons-why-building-your-mvp-is-a-challenge | 594 | **Merge** → when-is-the-right-time-to-launch-an-mvp | Thin, same topic. |
| why-speed-to-market-matters-for-your-saas-product-launch | 867 | **Merge** → when-is-the-right-time-to-launch-an-mvp | Same argument ("launch early"); 3 views in the counted week, so keep the URL alive with a 301. |
| launching-a-saas-product-as-a-non-technical-founder | 2,173 | **Keep, refresh** | Largest post. 2026 rewrite: AI builders + security baseline (topics 8, 28) and hiring help. It absorbs the three below. |
| the-ultimate-guide-to-launching-your-startup-from-idea-to-reality | 1,045 | **Merge** → launching-a-saas-product-as-a-non-technical-founder | Generic "ultimate guide"; overlaps entirely. |
| things-to-know-before-launching-your-first-tech-startup | 906 | **Merge** → launching-a-saas-product-as-a-non-technical-founder | Generic; same reader and question. |
| how-to-be-an-excellent-client-and-help-your-technical-partners-do-their-best-work | 701 | **Merge** → launching-a-saas-product-as-a-non-technical-founder (its "working with a freelancer or agency" part) | Title over 65 chars; the content fits the hiring section. |
| how-to-leverage-ai-and-build-an-app-without-coding | 1,142 | **Keep, refresh** as topic 28 | Same keyword (`build an app without coding`, level 4). Keep the URL. |
| how-ai-and-machine-learning-is-changing-the-saas-space | 1,399 | **Merge** → topic 6's post once it's published | 2021 predictions; topic 6 answers the live question (cost per user). Keep until topic 6 ships, then 301. |
| 10-predictions-for-the-saas-marketplace-future-trends | 1,753 | **Keep, refresh** as a scorecard | A new angle on an old post: grade each 2021 prediction against 2026 evidence (right / wrong / too early), with sources. 3 views in the counted week. |
| ultimate-guide-to-get-the-most-out-of-your-idea-validation-process | 1,581 | **Keep, refresh** (target `idea validation`, level 2; HN 68) | The idea-validation pillar (category page). Add what desk research can't prove and what a cheap market test can, with public third-party examples. |
| 6-amazing-startup-stories-of-successful-idea-validation | 1,430 | **Keep, refresh** | Popular format; it has no sources now. Verify each story (Dropbox video, Airbnb, …) against primary or reputable sources, and correct what's wrong. |
| how-to-get-successful-startup-ideas | 1,193 | **Keep, refresh** | Startup-ideas category anchor (3 views in the counted week). It absorbs `the-4-types-of-products`. |
| the-4-types-of-products-which-type-should-you-build | 378 | **Merge** → how-to-get-successful-startup-ideas | Thin (378 words). |
| how-to-achieve-a-product-market-fit-with-your-product | 1,358 | **Keep, refresh** (target `product market fit`, level 4; HN 999) | The strongest keyword among the old posts. It absorbs the pivot post. |
| your-strategy-is-a-voyage | 559 | **Merge** → how-to-achieve-a-product-market-fit-with-your-product | Pivoting = a section of the PMF post. |
| how-to-use-lean-methodology-to-innovate-faster | 1,504 | **Leave** | Off-niche (corporate lean); no keyword overlap with the plan. Revisit if Search Console shows impressions. |
| what-is-the-difference-between-saas-and-cloud-computing | 1,343 | **Leave** for now, light refresh later (target `saas vs cloud computing`, level 4) | An informational query that AI Overviews answer (topic 7). Low value for our readers; refresh only after the rest. |

Result: 21 posts → 12 kept (9 refreshed, 3 left as they are) and 9 merged with 301s.

## SEO audit (2026-10-29: the built site and the live headers)

**Fixed in this lane** (lane `lane/t-20261029-blog-research-seo`; tests `tests/seo.test.mjs`, `tests/posts.test.mjs`):
- `updated:` front matter (`updatedAt` helper in config.php) now shows "Updated on …" on the post, and drives the BlogPosting `dateModified`, `article:modified_time`, the Atom feed's `<updated>` and the sitemap `lastmod`. An `updated:` earlier than `date:` is ignored, and a non-date fails the build.
- Open Graph `article:published_time` and `article:modified_time` are on every post. (`article:author` wants a profile URL and `twitter:image:alt` a real image description; both are left out until posts have an author page and cover alt text.)
- BlogPosting gets `keywords` from `keyword:`, and drops null fields.
- The hero image alt falls back to the post title instead of "Hero Image".

**Already in place (checked):**
- Unique `<title>` (the brand is appended only when it fits in 65), `meta description` from `seo_description`, and a canonical URL (no trailing slash, matching the sitemap).
- `og:type` is article on posts; OG/Twitter image is absolute.
- JSON-LD: Organization, WebSite on home, BlogPosting + BreadcrumbList on posts.
- Atom feed; sitemap with post `lastmod`; WebP `<picture>` and `width`/`height` on uploads; heading levels renumbered in posts; axe-core 0 violations (2026-10-25).

**Still open (for the refresh lane or the owner):**
1. **Old-post content** (measured 2026-10-29):
   - three images without alt text (above);
   - 10 posts have **no internal links**, and no post links to /tools;
   - 5 `seo_description`s are out of range: 4 are under 70 characters (`10-micro-saas-ideas…` 63, `how-to-get-successful-startup-ideas` 62, `launch-your-micro-saas-product` 63, `things-to-know…` 62) and 1 is over 160 (`micro-saas-is-the-future` 166);
   - 4 titles are over 65 characters (`launching-a-saas-product…` 73, `how-to-be-an-excellent-client…` 72, `ultimate-guide-to-get-the-most…` 68, `the-ultimate-guide-to-launching…` 66).

   The refresh lane fixes them as it refreshes, and the test enforces it once `updated:` is set.
2. **Redirects for merges:** `buffermint-pages/static/_redirects` (not in this repo).
3. **Category pages** (`/idea-validation`, `/startup-ideas`) have no lastmod and thin intros. Only 6 posts carry a category, so assign categories during the refresh, or add a "SaaS operations" category for the new topics (config.php `categories`).
4. **`/our-pricing`** is empty and in the sitemap (PLAN 11, owner).
5. **Search Console / Bing verification** (owner; brand.json `verification`): without them there's no query data, and Bing's keyword API stays closed.
6. **Author entity:** posts name "Rishabh Pandey" with no author page or `sameAs`. An author page with a short bio would support E-E-A-T. Needs the owner's OK on public bio copy.
7. **Feed:** a refreshed post keeps its place (sorted by `date`). That's fine; readers see the `<updated>`.
8. **Page speed:** the Lighthouse mobile median is 67–76 (STATUS, 2026-10-25), and LCP is still 5–7 s on mobile because of the jarallax cover. Lazy-loading or a smaller first cover is the next step (topic 14 can report it).

## Appendix A: demand evidence (2026-10-29)

The evidence CLI's `assess --evidence` (keyless: Google/Bing/YouTube autosuggest, HN Algolia, Wikimedia pageviews). The engine column shows `d<n>` = the phrase is suggested after its first n words (– = not suggested from any shorter prefix), then the number of completions that extend it. Rerun: build an idea file with `evidence.suggest/wikipedia/hn` = the keywords and run `node planner.mjs assess --idea <file> --json --evidence`.

| keyword | autosuggest level (1–5) | per engine: depth/completions | HN mentions, 24 mo | Wikipedia article, avg views per month, last 3 full months |
|---|---|---|---|---|
| heic to jpg | 5 | google d1/9; bing d1/24; youtube d1/9 | 11 | — |
| pdf to word | 5 | google d1/9; bing d1/21; youtube d1/9 | 6 | PDF: 53,144/mo |
| are online pdf converters safe | 4 | google d3/0; bing d3/0; youtube –/0 | 0 | — |
| build an app without coding | 4 | google –/4; bing d3/5; youtube d4/3 | 0 | Vibe coding: 42,898/mo |
| churn rate | 4 | google d1/9; bing d1/9; youtube –/9 | 81 | Churn rate: 1,728/mo |
| compress pdf to 100kb | 4 | google d3/9; bing d3/12; youtube d3/2 | 0 | — |
| convert images to webp | 4 | google d2/9; bing d2/6; youtube –/2 | 3 | WebP: 10,119/mo |
| cookieless analytics | 4 | google d1/9; bing d1/2; youtube –/0 | 7 | — |
| core web vitals | 4 | google d2/9; bing d2/11; youtube d2/9 | 68 | Web performance: 1,486/mo |
| dummy file generator | 4 | google d2/9; bing d2/5; youtube –/0 | 0 | — |
| e invoicing france | 4 | google d2/9; bing d2/10; youtube –/2 | 0 | Electronic invoicing: 689/mo |
| eu ai act | 4 | google d2/9; bing d2/24; youtube d2/9 | 349 | Artificial Intelligence Act: 10,986/mo |
| european accessibility act | 4 | google d2/9; bing d2/14; youtube d2/1 | 20 | European Accessibility Act: 1,080/mo |
| exif viewer | 4 | google d1/9; bing d1/12; youtube –/2 | 4 | Exif: 7,697/mo |
| gmail bulk sender requirements | 4 | google d3/0; bing d3/0; youtube –/0 | 0 | — |
| gst on export of services | 4 | google d3/8; bing d3/4; youtube d3/3 | 0 | Goods and Services Tax (India): 16,572/mo |
| image compressor | 4 | google d1/9; bing d1/16; youtube –/9 | 47 | — |
| llm cost calculator | 4 | google d2/8; bing d2/2; youtube –/0 | 3 | — |
| lovable vs bolt | 4 | google –/9; bing d2/5; youtube d1/7 | 1 | — |
| ltv calculator | 4 | google d1/9; bing d1/12; youtube –/1 | 0 | — |
| mcp server | 4 | google d1/9; bing d1/24; youtube –/10 | 5505 | Model Context Protocol: 38,585/mo |
| merchant of record | 4 | google d2/9; bing d2/10; youtube –/7 | 84 | — |
| paddle vs stripe | 4 | google d2/7; bing d2/0; youtube d2/0 | 0 | — |
| pdf compressor | 4 | google d1/9; bing d1/21; youtube –/9 | 2 | — |
| plausible analytics | 4 | google d1/9; bing d1/8; youtube –/3 | 44 | Plausible Analytics: 392/mo |
| privacy policy generator | 4 | google d2/9; bing d2/13; youtube d2/9 | 3 | — |
| product market fit | 4 | google d2/9; bing d2/11; youtube d2/9 | 999 | — |
| programmatic seo | 4 | google –/9; bing d1/10; youtube d1/9 | 46 | — |
| remove background from image | 4 | google d1/9; bing d1/13; youtube d3/9 | 1 | — |
| remove exif data | 4 | google d2/9; bing d2/9; youtube –/2 | 4 | Exif: 7,697/mo |
| saas vs cloud computing | 4 | google d3/1; bing d3/1; youtube –/0 | 0 | History of cloud computing: 1,264/mo |
| startup runway calculator | 4 | google d2/0; bing d2/0; youtube –/0 | 0 | — |
| supabase row level security | 4 | google d2/9; bing d2/2; youtube d2/0 | 8 | — |
| background remover | 3 | google –/9; bing d1/24; youtube –/9 | 63 | — |
| e invoicing belgium | 3 | google –/9; bing –/7; youtube d2/0 | 0 | — |
| eu ai act small business | 3 | google d4/0; bing –/0; youtube –/0 | 0 | — |
| eu vat digital services | 3 | google d3/0; bing –/1; youtube –/0 | 0 | — |
| faq schema | 3 | google –/9; bing d1/10; youtube –/9 | 2 | Schema.org: 1,654/mo |
| get cited by chatgpt | 3 | google d2/2; bing –/2; youtube –/1 | 2 | — |
| goatcounter vs plausible | 3 | google d2/0; bing –/0; youtube –/0 | 0 | — |
| llm api pricing | 3 | google d2/6; bing –/9; youtube –/0 | 7 | — |
| token counter | 3 | google –/9; bing d1/9; youtube –/9 | 37 | — |
| whisper transcription | 3 | google –/9; bing d1/12; youtube –/9 | 26 | Whisper (speech recognition system): 3,599/mo |
| ai overviews | 2 | google –/9; bing –/14; youtube –/3 | 501 | AI Overviews: 9,129/mo |
| cookie banner analytics | 2 | google –/2; bing –/1; youtube –/0 | 0 | — |
| credit based pricing | 2 | google –/9; bing –/4; youtube –/0 | 18 | Pricing: 3,332/mo |
| dmarc | 2 | google –/9; bing –/24; youtube –/2 | 690 | DMARC: 16,517/mo |
| how much does it cost to build a saas | 2 | google –/3; bing –/0; youtube –/0 | 0 | — |
| how to price a saas | 2 | google –/2; bing –/1; youtube –/1 | 0 | — |
| how to start a micro saas | 2 | google –/1; bing –/0; youtube –/1 | 0 | — |
| how to validate a saas idea | 2 | google –/0; bing –/0; youtube –/0 | 1 | — |
| idea validation | 2 | google –/9; bing –/11; youtube –/8 | 68 | — |
| lemon squeezy alternative | 2 | google –/3; bing –/1; youtube –/0 | 0 | — |
| make pdf accessible | 2 | google –/8; bing –/7; youtube –/1 | 0 | PDF/UA: 1,047/mo |
| mcp server for saas | 2 | google –/0; bing –/0; youtube –/0 | 0 | — |
| mrr calculator | 2 | google –/0; bing –/3; youtube –/1 | 2 | — |
| mvp development | 2 | google –/6; bing –/13; youtube –/3 | 57 | — |
| oss vat | 2 | google –/9; bing –/11; youtube –/1 | 0 | — |
| peppol | 2 | google –/9; bing –/23; youtube –/8 | 50 | PEPPOL: 1,135/mo |
| saas directories | 2 | google –/8; bing –/0; youtube –/0 | 22 | — |
| saas price increase | 2 | google –/8; bing –/3; youtube –/0 | 0 | — |
| saas pricing | 2 | google –/9; bing –/12; youtube –/5 | 48 | — |
| transcribe audio offline | 2 | google –/3; bing –/4; youtube –/0 | 0 | — |
| vibe coding security | 2 | google –/9; bing –/4; youtube –/1 | 13 | Vibe coding: 42,898/mo |
| zero click searches | 2 | google –/9; bing –/2; youtube –/0 | 9 | Zero-click result: 1,289/mo |
| dmarc for cold email | 1 | google –/0; bing –/0; youtube –/0 | 0 | — |
| european accessibility act saas | 1 | google –/0; bing –/0; youtube –/0 | 0 | — |
| micro saas costs | 1 | google –/0; bing –/0; youtube –/0 | 0 | — |
| schema markup for saas | 1 | google –/0; bing –/0; youtube –/0 | 0 | — |
| vat on saas eu | 1 | google –/0; bing –/0; youtube –/0 | 0 | — |

## Appendix B: trend sources found 2026-10-29

Found in web search on 2026-10-29; the writing lane opens each before citing it, and prefers the primary source.
- **AI Act / Digital Omnibus:**
  - mondaq.com/eu-digital-omnibus-on-ai-enters-into-force/1825722;
  - winstontaylor.com/insights/ai-act-rules-on-high-risk-ai-delayed-as-ai-digital-omnibus-agreed;
  - jdsupra.com/legalnews/eu-ai-act-update-omnibus-talks-stall-1059072 (pre-adoption; an example of a now-outdated claim).
- **EAA enforcement:** levelaccess.com/blog/eaa-compliance-in-2026-how-enforcement-has-evolved-and-what-to-expect-next; allaccessible.org/blog/european-accessibility-act-one-year-on-2026-enforcement-update; ccpc.ie (microenterprise guidelines).
- **AI Overviews:**
  - ahrefs.com/blog/ai-overviews-reduce-clicks (read);
  - searchengineland.com/google-zero-click-searches-2026-study-479717;
  - medianama.com/2026/02/223-google-ai-overviews-click-through-rates-58-study.
- **AI referrals / citations:** searchengineland.com/chatgpt-ai-referral-traffic-sessions-data-481630; seranking.com/blog/chatgpt-referral-traffic-may-2026.
- **Pricing:** dev.to/heysash/credit-based-vs-classic-saas-pricing-what-the-github-and-anthropic-billing-shifts-reveal-3f86; getmonetizely.com (AI pricing models); pricingsaas.com/companies/stripe.
- **Payments:** paddle.com/pricing (read); flaviocopes.com/payment-provider-fees.md; dodopayments.com/blogs/cheapest-merchant-of-record (a competitor's blog: use only to cross-check).
- **Vibe-coding security:** symbioticsec.ai (1,072 apps); escape.tech (methodology); theregister.com/2026/02/27/lovable_app_vulnerabilities; thenextweb.com/news/lovable-vibe-coding-security-crisis-exposed.
- **Email:** redsift.com/guides/bulk-email-sender-requirements (points to the Google/Yahoo/Microsoft primary pages).
- **E-invoicing:** fonoa.com/resources/blog/peppol-adoption-europe-2026-mandates-vida; kbc.be (Belgian e-factuur news).
- **Spam update:** tripledart.com/google-algorithm-update-tracker/march-2026-spam-update; almcorp.com/blog/google-march-2026-spam-update.
- **ADA Title II:** federalregister.gov/documents/2026/04/20/2026-07663 (blocked to our fetcher; open in a browser); venable.com/insights/publications/2026/04/ada-title-ii-website-accessibility-regulations.
- **PDF upload leaks:** techradar.com/pro/security/two-top-pdf-tools-have-been-found-leaking-user-documents-and-data-online; bgr.com/tech/online-pdf-converters-leaked-thousands-of-user-uploaded-documents.
- **Not yet covered** (the scheduled lanes add these when they top up the list): Hacker News "Show HN" launch analysis, Reddit r/SaaS and r/microsaas threads (Reddit's API needs commercial approval; read the pages in a browser and cite the thread URL), founder newsletters (Lenny's, Growth Unhinged, Indie Hackers posts).
