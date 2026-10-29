---
title: "What an AI feature really costs per user, measured in tokens"
seo_description: "We counted the tokens of three common AI features and priced them on Claude, GPT and Gemini as of October 2026: cost per user against a $19 plan."
keyword: llm cost calculator
featured_image: assets/img/uploads/ai-feature-cost-per-user-cover.jpeg
featured_thumbnail: assets/img/uploads/ai-feature-cost-per-user-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-29
extends: _layouts.post
---

Most "how much does an LLM cost" articles stop at the price per million tokens. That number is easy to find and almost useless for pricing a plan. What a founder needs is the cost of one user using one feature for a month, and that depends on how many tokens the feature really sends, how often it runs, and which discounts it can actually get.

So we took three feature shapes that small SaaS products ship all the time, counted their tokens on real text, and priced them from the official pricing pages of Anthropic, OpenAI and Google as they read on 29 October 2026. Then we put the result next to a $19 a month plan.

## The three features and their measured tokens

We counted tokens with the o200k tokenizer, the one OpenAI's current models use and the one behind our [token counter](/tools/ai/token-counter/). Claude and Gemini use their own tokenizers, so the same text gives a somewhat different count there; we priced every model from the same count so the comparison stays about price, not tokenizers.

**A. Summarize a 10-page PDF.** Our test file is a 10-page report from our PDF benchmark set (3,582 words of plain prose). Its extracted text is **4,711 tokens**, about 470 per page. The prompt asks for five bullets plus dates and amounts in under 250 words, which we budget as 330 output tokens. Dense pages cost far more: the 6-page IRS Form W-9 is 6,279 words and **8,933 tokens**, about 1,490 per page, three times the report's rate. If your users upload forms, contracts or bank statements, use the denser figure.

**B. Answer a support ticket from 5 help articles.** We used five of our own tool help pages as the "knowledge base": 4,218 tokens together, plus a 49-token system prompt and about 30 tokens for the customer's question. The answer is capped at 150 words, about 200 tokens. The point of this shape is that 4,267 of its ~4,300 input tokens are the same on every call, which is what prompt caching is for.

**C. Classify short texts.** We took the 752 one-line descriptions from our tools catalogue: median **34 tokens** each (90th percentile 39). With a 43-token instruction and a one-word answer, one classification is 77 tokens in and about 2 out. A user who classifies support tickets, leads or transactions might run thousands a month.

You can redo all of this with your own prompts in the [token counter](/tools/ai/token-counter/) and plug the counts into the [LLM cost calculator](/tools/ai/llm-cost/).

## The prices we used (per million tokens, as of October 2026)

| Model | Input | Output | Cached input | Batch |
|---|---|---|---|---|
| [Claude Sonnet 5.5](https://claude.com/pricing) | $2.00 | $10.00 | $0.10 | 50% off |
| [Claude Haiku 5.5](https://claude.com/pricing) (prompts ≤100k) | $0.10 | $0.50 | $0.01 | 50% off |
| [GPT-6.1 Sol](https://developers.openai.com/api/docs/pricing) | $2.00 | $10.00 | $0.10 | $1.00 / $5.00 |
| [GPT-6 Luna](https://developers.openai.com/api/docs/pricing) | $0.10 | $0.50 | $0.01 | $0.05 / $0.25 |
| [Gemini 4 Argon](https://ai.google.dev/gemini-api/docs/pricing) until 30 Nov | $2.00 | $10.00 | $0.10 | $1.00 / $5.00 |
| Gemini 4 Argon from 1 Dec 2026 | $4.00 | $20.00 | $0.20 | $2.00 / $10.00 |
| [Gemini 3.5 Flash-Lite](https://ai.google.dev/gemini-api/docs/pricing) | $0.30 | $2.50 | $0.03 | $0.15 / $1.25 |

*Read on each provider's own page on 29 October 2026. Batch prices are input / output.*

Two things in this table matter more than the headline prices. First, the mid-tier models from all three providers now list the same $2 / $10, so switching providers to save money on a mid-tier model buys you nothing; the savings come from a smaller model, caching and batching. Second, Google's page already shows Gemini 4 Argon **doubling** on 1 December 2026, and Gemini 3.8 Flash doubling on 1 January 2027. A cost model built in October on Argon is wrong a month later.

## Cost per call

| Model | A: summary | B: support, no cache | B: support, cached | C: 1,000 labels |
|---|---|---|---|---|
| Claude Sonnet 5.5 | $0.013 | $0.011 | $0.0025 | $0.17 |
| Claude Haiku 5.5 | $0.0006 | $0.0005 | $0.0001 | $0.009 |
| GPT-6.1 Sol | $0.013 | $0.011 | $0.0025 | $0.17 |
| GPT-6 Luna | $0.0006 | $0.0005 | $0.0001 | $0.009 |
| Gemini 4 Argon (Oct–Nov) | $0.013 | $0.011 | $0.0025* | $0.17 |
| Gemini 4 Argon (from Dec) | $0.026 | $0.021 | $0.0050* | $0.35 |
| Gemini 3.5 Flash-Lite | $0.0022 | $0.0018 | not assumed** | $0.03 |

*Our math: (input tokens × input price + output tokens × output price) ÷ 1,000,000. "Cached" prices the 4,267-token shared prefix at the cache-read rate. \*Only just: see below. \*\*Google's caching page lists no minimum for Flash-Lite, so we didn't assume a discount. All cached figures assume the cache is already warm; the call that writes it costs 1.25× the input price on Claude and OpenAI's newer models.*

The single asterisk is the finding we didn't expect. **Caching on Gemini depends on how long your prompt is.** Google's implicit caching only applies above a minimum prompt length, and its caching page lists 4,096 tokens for Gemini 4 Argon, Gemini 3.8 Flash and Gemini 3.6 Flash ([Gemini caching docs](https://ai.google.dev/gemini-api/docs/caching)). Our five-article prompt is 4,297 tokens, so it just clears that line. With four articles it would be about 3,340 tokens, below the minimum, and every call would pay the full $0.0087 instead of about $0.0024. Anthropic's minimum for Sonnet 5.5 and Haiku 5.5 is 512 tokens ([Claude prompt caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)), and OpenAI's is 1,024 for GPT-5.6 and later ([OpenAI prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching)). So a 3,340-token prompt is 3.6 times cheaper per call on Claude and GPT and full price on Gemini 4 Argon, purely because of a threshold most cost calculators ignore. If you build on Gemini, check your shared prefix against it.

## Cost per user per month against a $19 plan

Now the part that matters for pricing. We picked three usage levels. These are assumptions, not measurements, so change them to match your product:

- **Light:** 5 summaries, 20 support answers and 1,000 classifications a month.
- **Median:** 20 summaries, 100 answers, 10,000 classifications.
- **Heavy:** 100 summaries, 500 answers, 50,000 classifications.

We applied caching where the provider allows it and the 50% batch rate to the classifications, which rarely need an answer within seconds.

| Model | Light | Median | Heavy | Heavy, no caching or batch |
|---|---|---|---|---|
| Claude Sonnet 5.5, GPT-6.1 Sol or Gemini 4 Argon (Oct–Nov) | $0.20 | $1.37 | $6.87 | $15.28 |
| Claude Haiku 5.5 or GPT-6 Luna | $0.01 | $0.07 | $0.35 | $0.76 |
| Gemini 4 Argon (from Dec) | $0.40 | $2.75 | $13.75 | $30.55 |
| Gemini 3.5 Flash-Lite | $0.06 | $0.36 | $1.82 | $2.52 |

On a $19 plan, a payment provider takes a cut before any of this. With a merchant of record at 5% + 50¢ that's $1.45 a month (see [our merchant of record fee tables](/articles/merchant-of-record-fees)), leaving $17.55. Against that:

- A **median** user on a mid-tier model costs about 8% of the plan with caching. That's fine.
- A **heavy** user on a mid-tier model costs 39% of the plan with caching and batching, and 87% without. That's the user who writes the most enthusiastic review and quietly wipes out your margin.
- On Gemini 4 Argon after 1 December, the heavy user costs 78% of the plan even with caching, and **$30.55 without it, more than the plan's price**.
- The small models cost under $1 a month even for heavy users. If the task is one a small model handles well (classification and short extraction usually are), the whole cost question goes away.

Venture firm Bessemer found the fastest-growing AI startups it studied averaged only about 25% gross margin, against roughly 60% for the steadier growers, and it described the first group as "often trading distribution for profit in the short term" ([Bessemer, State of AI 2025](https://www.bvp.com/atlas/the-state-of-ai-2025)). A small SaaS can't afford to be in the first group, and it doesn't have to be. The gap between the "Heavy" and "Heavy, no caching" columns above is about engineering, not pricing.

## Why GitHub changed Copilot's billing

The heavy-user problem isn't theoretical. GitHub moved every Copilot plan to usage-based billing on 1 June 2026: credits are now spent on input, output and cached tokens at each model's API rates, and the plans include credits equal to their price, $10 for Pro and $19 per user for Business ([GitHub blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)). GitHub's reason was that "a quick chat question and a multi-hour autonomous coding session can cost the user the same amount."

That is the same flat-price trap at a much larger scale. A $19 plan with unlimited AI is a bet that your heavy users stay rare. GitHub stopped making that bet. For a small product, the safer pattern is a generous included allowance with a visible meter, and a cap or top-up beyond it.

## Five things that change the number most

In order of how much they moved our figures:

1. **Model size.** Going from a mid-tier to a small model cut cost per user by about 19 times in our table. Test whether the small model is good enough before tuning anything else. Route only the hard requests to the bigger model.
2. **Output length.** Output tokens cost five times as much as input on every model above. Our summary's 330 output tokens are 26% of its cost on Sonnet 5.5 even though they're only 7% of its tokens. A word cap in the prompt is the cheapest optimization there is.
3. **Caching.** It cut the support answer's cost by 77% (from $0.011 to $0.0025 on the mid-tier models). Put the stable part (system prompt, documents, examples) first and the user's question last, because caches match from the start of the prompt. Note the cache lifetime: 5 minutes by default on Claude, refreshed on each hit, and at least 30 minutes on OpenAI's newer models. A feature that's used once an hour keeps paying the cache-write rate (1.25× input on Claude, and on OpenAI's GPT-5.6 and later per its caching guide) and rarely gets a hit, so caching helps most when many users share the same prefix.
4. **Batching.** Anything that can wait, like nightly classification, tagging or report generation, costs half as much on all three providers' batch APIs.
5. **Reasoning tokens.** Models that "think" bill those tokens as output; Google's price table labels its output column as including thinking tokens. A thousand reasoning tokens on a mid-tier model add $0.01 per call, which nearly doubles our summary's cost. Turn reasoning down or off for tasks that don't need it.

## How to work out your own number in 15 minutes

1. Write the real prompt for your feature, with a realistic document or context, and count it in the [token counter](/tools/ai/token-counter/). Count your expected answer too.
2. If you're unsure what fits in the context window or how much of it is fixed, lay it out in the [context planner](/tools/ai/context-planner/).
3. Put the counts and the provider's current prices into the [LLM cost calculator](/tools/ai/llm-cost/), check them against the provider's own pricing page, and multiply by your light, median and heavy usage.
4. Add the result to your other per-user costs in the [unit economics calculator](/tools/business/unit-economics-calculator/) and see what's left of the plan price for a heavy user.
5. If the heavy user is above about a third of the plan price, fix it before launch: a smaller model, a shorter answer, caching, or an allowance with a meter.

We wrote earlier about [how AI is changing SaaS products](/articles/how-ai-and-machine-learning-is-changing-the-saas-space). The cost side is less exciting, but it's the side that decides whether an AI feature can live on a $19 plan.

## Sources

- Anthropic, [Claude pricing](https://claude.com/pricing) and [prompt caching documentation](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), read 29 October 2026.
- OpenAI, [API pricing](https://developers.openai.com/api/docs/pricing) and [prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching), read 29 October 2026.
- Google, [Gemini Developer API pricing](https://ai.google.dev/gemini-api/docs/pricing) and [context caching](https://ai.google.dev/gemini-api/docs/caching), read 29 October 2026.
- GitHub, [GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/), 2026.
- Bessemer Venture Partners, [The State of AI 2025](https://www.bvp.com/atlas/the-state-of-ai-2025).
- Token counts: our own, with the o200k tokenizer (gpt-tokenizer 2.9.0) on a 10-page report from our PDF benchmark set, the IRS Form W-9 (Rev. March 2024), five of our tool help pages (compress PDF, merge PDF, image compressor, background remover, token counter) and the 752 descriptions in our tools catalogue, 29 October 2026.
