// BM-48: no Vue 2 left; the blog search box is plain JS. The browser half runs tests/e2e/blog-search.e2e.mjs
// (desktop and phone) through bin/one-chrome so only one browser job runs at a time on the machine.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { root, build, asset } from './helpers.mjs';

test('package.json and yarn.lock have no Vue', () => {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  for (const name of ['vue', 'vue-loader', 'vue-template-compiler']) {
    assert.equal(pkg.devDependencies?.[name] ?? pkg.dependencies?.[name], undefined, `${name} in package.json`);
  }
  assert.doesNotMatch(readFileSync(join(root, 'yarn.lock'), 'utf8'), /^"?vue(-loader|-template-compiler)?@/m);
});

test('main.js has the search box and no Vue runtime or template compiler', () => {
  const js = readFileSync(asset('/js/main.js'), 'utf8');
  assert.match(js, /data-blog-search/);
  assert.match(js, /index\.json/);
  assert.match(js, /RESULTS/);
  for (const marker of ['__vue__', 'productionTip', 'v-for', 'Vue.config']) assert.ok(!js.includes(marker), marker);
  assert.ok(js.length < 40000, `main.js is ${js.length} bytes`);
});

test('only the blog index has the search box, with no Vue tags left', () => {
  const html = readFileSync(join(build, 'articles/index.html'), 'utf8');
  assert.match(html, /<section class="py-6" data-blog-search>/);
  assert.match(html, /<input id="search" type="text"[^>]*placeholder="Search our blog\.\.\."/);
  assert.doesNotMatch(html, /<search>|<Search>/i);
});

test('blog search in headless Chromium, desktop and phone', { timeout: 30 * 60 * 1000 }, () => {
  const e2e = join(root, 'tests/e2e/blog-search.e2e.mjs');
  const lock = join(root, '../bin/one-chrome');
  const [cmd, args] = existsSync(lock) ? [lock, [process.execPath, e2e]] : [process.execPath, [e2e]];
  const run = spawnSync(cmd, args, { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, `${run.stdout}\n${run.stderr}`);
  assert.match(run.stdout, /ok desktop/);
  assert.match(run.stdout, /ok phone/);
});
