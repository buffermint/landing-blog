// Refreshed old posts render at desktop and phone width (BLOG-PLAN.md, "Old posts"). The browser half runs
// tests/e2e/refreshed-posts.e2e.mjs through bin/one-chrome so only one browser job runs at a time on the machine.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { root } from './helpers.mjs';

test('refreshed posts show their update date and sources and fit the column, desktop and phone', { timeout: 30 * 60 * 1000 }, () => {
  const e2e = join(root, 'tests/e2e/refreshed-posts.e2e.mjs');
  const lock = join(root, '../bin/one-chrome');
  const [cmd, args] = existsSync(lock) ? [lock, [process.execPath, e2e]] : [process.execPath, [e2e]];
  // node:test's timeout can't stop a synchronous spawn, so the spawn carries its own
  const run = spawnSync(cmd, args, { cwd: root, encoding: 'utf8', timeout: 30 * 60 * 1000 });
  assert.equal(run.status, 0, `${run.stdout}\n${run.stderr}`);
  assert.match(run.stdout, /ok desktop/);
  assert.match(run.stdout, /ok phone/);
});
