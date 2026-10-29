---
title: "Does the European Accessibility Act apply to your small SaaS?"
seo_description: "A decision tree for small SaaS from the EAA's own text: who is exempt, what counts as e-commerce, and what fixing 76 accessibility issues took us."
keyword: european accessibility act
featured_image: assets/img/uploads/european-accessibility-act-cover.jpeg
featured_thumbnail: assets/img/uploads/european-accessibility-act-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-29
extends: _layouts.post
---

The European Accessibility Act (EAA) has applied since 28 June 2025, and the guides about it disagree on the two questions a small SaaS founder asks first. Am I exempt as a small company? And is my product even covered? We went back to the directive's own text for both. Then, because the practical question is "how much work is this?", we added what it took to fix 76 automated accessibility violations on our own site.

This is a reading of the law to help you decide what to do, not legal advice. Each member state wrote the directive into its own law, and the national version is the one that binds you.

## What the guides disagree on

Search for "EAA microenterprise exemption" and you'll find:

- different article numbers for the exemption (some guides cite a paragraph of Article 4 other than the one that holds it, others the definitions article);
- "fewer than 10 employees **or** under €2 million" in some places and "**and**" in others;
- claims that the exemption covers products too.

The text settles all three. A **microenterprise** is an enterprise that employs fewer than 10 persons **and** has an annual turnover, or an annual balance sheet total, of no more than €2 million (Directive (EU) 2019/882, [Article 3(23)](https://www.legislation.gov.uk/eudr/2019/882/article/3)). Microenterprises that **provide services** are exempt from the service accessibility requirements and the duties tied to them ([Article 4(5)](https://www.legislation.gov.uk/eudr/2019/882/article/4)). Ireland's regulator says the same in its guidance: both the staff test and the money test must be met, and the exemption is for services, while a microenterprise that makes or sells covered **products** still has duties ([CCPC guidelines for microenterprises](https://www.ccpc.ie/business/enforcement/accessibility/european-accessibility-act-guidelines-for-microenterprises/)). The Dutch regulator words it the same way ([ACM](https://www.acm.nl/en/accessibility/accessibility-e-commerce-services-and-electronic-communications-services)).

So the "or" versions are wrong. A 4-person company with €3 million in turnover and a €3 million balance sheet isn't a microenterprise. Neither is a 12-person company with €400,000 in revenue.

## Is a SaaS covered at all?

The EAA doesn't cover "software" or "websites" in general. It covers a list of products and a list of services provided to consumers after 28 June 2025 ([Article 2](https://www.legislation.gov.uk/eudr/2019/882/article/2)). The services are electronic communications, access to audiovisual media, passenger transport, consumer banking, e-books, and **e-commerce services**.

E-commerce services are defined as services provided at a distance, through websites and mobile apps, by electronic means, at the individual request of a consumer, with a view to concluding a consumer contract ([Article 3(30)](https://www.legislation.gov.uk/eudr/2019/882/article/3)). A **consumer** is a person buying for purposes outside their trade, business or profession (Article 3(22)).

Read together, that gives a SaaS three cases:

1. **You sell only to businesses** (contracts with companies, invoices with VAT numbers). Your customers aren't consumers, so the EAA's service rules don't reach you through e-commerce. Other accessibility duties can still apply, for example if you sell to public bodies.
2. **Consumers can buy from you on your website or app.** The selling of your service online is an e-commerce service. At the very least, that covers the pages and flows a consumer uses to choose, sign up, pay, and manage or cancel the contract.
3. **Your product itself is one of the listed services** (a consumer banking app, an e-book reader, a messaging service). Then the product is covered in its own right, not just the checkout.

Case 2 is where the guides split. Some treat only the purchase flow as in scope. Regulators speak more broadly: the Dutch ACM tells companies that their website and app must meet WCAG level AA ([ACM](https://www.acm.nl/en/accessibility/accessibility-e-commerce-services-and-electronic-communications-services)). Our reading is that a consumer SaaS should treat everything up to and including the account area as in scope. The main product screens deserve the same work, because the customers who need a screen reader for checkout will need it inside the product too.

## The decision tree

Answer in order:

1. **Do consumers (not businesses) buy from you online?** No: the EAA's e-commerce rules don't apply to you. Stop here, unless your product is itself a listed service.
2. **Are you a microenterprise?** Under 10 people **and** turnover or balance sheet of €2 million or less. Yes: you're exempt as a service provider. Write the numbers down with a date, because you'll need to recheck when you grow.
3. **Did your consumer contracts start before 28 June 2025?** Contracts concluded before then can continue unchanged until they expire, but no later than 28 June 2030 ([Article 32](https://www.legislation.gov.uk/eudr/2019/882/article/32)). New sign-ups since then are covered now.
4. **Would full compliance be a disproportionate burden?** You can rely on that only after a written assessment against the directive's criteria. You keep it for five years, renew it at least every five years and whenever the service changes, and notify the authority. Microenterprises are spared the notification. You lose this route if someone else (public or private) funded your accessibility work ([Article 14](https://www.legislation.gov.uk/eudr/2019/882/article/14)).
5. **Otherwise: comply.** In practice that means WCAG 2.1 level AA for your website and app, and publishing a statement on how your service meets the rules, including how it works with assistive technology. The ACM says it expects WCAG 2.2 AA to become the standard during 2026 and recommends starting now ([ACM](https://www.acm.nl/en/accessibility/accessibility-e-commerce-services-and-electronic-communications-services)). The harmonised European standard, EN 301 549, includes WCAG 2.1 AA unchanged for web content ([W3C WAI, EU policies](https://www.w3.org/WAI/policies/european-union/)).

One trap in step 2: growing past the thresholds ends the exemption, and the articles of the directive say nothing about when or how to count. Its recital 53 ties microenterprises to the EU's general SME definition, [Commission Recommendation 2003/361/EC](https://eur-lex.europa.eu/eli/reco/2003/361/oj). That definition counts staff in annual work units (a part-timer counts as a fraction), and a company only loses its status once it has exceeded the thresholds in two consecutive financial years (Annex, Articles 4 and 5). How each member state applies that in its own EAA law can differ, so if you're near 10 people or €2 million, write down your count and ask your national authority.

## Is anyone enforcing it?

Yes, starting with the big shops. In March 2026 the Dutch ACM tested about 100 of the largest Dutch online stores, plus the sites of the largest telecom and energy providers. It found that on **61%** of them a customer using assistive technology couldn't place an order, and another **33%** had serious problems that made ordering much harder. Its examples were an order button that couldn't be reached with a keyboard and a CAPTCHA that blocked access. The ACM said it would contact the worst offenders first and that companies that don't improve risk enforcement ([ACM, 24 March 2026](https://www.acm.nl/en/publications/acm-majority-large-online-stores-are-not-accessible-customers-disabilities)).

We found no confirmed EAA fine on a small company as of October 2026. Fine levels vary by country, and many figures quoted online come from vendor blogs we couldn't trace to a law, so we've left them out. The pattern so far is "fix it first, sanctions later". That favors anyone who starts now.

## What fixing it took us: 76 violations to 0

We did this on our own site, buffermint.com, in two rounds in October 2026, using axe-core 4.14 (a widely used automated accessibility checker) in both the light and dark themes.

**Round 1, 24 October, on six sample pages.** axe found the basics:

| Problem | What it means for a user | Our fix |
|---|---|---|
| Content outside any landmark; no `<main>` | Screen reader users can't jump to the main content | Wrapped page content in `<main>` |
| Linked card images with no accessible name | A screen reader announces "link" and nothing else | Gave each linked image a name |
| Images without alt text | The image is silent, or read out as a file name | Wrote alt text |
| Low-contrast caption text | Hard to read for low-vision users | Darkened the caption color |

**Round 2, 25 October, on all 29 pages.** The full run still found **76 violations**, and they came from only three problems repeated across pages:

| Problem axe reported | What it means for a user | Our fix |
|---|---|---|
| Heading levels skipping (h1 → h3) inside posts | The outline screen reader users navigate by is broken | A build step renumbers post headings, keeping their look |
| A call-to-action `<aside>` nested inside `<main>` | A landmark announced in the wrong place | Turned it into a labeled `<section>` with its own heading |
| Links in text marked by color only | People who can't see the color difference can't find the links | Underlined links in body text |

After round 2, axe reported **0 violations** on all 29 pages in both themes. Lighthouse's accessibility score went from 98 to 100 on a post and from 94 to 100 on the About page (Lighthouse 12.2.1, mobile). Each round took one working session and about a dozen small changes to templates and styles.

Two lessons for a small SaaS:

- **Start with the templates.** All 76 came from three mistakes repeated on many pages. Fix the header, footer, card and post layout, and the count drops fast.
- **Zero automated violations isn't compliance.** Automated checkers can't tell whether your checkout works with a keyboard alone, or whether your CAPTCHA blocks a blind customer, which were exactly the ACM's examples. After the automated pass, sign up, pay and cancel using only the Tab and Enter keys, then once with a screen reader (VoiceOver on a Mac or NVDA on Windows are free).

## Where to start this week

1. **Run the decision tree** above and write the answer down with today's numbers.
2. **Check your colors.** Text needs a contrast ratio of at least 4.5:1 against its background under WCAG AA, or 3:1 for large text ([W3C, contrast minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)). Test your brand palette in our [contrast checker](/tools/design/contrast-checker/), and see how it looks to color-blind users with the [color blindness simulator](/tools/design/color-blindness/).
3. **Check your headings** on your three busiest pages with the [heading structure checker](/tools/seo/heading-checker/). One h1, and no skipped levels.
4. **Do the keyboard test** on sign-up, checkout and cancellation.
5. **Publish an accessibility statement**: what you meet, what you don't yet, and how to reach you.

If your SaaS also has an AI feature, the [EU AI Act](/articles/eu-ai-act-small-saas-llm-api) has its own dates, and some of them have already passed.

## Sources

- Directive (EU) 2019/882 (European Accessibility Act), adopted text as published on legislation.gov.uk: [Article 2, scope](https://www.legislation.gov.uk/eudr/2019/882/article/2), [Article 3, definitions](https://www.legislation.gov.uk/eudr/2019/882/article/3), [Article 4, requirements and the microenterprise exemption](https://www.legislation.gov.uk/eudr/2019/882/article/4), [Article 14, disproportionate burden](https://www.legislation.gov.uk/eudr/2019/882/article/14), [Article 32, transitional measures](https://www.legislation.gov.uk/eudr/2019/882/article/32).
- Competition and Consumer Protection Commission (Ireland): [European Accessibility Act guidelines for microenterprises](https://www.ccpc.ie/business/enforcement/accessibility/european-accessibility-act-guidelines-for-microenterprises/).
- Authority for Consumers and Markets (Netherlands): [Accessibility of e-commerce services and electronic communications services](https://www.acm.nl/en/accessibility/accessibility-e-commerce-services-and-electronic-communications-services) and [ACM: majority of large online stores are not accessible for customers with disabilities](https://www.acm.nl/en/publications/acm-majority-large-online-stores-are-not-accessible-customers-disabilities) (24 March 2026).
- European Commission: [Recommendation 2003/361/EC on the definition of micro, small and medium-sized enterprises](https://eur-lex.europa.eu/eli/reco/2003/361/oj) (staff counted in annual work units; status lost after two consecutive years over the thresholds).
- W3C Web Accessibility Initiative: [EU web accessibility laws and policies](https://www.w3.org/WAI/policies/european-union/).
- European Commission: [European Accessibility Act](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en).
- W3C: [Understanding WCAG 2.1, contrast (minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).
- Our own audit: axe-core 4.14 and Lighthouse 12.2.1 on buffermint.com, 24–25 October 2026 (the 76 → 0 count is from the 25 October full run).
