---
title: "Vibe-coded app security: the holes every scan keeps finding"
seo_description: "Four security scans of Lovable, Bolt and Supabase apps, compared by hole type, plus a 15-minute self-check and a row level security trap we reproduced."
keyword: supabase row level security
featured_image: assets/img/uploads/vibe-coded-app-security-scans-cover.jpeg
featured_thumbnail: assets/img/uploads/vibe-coded-app-security-scans-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-10
extends: _layouts.post
---

If you built your app with Lovable, Bolt, v0 or Replit on a Supabase backend, you've probably seen the headlines: "98% of vibe-coded apps have security flaws", "170 apps exposed", "18,000 users leaked". The numbers are all real, and they measure quite different things. We read each scan's method, put the results into one table by type of hole, and reproduced the most common database mistake on our own machine. At the end is a self-check you can run on your own app in about 15 minutes, without being a security engineer.

## Four scans, four different questions

| Scan | Apps | When | How the apps were found | Headline |
|---|---|---|---|---|
| [Matt Palmer, CVE-2025-48757](https://mattpalmer.io/posts/statement-on-CVE-2025-48757/) | 1,645 Lovable projects | Mar 2025 | Lovable's public "Launched" showcase | 170 apps (10.3%) with readable or writable tables, 303 endpoints |
| [Escape](https://escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding) | 5,600+ apps (Lovable, Create.xyz, Base44, Bolt and others) | published Oct 2025 | Launch directories, subdomains, Shodan, Reddit | 2,000+ vulnerabilities, 400+ exposed secrets, 175 instances of personal data |
| [The Register, one app](https://www.theregister.com/2026/02/27/lovable_app_vulnerabilities/) | 1 Lovable app on Supabase | Feb 2026 | Featured on Lovable's Discover page | 18,697 user records exposed; 16 vulnerabilities, 6 critical |
| [Symbiotic Security](https://symbioticsec.ai/blog/we-scanned-1-072-vibe-coded-apps-98-had-security-flaws) | 1,072 Supabase-backed apps (Lovable, v0, Bolt, Replit, Windsurf) | published Jun 2026 | Search dorking, Common Crawl, DNS, certificate logs | 98% with at least one finding; 16% critical |

*Figures as each publisher reports them, read in October 2026.*

Why do the headline rates range from 10% to 98%? Three reasons.

**What counts as a flaw.** Symbiotic's 98% counts every finding, down to "informational". Its most common findings are missing HTTP headers: no Content Security Policy on 96.9% of sites, no Permissions Policy on 97.6%. Those are worth fixing, but they don't leak anyone's data. Its **critical** rate, the share of apps where data could be read, changed or deleted without logging in, is 16%. Palmer counted tables that could be read or written without logging in and found 10.3%. The two aren't identical measures (most of Symbiotic's 16% is writes and deletes, see below), but they describe the same kind of hole, a year apart, on different samples, and both land between one app in six and one in ten.

**How the apps were found.** Palmer and the Register case started from apps the platform itself promoted. Symbiotic searched the open web for any site talking to Supabase. Escape mixed launch directories with Reddit posts. Showcased apps tend to be more finished; random sites found by search include abandoned weekend projects. Neither sample is "all vibe-coded apps".

**Even the scanners disagree on what is a hole.** Symbiotic rates "Supabase anon key exposed in JavaScript" as High and finds it on 28.7% of sites. But Supabase designs that key for browsers: its documentation says the publishable key can be read by anyone and "only reaches what Row Level Security allows" ([Supabase API keys](https://supabase.com/docs/guides/api/api-keys)). The key in your JavaScript is fine. The problem is a database that lets that key do too much.

## The same holes, sorted by type

| Hole | Palmer (2025) | Escape (2025) | Register case (2026) | Symbiotic (2026) |
|---|---|---|---|---|
| Tables readable without login | yes: 170 apps (10.3%) read or write | missing RLS listed as critical, no count | yes, no explicit RLS | 3.6% |
| Tables changeable or deletable without login | (included above) | not broken out | yes: grades could be altered, accounts deleted | 16.0% change, 16.0% delete, 1.3% insert |
| Secret keys in client code | not counted (third-party keys leaked from exposed tables, not from code) | 400+ secrets | not reported | 2.2% |
| Broken sign-in logic | not reported | not reported | yes: an AI-written check let signed-out users in and kept signed-in ones out | 6.4% email confirmation off |
| Personal data exposed | names, emails, phone numbers, payment details | 175 instances (medical records, IBANs, emails) | 18,697 user records | 3.2% with sensitive columns exposed |

The pattern is consistent across all four: **the database is the hole**. The leaks come from tables that any visitor can reach because row level security (RLS) is off, or on with policies that don't say what the founder thinks they say. That's also OWASP's top web risk: broken access control is A01 in the [OWASP Top 10:2025](https://top10.owasp.org/2025). Keys in code and broken sign-in logic come next, at much lower rates.

## A detail in Symbiotic's numbers, and why it happens

One row of that table puzzled us. In Symbiotic's data, unauthenticated **deletion** (16.0%) is more than four times as common as unauthenticated **reading** (3.6%). If a visitor can't read your rows, how can they delete them?

We reproduced it on PostgreSQL 18.6 (Supabase runs PostgreSQL, though usually an older version). We set up a `profiles` table with two rows and the roles Supabase's REST API uses (`anon` for signed-out visitors), then tried the policies AI tools commonly write. Results, as the signed-out `anon` role:

| Setup | Rows anon can see | Update every row | Delete every row |
|---|---|---|---|
| RLS off | 2 of 2 | yes | yes |
| RLS on, no policies | 0 | no | no |
| RLS on; read: owner only; update and delete: `using (true)` | **0** | **yes, both rows** | **yes, both rows** |
| Same, but with `where plan = 'free'` or `returning id` added | 0 | no (0 rows) | no |
| RLS on; owner-only policies `to authenticated` with `with check` | 0 | no | no |

The third row is the trap. Your read policy is correct, the app looks private and a quick test shows no data. But a broad `using (true)` update or delete policy lets a signed-out visitor change or wipe the whole table, as long as the command doesn't read any columns. PostgreSQL documents why: an `UPDATE` or `DELETE` only needs the row to pass a `SELECT` policy when it reads columns, for example in a `WHERE` or `RETURNING` clause ([PostgreSQL CREATE POLICY](https://www.postgresql.org/docs/current/sql-createpolicy.html)). A blind "update everything" doesn't.

That could explain Symbiotic's write-without-read numbers, but we can't tell how much of them it explains: Symbiotic says its scanner doesn't modify any data and doesn't say how it judged a write as allowed. A write that row level security filters down to zero rows still returns a success code, so a scanner that only checks the response would count it too. Our reproduction shows the trap is real in PostgreSQL; it doesn't show that one app in six has it.

We also ran it directly in the database, not through Supabase's REST API. Through the API, the trap only works for a write with no filter at all, because any filter reads a column (the fourth row of our table), and Supabase offers the [pg-safeupdate](https://supabase.com/docs/guides/database/extensions/pg-safeupdate) extension, which refuses updates and deletes without a `WHERE` clause. Fix `using (true)` write policies anyway: signed-in users get the same access to every row, and the protection shouldn't rest on how a request is shaped.

The lesson for a self-check: **testing that you can't read data proves nothing about writes.** Check every policy for every command.

## The 15-minute self-check

Do this on your own project only. Steps 1–3 are read-only.

**1. Look at what your browser sends.** Open your live app in a private window, open the developer tools, go to the Network tab and filter for `rest/v1`. You'll see your project URL (`https://<project>.supabase.co`) and an `apikey` header.
- A key starting `sb_publishable_` is fine in a browser. One starting `sb_secret_` is not: rotate it now.
- An older key is a long JWT. Paste it into our [JWT decoder](/tools/dev/jwt-decoder/) (it runs in your browser and sends nothing) and read the `role` claim: `anon` is expected, `service_role` means anyone can bypass all your rules. Rotate it.

**2. Ask for data while signed out.** For each table that holds user data:

```
curl "https://<project>.supabase.co/rest/v1/<table>?select=*&limit=3" -H "apikey: <the key from step 1>"
```

With a legacy JWT key, add `-H "Authorization: Bearer <the same key>"`. An empty list `[]` is what you want. Any rows from a table that should be private are a leak.

**3. Read your rules instead of attacking them.** In the Supabase SQL editor:

```sql
-- tables with RLS switched off
select tablename from pg_tables where schemaname = 'public' and not rowsecurity;

-- every policy, with who it applies to and its condition
select tablename, policyname, cmd, roles, qual, with_check
from pg_policies where schemaname = 'public' order by tablename, cmd;
```

The first query should return nothing. In the second, look hard at any row where `qual` or `with_check` is `true`, `roles` is `{public}` or `{anon}`, and `cmd` is `UPDATE`, `DELETE`, `INSERT` or `ALL`. That's the trap from our table. Supabase's built-in Security Advisor (Advisors → Security Advisor) flags the same things: `rls_disabled_in_public` as an error and always-true policies as `permissive_rls_policy` warnings ([Supabase database advisors](https://supabase.com/docs/guides/database/database-advisors)).

**4. Check storage.** Run `select id, public from storage.buckets;`. A public bucket serves any file to anyone with its URL. User uploads such as invoices or ID photos don't belong in one.

**5. Search your built code for secrets.** In the deployed JavaScript (or your repo), search for `sb_secret_`, `service_role`, `sk_live_` (Stripe) and your AI provider's key prefix. Anything that spends money or bypasses rules belongs on a server or in an edge function, never in the browser.

**6. Fix in this order:** rotate any exposed secret key; switch on RLS on every public table; replace `using (true)` write policies with owner checks (`using (auth.uid() = user_id)` plus the same `with check`) limited `to authenticated`; then turn on email confirmation and review who can sign up. If you change a database password while you're at it, generate a long one with our [password generator](/tools/privacy/password-generator/).

## Why "the platform scans it" isn't enough

Lovable runs a security scan before publishing, and it told The Register that following its recommendations is up to the user. Palmer's statement notes that Lovable's scanner checked whether an RLS policy existed, not whether it was correct. Our third table row is exactly the case that kind of check passes. Platforms have their own incidents too: Lovable [says](https://lovable.dev/blog/our-response-to-the-april-2026-incident) that from 3 February to 20 April 2026, the chat history and source code of public projects could be opened by any Lovable user who had a project link. If you pasted a key into a public project's chat in that window, rotate it.

None of this means you shouldn't build with these tools. The holes are few, well known and checkable in an afternoon. If you're a non-technical founder, add this check to your launch list next to the items in our [guide to launching as a non-technical founder](/articles/launching-a-saas-product-as-a-non-technical-founder), and run it again after every big AI-generated change to your database.

## Sources

- Matt Palmer, [Statement on CVE-2025-48757](https://mattpalmer.io/posts/statement-on-CVE-2025-48757/); [Tenable, CVE-2025-48757](https://www.tenable.com/cve/CVE-2025-48757) (CVSS 9.3).
- Escape, [Methodology: how we discovered vulnerabilities in apps built with vibe coding](https://escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding), October 2025.
- The Register, [Lovable app vulnerabilities](https://www.theregister.com/2026/02/27/lovable_app_vulnerabilities/), 27 February 2026.
- Symbiotic Security, [We scanned 1,072 vibe-coded apps: 98% had security flaws](https://symbioticsec.ai/blog/we-scanned-1-072-vibe-coded-apps-98-had-security-flaws), June 2026.
- Lovable, [Our response to the April 2026 incident](https://lovable.dev/blog/our-response-to-the-april-2026-incident).
- Supabase docs: [Row level security](https://supabase.com/docs/guides/database/postgres/row-level-security), [API keys](https://supabase.com/docs/guides/api/api-keys), [database advisors](https://supabase.com/docs/guides/database/database-advisors), [pg-safeupdate](https://supabase.com/docs/guides/database/extensions/pg-safeupdate).
- PostgreSQL 18 documentation, [CREATE POLICY](https://www.postgresql.org/docs/current/sql-createpolicy.html).
- OWASP, [Top 10:2025](https://top10.owasp.org/2025).
- Our own test: PostgreSQL 18.6 on Ubuntu, a throwaway database with Supabase-style `anon` and `authenticated` roles, October 2026.
