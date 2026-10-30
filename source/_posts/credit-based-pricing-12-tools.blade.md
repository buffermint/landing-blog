---
title: "Credits, seats or usage: how 12 SaaS tools define a credit"
seo_description: "We read 12 AI tools' pricing pages on one day and worked out what a credit buys. Only 6, and Clay in part, let you price a typical task up front."
keyword: credit based pricing
featured_image: assets/img/uploads/credit-based-pricing-12-tools-cover.jpeg
featured_thumbnail: assets/img/uploads/credit-based-pricing-12-tools-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-20
extends: _layouts.post
---

"Credits" are now the default way to sell AI features, and the word means something different on almost every pricing page. On one, a credit is a dollar of model usage. On another it's a character of speech, a successful automation step, or a unit the company never defines. If you're pricing an AI feature, or trying to compare two tools before you buy, that difference is the whole question.

We read the public pricing pages and billing docs of 12 tools that small SaaS founders actually use, all in October 2026, and asked the same three questions of each: what is one credit, what does it cost, and can you work out the price of a typical task from the public page alone?

## Why everyone moved to credits

AI features break seat pricing because the cost of serving one user isn't flat. We measured this in [what an AI feature really costs per user](/articles/ai-feature-cost-per-user): on a mid-tier model, a heavy user can cost about 34 times what a light user does. Growth Unhinged's 2024 benchmarks found 54% of AI products charged for something beyond seats, against 41% of regular SaaS products, with 25% usage-based and 22% hybrid ([Growth Unhinged](https://www.growthunhinged.com/p/whats-changing-with-ai-monetization)).

The clearest recent example is GitHub. On 1 June 2026, Copilot replaced "premium requests" with AI Credits spent on input, output and cached tokens at each model's API rate. GitHub said the old model was "no longer sustainable" because a quick question and a long autonomous session could cost the user the same ([GitHub blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)). Under the old scheme, an extra request cost a flat $0.04 whatever it did ([GitHub docs](https://docs.github.com/en/copilot/concepts/billing/copilot-requests)).

## What a credit means at 12 tools (as of October 2026)

| Tool | The unit | What it costs | A typical task, priced | Priceable from the public page? |
|---|---|---|---|---|
| [GitHub Copilot](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) | AI Credits = dollars of tokens at model API rates | Pro $10/mo includes $10; Business $19/user includes $19 | A question with 5,000 tokens in and 300 out on a $2/$10 model: about 1.3¢ (our calculation) | Yes, with the model's API rate |
| [v0](https://v0.app/pricing) | Dollars of tokens at listed model rates | Plus $30/user/mo includes $30, plus $2 a day on login | Same shape on "v0 Pro" ($2/$10 per million): about 1.3¢ | Yes |
| [Replit](https://replit.com/pricing) | Dollars, spent on "effort-based" Agent checkpoints | Core $20/mo includes $20 toward models | Not published; the [billing docs](https://docs.replit.com/billing/ai-billing) point to an estimator | No |
| [Lovable](https://docs.lovable.dev/introduction/subscription-plans) | Credits, with per-action examples | Pro: 100 credits for $25 ($0.25 each), plus 5 free a day | Add sign-up and login: 1.20 credits = $0.30; change a button color: 0.50 = $0.125 ([Lovable pricing](https://lovable.dev/pricing)) | Yes, for the listed examples |
| [Bolt](https://bolt.new/pricing) | Tokens | Pro $25/mo for 10M tokens ($2.50 per million) | Not published; its FAQ says most tokens go to syncing your project's files, so cost per message grows with the project | No |
| [Cursor](https://cursor.com/pricing) | A shared usage pool, as a multiple of the base plan | $8 Plus; $30 Premium = "4x Plus"; refreshes weekly | Not published; the unit isn't defined | No |
| [Notion](https://www.notion.com/pricing) | Notion credits (for Custom Agents and Workers) | $10 per 1,000 credits; core AI is in the $20 Business seat | Not published | No |
| [Zapier](https://zapier.com/pricing) | Tasks: one successful action step (an MCP tool call is 2) | Pro, 750 tasks: $19.99/mo billed yearly (2.7¢ a task) | A 3-step Zap run: 3 tasks = 8¢ | Yes |
| [Intercom Fin](https://www.intercom.com/pricing) | Outcomes: a resolved or handed-off conversation | $0.99 per outcome | One resolved ticket: $0.99 | Yes |
| [Clay](https://www.clay.com/pricing) | Two currencies: Actions (platform work) and Data Credits (bought data) | Launch: 2,500 Data Credits for $125 (5¢ each); 15,000 Actions for $60 (0.4¢) | One run with your own AI key: 1 Action, about 0.4¢; its "variable" AI models bill tokens at cost; marketplace data: priced per provider in the app | Partly |
| [ElevenLabs](https://elevenlabs.io/pricing) | Credits = characters of text (1 per character on standard models) | Creator $22/mo for 121,000 credits | Narrating a 1,000-word article (about 6,000 characters, our estimate): about $1.09 | Yes |
| [HeyGen](https://www.heygen.com/pricing) | Credits | Creator $29/mo for 600 credits | Not published; "varies by model, duration and complexity" | No |

*All read in October 2026 from each company's own pricing page or billing docs. "Our calculation" uses the plan prices in the table; check the pages before you buy, since several had promotions running.*

## What the table shows

**Only 6 of the 12 let you price a typical task before you buy, and Clay in part.** Copilot, v0, Lovable, Zapier, Intercom and ElevenLabs publish enough to do the sum. Replit, Bolt, Cursor, Notion and HeyGen don't: you learn the cost of a task by doing it. For a buyer that means the plan price is a budget, not a price.

**There are really four kinds of credit:**

1. **Dollars in disguise** (Copilot, v0, Replit, Clay's variable AI models). A credit is a dollar of model usage at the provider's API rate, sometimes with no markup. These are the easiest to reason about if you know the model's token price, and the hardest if you don't know how many tokens your request uses.
2. **Physical units** (Bolt's tokens, ElevenLabs' characters, Zapier's tasks). Predictable when the unit maps to something you control, like characters of text. Less so when it doesn't: you control the length of your Bolt prompt, but not how much of your project it syncs.
3. **Abstract credits with a price list** (Lovable, Notion, HeyGen). Lovable is the best of these because it publishes examples per action. Notion and HeyGen sell the credit but don't say what an action costs.
4. **Outcomes** (Intercom Fin). You pay only when something useful happened. It's the simplest for the buyer and pushes all the cost risk onto the seller, which is why Intercom has to define an "outcome" carefully: a confirmed resolution, a customer who doesn't ask for more help, or a completed workflow including a handoff.

Cursor fits none of the four: its pool is described only as a multiple of another plan, with no unit at all.

**The same plan can mean very different amounts of work.** A $25 Lovable Pro plan buys about 83 "add sign-up and login" changes at 1.20 credits each. A $25 Bolt Pro plan buys 10 million tokens, which could be a lot of messages on a small project and far fewer on a large one. A buyer comparing the two at "$25 a month" is comparing different things.

**Expiry rules differ as much as the units.** Lovable's monthly credits expire two months after they're issued; Replit's Pro plan ($100 a month) rolls credits over for two months; Zapier's tasks reset monthly even on yearly plans; Cursor's pool refreshes weekly; Clay's own page gives two different rollover rules. A heavy month followed by a light one costs differently on each.

## What we'd copy if we were pricing an AI feature

From the tools that do it well:

- **Name the unit in the buyer's terms.** ElevenLabs' "1 credit per character" and Zapier's "1 task per successful step" can be checked by the buyer. "4x Plus" can't.
- **Publish three worked examples.** Lovable's per-action list (0.50 for a color change, 1.20 for authentication) does more for trust than any calculator. If your cost per task varies, show a small, typical and large example.
- **Tie the credit to dollars if your cost is tokens.** GitHub and v0 make $1 of credit equal $1 of model usage at public rates. That is honest and easy to explain, and your margin then comes from the plan price, not the conversion rate.
- **Show the meter in the product.** Several of these tools only show usage after the fact. A running balance before an expensive action (Replit asks you to confirm paid work before it starts) avoids the surprise-bill support ticket.
- **Don't charge for failure.** Zapier doesn't count failed steps; Clay doesn't charge when an enrichment returns nothing. Buyers notice.

What confuses buyers, from the same pages: two currencies in one plan (Clay's Actions and Data Credits), credits whose cost per task is never stated, and allowances described only as multiples of another plan.

## Working out your own credit price

1. Measure the token cost of your feature's small, typical and large task with the [token counter](/tools/ai/token-counter/) and the [LLM cost calculator](/tools/ai/llm-cost/).
2. Decide your margin on usage. If one credit is $1 of usage and you want 70% gross margin on it, the plan needs to charge about $3.33 per $1 of credit, or include fewer credits than the plan price.
3. Lay out the tiers in the [pricing tier calculator](/tools/business/pricing-tier-calculator/), and check what moving existing customers to the new model does to revenue with the [price increase calculator](/tools/business/price-increase-calculator/) and the [MRR calculator](/tools/business/mrr-calculator/).
4. Add your payment fees: a merchant of record takes 30–50¢ plus a percentage of each charge, which hits small credit top-ups hardest (see [merchant of record fees at $9, $29 and $99](/articles/merchant-of-record-fees)).

## Sources

- The 12 pricing pages and billing docs linked in the table, all read in October 2026: GitHub, v0, Replit (pricing and [AI billing docs](https://docs.replit.com/billing/ai-billing)), Lovable ([pricing](https://lovable.dev/pricing) and [subscription plans](https://docs.lovable.dev/introduction/subscription-plans)), Bolt, Cursor, Notion, Zapier, Intercom, Clay, ElevenLabs and HeyGen.
- GitHub, [GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/), and [GitHub docs on premium requests](https://docs.github.com/en/copilot/concepts/billing/copilot-requests).
- Kyle Poyar, Growth Unhinged, [What's changing with AI monetization](https://www.growthunhinged.com/p/whats-changing-with-ai-monetization), January 2025.
- Our token cost figures: [What an AI feature really costs per user](/articles/ai-feature-cost-per-user), October 2026.
