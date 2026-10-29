---
title: "AI Overviews and zero-click search: why the studies disagree"
seo_description: "AI Overviews studies report click losses from 34% to 58% and 68% zero-click searches. We lined up their methods to see why, and what still gets clicks."
keyword: ai overviews
featured_image: assets/img/uploads/ai-overviews-zero-click-studies-cover.jpeg
featured_thumbnail: assets/img/uploads/ai-overviews-zero-click-studies-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-29
extends: _layouts.post
---

If you're deciding whether a blog is still worth writing, the numbers you'll find about Google's AI Overviews look like they contradict each other. One study says they cut clicks by about a third. Another says 58%. Another says 68% of searches end without a click. Google says total clicks are "relatively stable".

They're mostly not contradicting each other. They measure different things, on different people, over different months. Once you line them up, they agree on more than the headlines suggest, and they point to the same kinds of pages that still get visited.

## The studies side by side

| Study | Sample | Period | What it measured | Result |
|---|---|---|---|---|
| [Ahrefs](https://ahrefs.com/blog/ai-overviews-reduce-clicks/) | 300,000 keywords, Search Console data | Mar 2024 vs Mar 2025 | Position 1 CTR on AIO keywords vs a forecast from non-AIO keywords | −34.5% |
| [Ahrefs rerun](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/) | Same method | Dec 2023 vs Dec 2025 | Same | −58% |
| [Pew Research Center](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) | 900 US adults, 68,879 searches | Mar 2025 | Share of visits with a click on a normal result | 8% with a summary vs 15% without |
| [Seer Interactive](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update) | 3,119 queries, 42 client organizations | Jun 2024 – Sep 2025 | Organic CTR, queries with vs without AIO | 0.61% vs 1.62% (Sep 2025) |
| [Seer, 2026 update](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update) | 5.47M queries, 53 brands | Jan 2025 – Feb 2026 | Same | 2.36% vs 3.82% (Feb 2026) |
| [Agarwal and Sen field experiment](https://www.searchenginejournal.com/ai-overviews-cut-organic-clicks-38-field-study-finds/573145/) | 1,065 US desktop Chrome users, randomized | Jan – Feb 2026 | Outbound organic clicks per search, AIO shown vs hidden | −38% |
| [SparkToro / Similarweb](https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/) | Similarweb US clickstream panel | Jan – Apr 2026 | Share of all Google searches with no click | 68.01% zero-click |

*Each figure as its publisher reports it, read 29 October 2026.*

## Why the numbers differ

### 1. They measure different things

Four of the seven (both Ahrefs runs, Pew and the field experiment) measure roughly the same thing: how much less often people click when an AI Overview appears. Ahrefs measures click-through rate at position 1. Pew measures the share of page visits where someone clicked a result. The field experiment counts outbound clicks per search. Those are close enough to compare, and their relative drops come out as:

- Ahrefs 2025: −34.5%
- Pew: 8% vs 15%, which is **−47%** (our calculation)
- Field experiment: **−38%** (0.61 clicks per search with AI Overviews hidden, 0.38 with them shown)
- Ahrefs 2026: −58%

SparkToro's 68% is a different number altogether. It counts every Google search, with or without an AI Overview, that ended without a click. Most of those searches never showed an AI Overview at all, so the 68% includes people checking the weather, looking up a phone number or refining their query. It tells you how much of search no longer leaves Google, not what AI Overviews do. SparkToro itself says the comparison with its 2024 figure is "apples and oranges", because the 2024 data came from a different panel (Datos) with different users and devices.

### 2. Only one study can show cause

Ahrefs, Pew and Seer all compare queries with and without AI Overviews, and those aren't the same kinds of queries. Google shows AI Overviews mostly on informational, question-style searches, which had lower click-through rates before AI Overviews existed. Ahrefs tries to correct for this by forecasting what the AIO keywords would have done from the trend of similar informational keywords. Seer and Pew don't, and say their results are correlations.

The Agarwal and Sen experiment avoids the problem. A Chrome extension randomly hid AI Overviews for one group, so the queries were the same and only the AI Overview differed. That makes its 38% the cleanest estimate of the effect. It has limits the authors point out: it's desktop only, two weeks per person, recruited from the survey site Prolific, and still a working paper on [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6513059) rather than peer-reviewed. Some write-ups quote 39.8% for the same study; Search Engine Journal's report of the paper says 38%, and we couldn't open the SSRN page to check which version is current, so treat the two as the same finding. The same experiment found that people were about as satisfied with their searches whether AI Overviews were shown or hidden, which is the uncomfortable part for publishers: users don't seem to miss the clicks.

### 3. The effect changes with time

Ahrefs' drop grew from 34.5% to 58% between its two runs. Its rerun had to compare December 2023 with December 2025, a two-year gap, because December 2024 was already after the rollout, and it notes that AI Overviews spread to more countries and languages in between. Seer's 2026 update then shows something the earlier studies couldn't: a partial **rebound**. CTR on AIO queries in its data fell from 3.19% in January 2025 to 1.31% in December 2025, then rose to 2.36% by February 2026. Seer links the rebound to a change in Google's results pages early in 2026 and warns that two months isn't a trend.

Here is the detail we found most useful. In Seer's February 2026 numbers, AIO queries got 2.36% against 3.82% for non-AIO queries: a gap of **38%** (our calculation). That's the same size as the randomized experiment's effect, measured on a different sample in the same months. Two very different methods landing on the same number is the closest thing this debate has to a settled figure.

### 4. Google measures something else again

Google's head of Search wrote in August 2025 that total organic click volume to websites had been "relatively stable year-over-year", and that clicks had become higher quality, meaning people didn't quickly come back to the results ([Google blog](https://blog.google/products/search/ai-search-driving-more-queries-higher-quality-clicks/)). That can be true at the same time as everything above. If people search more often, total clicks can hold steady while the click rate per search falls. And "total clicks to websites" is spread across the whole web, so it says nothing about whether *your* informational article lost visits. Google published no figures with the claim.

## So what still gets clicks?

The studies above mostly measured informational queries, the "what is" and "how does" questions an AI summary can answer in two sentences, because that's where AI Overviews appear most. The searches that still send clicks are the ones where the answer isn't text:

- **Brand searches.** SparkToro estimates branded searches at roughly 44% of Google searches, and they still send clicks because the person wants a specific site ([SparkToro](https://sparktoro.com/blog/zero-click-search-what-still-works/)).
- **Local and transactional searches**, where the person wants to buy, book or go somewhere.
- **Pages where the reader finishes a task.** In the same SparkToro post, Cyrus Shepard's analysis of 400+ sites found about 84% of the sites that gained traffic let users complete something on the page (buy, book, calculate), against about half of the sites that lost.
- **Position 1 still matters, and lower positions lose less.** Ahrefs' rerun found the AIO effect shrinks down the page: −58% at position 1 and −19% at position 10. The pages at the top had the most to lose.

## Our own numbers point the same way

We count visits to buffermint.com with GoatCounter. In the week of 23–29 October 2026, after removing our own visits, test browsers and bots, we counted **518 page views**:

| Page type | Views | Share | Views referred by a search engine |
|---|---|---|---|
| Tool pages (/tools) | 435 | 84% | 37 |
| Articles (/articles) | 40 | 8% | 0 |
| Home and other pages | 43 | 8% | 0 |

The site is new to search and a week is a small sample, so read this as a direction, not a rate. Still, every one of the 37 visits that came from DuckDuckGo, Bing, Google or Yahoo landed on a tool page, a page where someone compresses a PDF or converts a file. None landed on an article. That's what the studies predict: a search for "compress pdf to 100kb" needs a tool, and an AI summary can't do it for you. A search for "how to get startup ideas", the subject of one of our [older posts](/articles/how-to-get-successful-startup-ideas), is exactly what an AI Overview answers.

## What we'd do with a small SaaS blog in 2026

1. **Pick topics an AI summary can't finish.** Original data, calculations and comparisons with dates. Our [merchant of record fee tables](/articles/merchant-of-record-fees) are an example: the answer is a table worked out on a specific date, and summarizing it means linking to it.
2. **Attach a task to the article.** A calculator, a checker or a template inside or next to the post turns an informational query into a task query.
3. **Write for the brand search.** If an AI answer mentions you, the reader's next step may be a search for your name. A clear title and description on every page help that second search land; preview them in our [SERP preview tool](/tools/seo/serp-preview/), keep titles under the cut-off with the [title length checker](/tools/seo/title-length-checker/), and generate the tags with the [meta tag generator](/tools/seo/meta-tag-generator/).
4. **Measure clicks per query, not total traffic.** In Search Console, compare CTR for the same queries before and after an AI Overview appears on them. Total traffic can rise while each query sends fewer clicks.
5. **Don't plan on the rebound.** Seer's early-2026 recovery is real in its data but two months old. Plan for the 38% and treat anything better as upside.

## Sources

- Ahrefs, [AI Overviews reduce clicks by 34.5%](https://ahrefs.com/blog/ai-overviews-reduce-clicks/) and the [2026 update](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/).
- Pew Research Center, [Google users are less likely to click on links when an AI summary appears in the results](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/), July 2025.
- Seer Interactive, [AIO impact on Google CTR: September 2025 update](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update) and [2026 update](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update).
- Search Engine Journal, [AI Overviews cut organic clicks 38%, field study finds](https://www.searchenginejournal.com/ai-overviews-cut-organic-clicks-38-field-study-finds/573145/), April 2026; the paper by Saharsh Agarwal and Ananya Sen on [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6513059).
- SparkToro, [In 2026, less than one third of Google searches still send a click](https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/) and [When Google stops sending clicks, what still works?](https://sparktoro.com/blog/zero-click-search-what-still-works/).
- Google, [AI in Search is driving more queries and higher quality clicks](https://blog.google/products/search/ai-search-driving-more-queries-higher-quality-clicks/), August 2025.
- Our own GoatCounter page views for buffermint.com, 23–29 October 2026, our own and automated visits removed.
