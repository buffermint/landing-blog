// Tables in posts must fit the text column, desktop and phone: the site had no table styles, so a 5-column table ran
// past a 390 px screen and was cut off. Run through bin/one-chrome (tests/post-tables.test.mjs does that). Serves
// build_production/ on a local port; every other host is blocked.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from 'playwright-core';
import { build } from '../helpers.mjs';

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2' };

const server = createServer((req, res) => {
  let path = join(build, decodeURIComponent(new URL(req.url, 'http://x').pathname));
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
    await context.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    const page = await context.newPage();
    let tables = 0;
    for (const slug of posts) {
      await page.goto(`${origin}/articles/${slug}/`, { waitUntil: 'load' });
      const res = await page.evaluate(() => {
        const col = document.querySelector('#post-content');
        const c = col.getBoundingClientRect();
        return {
          pageWidth: document.documentElement.scrollWidth,
          tables: [...col.querySelectorAll('table')].map((t) => {
            const r = t.getBoundingClientRect();
            const cell = t.querySelector('td, th');
            return { left: r.left, right: r.right, colLeft: c.left, colRight: c.right, scrollW: t.scrollWidth, clientW: t.clientWidth, padding: cell ? parseFloat(getComputedStyle(cell).paddingLeft) : 0 };
          }),
        };
      });
      assert.ok(res.pageWidth <= options.viewport.width, `${name} ${slug}: page scrolls sideways (${res.pageWidth}px)`);
      res.tables.forEach((t, i) => {
        const at = `${name} ${slug} table ${i + 1}`;
        assert.ok(t.left >= t.colLeft - 1 && t.right <= t.colRight + 1, `${at}: ${Math.round(t.left)}–${Math.round(t.right)} outside the column ${Math.round(t.colLeft)}–${Math.round(t.colRight)}`);
        assert.ok(t.scrollW <= t.clientW + 1, `${at}: content wider than the table`);
        assert.ok(t.padding > 0, `${at}: cells have no padding (table styles missing)`);
      });
      tables += res.tables.length;
    }
    console.log(`ok ${name}: ${tables} tables in ${posts.length} posts fit`);
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}
