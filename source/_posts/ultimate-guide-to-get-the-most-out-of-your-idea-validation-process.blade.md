---
excerpt: ""
featured_image: assets/img/uploads/image1.jpeg
featured_thumbnail: assets/img/uploads/image2.jpg
featured: true
title: "Idea validation: what desk research can't prove, and what can"
seo_description: "What free search signals, interviews, landing pages and pre-sales each prove about a startup idea, with our own measurements and the maths of small samples."
keyword: idea validation
author: Rishabh Pandey
category: idea_validation
show_meta: true
date: 2021-08-11
updated: 2026-10-29
extends: _layouts.post
section: postContent
---
Our 2021 version of this guide listed eleven tips, such as "keep an open mind" and "don't give up". None of them told you what to do on Monday, or how to tell a validated idea from a hopeful one. This rewrite is built around one question: **what does each kind of evidence actually prove?** Desk research, interviews, landing pages and pre-sales each answer a different question, and most failed validation comes from using one to answer another's question.

## The ladder of evidence

From weakest to strongest, for a software product:

| Evidence | What it proves | What it can't prove | Cost |
|---|---|---|---|
| Search and forum signals | People talk about the topic | That they'd pay, or how many | Hours, free |
| Interviews about past behaviour | The problem exists and how people handle it today | That they'd switch to you | Days |
| Survey | How common an answer is in a group | Anything about people outside the group | Days |
| Landing page sign-ups | Your message makes strangers act | That they'd pay | A week, small ad budget |
| Pricing-page clicks | Interest at a stated price | That they'd complete payment | A week |
| Pre-sale or paid pilot | People pay | That they'll keep paying | Weeks |

The rule: **move up the ladder as fast as you can,** and don't treat a lower rung as proof of a higher one.

## Rung 1: desk research, and what we found it can't tell you

Desk research is where everyone starts, because it's free. It's useful for one thing: checking that the problem has a vocabulary, meaning people describe it in words you can find. It can't tell you whether they'd pay.

We ran a small version of this ourselves on 29 October 2026, for the topics of our own posts, using only free sources:

- **Search autosuggest** on Google, Bing and YouTube: does the engine complete the phrase after a few letters? We scored each phrase from 1 (no trace) to 5 (suggested after its first word on every engine).
- **Hacker News mentions** over 24 months, from the public search API that Algolia runs for Hacker News ([HN Search API](https://hn.algolia.com/api)).
- **Wikipedia page views** for a matching article, from the Wikimedia pageviews API ([Wikimedia](https://wikimedia.org/api/rest_v1/)).

Two results show the limits. "Product market fit" was suggested on all three engines before we had typed the whole phrase and appeared 999 times on Hacker News. "Idea validation" was never suggested from a shorter prefix and appeared 68 times. Both are real topics with real readers. Neither number says how many people search each month, and neither says anything about willingness to pay. Autosuggest proves people type a phrase, not how many do.

Paid tools give search volumes, but those are estimates too. Google's own help page for Keyword Planner calls its numbers estimates of monthly searches, and says keywords with very low search volumes can't be discovered at all ([Google Ads Help](https://support.google.com/google-ads/answer/7337243)). For a niche B2B idea, "very low volume" is often exactly where your customers are.

**Use desk research to:** find the words customers use, find where they gather, and rule out ideas nobody discusses anywhere. **Don't use it to:** decide that people will pay.

## Rung 2: interviews about the past, not the future

The best-known guide to customer interviews is Rob Fitzpatrick's book *The Mom Test*, written on the premise that people will lie to you about your idea, usually to be kind ([The Mom Test](https://www.momtestbook.com/)). Its practical advice, in our words:

- **Talk about their life, not your idea.** Once you pitch, people protect your feelings.
- **Ask about specific past events.** "Tell me about the last time you did your quarterly VAT return" gets facts. "Would you use an app for VAT?" gets politeness.
- **Ask what they've already tried and what they paid.** Money and time already spent are the strongest signals an interview can give.

Ten interviews where people describe a painful process they've paid to fix is good evidence the problem exists. It's not evidence that your solution is the one they'll switch to. That needs the next rungs.

## Rung 3: surveys, and the maths of small numbers

Surveys are cheap and feel scientific. They're also where small samples mislead most. If 40% of 40 people answer "very disappointed" to the product-market fit question, the true share in that group could be anywhere from about 25% to 55% (our calculation at 95% confidence; details in our [product-market fit post](/articles/how-to-achieve-a-product-market-fit-with-your-product)).

Superhuman's founder told First Round Review that results start to be "directionally correct" at around 40 respondents ([First Round Review](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/)). Directional is the right word: use small surveys to choose what to ask next, not to decide. Our [sample size calculator](/tools/business/sample-size-calculator/) shows how many answers you need for the precision you want.

## Rung 4: a landing page that strangers act on

A landing page tests your message on people who don't know you. The classic small-SaaS example is Buffer. Founder Joel Gascoigne built a two-page site: a page explaining the product, then a page asking for an email address. He shared it on Twitter and asked for feedback. Then he added a pricing page between the two, showing plans, and found that people still clicked through and gave their email, and a small number clicked on paid plans ([Buffer](https://buffer.com/resources/idea-to-paying-customers-in-7-weeks-how-we-did-it/)). The extra step, in his words, "tests the pricing". Buffer got its first paying customer within four days of launching the real product.

Two warnings for running your own:

- **Count the right visitors.** Friends and followers aren't strangers. Use a small, targeted ad budget or a community post to people who match your customer.
- **Small numbers again.** We worked out the range for a typical result: if 15 of 500 visitors (3%) sign up, the true rate is somewhere between about 1.5% and 4.5% at 95% confidence. That's enough to tell "nobody cares" from "some people care", not enough to compare two headlines. The [A/B test calculator](/tools/business/ab-test-calculator/) shows how many visitors a real comparison needs, which is usually more than a new idea has.

## Rung 5: asking for money

Every rung above measures interest. Payment measures commitment. Ways to ask before the product exists, in order of strength:

1. **A pricing-page click** (Buffer's second step): proves interest at a price, not payment.
2. **A refundable pre-order or deposit:** proves people will hand over a card.
3. **A paid pilot** for a business customer: a small fee to set up the first version for them. In B2B this is often the most honest test, because a business that won't pay a small pilot fee won't pay a subscription.
4. **An annual pre-sale at a discount:** the strongest, and the riskiest for you, because you owe the product.

Be clear about delivery dates and refunds. A pre-sale is a promise, and breaking it costs more than the evidence was worth.

## Why "validated" ideas still fail

CB Insights' March 2026 study of 431 venture-backed startups that shut down found poor product-market fit in 43% of the cases with an identifiable reason ([CB Insights](https://www.cbinsights.com/research/report/startup-failure-reasons-top/)). Many of those companies would have said they validated their idea. The usual gap is that they validated the problem (rungs 1–3) and then built the product, skipping the rungs that test whether people will act and pay for this particular solution.

## A two-week plan

- **Days 1–2:** desk research. Collect the words people use and the places they gather. Drop the idea if nobody discusses the problem anywhere.
- **Days 3–7:** ten interviews about the last time they faced the problem. Note what they tried and what they paid.
- **Days 8–10:** a two-page landing page with a pricing step, in their words. Send 300–500 matching visitors to it.
- **Days 11–14:** contact everyone who clicked a paid plan and offer a pilot or a pre-order.

If you end with a few people who paid or committed to pay, build the smallest version that serves them; our post on [when to launch an MVP](/articles/when-is-the-right-time-to-launch-an-mvp) covers how small. If you end with only kind words, change the customer or the problem, not just the headline. For examples of how well-known startups tested demand (checked against first-hand sources), see [six startup validation stories, fact-checked](/articles/6-amazing-startup-stories-of-successful-idea-validation).

## Sources

- Joel Gascoigne, Buffer: [Idea to paying customers in 7 weeks: how we did it](https://buffer.com/resources/idea-to-paying-customers-in-7-weeks-how-we-did-it/) (16 February 2011).
- Rob Fitzpatrick: [The Mom Test](https://www.momtestbook.com/) (read 29 October 2026).
- Google Ads Help: [About Keyword Planner](https://support.google.com/google-ads/answer/7337243) (read 29 October 2026).
- First Round Review: [How Superhuman built an engine to find product/market fit](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/) (read 29 October 2026).
- CB Insights: [Top reasons startups fail](https://www.cbinsights.com/research/report/startup-failure-reasons-top/) (5 March 2026).
- [Hacker News Search API](https://hn.algolia.com/api) (Algolia) and the [Wikimedia REST API](https://wikimedia.org/api/rest_v1/), used for our 29 October 2026 measurements.
- Our measurements and calculations: autosuggest levels and Hacker News counts for "product market fit" and "idea validation" (29 October 2026); 95% intervals for a 40% survey score from 40 answers and a 3% sign-up rate from 500 visitors.
