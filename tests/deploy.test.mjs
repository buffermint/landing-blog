// Review fix 2: deploy.sh installs from the lockfiles on every deploy, not only when vendor/ or node_modules/ is missing.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './helpers.mjs';

const lines = readFileSync(join(root, 'deploy.sh'), 'utf8').split('\n');

test('composer and yarn install run unconditionally, yarn from the frozen lockfile', () => {
  assert.ok(lines.includes('composer install --no-dev --no-interaction -q'), 'composer install line');
  assert.ok(lines.includes('yarn install --frozen-lockfile --silent'), 'yarn install line');
  assert.equal(lines.filter((l) => /\|\|\s*(composer|yarn) install|&&\s*(composer|yarn) install/.test(l)).length, 0, 'no conditional installs');
});

test('installs come before the build', () => {
  const at = (re) => lines.findIndex((l) => re.test(l));
  assert.ok(at(/^yarn install/) < at(/^yarn run prod/));
  assert.ok(at(/^composer install/) < at(/jigsaw build production/));
});
