---
title: "The EU AI Act for a small SaaS that calls an LLM API"
seo_description: "What the EU AI Act asks of a small SaaS with an AI feature after the 2026 Digital Omnibus: dated duties, what moved, what didn't, and the fine math."
keyword: eu ai act
featured_image: assets/img/uploads/eu-ai-act-small-saas-cover.jpeg
featured_thumbnail: assets/img/uploads/eu-ai-act-small-saas-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-29
extends: _layouts.post
---

If you run a small SaaS with an AI feature built on someone else's model (a chat assistant, a "summarize this" button, a draft generator), you've probably read three different versions of when the EU AI Act applies to you. That's because three versions existed. The Commission proposed changes in November 2025, Parliament and Council changed them again, and the final amending regulation only appeared in the Official Journal in July 2026. Articles written at each stage are still ranking in search.

We read the AI Act's text and the law-firm summaries of each stage side by side. Below is what changed between the proposal and the final law, why some sources now say the wrong thing, and a dated checklist for the case most small SaaS teams are in. This isn't legal advice. It's a map for deciding what to do and what to ask a lawyer.

## Which role are you?

The AI Act gives duties by role, so start there.

- A **provider** develops an AI system, or has one developed, and places it on the market under its own name or trademark ([AI Act, Article 3(3)](https://artificialintelligenceact.eu/article/3/)).
- A **deployer** uses an AI system under its own authority, other than for personal use (Article 3(4)).
- A **downstream provider** is a provider of an AI system that integrates an AI model, its own or one supplied by someone else (Article 3(68)).

So if your product has a chat assistant built on a model you reach through an API, and you sell it under your brand, you are the **provider of that AI system** and a downstream provider. The company behind the model is the provider of the general-purpose AI model. It carries the model duties in Chapter V of the Act (documentation, copyright policy and so on), not you. Your customers who use your feature at work are **deployers**.

Most of what follows hangs on that split.

## What the 2026 Omnibus changed, and what it didn't

The amending act is Regulation (EU) 2026/1744 of 8 July 2026. It was published in the Official Journal on 24 July 2026 and entered into force three days later ([Cuatrecasas](https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published); [DLA Piper](https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/The-Digital-AI-Omnibus-Proposed-deferral-of-high-risk-AI-obligations-under-the-AI-Act)). Parliament endorsed the deal on 16 June 2026 and the Council gave final approval on 29 June (DLA Piper).

Here is where the sources you'll find disagree, and which one the final text backs.

| Topic | What the November 2025 proposal said | What the final law says | Why older articles get it wrong |
|---|---|---|---|
| High-risk (Annex III) start | A moving date: obligations would start after the Commission confirmed standards were ready, with a cap on the delay | Fixed: **2 December 2027** for Annex III systems, **2 August 2028** for AI in regulated products (Annex I) | Articles on the proposal describe the conditional mechanism, which Parliament and Council dropped ([Cuatrecasas](https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published)) |
| Article 50(2) marking of AI output, for systems already on the market | Six months' grace, to 2 February 2027 | Four months, to **2 December 2026** | Articles on the proposal give 2 February 2027. The final four months were a compromise between Parliament (three months) and the Commission (six) (Cuatrecasas) |
| Article 50 transparency in general | Not delayed | Still **2 August 2026** | Some summaries said "the AI Act was delayed" and readers applied it to everything; the delay was for high-risk only ([Jones Walker](https://www.joneswalker.com/en/insights/blogs/ai-law-blog/yes-august-2-still-matters-the-eu-approved-a-high-risk-ai-delay-but-most-trans.html)) |
| Article 4 AI literacy | Duty on companies removed; Commission and member states would promote literacy instead | Kept, softened: providers and deployers must **support** AI literacy among their staff, not guarantee a level | Articles on the proposal say the duty is gone. Parliament restored it ([Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/); Cuatrecasas) |
| Small mid-caps (under 750 staff) | SME-style relief extended to them | Kept | Not contested ([Orrick](https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes)) |
| New bans (non-consensual sexual deepfakes, child sexual abuse material) | Not in the proposal | Prohibited from **2 December 2026** | Added by the Council in March 2026, after the proposal articles were written (Orrick; Cuatrecasas) |

The pattern is simple. Almost every wrong statement online is a correct description of the proposal, read after the proposal changed. When a source gives you a date, check whether it was written before 24 July 2026.

## The dated checklist for a small SaaS with an LLM feature

Assume: 1–10 people, an AI feature built on a third-party model, customers in the EU, and a use case that isn't on the high-risk list. Here's what applies and from when, as of October 2026.

### Already in force: AI literacy (since 2 February 2025)

Article 4 now asks you to take measures that support AI literacy among staff who operate or use AI systems for you (Gibson Dunn; Cuatrecasas). The final text doesn't set a level, and the Commission is due to publish practical examples (Cuatrecasas).

For a three-person team, a sensible version is one page: which AI systems you use, what each is for, what it gets wrong (made-up facts, outdated knowledge), and the rule for checking output before it reaches a customer. Date it and keep it with your other policies.

### Already in force: prohibited practices (since 2 February 2025)

You're very unlikely to be building any of these, but check the list once in [Article 5](https://artificialintelligenceact.eu/article/5/). From **2 December 2026** two more bans apply: systems that generate non-consensual intimate images and child sexual abuse material ([Orrick](https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes)). If your product generates images of real people, that date matters.

### In force since 2 August 2026: tell people they're talking to an AI

Under Article 50(1), a provider of a system meant to interact directly with people must make sure they're told it's an AI, unless that's obvious to a reasonably well-informed person. The information has to be clear and given at the latest at the first interaction ([AI Act, Article 50](https://artificialintelligenceact.eu/article/50/)).

In practice: a support bot on your site or in your app needs a visible line such as "You're chatting with an AI assistant" before or at the first message. "Obvious" is a judgment call. A clearly labeled "AI draft" button probably is. A chat window with a human name and photo isn't.

### 2 August 2026, or 2 December 2026 for older features: mark AI output

Article 50(2) asks providers of systems that generate synthetic audio, images, video or text to mark the output in a machine-readable way, so it can be detected as AI-generated, as far as technically feasible. Plain editing help that doesn't substantially change the input is exempt (Article 50(2)).

If your feature was on the market before 2 August 2026, you have until **2 December 2026** ([Jones Walker](https://www.joneswalker.com/en/insights/blogs/ai-law-blog/yes-august-2-still-matters-the-eu-approved-a-high-risk-ai-delay-but-most-trans.html)). The Commission published a voluntary Code of Practice on marking and labeling on 10 June 2026. It points to metadata and watermarks, and to at least two layers of marking where necessary ([Jones Day](https://www.jonesday.com/en/insights/2026/06/european-commission-publishes-final-code-of-practice-on-marking-and-labeling-aigenerated-content)).

This is the duty most small teams haven't looked at, and it's where the "downstream provider" label bites. The law names the provider of the system, and for your feature that's you. What's "technically feasible" for text from a third-party API is still unsettled. A defensible starting point:

- for images and audio, keep the provenance metadata your model provider adds, and don't strip it in your pipeline (image resizing and compression often do);
- for generated files (PDFs, documents), add a machine-readable flag in the file metadata;
- for text, record which outputs were generated, and ask your model provider in writing what marking they apply.

### Your customers' duty, which they'll ask you about

Article 50(4) puts duties on deployers. They must disclose deepfakes. They must also disclose AI-generated text published to inform the public on matters of public interest, unless a person reviewed it and someone holds editorial responsibility ([Article 50](https://artificialintelligenceact.eu/article/50/)). If your product publishes content (a newsletter tool, a blog writer), build the label option in so your customers can comply.

### Only if your use case is high-risk: 2 December 2027

[Annex III](https://artificialintelligenceact.eu/annex/3/) lists uses such as filtering job applications and evaluating candidates, evaluating learning outcomes in education, and scoring the creditworthiness of people. If your AI feature does one of those, the heavy obligations (risk management, data governance, logging, human oversight, registration) start on **2 December 2027** ([Orrick](https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes)). That's 13 months from this post. Building those controls into a product takes longer than it sounds, so a hiring or grading tool should start now.

## What a fine would look like for a small company

The numbers in headlines (€35 million, 7%) are for prohibited practices. Breaches of the Article 50 transparency duties fall under Article 99(4): up to €15 million or 3% of worldwide annual turnover. For most companies the **higher** of the two applies. For SMEs and start-ups, Article 99(6) says the **lower** applies ([AI Act, Article 99](https://artificialintelligenceact.eu/article/99/)). The Omnibus extended SME-style penalty caps to small mid-caps too (Cuatrecasas).

Worked through for three company sizes:

| Annual turnover | 3% of turnover | Maximum fine under 99(4) for an SME (lower of the two) |
|---|---|---|
| €120,000 | €3,600 | €3,600 |
| €600,000 | €18,000 | €18,000 |
| €4,000,000 | €120,000 | €120,000 |

These are ceilings, not tariffs. Authorities weigh the size of the company, the harm and the cooperation shown. But it changes the conversation. For a small SaaS, the real risk is a lost enterprise deal when a customer's procurement team asks how you meet Article 50 and you have no answer, more than the fine itself.

## A one-afternoon plan

1. **Write down your role.** Provider of which AI systems, built on which models. One paragraph.
2. **Add the AI disclosure** to every chat-style surface. Screenshot it and date it.
3. **List every feature that generates content.** For each, note which marking you keep or add, and email your model provider about theirs. Deadline: 2 December 2026 for features launched before August.
4. **Check Annex III** against your use cases. If one matches, plan for December 2027 now.
5. **Write the AI literacy page** for your team.
6. **Keep personal data out of prompts** where you don't need it. That's a GDPR point as much as an AI Act one. Our [PII redactor](/tools/ai/pii-redactor/) masks names, emails and numbers in text before you paste it anywhere, and runs in your browser.

If you're also working out whether the feature pays for itself, our [LLM cost calculator](/tools/ai/llm-cost/) compares per-request prices across providers. To see what the feature costs per user, read [what an AI feature really costs per user](/articles/ai-feature-cost-per-user). If you sell to EU consumers, the [European Accessibility Act](/articles/european-accessibility-act-small-saas) has its own deadline already in force.

## Sources

- AI Act text (Regulation (EU) 2024/1689), consolidated by the Future of Life Institute: [Article 3, definitions](https://artificialintelligenceact.eu/article/3/), [Article 50, transparency](https://artificialintelligenceact.eu/article/50/), [Article 99, penalties](https://artificialintelligenceact.eu/article/99/), [Annex III, high-risk uses](https://artificialintelligenceact.eu/annex/3/).
- Cuatrecasas, [Digital Omnibus on AI has been published](https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published) (24 July 2026): Regulation (EU) 2026/1744, final text compared with the proposal.
- DLA Piper, [The Digital AI Omnibus: deferral of high-risk AI obligations](https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/The-Digital-AI-Omnibus-Proposed-deferral-of-high-risk-AI-obligations-under-the-AI-Act) (updated through August 2026): adoption timeline.
- Jones Walker, [Yes, August 2 still matters](https://www.joneswalker.com/en/insights/blogs/ai-law-blog/yes-august-2-still-matters-the-eu-approved-a-high-risk-ai-delay-but-most-trans.html) (16 July 2026): which Article 50 duties apply from 2 August 2026.
- Gibson Dunn, [EU AI Act Omnibus agreement](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/): Article 4 AI literacy wording.
- Orrick, [Digital Omnibus finalizes 8 compliance changes](https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes) (29 July 2026): new bans, small mid-caps, high-risk dates.
- Jones Day, [Commission publishes final Code of Practice on marking and labeling AI-generated content](https://www.jonesday.com/en/insights/2026/06/european-commission-publishes-final-code-of-practice-on-marking-and-labeling-aigenerated-content) (June 2026).
