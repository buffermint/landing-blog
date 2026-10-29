// Refreshed posts (front matter `updated:`) at desktop and phone width: the title, the "Updated on" line and the
// Sources section show; nothing in the text column is wider than the column; every image in the post has alt text
// and loads; internal links answer. Run through bin/one-chrome (tests/refreshed-posts.test.mjs does that). Serves
// build_production/ on a local port; every other host is blocked. SHOTS=<dir> also saves a screenshot per post and size.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, sep } from 'node:path';
import { chromium } from 'playwright-core';
import { build, root } from '../helpers.mjs';

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.woff': 'font/woff', '.woff2': 'font/woff2' };

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

// every post whose source carries updated:
const dir = join(root, 'source/_posts');
const posts = readdirSync(dir)
  .filter((f) => /^updated:\s*\S/m.test(readFileSync(join(dir, f), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''))
  .map((f) => f.replace(/\.blade\.md$|\.md$/, ''));
assert.ok(posts.length >= 3, `at least 3 refreshed posts (found ${posts.length})`);

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
    for (const slug of posts) {
      const at = `${name} ${slug}`;
      const res = await page.goto(`${origin}/articles/${slug}/`, { waitUntil: 'load' });
      assert.equal(res.status(), 200, `${at}: status ${res.status()}`);
      const r = await page.evaluate(async () => {
        const col = document.querySelector('#post-content');
        const c = col.getBoundingClientRect();
        const imgs = [...col.querySelectorAll('img')];
        for (const img of imgs) { img.loading = 'eager'; img.scrollIntoView(); }
        await Promise.all(imgs.map((img) => (img.complete ? null : new Promise((ok) => { img.onload = img.onerror = ok; }))));
        const h2s = [...col.querySelectorAll('h2, h3')].map((h) => h.textContent.trim());
        return {
          h1: document.querySelector('h1')?.textContent.trim() ?? '',
          updated: [...document.querySelectorAll('body *')].some((e) => e.children.length === 0 && /^Updated on \w+ \d{1,2}, \d{4}$/.test(e.textContent.trim()) && e.getBoundingClientRect().height > 0),
          sources: h2s.includes('Sources'),
          wide: [...col.querySelectorAll('p, ul, ol, table, figure, img, h2, h3, blockquote')]
            .filter((e) => e.getBoundingClientRect().right > c.right + 1 || e.getBoundingClientRect().left < c.left - 1)
            .map((e) => `${e.tagName}: ${e.textContent.trim().slice(0, 40)}`),
          imgs: imgs.map((i) => ({ src: i.currentSrc || i.src, alt: i.alt.trim(), ok: i.naturalWidth > 0 })),
          links: [...col.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
        };
      });
      assert.ok(r.h1.length > 0, `${at}: no h1`);
      assert.ok(r.updated, `${at}: no visible "Updated on <date>"`);
      assert.ok(r.sources, `${at}: no Sources heading`);
      assert.deepEqual(r.wide, [], `${at}: content wider than the text column`);
      for (const img of r.imgs) {
        assert.ok(img.alt, `${at}: image without alt ${img.src}`);
        assert.ok(img.ok, `${at}: image didn't load ${img.src}`);
      }
      // links to other posts answer (the tools live in another build, so /tools/ links aren't checked here)
      for (const href of new Set(r.links.filter((h) => h.startsWith('/articles/')))) {
        const st = await page.request.get(`${origin}${href.replace(/[#?].*$/, '')}/`);
        assert.equal(st.status(), 200, `${at}: ${href} answers ${st.status()}`);
      }
      if (process.env.SHOTS) await page.screenshot({ path: join(process.env.SHOTS, `${slug}-${name}.png`), fullPage: false });
    }
    console.log(`ok ${name}: ${posts.length} refreshed posts`);
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}
