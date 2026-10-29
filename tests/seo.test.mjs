// SEO tags on every post (BlogPosting JSON-LD, Open Graph article times, Twitter card, canonical, sitemap lastmod),
// and `updated:` (a refreshed post): shown on the page, used as dateModified, article:modified_time, the feed's
// <updated> and the sitemap lastmod. The `updated:` checks build a throwaway copy of the site with fixture posts.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build, root } from './helpers.mjs';

const jsonld = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const meta = (html, attr, name) => html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1];
const lastmods = (xml) => Object.fromEntries([...xml.matchAll(/<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => [m[1], m[2]]));

const slugs = readdirSync(join(root, 'source/_posts')).filter((f) => f.endsWith('.blade.md')).map((f) => f.replace(/\.blade\.md$/, ''));

test('every built post has BlogPosting JSON-LD, article Open Graph tags, a Twitter card and a sitemap lastmod', () => {
  const sitemap = lastmods(readFileSync(join(build, 'sitemap.xml'), 'utf8'));
  for (const slug of slugs) {
    const html = readFileSync(join(build, 'articles', slug, 'index.html'), 'utf8');
    const post = jsonld(html).find((j) => j['@type'] === 'BlogPosting');
    assert.ok(post, `${slug}: no BlogPosting`);
    for (const k of ['headline', 'description', 'image', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage']) assert.ok(post[k], `${slug}: BlogPosting.${k}`);
    assert.ok(!Object.values(post).includes(null), `${slug}: null field in BlogPosting`);
    const url = `https://buffermint.com/articles/${slug}`;
    assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1], url, `${slug}: canonical`);
    assert.equal(meta(html, 'property', 'og:url'), url);
    assert.equal(meta(html, 'property', 'og:type'), 'article');
    assert.equal(meta(html, 'property', 'article:published_time'), post.datePublished);
    assert.equal(meta(html, 'property', 'article:modified_time'), post.dateModified);
    assert.ok(meta(html, 'name', 'twitter:card'), `${slug}: twitter:card`);
    assert.ok(meta(html, 'name', 'twitter:image:alt'), `${slug}: twitter:image:alt`);
    assert.ok(sitemap[url], `${slug}: no sitemap lastmod`);
    assert.equal(sitemap[url].slice(0, 10), post.dateModified.slice(0, 10), `${slug}: sitemap lastmod = dateModified`);
  }
});

// ---- a throwaway build with fixture posts ----

const fixture = (front, body = 'Body text.') => `---\n${front}\nauthor: Rishabh Pandey\nsection: postContent\nextends: _layouts.post\n---\n${body}\n`;

function buildCopy(posts) {
  const dir = mkdtempSync(join(tmpdir(), 'bm-landing-seo-'));
  for (const f of ['vendor', 'brand', 'listeners', 'bootstrap.php', 'config.php', 'config.production.php', 'composer.json']) symlinkSync(join(root, f), join(dir, f));
  cpSync(join(root, 'source'), join(dir, 'source'), { recursive: true });
  for (const [name, text] of Object.entries(posts)) writeFileSync(join(dir, 'source/_posts', `${name}.blade.md`), text);
  const run = () => execFileSync('php', ['vendor/bin/jigsaw', 'build', 'production'], { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
  return { dir, run, read: (p) => readFileSync(join(dir, 'build_production', p), 'utf8') };
}

const copies = [];
after(() => copies.forEach((c) => rmSync(c.dir, { recursive: true, force: true })));

test('updated: shows on the page and drives dateModified, article:modified_time, the feed and the sitemap', () => {
  const site = buildCopy({
    'zz-refreshed': fixture('title: Fixture refreshed post\nseo_description: A refreshed fixture post.\ndate: 2026-10-30\nupdated: 2026-11-05\nkeyword: fixture keyword'),
    'zz-quoted': fixture('title: Fixture quoted date\ndate: 2021-07-11\nupdated: "2026-11-06"'),
    'zz-plain': fixture('title: Fixture plain post\ndate: 2021-07-12'),
    'zz-backdated': fixture('title: Fixture backdated update\ndate: 2021-07-13\nupdated: 2021-01-01'),
  });
  copies.push(site);
  site.run();

  const html = site.read('articles/zz-refreshed/index.html');
  const post = jsonld(html).find((j) => j['@type'] === 'BlogPosting');
  assert.match(post.datePublished, /^2026-10-30T/); // newest post, so the feed (latest 20) has it
  assert.match(post.dateModified, /^2026-11-05T/);
  assert.equal(post.keywords, 'fixture keyword');
  assert.match(meta(html, 'property', 'article:modified_time'), /^2026-11-05T/);
  assert.match(html, /<time class="font-size-sm text-muted post-updated" datetime="2026-11-05">\s*Updated on November 5, 2026\s*<\/time>/);

  assert.match(jsonld(site.read('articles/zz-quoted/index.html')).find((j) => j['@type'] === 'BlogPosting').dateModified, /^2026-11-06T/);

  for (const slug of ['zz-plain', 'zz-backdated']) {
    const page = site.read(`articles/${slug}/index.html`);
    const p = jsonld(page).find((j) => j['@type'] === 'BlogPosting');
    assert.equal(p.dateModified, p.datePublished, `${slug}: no update → dateModified = datePublished`);
    assert.ok(!('keywords' in p), `${slug}: no keyword → no keywords field`);
    assert.doesNotMatch(page, /Updated on/, `${slug}: no "Updated on" line`);
  }

  const sitemap = lastmods(site.read('sitemap.xml'));
  assert.match(sitemap['https://buffermint.com/articles/zz-refreshed'], /^2026-11-05/);
  assert.match(sitemap['https://buffermint.com/articles/zz-plain'], /^2021-07-12/);

  const feed = site.read('feed.xml');
  assert.match(feed, /<id>https:\/\/buffermint\.com\/articles\/zz-refreshed<\/id>\s*<published>2026-10-30T[^<]*<\/published>\s*<updated>2026-11-05T/);
});

test('an updated: that is not a date fails the build instead of writing a wrong date', () => {
  const site = buildCopy({ 'zz-bad': fixture('title: Fixture bad date\ndate: 2021-07-10\nupdated: "next week-ish"') });
  copies.push(site);
  assert.throws(site.run, /zz-bad.*is not a date/s);
});
