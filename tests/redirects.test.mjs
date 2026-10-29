// Merged posts (BLOG-PLAN.md, "Old posts"): the weaker post is removed and its URL answers 301 to the stronger one.
// Redirects live in buffermint-pages/static/_redirects (Pages reads only /_redirects; publish.sh joins it in). These
// checks hold the built site to that: a merged post is gone from the build, its sitemap and feed; its target is built;
// the pages repo next to this one (when it's there) answers 301 for it; and no link in the built site points at an
// /articles/ URL that is neither a built post nor redirected.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { root, build, htmlFiles } from './helpers.mjs';
import { parsePost, inScope } from './posts.test.mjs';

export const MERGED = {
  'micro-saas-is-the-future': 'launch-your-micro-saas-product',
  '5-reasons-why-building-your-mvp-is-a-challenge': 'when-is-the-right-time-to-launch-an-mvp',
  'why-speed-to-market-matters-for-your-saas-product-launch': 'when-is-the-right-time-to-launch-an-mvp',
  'the-ultimate-guide-to-launching-your-startup-from-idea-to-reality': 'launching-a-saas-product-as-a-non-technical-founder',
  'things-to-know-before-launching-your-first-tech-startup': 'launching-a-saas-product-as-a-non-technical-founder',
  'how-to-be-an-excellent-client-and-help-your-technical-partners-do-their-best-work': 'launching-a-saas-product-as-a-non-technical-founder',
  'how-ai-and-machine-learning-is-changing-the-saas-space': 'ai-feature-cost-per-user',
  'the-4-types-of-products-which-type-should-you-build': 'how-to-get-successful-startup-ideas',
  'your-strategy-is-a-voyage': 'how-to-achieve-a-product-market-fit-with-your-product',
};

const PAGES_REDIRECTS = join(root, '../buffermint-pages/static/_redirects');
const isPost = (slug) => existsSync(join(build, 'articles', slug, 'index.html')) || existsSync(join(build, 'articles', `${slug}.html`));

function pagesRules() {
  if (!existsSync(PAGES_REDIRECTS)) return null;
  const rules = new Map();
  for (const line of readFileSync(PAGES_REDIRECTS, 'utf8').split('\n')) {
    const l = line.trim();
    if (!l || l.startsWith('#')) continue;
    const [from, to, code] = l.split(/\s+/);
    if (!rules.has(from)) rules.set(from, { to, code }); // first match wins
  }
  return rules;
}

test('a merged post is gone from the build, the sitemap and the feed; its target is built', () => {
  const sitemap = readFileSync(join(build, 'sitemap.xml'), 'utf8');
  const feed = readFileSync(join(build, 'feed.xml'), 'utf8');
  for (const [from, to] of Object.entries(MERGED)) {
    assert.ok(!existsSync(join(root, 'source/_posts', `${from}.blade.md`)), `source/_posts/${from}.blade.md still exists`);
    assert.ok(!isPost(from), `articles/${from} is still built`);
    assert.ok(!sitemap.includes(`/articles/${from}<`), `${from} is still in sitemap.xml`);
    assert.ok(!feed.includes(`/articles/${from}`), `${from} is still in feed.xml`);
    assert.ok(isPost(to), `the merge target articles/${to} isn't built`);
  }
});

test('buffermint-pages answers 301 from each merged post to its target', (t) => {
  const rules = pagesRules();
  if (!rules) return t.skip(`${PAGES_REDIRECTS} is not checked out next to this repo`);
  for (const [from, to] of Object.entries(MERGED)) {
    for (const path of [`/articles/${from}`, `/articles/${from}/`]) {
      assert.deepEqual(rules.get(path), { to: `/articles/${to}`, code: '301' }, `${path} in buffermint-pages/static/_redirects`);
    }
  }
});

test('every /articles/ link in the built site is a built post or a redirect (no 404s)', () => {
  const redirected = new Set(Object.keys(MERGED));
  const missing = [];
  for (const file of htmlFiles()) {
    const html = readFileSync(file, 'utf8');
    for (const m of html.matchAll(/href=["'](?:https?:\/\/(?:www\.)?buffermint\.com)?\/articles\/([^"'#?/]+)\/?(?:[#?][^"']*)?["']/g)) {
      const slug = decodeURIComponent(m[1]);
      if (!isPost(slug) && !redirected.has(slug)) missing.push(`${relative(build, file)} → /articles/${slug}`);
    }
  }
  assert.deepEqual([...new Set(missing)], []);
});

test('refreshed and new posts link straight to the merged target, not through a redirect', () => {
  const dir = join(root, 'source/_posts');
  for (const name of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
    const post = parsePost(readFileSync(join(dir, name), 'utf8'), name);
    if (!inScope(post)) continue; // posts left as they are keep their old links; the redirect covers them
    for (const from of Object.keys(MERGED)) {
      assert.doesNotMatch(post.body, new RegExp(`/articles/${from}(?![\\w-])`), `${name} links to the merged ${from}`);
    }
  }
});
