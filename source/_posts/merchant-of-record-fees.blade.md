---
title: "Merchant of record fees at $9, $29 and $99, worked out"
seo_description: "What Paddle, Lemon Squeezy, Polar, Dodo, Creem and Stripe keep from a $9, $29 or $99 sale, from their own pricing pages as of October 2026."
keyword: merchant of record
featured_image: assets/img/uploads/merchant-of-record-fees-cover.jpeg
featured_thumbnail: assets/img/uploads/merchant-of-record-fees-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-29
extends: _layouts.post
---

Search "Paddle vs Stripe" or "best merchant of record" and most of the comparisons you'll read are published by one of the payment companies being compared. That doesn't make them wrong, but each picks the example that flatters its own price. So we went to each provider's own pricing page on 29 October 2026 and worked out what each one keeps from the same sale, at the three prices small SaaS products actually charge.

We don't take a cut from any of these companies, and we've linked every number to its source.

## First: what a merchant of record does for the fee

A **merchant of record** (MoR) is the legal seller of your product. Your customer buys from the MoR, and the MoR pays you. In exchange for a higher fee, it takes on the sales tax and VAT work: it charges the right rate in each country, files the returns and pays the tax. It also handles fraud, chargebacks and buyer support. Paddle's pricing page lists exactly that bundle: payments, global tax compliance including filing and paying sales tax, fraud protection, chargebacks and buyer support ([Paddle pricing](https://www.paddle.com/pricing)).

**Stripe** on its own is a payment processor, not a merchant of record. You are the seller. Stripe Tax can calculate and collect tax, but on its basic plan you register and file yourself. Its "Tax Complete" plan adds threshold monitoring, registrations and filings, starting at $90 a month on a one-year contract ([Stripe US pricing](https://stripe.com/us/pricing)).

So the honest comparison is MoR fee against Stripe fees plus the cost of doing tax compliance yourself.

## The list prices, as of October 2026

| Provider | Base fee per sale | Extra for cards from outside the US | Extra for subscriptions | Notes |
|---|---|---|---|---|
| [Paddle](https://www.paddle.com/pricing) | 5% + 50¢ | none listed | none listed | Products under $10: "contact us for bespoke pricing" |
| [Lemon Squeezy](https://docs.lemonsqueezy.com/help/getting-started/fees) | 5% + 50¢ | +1.5% | +0.5% | +1.5% for PayPal; payouts to a non-US bank cost 1% |
| [Polar](https://polar.sh/docs/merchant-of-record/fees), Starter (free) | 5% + 50¢ | +1.5% | none | Pro plan: $20 a month for 3.8% + 40¢ |
| [Dodo Payments](https://dodopayments.com/pricing) | 4% + 40¢ (US cards) | +1.5% | +0.5% | $30 per chargeback; $25 per USD SWIFT payout for non-US businesses |
| [Creem](https://www.creem.io/pricing) | 3.9% + 40¢ | "no international card fees" | none listed | Payouts on the 1st and 15th |
| [Stripe](https://stripe.com/us/pricing) + Billing + Tax Basic (not an MoR) | 2.9% + 30¢, +0.7% Billing, +0.5% Tax | +1.5% (+1% if currency is converted) | the 0.7% Billing fee | You register for and file tax yourself |

*Read on each provider's own page on 29 October 2026. Prices change. Check before you sign up.*

Two things stand out before any maths. The fixed fee (30–50¢) is the same whether you charge $9 or $99, so it hurts small prices most. And the "extra" columns are where comparisons get selective: a provider that looks cheapest on a US card can be mid-table once most of your buyers are abroad, which is normal for a small SaaS selling online.

## Fee per sale at $9, $29 and $99

We applied each price list to one monthly subscription payment. Percentages are of the sale price, before tax.

**A customer with a US card:**

| Provider | $9 sale | $29 sale | $99 sale |
|---|---|---|---|
| Paddle | $0.95 (10.6%) | $1.95 (6.7%) | $5.45 (5.5%) |
| Lemon Squeezy | $0.99 (11.1%) | $2.09 (7.2%) | $5.95 (6.0%) |
| Polar Starter | $0.95 (10.6%) | $1.95 (6.7%) | $5.45 (5.5%) |
| Polar Pro (+$20/month) | $0.74 (8.2%) | $1.50 (5.2%) | $4.16 (4.2%) |
| Dodo Payments | $0.81 (8.9%) | $1.71 (5.9%) | $4.86 (4.9%) |
| Creem | $0.75 (8.3%) | $1.53 (5.3%) | $4.26 (4.3%) |
| Stripe + Billing + Tax Basic | $0.67 (7.4%) | $1.49 (5.1%) | $4.36 (4.4%) |

**A customer with a card issued outside the US** (charged in US dollars):

| Provider | $9 sale | $29 sale | $99 sale |
|---|---|---|---|
| Paddle | $0.95 (10.6%) | $1.95 (6.7%) | $5.45 (5.5%) |
| Lemon Squeezy | $1.13 (12.6%) | $2.53 (8.7%) | $7.43 (7.5%) |
| Polar Starter | $1.08 (12.1%) | $2.38 (8.2%) | $6.93 (7.0%) |
| Polar Pro (+$20/month) | $0.88 (9.7%) | $1.94 (6.7%) | $5.65 (5.7%) |
| Dodo Payments | $0.94 (10.4%) | $2.14 (7.4%) | $6.34 (6.4%) |
| Creem | $0.75 (8.3%) | $1.53 (5.3%) | $4.26 (4.3%) |
| Stripe + Billing + Tax Basic | $0.80 (8.9%) | $1.92 (6.6%) | $5.84 (5.9%) |

What the tables say:

- **At $9, every option takes 7–13%.** The fixed fee is most of it: 50¢ alone is 5.6% of $9. Paddle's 10.6% at $9 is why it asks under-$10 sellers to talk to them. If you can, price at $12 or more, or sell yearly plans: a $90 yearly plan pays the fixed fee once instead of twelve times.
- **At $29, the spread is 5.1% to 8.7%.** On 100 customers that's the difference between about $150 and $250 a month.
- **At $99, the percentage dominates,** and the cheapest MoR on these lists (Creem at 4.3%) costs about the same as Stripe with only tax calculation.

## A worked example: $2,900 a month

Take a SaaS at $29 a month with 100 paying customers ($2,900 MRR), 60% of them with non-US cards. That's typical for a product sold worldwide from a website. Monthly fees:

| Provider | Fees per month | Share of revenue | Per year |
|---|---|---|---|
| Creem | $153 | 5.3% | $1,837 |
| Stripe + Billing + Tax Basic (you file tax yourself) | $175 | 6.0% | $2,100 |
| Paddle | $195 | 6.7% | $2,340 |
| Polar Pro (including $20 plan fee) | $196 | 6.8% | $2,356 |
| Dodo Payments | $197 | 6.8% | $2,359 |
| Polar Starter | $221 | 7.6% | $2,653 |
| Lemon Squeezy | $236 | 8.1% | $2,827 |
| Stripe + Billing + Tax Complete ($90/month, filings included) | $265 | 9.1% | $3,180 |

The last row is the one most comparisons leave out. Once you pay Stripe to handle registrations and filings, plain Stripe costs more than every MoR here at this size. Stripe with Tax Basic is cheaper, but only because the filing work is yours: quarterly EU VAT returns, UK VAT if you register, and US states once you pass their thresholds. If that work takes you even two or three hours a quarter, the MoR fee is the better deal.

Two break-even points from the same numbers:

- **Polar Pro vs Polar Starter:** the $20 plan saves 1.2% + 10¢ per sale. On $29 sales that's about 45¢ a sale, so Pro pays off from about **45 sales a month**.
- **Stripe with Tax Complete vs Paddle,** on this 60/40 customer mix at $29: Stripe saves about 20¢ per sale, so it takes about **446 sales a month (roughly $13,000 MRR)** to cover the $90 plan. Below that, the MoR is cheaper even before you count your own time.

## The costs that aren't in the headline rate

- **Payouts outside the US.** Lemon Squeezy charges 1% per payout to a non-US bank through Stripe, and 3% (capped at $30) to a non-US PayPal account ([Lemon Squeezy fees](https://docs.lemonsqueezy.com/help/getting-started/fees)). Polar passes on Stripe's payout fees, $2 per month with payouts plus 0.25% + 25¢ per payout, with currency conversion from 0.25% in the EU to 1% elsewhere ([Polar fees](https://polar.sh/docs/merchant-of-record/fees)). Dodo lists $25 per USD SWIFT payout for non-US businesses, and its page is inconsistent about a $5 fee on payouts under $1,000 ([Dodo pricing](https://dodopayments.com/pricing)). Paddle's and Creem's pricing pages don't list payout fees, so ask before you sign up. For a founder in India or Latin America, this line can add another 1–2% to the table above.
- **Chargebacks and refunds.** Dodo lists $30 per dispute and $1 per refund. Polar charges $15 per dispute whatever the outcome, and doesn't return the original fee on refunds. Stripe charges $15 per dispute received ([Stripe US pricing](https://stripe.com/us/pricing)). At $9 a month, one $15–30 chargeback costs as much as the fees on 20–40 sales.
- **Marketing add-ons.** Lemon Squeezy adds 5% for sales recovered by abandoned-cart emails and 3% on affiliate referrals ([Lemon Squeezy fees](https://docs.lemonsqueezy.com/help/getting-started/fees)).
- **What the percentage applies to.** Check whether a provider takes its percentage on your price or on the total including VAT. With 20–25% VAT in much of Europe, that changes the real rate.

## How we'd choose

1. **Below roughly $13,000 MRR, or if you don't want to think about tax:** use an MoR. In our $2,900 example the cheapest and the dearest MoR are about $85 a month apart, and every one of them is cheaper than Stripe with paid tax filing.
2. **Look at your own customer mix,** not a US-card example. If most buyers are outside the US, a flat-rate provider (Paddle, or Creem's "no international card fees") beats one with a 1.5% surcharge.
3. **Raise prices that sit under $10, or offer yearly billing.** Fixed fees make small prices expensive everywhere.
4. **Revisit at about $10,000–15,000 MRR.** That's where Stripe plus paid tax filing starts to cost less than an MoR, if you're ready to be the seller of record.

To run these numbers on your own prices, our [profit margin calculator](/tools/business/profit-margin-calculator/) shows what's left of each sale, and the [MRR calculator](/tools/business/mrr-calculator/) works out monthly recurring revenue from your plans. If you sell in the EU and want to check a VAT-inclusive price, use the [VAT calculator](/tools/business/vat-calculator/). The [pricing tier calculator](/tools/business/pricing-tier-calculator/) helps when you're deciding between a $9 and a $12 entry plan.

## Sources

- Paddle: [Pricing](https://www.paddle.com/pricing) (read 29 October 2026).
- Lemon Squeezy: [Pricing](https://www.lemonsqueezy.com/pricing) and [Fees documentation](https://docs.lemonsqueezy.com/help/getting-started/fees) (read 29 October 2026).
- Polar: [Merchant of record fees](https://polar.sh/docs/merchant-of-record/fees) (read 29 October 2026).
- Dodo Payments: [Pricing](https://dodopayments.com/pricing) (read 29 October 2026).
- Creem: [Pricing](https://www.creem.io/pricing) (read 29 October 2026).
- Stripe: [US pricing](https://stripe.com/us/pricing), including Billing, Tax Basic, Tax Complete and dispute fees (read 29 October 2026).
- Our calculations: each provider's list price applied to one subscription payment at $9, $29 and $99, and to 100 customers at $29 with 60% non-US cards.
