// Tables in posts fit the column at desktop and phone width (posts.scss). The browser half runs
// tests/e2e/post-tables.e2e.mjs through bin/one-chrome so only one browser job runs at a time on the machine.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { root, asset } from './helpers.mjs';

test('posts.css styles tables in post content and lets code in cells break', () => {
  const css = readFileSync(asset('/css/posts.css'), 'utf8');
  assert.match(css, /#post-content table\{[^}]*width:100%/);
  assert.match(css, /#post-content td code,#post-content th code\{[^}]*overflow-wrap:anywhere/);
});

test('post tables fit the column in headless Chromium, desktop and phone', { timeout: 30 * 60 * 1000 }, () => {
  const e2e = join(root, 'tests/e2e/post-tables.e2e.mjs');
  const lock = join(root, '../bin/one-chrome');
  const [cmd, args] = existsSync(lock) ? [lock, [process.execPath, e2e]] : [process.execPath, [e2e]];
  const run = spawnSync(cmd, args, { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, `${run.stdout}\n${run.stderr}`);
  assert.match(run.stdout, /ok desktop/);
  assert.match(run.stdout, /ok phone/);
});
