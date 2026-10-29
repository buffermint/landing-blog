// Tables in posts must fit the text column, desktop and phone: the site had no table styles, so a 5-column table ran
// past a 390 px screen and was cut off. Run through bin/one-chrome (tests/post-tables.test.mjs does that). Serves
// build_production/ on a local port; every other host is blocked.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, sep } from 'node:path';
import { chromium } from 'playwright-core';
import { build } from '../helpers.mjs';

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2' };

const server = createServer((req, res) => {
  let path;
  try { path = join(build, decodeURIComponent(new URL(req.url, 'http://x').pathname)); } catch { res.writeHead(400); return res.end(); }
  if (path !== build && !path.startsWith(build + sep)) { res.writeHead(403); return res.end(); }
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
  if (!existsSync(path)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
  res.end(readFileSync(path));
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const origin = `http://127.0.0.1:${server.address().port}`;

// every built post with a table in its content
const posts = readdirSync(join(build, 'articles'))
  .filter((d) => existsSync(join(build, 'articles', d, 'index.html')))
  .filter((d) => /<table\b/.test(readFileSync(join(build, 'articles', d, 'index.html'), 'utf8')));
assert.ok(posts.length >= 1, 'at least one post has a table');

const sizes = {
  desktop: { viewport: { width: 1280, height: 800 } },
  phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};

const browser = await chromium.launch();
try {
  for (const [name, options] of Object.entries(sizes)) {
    const context = await browser.newContext(options);
    await context.route('**/*', (r) => (r.request().url().startsWith(origin) ? r.continue() : r.abort()));
    const page = await context.newPage();
    let tables = 0;
    for (const slug of posts) {
      await page.goto(`${origin}/articles/${slug}/`, { waitUntil: 'load' });
      const res = await page.evaluate(() => {
        const c = document.querySelector('#post-content').getBoundingClientRect();
        return [...document.querySelectorAll('#post-content table')].map((t) => {
          const r = t.getBoundingClientRect();
          const cells = [...t.querySelectorAll('td, th')];
          return {
            left: r.left, right: r.right, colLeft: c.left, colRight: c.right,
            // html/body clip sideways overflow (overflow-x: hidden), so check each cell, not the page width
            overflowingCells: cells.filter((td) => td.scrollWidth > td.clientWidth + 1).map((td) => td.textContent.trim().slice(0, 40)),
            padding: cells.length ? parseFloat(getComputedStyle(cells[0]).paddingLeft) : 0,
            linksNotUnderlined: [...t.querySelectorAll('a')].filter((a) => !getComputedStyle(a).textDecorationLine.includes('underline')).length,
          };
        });
      });
      res.forEach((t, i) => {
        const at = `${name} ${slug} table ${i + 1}`;
        assert.ok(t.left >= t.colLeft - 1 && t.right <= t.colRight + 1, `${at}: ${Math.round(t.left)}–${Math.round(t.right)} outside the column ${Math.round(t.colLeft)}–${Math.round(t.colRight)}`);
        assert.deepEqual(t.overflowingCells, [], `${at}: cell content wider than its cell`);
        assert.ok(t.padding > 0, `${at}: cells have no padding (table styles missing)`);
        assert.equal(t.linksNotUnderlined, 0, `${at}: links in cells must be underlined (axe link-in-text-block)`);
      });
      tables += res.length;
    }
    assert.ok(tables > 0, `${name}: no table measured inside #post-content`);
    console.log(`ok ${name}: ${tables} tables in ${posts.length} posts fit`);
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}
