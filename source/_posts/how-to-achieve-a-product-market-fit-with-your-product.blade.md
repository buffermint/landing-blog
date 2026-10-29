---
featured_image: assets/img/uploads/product-to-market-fit-feature-image.jpeg
featured_thumbnail: assets/img/uploads/product-to-market-fit-thubnail.jpeg
title: "Product-market fit: four tests and what each one misses"
seo_description: "Andreessen, Rachleff, Sean Ellis's 40% survey and retention: four ways to tell if you have product-market fit, where they disagree, and when to pivot."
keyword: product market fit
author: "Vivek Dixit "
show_meta: true
date: 2021-08-19
updated: 2026-10-29
category: idea_validation
extends: _layouts.post
section: postContent
---
Our 2021 version of this post explained product-market fit with the iPod, the iPhone 4S and Nike. None of them helps a small software company decide anything on a Monday morning. This rewrite goes back to where the term came from, lays out the four tests people actually use, shows where they disagree, and adds a calculation most guides skip: how many survey answers you need before the famous "40% test" means anything. It also takes in our short 2021 post on pivoting, because deciding to pivot is the other side of the same question.

## Where the term comes from

Marc Andreessen popularised the phrase in a 2007 essay titled "The only thing that matters". His definition is short: product-market fit "means being in a good market with a product that can satisfy that market" ([Andreessen](https://pmarchive.com/guide_to_startups_part4.html)). Note the order. In his view the market matters most: a great team with a mediocre product can still win in a market that badly wants something, and a great product can't save a market that doesn't.

He also described what the two states feel like. Without fit, customers aren't quite getting value, word of mouth isn't spreading and "lots of deals never close". With it, customers buy "just as fast as you can make it" and money piles up in the bank account.

That's a description, not a measurement. The four tests below are attempts to turn it into one.

## Test 1: the 40% "very disappointed" survey

Sean Ellis, who led early growth at Dropbox, LogMeIn and Eventbrite, asks users one question: how would you feel if you could no longer use this product? The answers are "very disappointed", "somewhat disappointed" and "not disappointed". According to First Round Review's account, Ellis benchmarked nearly 100 startups and found that those under 40% "very disappointed" generally struggled to grow ([First Round Review](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/)).

The best-documented use is Superhuman. Its score was 22% in summer 2017. It then narrowed its focus to the kinds of users who answered "very disappointed", built for what they valued, and reached 58% within about three quarters.

**What it misses:** it measures how much current users like the product, not whether there are enough of them or whether they'll pay. A product loved by 60 people in a market of 200 passes the test and still fails as a business.

## Test 2: growth without marketing

Andy Rachleff, co-founder of Benchmark Capital, gives a harder test, quoted in Andreessen Horowitz's collection of product-market fit ideas: you have fit if your product grows exponentially with no marketing ([a16z](https://a16z.com/12-things-about-product-market-fit/)). The same piece notes that he treats a Net Promoter Score of 40 or more as a sign of likely fit, but calls it far less reliable than customers actually buying.

**What it misses:** most small B2B products never grow "exponentially with no marketing", even when customers love them, because their buyers don't talk to each other much. A tool for dental clinics can have excellent fit and still need sales calls. Use this test for consumer and team products where users invite users; don't use it to give up on a niche B2B tool.

## Test 3: retention that flattens

The test most investors look at today is a retention curve: of the customers who started in a given month, what share are still active or paying each month afterwards? Every curve falls at first. With product-market fit, it stops falling and flattens at a stable share. Without it, it keeps sliding towards zero.

**What it misses:** it needs time. You need several monthly cohorts and several months of data before a flat line means anything, so it's a confirmation test, not an early one. Our [MRR calculator](/tools/business/mrr-calculator/) helps you see what a given level of churn does to revenue over a year.

## Test 4: customers paying, at your price

The plainest version of Andreessen's description: are people paying, renewing and recommending without discounts or favours? It's the test Rachleff says beats any survey. For a small SaaS it's also the one that matters most, because a product that people say they love but won't pay for is not a business.

**What it misses:** early paying customers are often friends, former colleagues or people who like you. Count only customers you didn't know before.

## Where the tests disagree

The four tests can give different answers about the same product:

| Situation | Survey | Growth without marketing | Retention | Paying |
|---|---|---|---|---|
| Small, loved niche tool | Pass | Fail | Pass | Pass |
| Viral free app nobody pays for | Pass | Pass | Often pass | Fail |
| Sales-led B2B with long contracts | Mixed | Fail | Pass (contracts) | Pass |
| Early product, 30 users | Too few answers | Too early | Too early | Mixed |

The table shows why "do we have fit?" depends on what business you're building. For a small subscription product, we'd weight the tests in this order: paying customers you didn't know first, retention second, the survey third (as a guide for what to build), and growth without marketing last.

## Our calculation: how many survey answers make the 40% test meaningful

The 40% survey is popular because it's cheap. It's also easy to over-read, because most early products have few users. We worked out the margin of error, at 95% confidence, around a measured score of 40%:

| Answers | Range the true score is likely in |
|---|---|
| 20 | about 19% to 61% |
| 40 | about 25% to 55% |
| 100 | about 30% to 50% |
| 250 | about 34% to 46% |

(We used the standard approximation for a proportion: 1.96 × √(0.4 × 0.6 ÷ n). It's rough for small samples, which makes the point stronger, not weaker.)

With 40 answers, a "40%" result is consistent with anything from a struggling product to a strong one. Superhuman's founder told First Round that results start to be "directionally correct" at around 40 respondents, and the numbers agree with the word "directionally": 40 answers tell you which way you're heading, not where you are. Two practical rules follow:

- **Don't announce fit on fewer than about 100 answers.** Below that, treat the score as a direction and read the written answers instead.
- **Survey only real users.** Superhuman followed Ellis's advice and surveyed people who had used the core product at least twice in the last two weeks, not everyone who had ever signed up.

Our [sample size calculator](/tools/business/sample-size-calculator/) does this arithmetic for other scores and confidence levels.

## When to pivot instead

Our 2021 post on pivoting compared a fixed strategy to a rocket launch and a flexible one to a ship's voyage. The metaphor still works, but it needs a rule for when to change course. Using the tests above:

- **Pivot the customer** when a small group scores very high on the survey and everyone else doesn't. That's what Superhuman did, without changing the product's purpose.
- **Pivot the product** when customers have the problem but don't want your solution: they keep using spreadsheets after trying your tool.
- **Pivot the whole idea** when nobody in your target market says the problem is painful, after real conversations. Our [idea validation guide](/articles/ultimate-guide-to-get-the-most-out-of-your-idea-validation-process) covers how to have those conversations.

The best-known example of the last kind is Slack. Its company, Tiny Speck, released an online game called Glitch in September 2011 and announced in November 2012, about 14 months later, that it would close. The team had built an internal messaging tool to coordinate its distributed developers, and that tool launched to the public as Slack at the end of 2013 ([TechCrunch](https://techcrunch.com/2019/05/30/the-slack-origin-story)). The pivot kept the team and the technology and threw away the original market.

A pivot isn't a failure, but it shouldn't be a habit either. Change one thing at a time (the customer, the problem or the product) so you know what made the difference.

## A routine you can run each month

1. Count paying customers you didn't know before, and the share still paying from each starting month.
2. Once you have 40 or more active users, send the one-question survey to those who used the product at least twice in the last two weeks, and wait for about 100 answers before you trust the number.
3. Read every "very disappointed" answer and write down what those users have in common.
4. Spend most of the next month's work on what that group values, and say no to requests from the rest.
5. If after three or four months nothing moves, use the pivot rules above.

Before you get here, you need a product people can try. Our post on [when to launch an MVP](/articles/when-is-the-right-time-to-launch-an-mvp) covers how small that can be.

## Sources

- Marc Andreessen: [The only thing that matters](https://pmarchive.com/guide_to_startups_part4.html) (25 June 2007).
- Tren Griffin for Andreessen Horowitz: [12 things about product-market fit](https://a16z.com/12-things-about-product-market-fit/) (18 February 2017).
- First Round Review: [How Superhuman built an engine to find product/market fit](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/) (read 29 October 2026).
- TechCrunch: [The Slack origin story](https://techcrunch.com/2019/05/30/the-slack-origin-story) (30 May 2019).
- Our calculation: the 95% margin of error for a measured 40% score at 20, 40, 100 and 250 answers (normal approximation).
