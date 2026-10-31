# Blog plan: buffermint.com/articles

Research lane `t-20261029-blog-research-seo`, 2026-10-29. Topics 33–47 and the plan check come from `t-20261031-blog-topics-research`, 2026-10-31. The article lanes (`t-20261029-blog-articles-1`, `-2`), the refresh lane (`t-20261029-blog-refresh-old-posts`) and the scheduled post lanes (`company/templates/blog-post.md`) all work from this file. **Update the topic's `Status:` when you start (`writing`) and when you publish (`published <date>`).** `tests/posts.test.mjs` enforces the mechanical half of the rules below on every post dated 2026-10-29 or later, and on every post with `updated:`.

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
- Every `/tools/` link in a post or an open topic is live and not hidden (`tests/blog-plan.test.mjs`, against `../buffermint-tools`; skipped, with the reason, when that checkout can't be read).
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

Rank = demand evidence × how well we can add something new × fit with the readers. Take `next` topics first, then `later`, lowest number first within a band (topics 33–47 joined on 2026-10-31). `now` = the next 10 to write (lanes `-articles-1` takes 1–5, `-articles-2` takes 6–10). Sources marked *(read 2026-10-29)* were opened in this lane; *(found 2026-10-29)* were found in search, and the writing lane must open and check them. Search results on several topics were mostly vendor blogs: prefer the primary source listed, and treat vendor figures as claims to check.

### 1. Compress a PDF to 100 KB without wrecking it · `now`
- **Keyword:** `compress pdf to 100kb`. Autosuggest level 4 (suggested after "compress pdf to" on Google, Bing and YouTube; 9/12/2 completions). Also `pdf compressor` (level 4, 21 Bing completions). Our page is one of the most-used tools (3 views + 8 use events in our first week of counting).
- **Reader / question:** someone whose upload portal (job, visa, exam, government form) rejects a PDF over 100 KB. Which setting gets under the limit and stays readable?
- **New angle:** our own benchmark (`buffermint-tools/QUALITY-DOCUMENTS.md`): to 100 KB, an 8-page photo PDF came out at 90 KB with SSIM 0.761, against Ghostscript's best of 100 KB at 0.676. A 10-page text report reached 97 KB with every word still extractable, where Ghostscript couldn't get under 150 KB. Show the trade-off (dpi vs. image quality vs. text) with before/after crops, and say which kinds of PDF can't reach 100 KB at all (scans with many pages).
- **Sources:** Ghostscript pdfwrite docs (ghostscript.com/docs), Adobe Acrobat help on reducing PDF size (helpx.adobe.com), the PDF Association on image compression in PDF (pdfa.org), qpdf manual (qpdf.readthedocs.io), and 2+ official portals that state a 100 KB limit in their instructions (e.g. Indian exam/visa portals; cite the page itself).
- **Internal links:** /tools/pdf/compress-pdf-to-100kb/, /tools/pdf/compress-pdf-to-size/, /tools/pdf/compress-pdf/, /tools/photo/compress-image-to-100kb/, /tools/pdf/grayscale-pdf/.
- **Status:** published 2026-10-23 (dated; went live 2026-10-30) → `/articles/compress-pdf-to-100kb` (own Ghostscript 10.06 resolution sweep on the benchmark corpus, KB per page at 36–150 dpi; font hinting measured at 81% of the report's font bytes)

### 2. Are online PDF converters safe? We watched where the file goes · `now`
- **Keyword:** `are online pdf converters safe`. Level 4 (suggested after "are online pdf" on Google and Bing).
- **Reader / question:** a tools user with a contract, payslip or ID scan. Does the file leave my computer, and what happens to it?
- **New angle:** a repeatable test. Open DevTools → Network on 6 popular PDF sites and on ours, run the same task, and record whether the file is uploaded (request size), to which host, and what each privacy policy says about retention. Put the findings next to the documented incident: Cybernews found 89,062 user files exposed by two PDF services in 2024 (check the original report). Readers get a 2-minute check they can run on any tool.
- **Sources:** the Cybernews research article (cybernews.com; find the original), TechRadar coverage (techradar.com/pro/security/two-top-pdf-tools-have-been-found-leaking-user-documents-and-data-online, found 2026-10-29), BGR (bgr.com/tech/online-pdf-converters-leaked-thousands-of-user-uploaded-documents, found 2026-10-29), each tested site's privacy policy (dated), MDN on the File API (developer.mozilla.org), the UK NCSC or CISA guidance on handling sensitive documents.
- **Internal links:** /tools/pdf/, /tools/pdf/redact-pdf/, /tools/pdf/protect-pdf/, /tools/photo/exif-stripper/, post 2 ↔ topic 12.
- **Status:** published 2026-10-08 (dated; went live 2026-10-30) → `/articles/are-online-pdf-converters-safe` (own Playwright run 29 Oct 2026, one per site: iLovePDF, Smallpdf, PDF24 and Sejda uploaded 0.8–2.5 s after the file was chosen; FreeConvert after Compress, 224 hosts contacted; Adobe refused the headless browser; ours no upload)

### 3. The EU AI Act for a small SaaS that calls an LLM API · `now`
- **Keyword:** `eu ai act` (level 4; HN 349 mentions/24 mo; Wikipedia "Artificial Intelligence Act" 10,986 views/mo), `eu ai act small business` (level 3).
- **Reader / question:** a 1–5 person SaaS with an AI feature built on a third-party model, selling to EU users. What applies to me, and from when, now that the Digital Omnibus has changed the dates?
- **New angle:** the sources disagree. Early-2026 commentary says the 2 August 2026 transparency duties hold; later reports say the omnibus (adopted June 2026) moved Annex III high-risk duties to 2 December 2027 and gave systems already on the market until 2 December 2026 for marking. Reconcile them from the Official Journal text, then give a dated checklist for the "deployer of a general-purpose model" case: Art. 4 AI literacy (in force since Feb 2025), Art. 50 disclosure, what does *not* apply. Show which sources were right and why the others went wrong (they predate the final text).
- **Sources:** Regulation (EU) 2024/1689 on EUR-Lex, the omnibus amending act in the Official Journal (eur-lex.europa.eu), the European Commission AI Act Service Desk / FAQ (digital-strategy.ec.europa.eu), DLA Piper (knowledge.dlapiper.com, found 2026-10-29), Stephenson Harwood (perspectives.stephensonharwood.com/post/102msaw, found 2026-10-29), JD Supra (jdsupra.com/legalnews/eu-legislators-agree-to-delay-for-high-5617765, found 2026-10-29).
- **Internal links:** /tools/ai/pii-redactor/, /tools/ai/llm-cost/, /articles/how-ai-and-machine-learning-is-changing-the-saas-space, topic 6.
- **Status:** published 2026-10-15 (dated; went live 2026-10-30) → `/articles/eu-ai-act-small-saas-llm-api` (proposal vs. final Regulation (EU) 2026/1744 table, dated checklist, SME fine table)

### 4. Does the European Accessibility Act apply to your small SaaS? · `now`
- **Keyword:** `european accessibility act` (level 4; Wikipedia 1,080 views/mo; HN 20). The longer `european accessibility act saas` has no autosuggest trace (level 1), so target the head term and answer the SaaS question in the H2s.
- **Reader / question:** a small SaaS selling to EU consumers. Am I exempt as a microenterprise, and if not, what do I fix first?
- **New angle:** (a) a decision tree built from the directive text. Sources disagree on which article holds the microenterprise exemption (Art. 4(5) vs. Art. 22 in different guides) and on whether both tests (<10 staff *and* ≤€2M) apply, so settle it from EUR-Lex. (b) Our own fix log: axe-core on buffermint.com went from 76 to 0 violations across 29 pages (light and dark), plus what the violations were (heading order, contrast, landmarks, an aside in main) and what each fix took (`buffermint-landing/STATUS.md`, 2026-10-25).
- **Sources:** Directive (EU) 2019/882 on EUR-Lex; Ireland's CCPC microenterprise guidelines (ccpc.ie, found 2026-10-29); the European Commission EAA page; W3C WAI on WCAG 2.1 and EN 301 549 (w3.org/WAI); Level Access on 2026 enforcement (levelaccess.com/blog/eaa-compliance-in-2026…, found 2026-10-29). Treat fine figures from vendor blogs as unverified.
- **Internal links:** /tools/design/contrast-checker/, /tools/design/color-blindness/, /tools/seo/heading-checker/, /tools/health/color-blind-test/, topic 26.
- **Status:** published 2026-10-25 (dated; went live 2026-10-30) → `/articles/european-accessibility-act-small-saas` (decision tree from Art. 2, 3(23), 3(30), 4(5), 14, 32; the exemption is Art. 4(5) with the definition in 3(23), both tests apply; ACM's 61% webshop finding; our axe fix log)

### 5. Merchant of record fees at $9, $29 and $99 a month, worked out · `now`
- **Keyword:** `merchant of record` (level 4; HN 84), `paddle vs stripe` (level 4).
- **Reader / question:** a founder choosing how to take payments and handle sales tax. What does each provider keep from my actual price, and what do I get for it?
- **New angle:** most comparisons online are written by one of the competitors (Dodo's blog writes most of the search results). We work out a neutral table from each provider's own pricing page: fee per sale and per $1,000 of revenue at $9, $29 and $99. It includes the small-ticket penalty (Paddle's 5% + 50¢ is 10.6% of a $9 sale; Paddle asks under-$10 sellers to contact them for pricing, *read 2026-10-29*), tax filing coverage, payouts to India, and when plain Stripe + Stripe Tax is cheaper.
- **Sources:** paddle.com/pricing *(read 2026-10-29)*, lemonsqueezy.com/pricing, polar.sh docs on fees, dodopayments.com/pricing, creem.io pricing, stripe.com/pricing and Stripe Tax pricing, flaviocopes.com/payment-provider-fees (found 2026-10-29; an independent calculation to compare with). Date every price "as of <month year>".
- **Internal links:** /tools/business/mrr-calculator/, /tools/business/profit-margin-calculator/, /tools/business/vat-calculator/, /tools/business/pricing-tier-calculator/, topic 18.
- **Status:** published 2026-10-05 (dated; went live 2026-10-30) → `/articles/merchant-of-record-fees` (six pricing pages read 29 Oct 2026; fee per sale at $9/$29/$99 for US and non-US cards; $2,900 MRR example incl. Stripe Tax Complete; break-evens)

### 6. What an AI feature really costs per user · `now`
- **Keyword:** `llm cost calculator` (level 4), `llm api pricing` (level 3; HN 7), `token counter` (level 3; HN 37).
- **Reader / question:** a founder adding AI to a $19/month plan. What will one user cost me per month, and where does the margin go?
- **New angle:** three common feature shapes (summarize a 10-page PDF, answer a support ticket with 5 help articles as context, classify 1,000 short texts). Count the tokens with our token counter, price them from the official pages of 3 providers (input, output, cached input, batch), and show cost per user at light/median/heavy use against a $19 plan. Then show what prompt caching and a smaller model change. Nobody publishes this per-feature with measured tokens.
- **Sources:** anthropic.com/pricing, openai.com/api/pricing, ai.google.dev/pricing (all dated), the GitHub blog post on Copilot's 1 June 2026 move to usage billing (found 2026-10-29), Monetizely or PricingSaaS on AI pricing models (found 2026-10-29).
- **Internal links:** /tools/ai/llm-cost/, /tools/ai/token-counter/, /tools/ai/context-planner/, /tools/business/unit-economics-calculator/, /articles/how-ai-and-machine-learning-is-changing-the-saas-space.
- **Status:** published 2026-10-18 (dated; went live 2026-10-30) → `/articles/ai-feature-cost-per-user` (o200k token counts on a 10-page report, the W-9, five help pages and 752 catalogue descriptions; priced from the Anthropic/OpenAI/Google pages read 29 Oct 2026; cost per user at light/median/heavy vs a $19 plan; Gemini's 4,096-token caching minimum; Argon doubling 1 Dec)

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
- **Status:** published 2026-10-30 (dated; went live 2026-10-30) → `/articles/ai-overviews-zero-click-studies` (seven measurements side by side; Seer's Feb 2026 AIO gap equals the Agarwal & Sen RCT's 38%; our GoatCounter week 23–29 Oct: 518 views, 84% tools, all 37 search-referred views on tool pages)

### 8. Vibe-coded SaaS security: the holes every scan keeps finding · `now`
- **Keyword:** `supabase row level security` (level 4; HN 8), `vibe coding security` (level 2; HN 13; Wikipedia "Vibe coding" 42,898/mo).
- **Reader / question:** a non-technical founder who built on Lovable/Bolt/Supabase. Is my app leaking data, and how do I check in 15 minutes?
- **New angle:** six scans with different methods (Symbiotic: 1,072 apps; Escape: 2k vulnerabilities; CVE-2025-48757 with 170+ apps; The Register's 18k-user case; smaller audits), normalized into one table by hole type (RLS off, keys in client code, missing auth on functions, open storage buckets). Then a self-check with exact commands: query a table with the public anon key and see what comes back. Explain why scan numbers differ (definitions, samples).
- **Sources:** symbioticsec.ai/blog/we-scanned-1-072-vibe-coded-apps-98-had-security-flaws (found 2026-10-29), escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding (found 2026-10-29), theregister.com/2026/02/27/lovable_app_vulnerabilities (found 2026-10-29), nvd.nist.gov CVE-2025-48757, supabase.com/docs/guides/database/postgres/row-level-security, OWASP Top 10.
- **Internal links:** /tools/dev/jwt-decoder/, /tools/privacy/password-generator/, /tools/dev/hash/, /articles/launching-a-saas-product-as-a-non-technical-founder, topic 28.
- **Status:** published 2026-10-10 (dated; went live 2026-10-30) → `/articles/vibe-coded-app-security-scans` (Palmer, Escape, The Register case, Symbiotic by hole type; our PostgreSQL 18.6 reproduction: anon that can read 0 rows can still blind-update/delete with `using (true)` policies; 15-minute self-check)

### 9. Credits, seats or usage: how 12 SaaS tools define a "credit" · `now`
- **Keyword:** `credit based pricing` (level 2; HN 18), `saas pricing` (level 2; HN 48). Weak autosuggest but a live trend (GitHub Copilot moved to usage billing on 1 June 2026; one index counts 79 credit-priced companies, +126% year over year, *found 2026-10-29*, check at the source).
- **Reader / question:** a founder pricing an AI feature, and a buyer comparing tools. What does a credit actually buy?
- **New angle:** read the public pricing pages of 12 tools small founders use (e.g. GitHub Copilot, Cursor, Lovable, Bolt, Replit, Notion AI, Zapier, Intercom Fin, Clay, ElevenLabs, Midjourney, Canva), all on the same date. Tabulate how a credit is defined, its price, and how many one typical task burns. Close with what we'd copy and what confuses buyers.
- **Sources:** the 12 pricing pages (dated), PricingSaaS (pricingsaas.com), the GitHub blog / docs on Copilot billing, Growth Unhinged (Kyle Poyar) on credit pricing, dev.to/heysash/credit-based-vs-classic-saas-pricing… (found 2026-10-29).
- **Internal links:** /tools/business/pricing-tier-calculator/, /tools/business/price-increase-calculator/, /tools/business/mrr-calculator/, topics 5 and 6.
- **Status:** published 2026-10-20 (dated; went live 2026-10-30) → `/articles/credit-based-pricing-12-tools` (12 pricing pages read 29 Oct 2026: Copilot, v0, Replit, Lovable, Bolt, Cursor, Notion, Zapier, Intercom Fin, Clay, ElevenLabs, HeyGen; Canva and Midjourney refused our fetcher; 6 of 12 + Clay in part let a buyer price a task; four kinds of credit)

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
- **Status:** published 2026-10-28 (dated; went live 2026-10-30) → `/articles/remove-background-browser-models` (our bench: rembg CPU reference + browser pipeline, 8 ground-truth cut-outs; IoU hides edge differences; rembg's default model is the non-commercial RMBG-2.0; WebGPU/quantization lessons)

### 11. HEIC to JPG: when to convert and what you lose · `next`
- **Keyword:** `heic to jpg` (level 5, the strongest in this set; HN 11).
- **Reader / question:** an iPhone user whose upload form rejects HEIC.
- **New angle:** measured quality (our converter: SSIM 0.982/0.970 on real iPhone HEICs, QUALITY-MEDIA.md) and file sizes before/after on 10 photos. Add a table of which big platforms accept HEIC, each from its own help page.
- **Sources:** Apple support on HEIF/HEVC, the MPEG HEIF spec page / Nokia HEIF docs, caniuse.com for HEIC/AVIF support, 2+ platform help pages (Google Photos, Windows/Microsoft Store HEIF extension).
- **Internal links:** /tools/files/heic-to-jpg/, /tools/files/heic-to-png/, /tools/photo/resize-image/, topic 13.
- **Status:** published 2026-10-13 (dated; went live 2026-10-30) → `/articles/heic-to-jpg-what-you-lose` (own sweep 30 Oct 2026: 5 HEICs (iPhone 13 Pro HDR sample, 3 Apple-encoded 12 MP NASA photos, libheif example) decoded with libheif 1.23.5, MozJPEG q60–100: q92 = 1.17–1.70× the HEIC at SSIM ≥0.989 on the 4 Apple-encoded files (0.66× / 0.985 on the libheif example); 5 photos, not the planned 10; topic 13 link added when it ships; PNG 2.6–10.4×; HDR gain map and tiles shown with ExifTool; 10-place acceptance table from each help page; US visa 240 kB worked example)

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
- **New angle:** our before/after log: vendor.js 479 → 104 KB, Vue removed (main.js 123,549 → 18,741 B), Lighthouse home 65 → 67, post 63 → 68, About 66 → 76. Those Lighthouse runs (2026-10-25) predate the Vue removal (2026-10-28), so rerun Lighthouse before crediting it. Include what didn't help. Every number is from STATUS.md with its date and tool version.
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
- **New angle:** a dated country table from government sources: Belgium B2B since 1 Jan 2026, France receiving from 1 Sep 2026 (now past: confirm at impots.gouv.fr that it started as planned; search on 2026-10-31 found no post-launch source) and SME issuing from Sep 2027, Germany receiving since 2025, Poland KSeF (large taxpayers 1 Feb 2026, others 1 Apr 2026, micro from Jan 2027, per https://vatit.com/?p=90235, found 2026-10-31; confirm at the Ministry of Finance), and ViDA 2030. Most mandates are domestic B2B, so say which ones touch a non-EU SaaS selling cross-border, and which don't.
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
- **Internal links:** /tools/business/mrr-calculator/, /tools/business/clv-calculator/, /tools/business/unit-economics-calculator/, topic 21. (`churn-rate-calculator` is hidden; add it back when it is listed.)
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
- **New angle:** *(rewritten 2026-10-31)* FAQ rich results are gone: Google's docs changelog says they stopped appearing on 7 May 2026, and the documentation was removed by 15 June. So the post is now "what FAQ schema still does". Google's 2023 limits, then the 2026 end. Secondary reports say Google still reads the markup and that the Rich Results Test dropped it, so check both in the current docs. Say what our generator's output earns today, and which types still show.
- **Sources:** https://developers.google.com/search/docs/appearance/structured-data/faqpage *(read 2026-10-31; the changelog)*, Google Search Central structured data docs + the Aug 2023 blog post, schema.org, Bing Webmaster guidelines, https://jsonld.com/google-faq-rich-results-deprecated/ (found 2026-10-31).
- **Internal links:** /tools/seo/faq-schema-generator/, /tools/seo/article-schema-generator/, /tools/seo/product-schema-generator/ (one of our most-visited tools).
- **Status:** todo

### 26. Making PDFs accessible: the ADA Title II dates and what a small office can fix itself · `later`
- **Keyword:** `make pdf accessible` (level 2; Wikipedia "PDF/UA" 1,047/mo).
- **New angle:** the dates after the DOJ's 20 April 2026 interim final rule (26 April 2027 for 50k+ population, 26 April 2028 for smaller ones and special districts, per https://www.reedsmith.com/articles/doj-extends-digital-accessibility-compliance-dates-under-title-ii-of-the-ada/ and other law-firm notes found 2026-10-31; check the Federal Register text), plus a checklist of what can be done without paid software (title, language, tags, reading order, alt text) and what can't.
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
- **Status:** published 2026-10-29 (refresh lane) → `/articles/how-to-leverage-ai-and-build-an-app-without-coding` (dated plan table from the Lovable docs, Bolt and Replit pages; Lovable credits per change worked out from its documented examples; Escape and The Register on the security side). No independent hands-on review was used; the security sources stand in for it.

### 29. Testing file upload limits with dummy files: the real limits of 12 services · `later`
- **Keyword:** `dummy file generator` (level 4). Still our most-visited tool page: 13 views in the first counted week, 20 by 31 Oct (`/var/log/caddy/stats.log` from 23 Oct, same count as above).
- **New angle:** a table of documented upload/attachment limits (Gmail, Outlook, Slack, WhatsApp, Discord, Google Forms, Typeform, S3 single PUT, Cloudflare Workers request body…), each from the vendor's docs. Add how to test the edges (exactly at the limit, 1 byte over) with generated files.
- **Sources:** each vendor's docs page (dated), MDN on File/Blob, RFC 9110 on 413 responses.
- **Note:** Discord's limit moved to 20 MB on 13 Aug 2026 (see topic 39): read every limit fresh.
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
- **Keyword:** `saas price increase` (level 2, unchanged 2026-10-31). Weak autosuggest: measure in Bing first, and drop it if it stays weak. Bing's data still needs the owner's setup, so it stays last in the queue.
- **New angle:** a table of 15 public price-increase announcements (notice given, grandfathering, discount offered), each linked, plus what the research says about churn after increases.
- **Sources:** the 15 announcements (vendor blogs/changelogs), Paddle/ProfitWell pricing research, Patrick Campbell's talks, OpenView or Kyle Poyar on pricing changes.
- **Internal links:** /tools/business/price-increase-calculator/, /tools/business/pricing-tier-calculator/, topic 9.
- **Status:** todo

### 33. PDF to Word: what survives the conversion, measured · `next`
- **Keyword:** `pdf to word without losing formatting` (level 4; HN 0). `pdf to word` (level 5; HN 6) and `pdf to excel` (level 4; HN 10) are the tool pages' terms, for context only. Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a how-to with a problem behind it. The reader's converted file looks wrong, and they want to know why and what to use instead. The tool page keeps the plain "pdf to word" query; the post answers this follow-up.
- **New angle:** our benchmark (`buffermint-tools/QUALITY-DOCUMENTS.md`): a bank statement kept word recall and precision of 1, 3 of 3 tables with all 335 cells exact and 18 bold runs; a scan goes through OCR first. Add a test on 4 document types (text report, table-heavy, multi-column, scan), scored the same way against Word's own PDF Reflow. Say what we can't claim: there is no LibreOffice layout reference in that benchmark, so run one or state the gap.
- **Sources:** https://support.microsoft.com/en-us/word/opening-pdfs-in-word (found 2026-10-31; it doesn't list what is lost, so find Microsoft's fuller page), https://www.github.com/camelot-dev/camelot/wiki/Comparison-with-other-PDF-Table-Extraction-libraries-and-tools (found 2026-10-31; the maintainers' own comparison), https://kb.itextpdf.com/itext/does-a-pdf-file-have-styles-headers-and-footers (found 2026-10-31; iText, a PDF library's maker, on why a page holds glyphs and paths and no paragraphs or tables), https://www.compdf.com/blog/compdfkit-pdf-conversion-sdk-v3-0-test-report (found 2026-10-31; a vendor's own test, a claim to compare with ours). The PDF Association's site (403 to our fetcher) is worth a look in a browser for a standards-body page on tagged PDF.
- **Internal links:** /tools/pdf/pdf-to-word/, /tools/pdf/ocr-pdf/, /tools/pdf/pdf-to-excel/, /articles/are-online-pdf-converters-safe.
- **Status:** todo

### 34. Redacting a PDF: four methods tested with pdftotext · `next`
- **Keyword:** `how to redact a pdf` (level 4; HN 1; Wikipedia "Redaction" 2,591/mo). `redact pdf` (level 4; HN 3) is the tool page's term, for context only. Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** how-to with a safety worry. Someone must hide a name, account number or SSN before sending a PDF, and needs a method that actually removes it.
- **New angle:** a repeatable test on one sample PDF with a planted string. White text, a drawn black rectangle, a black box in Word exported to PDF, and true redaction; check each with `pdftotext`, `qpdf` and a metadata read. Include our tool's real trade-off from `QUALITY-DOCUMENTS.md`: the secret is gone from text, streams and metadata, but the redacted page becomes an image (0 characters kept, 74 → 628 KB). Disclose that next to Acrobat Pro's removal under the box only.
- **Sources:** https://www.mnd.uscourts.gov/sites/mnd/files/Best_Practices-Redaction_of_Information.pdf *(read 2026-10-31: names white text and word-processor black boxes as methods not to use)*, https://daringfireball.net/linked/2025/12/23/trump-doj-pdf-redactions (found 2026-10-31; accounts of this incident conflict, so use it only if a primary source settles it), https://www.dccourts.gov/sites/default/files/COA-efiling-cases-online-PDFs/Tips%20for%20Redacting%20Briefs.pdf (found 2026-10-31), https://helpx.adobe.com/acrobat/using/removing-sensitive-content-pdfs.html (403 to our fetcher, open in a browser).
- **Internal links:** /tools/pdf/redact-pdf/, /tools/pdf/pdf-metadata/, /tools/pdf/flatten-pdf/, /articles/are-online-pdf-converters-safe.
- **Status:** todo

### 35. UUIDv4 vs UUIDv7 in Postgres 18: our benchmark, reads included · `next`
- **Keyword:** `uuid v7` (level 4; HN 69; Wikipedia "Universally unique identifier" 31,225/mo). Also `uuid generator` (level 5; HN 18), `uuid vs ulid` (level 4). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a technical decision. A developer starting a table asks which ID to use, and whether v7's timestamp is a risk.
- **New angle:** published results range from 22–35% to "10×", and search found no read benchmark on Postgres 18. Run our own on PostgreSQL 18 in a throwaway cluster (lanes have no role on the server's cluster and must not touch it: `/usr/lib/postgresql/18/bin/initdb` in a temp folder, `pg_ctl` on its own port, deleted afterwards), through `bin/heavy` because the VPS is shared: 1M and 10M rows, insert time, index size, point lookups, range scans and join reads, each on a stated machine, with the script published in the post. Add the privacy trade-off: RFC 9562 says the embedded timestamp reveals creation order and recommends v4 for security uses.
- **Sources:** https://www.rfc-editor.org/rfc/rfc9562.html *(read 2026-10-31)*, https://www.postgresql.org/docs/current/functions-uuid.html *(read 2026-10-31; it makes no ordering guarantee on this page, so check the release notes before repeating "monotonic")*, https://dev.to/umangsinha12/postgresql-uuid-performance-benchmarking-random-v4-and-time-based-v7-uuids-n9b (found 2026-10-31), https://www.depesz.com/tag/uuidv7/ (found 2026-10-31), https://thenile.dev/blog/uuidv7 (found 2026-10-31).
- **Internal links:** /tools/dev/uuid-v7-generator/, /tools/dev/uuid/, /tools/dev/ulid-generator/, /tools/dev/sql-playground/.
- **Status:** todo

### 36. Are AI detectors accurate? Vendor claims vs independent tests · `next`
- **Keyword:** `are ai detectors accurate` (level 4). Also `ai detector` (level 4; HN 229; Wikipedia "Artificial intelligence content detection" 6,573/mo). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** checking a claim. A student, teacher, editor or hiring manager has a score and wants to know whether to trust it.
- **New angle:** a claim-against-test table, plus a base-rate calculation most articles skip: for a given share of AI text, how many flags are wrong at a 1%, 5% and 18% false positive rate. Primary anchors: the Liang et al. paper (seven detectors, 91 TOEFL essays, average false positive rate 61.22%) and the FTC on Workado (98% advertised, 53% in testing, per the complaint). Treat the 2026 vendor-blog figures in search results as leads only, and say we don't offer a detector.
- **Sources:** https://arxiv.org/abs/2304.02819 *(read 2026-10-31; published in Patterns)*, https://www.ftc.gov/node/88167 *(read 2026-10-31: the April 2025 proposed order)*, https://www.crowell.com/en/insights/client-alerts/ftc-cracks-down-on-ai-models-ai-detection-claims (found 2026-10-31; the final order, August 2025), https://aibusiness.com/responsible-ai/openai-quietly-shuts-ai-plagiarism-detector-tool (found 2026-10-31; find OpenAI's own note, and don't repeat its 26%/9% figures until it's read).
- **Internal links:** /tools/seo/readability-checker/, /tools/ai/text-similarity/, /tools/ai/ai-output-cleaner/.
- **Status:** todo

### 37. Do QR codes expire? Static vs dynamic, and the fine print · `next`
- **Keyword:** `do qr codes expire` (level 4). Also `dynamic qr code` (level 4; HN 10), `qr code generator` (level 4; HN 114; Wikipedia "QR code" 235,202/mo). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a pre-print worry, or a broken code. A small business about to print 5,000 menus, or one whose code just stopped working.
- **New angle:** show that a static code is only the data: decode one offline and print the URL it holds. Then read the terms of 8 popular generators on one date and tabulate what happens to dynamic codes when a trial or plan ends. Search found only one press release on this, so the dated table is the new part. Add a size-and-scan test (error-correction level against print size) and a short note on fake codes pasted over real ones.
- **Sources:** https://stocks.observer-reporter.com/observerreporter/article/businesnewswire-2026-3-28-the-subscription-trap-how-qr-code-platforms-weaponize-your-printed-materials (found 2026-10-31; a syndicated press release, a lead and not evidence), https://www.nbcnewyork.com/news/national-international/watch-out-before-you-scan-the-hidden-dangers-of-qr-codes/4985836/ (found 2026-10-31; find the FTC's own alert, as our first URL guess returned 404), the generators' terms pages (dated), https://www.wjhg.com/2024/10/30/alerts-issued-over-rise-qr-code-scams-known-quishing (found 2026-10-31), the ISO/IEC 18004 summary from https://www.qrcode.com/en/ (Denso Wave).
- **Internal links:** /tools/privacy/qr-generator/, /tools/privacy/wifi-qr-code/, /tools/privacy/qr-scanner/, /tools/privacy/bulk-qr-code-generator/.
- **Status:** todo

### 38. Flesch Reading Ease: one text, different scores in every checker · `next`
- **Keyword:** `flesch reading ease` (level 5; HN 1; Wikipedia "Flesch–Kincaid readability tests" 11,053/mo). Also `readability score` (level 4; HN 8). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** informational. A writer or marketer wants the formula, what a good score is, and why their tools don't match.
- **New angle:** our own finding (`buffermint-tools/QUALITY-TEXT-CALC.md`): our readability checker gave FRE 31.5 where the reference syllable counter gave 27.5, and the notes put that gap down to syllable counts. Sentence counting is a separate risk: our word counter broke on "p.m." and "U.S." (the same notes), so test whether the checker does too, and whether that fix shipped, before saying so. Run 5 passages through Word, 3 free online checkers and ours, then show the spread and which step causes it.
- **Sources:** https://pubmed.ncbi.nlm.nih.gov/18867058/ (found 2026-10-31; Flesch 1948, *J Appl Psychol* 32(3):221–33), https://readabilityformulas.com/learn-about-the-flesch-reading-ease-formula/ (found 2026-10-31), https://askem.com/glossary/flesch-reading-ease/ and https://metricgate.com/calculator/text-readability-flesch (found 2026-10-31; two more published versions of the formula to compare), Microsoft's readability statistics help page, the Kincaid 1975 Navy report (DTIC).
- **Internal links:** /tools/seo/readability-checker/, /tools/seo/headline-analyzer/, /tools/seo/keyword-density/.
- **Status:** todo

### 39. Compress a video for Discord: the math for the 20 MB limit · `next`
- **Keyword:** `compress video for discord` (level 4). Also `discord file size limit` (level 4; HN 1), `compress video` (level 4; HN 14). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** do it now. Discord rejected a clip, and the reader wants the limit and the setting that fits.
- **New angle:** the limit changed: 25 → 10 MB in September 2024, then 20 MB on 13 August 2026 per Dexerto, so most guides are out of date. Confirm it on Discord's own page (403 to our fetcher; open it in a browser). Give a table of target bitrate for 20 MB at 15, 30, 60 and 120 seconds, and which resolution still looks acceptable at each, measured with `buffermint-tools/bench/video-size`. State our encoder gap honestly: on one clip ours gave 1,199 KB at SSIM 0.975 where x264 gave 818 KB at 0.982 (`QUALITY-MEDIA.md`).
- **Sources:** https://www.dexerto.com/entertainment/discord-raises-free-upload-limit-to-20mb-after-lowering-it-two-years-ago-3398251/ *(read 2026-10-31)*, https://support.discord.com/hc/en-us/articles/25444343291031-File-Attachments-FAQ (403 to our fetcher), https://dexerto.com/tech/discord-lowers-free-upload-limit-to-10mb-storage-management-is-expensive-2887809 (found 2026-10-31), https://techradar.com/computing/social-media/discord-changes-course-and-lowers-free-upload-limit-to-10gb-how-will-that-affect-you (found 2026-10-31), FFmpeg's H.264 encoding guide (https://trac.ffmpeg.org/wiki/Encode/H.264).
- **Internal links:** /tools/files/video-compressor/, /tools/files/video-trimmer/, /tools/photo/discord-image-resizer/.
- **Status:** todo

### 40. What Stripe really takes from a $29 subscription · `next`
- **Keyword:** `how much does stripe charge` (level 4; HN 0). Also `stripe processing fees` (level 4; HN 2), `stripe fees` (level 2; HN 27; Wikipedia "Stripe, Inc." 36,541/mo). We have no Stripe calculator, so `stripe fee calculator` (level 4) is not a target. Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a factual question with a sum behind it. A founder pricing a plan wants the net per sale, beyond the headline 2.9% + 30¢.
- **New angle:** the line items the headline leaves out, stacked for one $29 sale: card fee, Billing's 0.7%, international cards, currency conversion, Stripe Tax, plus the three separate dispute charges and what one lost dispute does to a month's margin. Work it for a US, an EU and an Indian buyer. It goes one level deeper than `/articles/merchant-of-record-fees` (its sibling, so link it and don't repeat its table). Both stripe.com pricing URLs served Canadian rates to our fetcher, so read the US figures in a browser.
- **Sources:** https://stripe.com/us/pricing *(read 2026-10-31, CA$ version: 2.9% + CA$0.30, +0.8% international, +2% conversion, Billing 0.7%, three CA$15 dispute charges)*, https://www.chargeback.io/fr/blog/stripe-chargeback-fee (found 2026-10-31; a vendor), https://swipesum.com/insights/guide-to-stripe-fees-rates-for-2025 (found 2026-10-31; a vendor), https://priceworld.com/merchant-fees/stripe/ (found 2026-10-31; to cross-check the US rates).
- **Internal links:** /tools/business/profit-margin-calculator/, /tools/business/unit-economics-calculator/, /tools/business/mrr-calculator/, /articles/merchant-of-record-fees.
- **Status:** todo

### 41. Supabase vs Firebase: the bill at 1,000, 10,000 and 100,000 users · `later`
- **Keyword:** `supabase vs firebase` (level 5; HN 1; Wikipedia "Firebase" 4,065/mo). Also `supabase pricing` (level 4). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a commercial comparison. A founder choosing a backend wants a monthly number, not a feature list.
- **New angle:** one sample app with stated usage per user, priced at three sizes from each pricing page. The two bill different things: Supabase bills compute, disk and egress on a plan ($25 Pro, $10 compute credit, 100,000 MAU, 250 GB egress, 8 GB disk), while Firestore bills reads and writes per day (free to 50K reads and 20K writes). The result will depend on the read pattern, so show the read-heavy case where the winner flips, if it does.
- **Sources:** https://supabase.com/pricing *(read 2026-10-31)*, https://firebase.google.com/pricing *(read 2026-10-31)*, https://makerkit.dev/pricing-calculator/supabase (found 2026-10-31; an independent calculator to compare with), https://schematichq.com/blog/supabase-pricing (found 2026-10-31).
- **Internal links:** /tools/business/unit-economics-calculator/, /tools/business/break-even-calculator/, /articles/vibe-coded-app-security-scans.
- **Status:** todo

### 42. Cloudflare Pages vs Vercel vs Netlify: the bill at 2 TB · `later`
- **Keyword:** `cloudflare pages vs vercel` (level 4). Also `vercel pricing` (level 4; HN 13; Wikipedia "Vercel" 21,830/mo). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a commercial comparison. A small team asks when a free or $20 host stops being that.
- **New angle:** the search results disagree on Netlify ($20 vs $55 per 100 GB) because it moved to credits. Work the bill from today's pages at three traffic levels. For example, 2 TB is $20 + 1,000 GB × $0.15 = $170 on Vercel Pro, 20 credits per GB on Netlify, and $0 for static assets on Cloudflare, whose paid part is Functions. Note that Vercel's Hobby plan is non-commercial. Check what Netlify does when credits run out: its pricing page doesn't say.
- **Sources:** https://vercel.com/pricing *(read 2026-10-31)*, https://www.netlify.com/pricing/ *(read 2026-10-31)*, https://developers.cloudflare.com/pages/functions/pricing/ *(read 2026-10-31)*, https://dev.to/lazydev_oh/vercel-vs-netlify-vs-cloudflare-pages-2026-deep-comparison-with-real-numbers-8pl (found 2026-10-31; to cross-check).
- **Internal links:** /tools/photo/image-compress/, /tools/business/unit-economics-calculator/, /tools/dev/minifier/.
- **Status:** todo

### 43. Resend vs Postmark vs Amazon SES: cost at 10k, 100k and 1M emails · `later`
- **Keyword:** `resend vs postmark` (level 4). Also `transactional email` (level 2; HN 98). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a commercial comparison. A founder picks a sender for password resets and receipts.
- **New angle:** a neutral cost table from the three pricing pages, explaining why roundups disagree on SES: $0.10 per 1,000 is à la carte and $0.16 is the Essentials tier. At 100,000 emails a month that's about $10–16 on SES, $35 on Resend, and on Postmark, from the 10,000-email tier's overage rates, $15 + 90 × $1.80 = $177 on Basic, $16.50 + 90 × $1.30 = $133.50 on Pro and $18 + 90 × $1.20 = $126 on Platform. Use the cheapest plan that fits in the table, and check the page's 100,000-email tier, which may be lower still. Search found no independent inbox-placement test, so say so plainly and don't rank deliverability. It pairs with topic 16's DNS checklist.
- **Sources:** https://resend.com/pricing *(read 2026-10-31)*, https://postmarkapp.com/pricing *(read 2026-10-31)*, https://aws.amazon.com/ses/pricing/ *(read 2026-10-31)*, https://devtoollab.com/blog/best-email-api-providers (found 2026-10-31; to cross-check).
- **Internal links:** /tools/privacy/email-header-analyzer/, /tools/seo/email-subject-tester/, /tools/business/unit-economics-calculator/.
- **Status:** todo

### 44. Free trial conversion rates: why the benchmarks disagree · `later`
- **Keyword:** `free trial conversion rate` (level 4; HN 1). Also `freemium vs free trial` (level 4; HN 1; Wikipedia "Freemium" 9,102/mo). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a benchmark lookup. A founder wants to know whether their rate is good, and whether to ask for a card.
- **New angle:** the published numbers use different denominators. Line up each study's sample and definition, then convert to visitor-to-paid. First Page Sage's own organic table gives 8.5% × 18.2% = 1.55% for no-card trials against 2.5% × 48.8% = 1.22% with a card, so the "48.8%" winner loses per visitor. It also counts one paid month as a conversion, so model what retention does to the comparison. Check ChartMogul's figures at the source: search shows them only second-hand.
- **Sources:** https://www.firstpagesage.com/seo-blog/saas-free-trial-conversion-rate-benchmarks/ *(read 2026-10-31)*, https://visionary-marketing.co.uk/blog/saas-free-trial-conversion-statistics-2026 (found 2026-10-31), https://userpilot.com/blog/free-trial-conversion-rate/ (found 2026-10-31), ChartMogul's own report (https://chartmogul.com/reports/).
- **Internal links:** /tools/business/conversion-rate-calculator/, /tools/business/sample-size-calculator/, /tools/business/ab-test-calculator/, /articles/credit-based-pricing-12-tools.
- **Status:** todo

### 45. Passport photo sizes by country, from each government's own page · `later`
- **Keyword:** `passport photo size` (level 4). Also `passport photo maker` (level 3; HN 3; Wikipedia "Passport" 14,180/mo). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a lookup, then do it now. An applicant wants the exact size for their country, and why an upload was refused.
- **New angle:** one table of print size, pixel size, file-size limit and head height, each cell from the government's page and dated (third-party guides disagree, and search shows UK pixel limits only on non-official sites). Add our measured output from `QUALITY-MEDIA.md`: US 600×600, UK 900×1157, India 630×810, Schengen 413×531, each printing at its document size. Don't suggest a free photo guarantees acceptance.
- **Sources:** https://www.gov.uk/photos-for-passports/digital-photo-rules (found 2026-10-31), https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/photos.html (found 2026-10-31), https://travel.state.gov/content/travel/en/passports/how-apply/photos.html (found 2026-10-31; blocks our fetcher, the HEIC post used the adoption.state.gov mirror; its 600×600 digital spec is on the visa pages, so check what applies to passports), https://photogov.net/knowledge/requirements/canada-passport-photo-requirements/ (found 2026-10-31; a vendor, to compare with the official page), ICAO Doc 9303 (find the current URL; our guess returned 404).
- **Internal links:** /tools/photo/passport-photo-maker/, /tools/photo/us-passport-photo/, /tools/photo/uk-passport-photo/, /tools/photo/india-passport-photo/, /tools/photo/compress-image-to-50kb/.
- **Status:** todo

### 46. llms.txt and robots.txt: what AI bots actually read · `later`
- **Keyword:** `llms txt` (level 3; HN 66). Also `block ai crawlers` (level 2; HN 27), `gptbot` (level 2; HN 110; Wikipedia "Robots.txt" 12,172/mo). Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** a decision. A site owner asks whether to add llms.txt, and whether a robots.txt block stops AI bots.
- **New angle:** the adoption figures clash because the samples do: 28% of Ahrefs' 137,210 domains (an upper bound, by its own note), 10.13% of SE Ranking's 300,000, 7.4% of the Fortune 500, and 36,120 files in Originality.ai's 3M sites. Reconcile them, then pair the file with what bots did: 97% of files had zero requests in May 2026, AI retrieval bots made 1.1% of the requests, and SE Ranking found no link to citations. For robots.txt, use Kim et al.'s table: GPTBot 1.000 and ClaudeBot 1.000 on disallow-all, Bytespider 0.000 (all Table 6; its Table 7 gives Bytespider 0.02, unexplained). Table 5's 0.307 is the "Directive average" for disallow-all, a figure across bot categories whose formula the paper doesn't give, so don't call it the average bot, and don't mix it with Table 6. It feeds topic 24.
- **Sources:** https://ahrefs.com/blog/llmstxt-study/ *(read 2026-10-31)*, https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/ *(read 2026-10-31; find SE Ranking's original)*, https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/ *(read 2026-10-31)*, https://originality.ai/blog/llms-txt-tracking-study (found 2026-10-31), https://arxiv.org/html/2505.21733v2 *(read 2026-10-31; a preprint)*.
- **Internal links:** /tools/seo/robots-txt-generator/, /tools/seo/robots-txt-tester/, /tools/seo/sitemap-generator/.
- **Status:** todo

### 47. Launching on Hacker News: what 12 months of Show HN scores show · `later`
- **Keyword:** `hacker news launch` (level 2; HN 2; Wikipedia "Hacker News" 5,900/mo). Also `product hunt launch` (level 4; HN 63). `show hn` is level 2, and its HN count is meaningless because every Show HN contains the phrase. Weakest search demand in this batch: ranked here for the founder audience and the data. Evidence: [Appendix C](#appendix-c-demand-evidence-2026-10-31).
- **Search intent:** how-to. A founder about to launch wants to know the odds and what a good post looks like.
- **New angle:** the most-cited numbers are from 2014 (Minimaxir, a dataset of about 20,000 Show HN posts: on average 19.33% of a day's Show HN posts hit the front page in the months before the Show HN section launched, 16.37% after; there is no single overall figure), and search found no recent study. Pull 12 months from the Algolia API and report score distribution, title patterns, and link type (repo, site, demo). A first query for 1 Oct 2025 – 30 Sep 2026: 3,799 posts at 10+ points and 767 at 100+ (both exact counts). The total came back as an estimate we don't trust, so page through for the denominator. Say which traffic results come from founders' own write-ups, not from us.
- **Sources:** https://hn.algolia.com/api (the data), https://minimaxir.com/2014/07/show-hn/ *(read 2026-10-31)*, https://www.amplifypartners.com/blog-posts/what-gets-to-the-front-page-of-hacker-news (found 2026-10-31), https://www.lucasfcosta.com/blog/hn-launch (found 2026-10-31), https://www.indiehackers.com/post/front-page-of-hn-the-full-postmortem-traffic-lessons-surprises-cbe9e0a7f6 (found 2026-10-31).
- **Internal links:** /articles/launch-your-micro-saas-product, /articles/when-is-the-right-time-to-launch-an-mvp, /tools/seo/headline-analyzer/.
- **Status:** todo

**Measured and dropped as targets** (no autosuggest trace): `micro saas costs`, `schema markup for saas`, `vat on saas eu`, `dmarc for cold email`, `european accessibility act saas`, `how much does it cost to build a saas`, `how to validate a saas idea`. Fold them into the topics above as H2s, not titles.

## Plan check (2026-10-31, lane `t-20261031-blog-topics-research`)

**Unwritten before this lane:** 20 topics marked `todo` (12–27 and 29–32), none `writing`. **Added:** 15 (33–47), so 35 are open.

**Demand:** we reran the 27 keywords the open older topics target (the second table in Appendix C). The 3 other phrases on those lines (`vat on saas eu`, `transcribe audio offline`, `mcp server for saas`) are marked there as not worth targeting, so we skipped them. All 27 kept their 2026-10-29 level. Only two HN counts moved (`mcp server` 5,505 → 5,518, `whisper transcription` 26 → 25), so no entry falls on demand. Two days is too short to show a trend; rerun in a month. None of this is search volume: autosuggest, HN and Wikipedia are proxies, and this plan holds no volume figures, measured or estimated, until Bing or Search Console exist.

**Older entries whose evidence no longer held (changed in the topics above; topic 32 needed no edit beyond its note):**
| Topic | What changed | Source |
|---|---|---|
| 25 FAQ schema | The angle was wrong: FAQ rich results ended on 7 May 2026, so nothing is left to test in Search. Rewritten. | https://developers.google.com/search/docs/appearance/structured-data/faqpage |
| 20 churn | Linked a hidden tool, `/tools/business/churn-rate-calculator/`. Replaced. | `buffermint-tools/src/hidden.json` |
| 17 e-invoicing | France's 1 Sep 2026 start has passed; it needs a post-launch source. Poland's dates added. | (found) https://vatit.com/?p=90235 |
| 14 Core Web Vitals | Its Lighthouse scores predate the Vue removal they sit beside. | `STATUS.md` |
| 26 PDF accessibility | Dates made exact. | (found) https://www.reedsmith.com/articles/doj-extends-digital-accessibility-compliance-dates-under-title-ii-of-the-ada/ |
| 29 upload limits | Traffic updated. Any Discord limit must be read fresh: it moved to 20 MB on 13 Aug 2026. | topic 39 |
| 32 price increases | Still level 2; the Bing check it waits on is still not possible. | Appendix C method |

**Still unchecked, left for the writing lane:** topic 16's 0.3% spam-rate figure (search again found it only on vendor sites; open Google's page).

**Measured, not chosen:** `soc 2 for startups` (level 4; we'd have no data of our own, only vendor ranges), and `invoice generator`, `json formatter`, `merge pdf`, `password generator` and other level 3–4 tool terms where a post can't beat the tool page. In topics 35, 37 and 39, `uuid generator`, `qr code generator` and `compress video` are the same kind: context, not the post's `keyword:`, which is always the first one listed.

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

**Carried out 2026-10-29 (lane `t-20261029-blog-refresh-old-posts`, not merged or deployed yet).** Each refreshed post keeps its slug and `date:`, has `updated: 2026-10-29`, a `keyword:`, a category where one fits, and passes `tests/posts.test.mjs`. Discovery-call and agency pitches were dropped from the refreshed text. Merged posts are deleted (so the sitemap and feed drop them) and 301 to their target from `buffermint-pages/static/_redirects` (with and without a trailing slash; Pages applies redirects even where a file exists). Tests: `tests/redirects.test.mjs` here (merged posts gone from build, sitemap and feed; targets built; the pages rules present; no `/articles/` link in the built site that is neither a post nor redirected; refreshed and new posts link straight to the target) and `buffermint-pages/test/redirects.test.mjs` (format, the expected 301s, carried into `dist/_redirects` by publish.sh). `tests/e2e/refreshed-posts.e2e.mjs` checks every refreshed post at 1280 and 390 px. **Merge the pages lane first**: on landing main the redirect test reads pages `origin/main`, so verify (and autopublish) wait for the 301s; otherwise the merged URLs would 404.

| Post | Done | New angle |
|---|---|---|
| launch-your-micro-saas-product | Refreshed, absorbed micro-saas-is-the-future | Storemapper, Plausible and Bannerbear numbers from their own pages; ChartMogul 2025 odds; customers needed for $5k MRR at $9/$29/$99; Acquire.com multiples |
| when-is-the-right-time-to-launch-an-mvp | Refreshed, absorbed the two MVP posts | What Ries, Seibel (YC), Hoffman and Superhuman actually said, where they disagree, a five-question launch test, CB Insights 2026 |
| launching-a-saas-product-as-a-non-technical-founder | Refreshed, absorbed the three launch posts (now `featured`) | AI builder vs freelancer vs partner with October 2026 prices, BLS pay, the security baseline (Escape, The Register, OWASP), the "good client" section |
| how-to-leverage-ai-and-build-an-app-without-coding | Refreshed as topic 28 | See topic 28 |
| how-ai-and-machine-learning-is-changing-the-saas-space | Merged → ai-feature-cost-per-user | Nothing worth moving (unsourced 2021 quotes); links from two new posts repointed |
| 10-predictions-for-the-saas-marketplace-future-trends | Refreshed as a scorecard | 2 right, 2 partly right, 1 past, 5 ungradeable; Census 2026 AI use, Postman 2025, GitHub usage billing; how to write a gradeable prediction |
| ultimate-guide-to-get-the-most-out-of-your-idea-validation-process | Refreshed | Ladder of evidence; our 29 Oct autosuggest/HN measurements and what they can't show; Buffer's two-page test; small-sample intervals |
| 6-amazing-startup-stories-of-successful-idea-validation | Refreshed as a fact-check | Each story checked against first-hand sources; corrected Dropbox (never sold to Microsoft), WhatsApp (no sourced video; 450M users), Instagram (27M), Airbnb, Dollar Shave Club (12,000 orders); unsourced parts removed |
| how-to-get-successful-startup-ideas | Refreshed, absorbed the-4-types-of-products | Graham's 2012 essay credited; the four types; dated rules (Gmail sender rules, ViDA, EAA, AI Act) as an idea source; a five-question filter |
| how-to-achieve-a-product-market-fit-with-your-product | Refreshed, absorbed your-strategy-is-a-voyage | Four tests (Ellis survey, Rachleff, retention, payment) and where they disagree; margin of error of the 40% test at 20–250 answers; pivot rules with Slack |
| 10-micro-saas-ideas-in-2021-copy, how-to-use-lean-methodology-to-innovate-faster, what-is-the-difference-between-saas-and-cloud-computing | Left unchanged | As decided (PLAN 11 for the `-copy` post) |

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
2. **Redirects for merges:** done in `buffermint-pages/static/_redirects` (refresh lane, 2026-10-29; deploy with this repo).
3. **Category pages** (`/idea-validation`, `/startup-ideas`) have no lastmod and thin intros. Only 6 posts carried a category; the refresh lane added `idea_validation` to the MVP and PMF posts and `startup_ideas` to the micro-SaaS guide. Assign the rest during later refreshes, or add a "SaaS operations" category for the new topics (config.php `categories`).
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
- **Not yet covered** (the scheduled lanes add these when they top up the list; the Show HN analysis became topic 47): Reddit r/SaaS and r/microsaas threads (Reddit's API needs commercial approval; read the pages in a browser and cite the thread URL), founder newsletters (Lenny's, Growth Unhinged, Indie Hackers posts).

## Appendix C: demand evidence (2026-10-31)

The same tool, scale and columns as Appendix A, run 2026-10-31 for topics 33–47 (fresh: `PLANNER_CACHE_DIR` pointed at a new, empty folder; Wikipedia is the average over the last 3 full months, shown only where the article matches). None of these is a search volume or an estimate of one: they show that people type the phrase, not how many.

Where each column comes from, so anyone can repeat it:
- Autosuggest: https://suggestqueries.google.com/complete/search (Google and, with `ds=yt`, YouTube) and https://api.bing.com/osjson.aspx, with `gl=us`, `hl=en`.
- HN mentions: https://hn.algolia.com/api, exact phrase, last 24 months.
- Wikipedia: https://wikimedia.org/api/rest_v1/ pageviews.

| keyword | autosuggest level (1–5) | per engine: depth/completions | HN mentions, 24 mo | Wikipedia article, avg views per month, last 3 full months |
|---|---|---|---|---|
| flesch reading ease | 5 | google d1/9; bing d1/11; youtube d1/1 | 1 | Flesch–Kincaid readability tests: 11,053/mo |
| pdf to word | 5 | google d1/9; bing d1/21; youtube d1/9 | 6 | — |
| supabase vs firebase | 5 | google d1/9; bing d1/7; youtube d1/7 | 1 | Firebase: 4,065/mo |
| uuid generator | 5 | google d1/9; bing d1/14; youtube d1/1 | 18 | — |
| ai detector | 4 | google d1/9; bing d1/24; youtube –/9 | 229 | Artificial intelligence content detection: 6,573/mo |
| are ai detectors accurate | 4 | google d2/9; bing d2/9; youtube d3/0 | 0 | — |
| cloudflare pages vs vercel | 4 | google d2/7; bing d3/1; youtube d2/0 | 0 | — |
| compress video | 4 | google d1/9; bing d1/20; youtube –/9 | 14 | — |
| compress video for discord | 4 | google d2/9; bing d2/5; youtube d3/0 | 0 | — |
| discord file size limit | 4 | google d2/9; bing d2/6; youtube d2/2 | 1 | — |
| do qr codes expire | 4 | google d2/6; bing d2/8; youtube d2/0 | 0 | — |
| dynamic qr code | 4 | google d2/9; bing d2/10; youtube d2/9 | 10 | — |
| free trial conversion rate | 4 | google d3/7; bing d3/1; youtube –/0 | 1 | — |
| freemium vs free trial | 4 | google d2/2; bing d2/0; youtube d2/0 | 1 | Freemium: 9,102/mo |
| how much does stripe charge | 4 | google d4/9; bing d4/9; youtube d4/0 | 0 | — |
| how to redact a pdf | 4 | google d3/9; bing d3/9; youtube d4/9 | 1 | — |
| passport photo size | 4 | google d2/9; bing d2/18; youtube –/9 | 0 | — |
| pdf to excel | 4 | google d2/9; bing d1/19; youtube –/9 | 10 | — |
| pdf to word without losing formatting | 4 | google d4/5; bing –/5; youtube d3/7 | 0 | — |
| product hunt launch | 4 | google d2/9; bing d2/3; youtube d2/3 | 63 | — |
| qr code generator | 4 | google d1/9; bing d1/24; youtube d2/9 | 114 | QR code: 235,202/mo |
| readability score | 4 | google d1/9; bing d1/9; youtube –/0 | 8 | — |
| redact pdf | 4 | google d1/9; bing d1/9; youtube –/9 | 3 | Redaction: 2,591/mo |
| resend vs postmark | 4 | google d2/7; bing d2/0; youtube d2/0 | 0 | — |
| stripe fee calculator | 4 | google d2/9; bing d2/8; youtube –/0 | 0 | — |
| stripe processing fees | 4 | google d2/9; bing d2/11; youtube d2/0 | 2 | — |
| supabase pricing | 4 | google d1/9; bing d1/13; youtube –/2 | 0 | — |
| uuid v7 | 4 | google d1/9; bing d1/10; youtube –/3 | 69 | Universally unique identifier: 31,225/mo |
| uuid vs ulid | 4 | google d2/6; bing d2/2; youtube d2/0 | 0 | — |
| vercel pricing | 4 | google d1/9; bing d1/13; youtube –/1 | 13 | Vercel: 21,830/mo |
| llms txt | 3 | google –/9; bing –/9; youtube d1/9 | 66 | — |
| passport photo maker | 3 | google –/9; bing d2/14; youtube –/9 | 3 | Passport: 14,180/mo |
| block ai crawlers | 2 | google –/8; bing –/1; youtube –/0 | 27 | — |
| gptbot | 2 | google –/9; bing –/7; youtube –/2 | 110 | Robots.txt: 12,172/mo |
| hacker news launch | 2 | google –/3; bing –/0; youtube –/0 | 2 | Hacker News: 5,900/mo |
| show hn | 2 | google –/4; bing –/9; youtube –/0 | n/a (every Show HN contains it) | — |
| stripe fees | 2 | google –/9; bing –/15; youtube –/3 | 27 | Stripe, Inc.: 36,541/mo |
| transactional email | 2 | google –/10; bing –/12; youtube –/6 | 98 | — |

Older keywords rerun on 2026-10-31 (open topics 12–32; compare with Appendix A):

| keyword | autosuggest level (1–5) | per engine: depth/completions | HN mentions, 24 mo |
|---|---|---|---|
| churn rate | 4 | google d1/9; bing d1/9; youtube –/9 | 81 |
| convert images to webp | 4 | google d2/9; bing d2/6; youtube –/2 | 3 |
| cookieless analytics | 4 | google d1/9; bing d1/2; youtube –/0 | 7 |
| core web vitals | 4 | google d2/9; bing d2/11; youtube d2/9 | 68 |
| dummy file generator | 4 | google d2/9; bing d2/5; youtube –/0 | 0 |
| e invoicing france | 4 | google d2/9; bing d2/10; youtube –/2 | 0 |
| exif viewer | 4 | google d1/9; bing d1/12; youtube –/2 | 4 |
| gmail bulk sender requirements | 4 | google d3/0; bing d3/0; youtube –/0 | 0 |
| gst on export of services | 4 | google d3/8; bing d3/4; youtube d3/3 | 0 |
| image compressor | 4 | google d1/9; bing d1/16; youtube –/9 | 47 |
| ltv calculator | 4 | google d1/9; bing d1/12; youtube –/1 | 0 |
| mcp server | 4 | google d1/9; bing d1/24; youtube –/10 | 5518 |
| plausible analytics | 4 | google d1/9; bing d1/8; youtube –/3 | 44 |
| privacy policy generator | 4 | google d2/9; bing d2/13; youtube d2/9 | 3 |
| programmatic seo | 4 | google –/9; bing d1/10; youtube d1/9 | 46 |
| remove exif data | 4 | google d2/9; bing d2/9; youtube –/2 | 4 |
| startup runway calculator | 4 | google d2/0; bing d2/0; youtube –/0 | 0 |
| e invoicing belgium | 3 | google –/9; bing –/7; youtube d2/0 | 0 |
| eu vat digital services | 3 | google d3/0; bing –/1; youtube –/0 | 0 |
| faq schema | 3 | google –/9; bing d1/10; youtube –/9 | 2 |
| get cited by chatgpt | 3 | google d2/2; bing –/2; youtube –/1 | 2 |
| whisper transcription | 3 | google –/9; bing d1/12; youtube –/9 | 25 |
| dmarc | 2 | google –/8; bing –/24; youtube –/2 | 690 |
| make pdf accessible | 2 | google –/8; bing –/7; youtube –/1 | 0 |
| oss vat | 2 | google –/9; bing –/11; youtube –/1 | 0 |
| peppol | 2 | google –/9; bing –/23; youtube –/8 | 50 |
| saas price increase | 2 | google –/8; bing –/3; youtube –/0 | 0 |
