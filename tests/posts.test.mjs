// Post quality (BLOG-PLAN.md, editorial rules): every post dated in 2026 or later, or carrying `updated:`, must
// be a real article: a short title, a search description of the right length, 1,200+ words, a `## Sources` section
// citing 4+ publishers, internal links, alt text, no placeholder text, and its own title and `keyword:`. Older posts
// without `updated:` are exempt until a refresh lane touches them. The checks read source/_posts, so they need no build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parsePost, root } from './helpers.mjs';

const POSTS = join(root, 'source/_posts');
// The relaunched blog's posts start in October 2026 (backdated as far as 2026-10-05 on the owner's word, 2026-10-30);
// every older post is from 2021.
export const CUTOFF = '2026-01-01';
const OUR_HOSTS = /^(www\.)?buffermint\.com$/i;

const day = (v) => (v ? String(v).slice(0, 10) : '');
const isDraft = ({ meta }) => meta.published === 'false';
// a post with no date: is in scope (Jigsaw would date it 1970): new posts can't skip the bar by leaving it out
export const inScope = ({ meta }) => !day(meta.date) || day(meta.date) >= CUTOFF || Boolean(meta.updated);

// `## Sources` up to the next heading of the same or a higher level
function sourcesSection(body) {
  const m = body.match(/^##[ \t]+Sources[ \t]*\r?\n([\s\S]*?)(?=^#{1,2}[ \t]|(?![\s\S]))/m);
  return m ? m[1] : null;
}

// Markdown and HTML links, as written
function links(text) {
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ' '); // images are not links
  const out = [];
  for (const m of text.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) out.push(m[1]);
  for (const m of text.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)) out.push(m[1]);
  for (const m of text.matchAll(/^\s*\[[^\]]+\]:\s*(\S+)/gm)) out.push(m[1]); // reference-style definitions
  for (const m of text.matchAll(/<(https?:\/\/[^>\s]+)>/g)) out.push(m[1]); // autolinks
  return out;
}

// Hosts where each subdomain is a different publisher
const SHARED_HOSTS = /^(github\.io|substack\.com|medium\.com|blogspot\.com|wordpress\.com|pages\.dev|vercel\.app|netlify\.app|beehiiv\.com|dev\.to)$/;

// example.com, bbc.co.uk, alice.github.io: the last two labels; three when the second-level label is a short public
// suffix part (co.uk) or the host is shared by many publishers (github.io). A leading www. never counts.
export function siteOf(url) {
  const host = hostOf(url);
  if (!host) return null;
  const parts = host.replace(/^www\./, '').split('.');
  if (parts.length <= 2) return parts.join('.');
  const [sld, tld] = parts.slice(-2);
  const shortSuffix = tld.length === 2 && /^(co|com|org|net|gov|ac|edu|gob|go|or|ne)$/.test(sld);
  return parts.slice(shortSuffix || SHARED_HOSTS.test(`${sld}.${tld}`) ? -3 : -2).join('.');
}

function hostOf(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/\.$/, '') || null; } catch { return null; }
}
const isAbsolute = (u) => /^https?:\/\//i.test(u);
const isExternal = (u) => isAbsolute(u) && hostOf(u) && !OUR_HOSTS.test(hostOf(u));
const isInternal = (u) => (u.startsWith('/') && !u.startsWith('//')) || (isAbsolute(u) && OUR_HOSTS.test(hostOf(u) ?? ''));

// Readable words: no code, tags, Blade directives, link targets or markdown syntax
export function bodyWords(body) {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]*`/g, ' ')
    .replace(/\{\{[\s\S]*?\}\}|\{!![\s\S]*?!!\}/g, ' ')
    .replace(/@php[\s\S]*?@endphp/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    // markdown markers, but not the hyphen or underscore inside a word ("in-browser" is one word)
    .replace(/[#*>`|~]+/g, ' ')
    .replace(/(^|\s)[-_]+(?=\s|$)/g, ' ');
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

const PLACEHOLDERS = [
  [/\blorem\b|\bipsum dolor\b/i, 'lorem ipsum'],
  [/\bTODO\b|\bFIXME\b|\bTBD\b|\bXXX\b/, 'TODO/TBD/XXX'],
  [/\[(insert|add|your|placeholder)\b[^\]]*\]/i, '[insert …] slot'], // checked after links lose their brackets
  [/\{\{\s*[A-Z][A-Z0-9_]*\s*\}\}/, '{{SLOT}}'],
];

// Every problem with one post (an empty list = it passes). `all` = every post, for the uniqueness rules.
export function checkPost(post, all = []) {
  const { meta, body } = post;
  const problems = [];
  const title = meta.title ?? '';
  const desc = meta.seo_description ?? '';
  if (!title) problems.push('no title');
  else if ([...title].length > 65) problems.push(`title is ${[...title].length} characters (max 65)`);
  const dl = [...desc].length;
  if (dl < 70 || dl > 160) problems.push(`seo_description is ${dl} characters (70–160)`);

  const sources = sourcesSection(body);
  const main = sources == null ? body : body.replace(sources, '');
  const words = bodyWords(main);
  if (words < 1200) problems.push(`${words} words of body (min 1,200, not counting Sources)`);

  if (sources == null) problems.push('no "## Sources" section');
  else {
    const sites = new Set(links(sources).filter(isExternal).map(siteOf).filter(Boolean));
    if (sites.size < 4) problems.push(`Sources cites ${sites.size} distinct external sites (min 4)`);
  }

  const internal = new Set(links(main).filter(isInternal).map((u) => u.replace(/^https?:\/\/(www\.)?buffermint\.com/i, '').replace(/[#?].*$/, '').replace(/\/$/, '') || '/'));
  if (internal.size < 2) problems.push(`${internal.size} internal links to distinct pages outside Sources (min 2)`);

  for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)]*)\)/g)) if (!m[1].trim()) problems.push(`image without alt text: ${m[2]}`);
  for (const m of body.matchAll(/<img\b[^>]*>/gi)) if (!/\balt\s*=\s*["'][^"']*\S[^"']*["']/i.test(m[0])) problems.push(`<img> without alt text: ${m[0].slice(0, 80)}`);
  for (const m of body.matchAll(/<x-(image|carousel)\b[^>]*>/gi)) if (!/\b(alt|caption)\s*=\s*["'][^"']*\S/i.test(m[0])) problems.push(`<x-${m[1]}> without alt text`);

  // prose: no code samples, link targets or URLs; a link keeps its text without brackets, so "[Add page numbers](/x)"
  // is not mistaken for an "[add …]" slot
  const prose = `${title}\n${desc}\n${body}`
    .replace(/```[\s\S]*?```|`[^`\n]*`/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\bhref\s*=\s*["'][^"']*["']/gi, '')
    .replace(/https?:\/\/\S+/g, '');
  for (const [re, what] of PLACEHOLDERS) if (re.test(prose)) problems.push(`placeholder text: ${what}`);

  // config.php ignores an updated: that isn't after date:, so a post in scope only through it would be held to the bar
  // with no visible refresh: report the typo
  if (!day(meta.date)) problems.push('no date: front matter');
  if (meta.updated && !/^\d{4}-\d{2}-\d{2}$/.test(day(meta.updated))) problems.push(`updated: ${meta.updated} is not YYYY-MM-DD`);
  else if (meta.updated && day(meta.updated) <= day(meta.date)) problems.push(`updated: ${meta.updated} is not after date: ${meta.date}`);

  const keyword = (meta.keyword ?? '').trim().toLowerCase();
  if (!keyword) problems.push('no keyword: front matter');
  for (const other of all) {
    if (other.file === post.file) continue;
    if (title && (other.meta.title ?? '').trim().toLowerCase() === title.trim().toLowerCase()) problems.push(`same title as ${other.file}`);
    if (keyword && (other.meta.keyword ?? '').trim().toLowerCase() === keyword) problems.push(`same keyword as ${other.file}`);
  }
  return problems;
}

const read = () => readdirSync(POSTS).filter((f) => f.endsWith('.md')).sort().map((f) => parsePost(readFileSync(join(POSTS, f), 'utf8'), f));

// [file, problems] for every published post in scope that fails; a draft (published: false) waits until it's published
export const qualityFailures = (all) => all.filter((p) => inScope(p) && !isDraft(p)).map((p) => [p.file, checkPost(p, all)]).filter(([, problems]) => problems.length);

test('every new or refreshed post meets the quality bar', () => {
  const all = read();
  const failures = qualityFailures(all);
  assert.deepEqual(failures, [], failures.map(([f, p]) => `${f}:\n  - ${p.join('\n  - ')}`).join('\n'));
});

// Dates (owner, 2026-10-30): "Never put a future date in any active blog. Any blogs that have same date must be spaced
// out by 2-3 dates." So: no published post dated after today, no two published posts on one date, and the relaunched
// blog's posts (in scope by date) at least 2 days apart.
export const MIN_GAP_DAYS = 2;
export function dateProblems(all, today) {
  const problems = [];
  const live = all.filter((p) => !isDraft(p) && /^\d{4}-\d{2}-\d{2}$/.test(day(p.meta.date)));
  const byDate = new Map();
  for (const p of live) {
    const d = day(p.meta.date);
    if (d > today) problems.push(`${p.file} is dated ${d}, after today (${today})`);
    if (byDate.has(d)) problems.push(`${p.file} has the same date (${d}) as ${byDate.get(d)}`);
    else byDate.set(d, p.file);
  }
  const recent = live.filter((p) => day(p.meta.date) >= CUTOFF).sort((a, b) => day(a.meta.date).localeCompare(day(b.meta.date)));
  for (let i = 1; i < recent.length; i++) {
    const [a, b] = [recent[i - 1], recent[i]];
    const gap = (Date.parse(day(b.meta.date)) - Date.parse(day(a.meta.date))) / 864e5;
    if (gap > 0 && gap < MIN_GAP_DAYS) problems.push(`${b.file} (${day(b.meta.date)}) is only ${gap} day after ${a.file}`);
  }
  return problems;
}
const localToday = () => new Date().toLocaleDateString('sv');

test('post dates: none in the future, none shared, new posts 2+ days apart', () => {
  const problems = dateProblems(read(), localToday());
  assert.deepEqual(problems, [], problems.join('\n'));
});

test('the date checker: future, shared and too-close dates are reported; drafts and old posts are not held to the gap', () => {
  const post = (file, date, extra = '') => parsePost(`---\ntitle: ${file}\ndate: ${date}\n${extra}---\nx`, file);
  const problems = dateProblems([
    post('a', '2026-10-05'), post('b', '2026-10-05'), post('c', '2026-10-06'), post('d', '2026-11-09'),
    post('e', '2026-11-20', 'published: false\n'), post('old1', '2021-08-10'), post('old2', '2021-08-11'),
  ], '2026-11-01');
  assert.deepEqual(problems, [
    'b has the same date (2026-10-05) as a',
    'd is dated 2026-11-09, after today (2026-11-01)',
    'c (2026-10-06) is only 1 day after b',
  ]);
  assert.deepEqual(dateProblems([post('a', '2026-10-05'), post('b', '2026-10-07'), post('c', '2026-10-10')], '2026-10-30'), []);
});

test('no two posts share a title or a keyword (old posts included)', () => {
  const all = read();
  const seen = new Map();
  for (const p of all) for (const key of ['title', 'keyword']) {
    const v = (p.meta[key] ?? '').trim().toLowerCase();
    if (!v) continue;
    assert.ok(!seen.has(`${key}:${v}`), `${p.file} has the same ${key} as ${seen.get(`${key}:${v}`)}`);
    seen.set(`${key}:${v}`, p.file);
  }
});

// ---- the checker itself: a thin post fails on every rule, a real one passes ----

const thin = parsePost(`---
title: "The Ultimate Complete Guide to Everything a SaaS Founder Should Ever Know in 2026"
seo_description: Short.
date: 2026-11-02
---
In today's fast-paced world, SaaS matters. TODO: add data. Lorem ipsum dolor sit amet.

![](/assets/img/uploads/x.jpeg)

<img src="/a.png">

Read [our tools](/tools/).

## Sources
- [One](https://example.com/a)
- [Same publisher](https://www.example.com/b)
- [Ours](https://buffermint.com/articles)
`, 'thin.blade.md');

const words = (n, seed) => Array.from({ length: n }, (_, i) => `${seed}${i % 97}`).join(' ');
const good = parsePost(`---
title: "Merchant of record fees at $9, $29 and $99 a month"
seo_description: "What Paddle, Polar, Dodo and Stripe keep from a $9, $29 and $99 sale, worked out from each provider's own pricing page as of November 2026."
date: 2026-11-02
keyword: merchant of record fees
---
${words(700, 'fee')}

![Fee table for a $9 sale](/assets/img/uploads/fees.png)

See the [MRR calculator](/tools/business/mrr-calculator/) and [our post on pricing](https://buffermint.com/articles/when-is-the-right-time-to-launch-an-mvp).

${words(600, 'price')}

## Sources
- [Paddle pricing](https://www.paddle.com/pricing), read 2026-11-01
- [Polar docs](https://docs.polar.sh/fees), read 2026-11-01
- [Dodo Payments](https://dodopayments.com/pricing), read 2026-11-01
- [Stripe pricing](https://stripe.com/pricing), read 2026-11-01
- [HMRC](https://www.gov.uk/vat), read 2026-11-01
`, 'good.blade.md');

test('the checker passes a real post', () => {
  assert.deepEqual(checkPost(good, [good]), []);
});

test('the checker blocks a thin, one-source post on every rule', () => {
  const problems = checkPost(thin, [thin, { ...good, file: 'other.blade.md', meta: { ...good.meta, title: thin.meta.title } }]);
  const has = (re) => assert.ok(problems.some((p) => re.test(p)), `expected a problem matching ${re} in:\n${problems.join('\n')}`);
  has(/^title is \d+ characters/);
  has(/^seo_description is 6 characters/);
  has(/words of body \(min 1,200/);
  has(/Sources cites 1 distinct external sites/); // example.com twice and our own site count once / not at all
  has(/1 internal links/);
  has(/^image without alt text/);
  has(/^<img> without alt text/);
  has(/placeholder text: lorem/);
  has(/placeholder text: TODO/);
  has(/^no keyword/);
  has(/^same title as other\.blade\.md/);
});

test('the checker: missing Sources, duplicate keyword, scope', () => {
  const noSources = parsePost(`---\ntitle: A\nseo_description: x\ndate: 2026-11-02\nkeyword: merchant of record fees\n---\n${words(1300, 'w')}\n`, 'n.blade.md');
  const problems = checkPost(noSources, [noSources, good]);
  assert.ok(problems.includes('no "## Sources" section'), problems.join('\n'));
  assert.ok(problems.includes('same keyword as good.blade.md'), problems.join('\n'));
  assert.ok(!problems.some((p) => /words of body/.test(p)), 'body words counted');
  assert.equal(inScope(parsePost('---\ntitle: Old\ndate: 2021-07-10\n---\nx', 'o')), false);
  assert.equal(inScope(parsePost('---\ntitle: Old\ndate: 2021-07-10\nupdated: 2026-11-05\n---\nx', 'o')), true);
  assert.equal(inScope(parsePost('---\ntitle: New\ndate: 2026-10-29\n---\nx', 'o')), true);
  assert.equal(inScope(parsePost('---\ntitle: Backdated\ndate: 2026-10-05\n---\nx', 'o')), true);
});

test('the checker: real link text, code samples and odd URLs are not problems', () => {
  const text = good.body.replace('## Sources', 'Add the [Add page numbers](/tools/pdf/add-page-numbers/) tool to [your own invoice](/tools/everyday/invoice-generator/). The release is coming soon, says the vendor.\n\n```js\n// TODO: not a placeholder, a code sample\n```\n\nA broken link [a](https://) in the text.\n\n## Sources');
  assert.deepEqual(checkPost({ ...good, body: text }, [good]), []);
  assert.ok(checkPost({ ...good, body: good.body + '\n[insert chart here]\n' }, [good]).includes('placeholder text: [insert …] slot'));
  assert.deepEqual(checkPost({ ...good, body: good.body.replace('## Sources', '## Sources\n- [bad](https://)') }, [good]), [], 'a malformed URL is ignored, not a crash');
});

test('the checker: an updated: that is not after date: is reported', () => {
  const p = parsePost('---\ntitle: T\ndate: 2021-07-10\nupdated: 2021-01-01\n---\nx', 'u.blade.md');
  assert.ok(checkPost(p).includes('updated: 2021-01-01 is not after date: 2021-07-10'));
});

test('siteOf groups a publisher\'s subdomains and keeps country suffixes apart', () => {
  assert.equal(siteOf('https://www.gov.uk/vat'), 'gov.uk');
  assert.equal(siteOf('https://gov.uk/x'), 'gov.uk');
  assert.notEqual(siteOf('https://alice.github.io/a'), siteOf('https://bob.github.io/b'));
  assert.equal(siteOf('https://docs.polar.sh/x'), 'polar.sh');
  assert.equal(siteOf('https://www.bbc.co.uk/news'), 'bbc.co.uk');
  assert.equal(siteOf('https://ec.europa.eu/a'), 'europa.eu');
  assert.equal(siteOf('not a url'), null);
});

test('the parser drops # comments, as in BLOG-PLAN.md\'s front-matter template', () => {
  const p = parsePost('---\ntitle: "Merchant of record fees, worked out"   # ≤ 65 chars\nseo_description: \'It\'\'s short\'  # 70–160 chars\nkeyword: compress pdf to 100kb   # the target keyword\nslug: a#b\n---\nx', 'c');
  assert.equal(p.meta.title, 'Merchant of record fees, worked out');
  assert.equal(p.meta.seo_description, "It's short");
  assert.equal(p.meta.keyword, 'compress pdf to 100kb');
  assert.equal(p.meta.slug, 'a#b', 'a # inside a word is not a comment');
  assert.ok(checkPost(p).includes('seo_description is 10 characters (70–160)'), 'the comment does not count toward the length');
});

test('the checker: no date: is in scope and reported; a non-YYYY-MM-DD updated: is reported; drafts are skipped', () => {
  const noDate = parsePost(`---\ntitle: T\n---\n${'w '.repeat(50)}`, 'nd.blade.md');
  assert.equal(inScope(noDate), true);
  assert.ok(checkPost(noDate).includes('no date: front matter'));
  for (const v of ['"11/05/2026"', '"Nov 1 2020"', 'tomorrow']) {
    const p = parsePost(`---\ntitle: T\ndate: 2021-07-10\nupdated: ${v}\n---\nx`, 'u.blade.md');
    assert.ok(checkPost(p).some((x) => /is not YYYY-MM-DD$/.test(x)), `${v}: ${checkPost(p).join('; ')}`);
  }
  const draft = parsePost('---\ntitle: Draft\ndate: 2026-11-05\npublished: false\n---\nshort', 'd.blade.md');
  assert.equal(inScope(draft), true, 'in scope by date');
  assert.deepEqual(qualityFailures([draft, good]), [], 'a draft waits');
  assert.equal(qualityFailures([{ ...draft, meta: { ...draft.meta, published: 'true' } }, good]).length, 1, 'published, it is checked');
});

test('bodyWords counts hyphenated and snake_case words once, and skips inline code and Blade echoes', () => {
  assert.equal(bodyWords('An in-browser, client-side tool. `npm run file_size --x` {{ $page->title }} and file_size'), 6);
  assert.equal(bodyWords('- a list item\n\n---\n\n**bold** _em_'), 5);
});
