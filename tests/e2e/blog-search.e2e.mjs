// BM-48: the blog search box on /articles/ in headless Chromium, desktop and phone. Run through bin/one-chrome
// (tests/blog-search.test.mjs does that). Serves build_production/ on a local port; every other host is blocked.
// LANDING_BUILD=<dir> ALLOW_VUE=1 runs the same behaviour checks on an older (Vue) build for comparison.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from 'playwright-core';
import Fuse from 'fuse.js';
import { build as built } from '../helpers.mjs';

const build = process.env.LANDING_BUILD || built;

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.xml': 'application/xml' };

const server = createServer((req, res) => {
  let path = join(build, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
  if (!existsSync(path)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
  res.end(readFileSync(path));
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const origin = `http://127.0.0.1:${server.address().port}`;

// What the box must list for a query: the same Fuse search over the same index.json the page fetches
const index = JSON.parse(readFileSync(join(build, 'index.json'), 'utf8'));
const fuse = new Fuse(index, { minMatchCharLength: 4, keys: ['title', 'snippet', 'categories.name'] });
const expected = (q) => fuse.search(q).map((s) => s.item);
const query = 'idea';
assert.ok(expected(query).length > 1, `the index has posts matching "${query}"`);

const sizes = {
  desktop: { viewport: { width: 1280, height: 800 } },
  phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};

const browser = await chromium.launch();
try {
  for (const [name, options] of Object.entries(sizes)) {
    const context = await browser.newContext(options);
    await context.route('**/*', (route) => (route.request().url().startsWith(origin) ? route.continue() : route.abort()));
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && !/net::ERR_FAILED/.test(m.text()) && errors.push(m.text()));
    const at = (msg) => `${name}: ${msg}`;

    const indexLoaded = page.waitForResponse((r) => r.url().endsWith('/index.json'));
    await page.goto(`${origin}/articles/`, { waitUntil: 'load' });
    await indexLoaded;

    // no Vue on the page; the server-rendered cards are all still there
    if (!process.env.ALLOW_VUE) assert.equal(await page.evaluate(() => typeof window.Vue === 'undefined' && !document.querySelector('main').__vue__), true, at('no Vue'));
    const html = readFileSync(join(build, 'articles/index.html'), 'utf8');
    const cards = (html.match(/class="card /g) || []).length;
    assert.ok(cards > 0);
    assert.equal(await page.locator('main .card').count(), cards, at('server-rendered cards kept'));

    const input = page.locator('#search');
    assert.equal(await input.getAttribute('placeholder'), 'Search our blog...', at('placeholder'));
    assert.equal(await input.getAttribute('aria-label'), 'Search our blog...', at('aria-label'));
    assert.equal(await page.locator('.search-container .input-group-append').count(), 0, at('no counter while empty'));
    assert.equal(await page.locator('#search-results').count(), 0, at('no results while empty'));

    // typing lists the matches in Fuse order with title, date and link
    await input.click();
    await input.pressSequentially(query);
    const want = expected(query);
    await page.locator('#search-results').waitFor();
    const got = await page.locator('#search-results .search-result-list a').evaluateAll((as) =>
      as.map((a) => ({ link: a.getAttribute('href'), title: a.querySelector('span').textContent, date: a.querySelector('small').textContent })));
    assert.deepEqual(got, want.map((p) => ({ link: p.link, title: p.title, date: p.date })), at('results'));
    const counter = page.locator('.search-container .input-group-append .h6');
    assert.equal((await counter.textContent()).trim(), `${want.length} RESULTS`, at('counter text'));
    assert.equal(await counter.isVisible(), name === 'desktop', at('counter shows from md up only'));
    assert.equal(await page.locator('#search-results').isVisible(), true, at('results visible'));
    const box = await page.locator('#search-results').boundingBox();
    assert.ok(box.width > 300 && box.x >= 0 && box.x + box.width <= options.viewport.width + 1, at('results fit the screen'));

    // the first result is a link to the post
    assert.match(want[0].link, /^\//);

    // a click outside the list fades it out
    const shown = () => page.waitForFunction(() => getComputedStyle(document.getElementById('search-results')).display !== 'none' && getComputedStyle(document.getElementById('search-results')).opacity === '1');
    const hidden = () => page.waitForFunction(() => getComputedStyle(document.getElementById('search-results')).display === 'none');
    const outside = () => page.mouse.click(5, options.viewport.height - 5);
    await outside();
    await hidden();

    // clicking back into the box shows the list again; another click in it keeps it shown
    await input.click();
    await shown();
    await input.click();
    await page.waitForTimeout(400);
    assert.equal(await page.locator('#search-results').isVisible(), true, at('list stays for a click in the box'));

    // hidden again, then typing more shows the new matches (never a counter with no list)
    await outside();
    await hidden();
    await input.press('End');
    await input.pressSequentially('s');
    await shown();
    const more = expected(`${query}s`);
    assert.ok(more.length > 0);
    assert.equal(await page.locator('#search-results .search-result-list a').count(), more.length, at('list for the longer query'));
    assert.equal((await counter.textContent()).trim(), `${more.length} RESULTS`, at('counter for the longer query'));

    // no match: a 0 counter and no list; clearing removes both
    await input.fill('zzqqxxjj');
    assert.equal((await counter.textContent()).trim(), '0 RESULTS', at('zero counter'));
    assert.equal(await page.locator('#search-results').count(), 0, at('no list without matches'));
    await input.fill('');
    assert.equal(await page.locator('.search-container .input-group-append').count(), 0, at('counter gone when cleared'));

    // a fresh query after the list was faded out shows it again
    await input.fill(query);
    assert.equal(await page.locator('#search-results').isVisible(), true, at('list back for a new query'));

    // HTML in a title is shown as text, never parsed
    assert.equal(await page.locator('#search-results script, #search-results img').count(), 0);

    // other pages load main.js without errors and have no search box
    await page.goto(`${origin}/`, { waitUntil: 'load' });
    assert.equal(await page.locator('#search').count(), 0);

    assert.deepEqual(errors, [], at('no page errors'));
    await context.close();
    console.log(`ok ${name}: ${want.length} results for "${query}", ${cards} cards`);
  }
} finally {
  await browser.close();
  server.close();
}
