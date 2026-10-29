---
excerpt: ""
featured_image: assets/img/uploads/when-is-the-time-title-image.jpeg
featured_thumbnail: assets/img/uploads/when-is-the-time-thumbnail-.jpeg
title: "When to launch an MVP: where Ries, YC and Superhuman disagree"
seo_description: "Launch in weeks or polish for years? What Eric Ries, Y Combinator, Reid Hoffman and Superhuman actually said about MVP timing, and a test to decide yours."
keyword: mvp development
author: "Vivek Dixit "
show_meta: true
date: 2021-08-09
updated: 2026-10-29
category: idea_validation
extends: _layouts.post
section: postContent
---
Our 2021 answer to "when should I launch my MVP?" was "as soon as you can". It is still the most common answer, and it is right for most small software products. But it isn't the whole story, and the people usually quoted for it said something more careful than the slogan. We went back to the original sources, added the best-known counterexample, and turned the result into a short test you can run on your own product.

This post also replaces two shorter 2021 posts of ours, on why building an MVP is hard and why speed to market matters. Their useful parts are in the sections on cutting scope and on what slows a first launch down.

## What the sources actually say

**Eric Ries, who popularised the term,** defined the minimum viable product in 2009 as the version of a product that lets a team collect "the maximum amount of validated learning about customers with the least effort" ([Ries](http://www.startuplessonslearned.com/2009/08/minimum-viable-product-guide.html)). In the same post he warns that an MVP is not about making minimal products. The point is learning, not smallness. A product so thin that nobody can use it for its real job teaches you nothing.

**Michael Seibel of Y Combinator** gave the most practical version in YC's 2019 Startup School. YC's recap of the lecture has him telling founders to "time box your spec": ask what you could build if you had to launch in three weeks, and cut whatever doesn't fit, including important things if needed ([Y Combinator](https://ycombinator.com/blog/startup-school-week-2-recap-michael-seibel-adora-cheung-and-ilya-volodarsky)). He redefines a launch as the moment you get any customers, not a press event. And he names the exception himself: regulated and hard-tech products need heavier MVPs and take longer.

**Reid Hoffman's** line is the one everyone quotes: "If you're not embarrassed by the first version of your product, you've launched too late." His 2017 essay on it is more careful than the quote ([Hoffman](https://www.linkedin.com/pulse/arent-any-typos-essay-we-launched-too-late-reid-hoffman/)). He says the embarrassment he means is mild, a user saying "that was lame", not shame. He also says plainly that if an early launch brings lawsuits, drives users away or burns money for nothing, you did launch too soon.

**Superhuman** is the counterexample people point to. According to First Round Review's account, the email client started coding in 2015 and was still not publicly launched in summer 2017, with a team of 14 ([First Round Review](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/)). Instead of a public launch, it ran a slow, invitation-only beta and measured product-market fit with a survey, raising its score from 22% to 58% over about three quarters.

## Where they agree, and where they don't

They agree on more than the slogans suggest:

- **Real users, early.** Superhuman didn't hide its product for two years. It put it in front of real users from the start; it just didn't open it to everyone. Even the slow path is a feedback loop.
- **Learning is the goal.** Ries, Seibel and Hoffman all frame the first version as a way to learn what to build, not as the product.
- **There are limits.** Seibel exempts regulated and hard-tech products. Hoffman exempts launches that cause real harm.

They disagree on one thing: **how good the first version has to be for the people who use it.** Seibel and Hoffman say rough is fine, because customers forgive a rough product that solves a painful problem. Superhuman's bet was that in a crowded category, where every user already has a free, working tool (Gmail), a rough product teaches you nothing. People drop it because it's worse than what they have, not because the idea is wrong.

That gives a useful rule: **the more your customer already has a working alternative, the higher the bar for the first version.** A tool for a problem nobody has solved can ship rough. A replacement for something people use every day can't, but it can still ship to ten people instead of ten thousand.

## A five-question test for your launch date

Answer these about your product today. Each "yes" moves your launch later; each "no" means you are probably waiting too long.

1. **Can using it cause real harm?** Money moved wrongly, health or legal advice, data loss, a security hole. If yes, the bar is higher. For software built quickly with AI tools, our post on [the holes every security scan of vibe-coded apps keeps finding](/articles/vibe-coded-app-security-scans) lists the minimum to fix first.
2. **Is it regulated?** Payments, health, finance and children's data come with rules you must meet on day one.
3. **Does your customer already have a free tool that works?** If yes, your first version has to be better at one thing they care about, and you should launch privately to a few people until it is.
4. **Does it need many users to be useful?** Marketplaces and social products are empty without people on both sides. Launch to one small group (one city, one school, one trade) rather than waiting.
5. **Would a paying customer notice what's missing in the first week?** If the missing feature is something they'd hit on day one, it's part of the MVP. If it's something they'd hit in month three, it isn't.

If you answered "no" to the first four, launch within weeks. That describes most small B2B tools: an internal workflow, a niche calculator, a report generator, an integration between two products.

## How to cut scope to fit three weeks

Seibel's three-week timebox is the most useful tool here, because it turns "what should be in the MVP?" into a list you can cut. In practice:

- **Write down the one job.** "A landscaper sends a quote from their phone in under two minutes" is a job. "Landscaping business software" isn't.
- **List every feature, then cut everything the job doesn't need.** Sign-up with email only. No team accounts, no settings page, no dashboard. A spreadsheet or a manual step behind the scenes is fine; Seibel's examples start with a landing page and a spreadsheet.
- **Don't build for scale you don't have.** Our 2021 post on why MVPs are hard said to build for scalability from day one. We'd now say the opposite for a small product. A boring, standard stack handles the first thousand users; designing for a million costs months you need for learning.
- **Keep payment in.** Taking money is the strongest learning you can get. Even a payment link counts.

Our [Gantt chart maker](/tools/business/gantt-chart-maker/) is enough to lay the three weeks out and see what doesn't fit.

## What slows a first launch down

From the two older posts, three causes still hold, with one change:

- **No technical co-founder or partner.** In 2021 this meant hiring an agency or a freelancer. In 2026 AI app builders change the cost, but not the need for someone to check security and data handling. Our guide for [launching as a non-technical founder](/articles/launching-a-saas-product-as-a-non-technical-founder) covers both routes.
- **Picking the wrong features.** This is the cost of skipping customer conversations. Our [idea validation guide](/articles/ultimate-guide-to-get-the-most-out-of-your-idea-validation-process) covers what to ask before you build.
- **Waiting for a big launch day.** Most products don't get one, and don't need one. Seibel's definition (a launch is getting any customers) removes the pressure to "launch big".

## Why speed matters, in numbers

The argument for speed isn't about beating competitors to market. It's that time costs money and teaches you nothing until someone uses the product.

CB Insights' March 2026 study of 431 venture-backed startups that shut down since 2023 found running out of money in 70% of the cases where a reason could be found, and poor product-market fit in 43% ([CB Insights](https://www.cbinsights.com/research/report/startup-failure-reasons-top/)). The two are linked: a team that spends a year building before it learns whether people want the product spends a year of runway on a guess.

A simple calculation shows the cost. If you spend $4,000 a month (your own time at a modest rate, plus tools), a six-month build before the first user costs $24,000 of learning-free runway. A three-week build costs about $3,000 and gives you five more months to fix what users tell you. Our [startup runway calculator](/tools/business/startup-runway-calculator/) runs this for your own numbers.

## After launch: what to watch

- **Talk to every early user.** The first 10–30 users tell you more in a call than any analytics tool will. Ask what they used before, what they'd miss, and what almost made them stop.
- **Measure whether they'd be disappointed to lose it.** Superhuman's survey asks how users would feel if they could no longer use the product, and tracks the share who say "very disappointed". We cover the method in our [product-market fit guide](/articles/how-to-achieve-a-product-market-fit-with-your-product).
- **Ship small fixes weekly.** Fast updates turn an embarrassing first version into a decent one, which is the part of Hoffman's advice people forget.

## Sources

- Eric Ries: [Minimum Viable Product: a guide](http://www.startuplessonslearned.com/2009/08/minimum-viable-product-guide.html) (3 August 2009).
- Y Combinator: [Startup School Week 2 recap: Michael Seibel, Adora Cheung and Ilya Volodarsky](https://ycombinator.com/blog/startup-school-week-2-recap-michael-seibel-adora-cheung-and-ilya-volodarsky) (11 September 2019).
- Reid Hoffman: [If there aren't any typos in this essay, we launched too late!](https://www.linkedin.com/pulse/arent-any-typos-essay-we-launched-too-late-reid-hoffman/) (29 March 2017).
- First Round Review: [How Superhuman built an engine to find product/market fit](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/) (read 29 October 2026).
- CB Insights: [Top reasons startups fail](https://www.cbinsights.com/research/report/startup-failure-reasons-top/) (5 March 2026).
- Our calculation: runway spent before the first user at an assumed $4,000 a month, for a six-month and a three-week build.
