// BM-46: post covers (jarallax inline background-image) offer the WebP copy and keep the original as the fallback.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { built, htmlFiles } from './helpers.mjs';

const covers = htmlFiles().flatMap((file) =>
  [...readFileSync(file, 'utf8').matchAll(/<section[^>]*data-jarallax[^>]*style="([^"]*)"/g)].map((m) => ({ file, style: m[1] })),
);

test('post pages have jarallax covers', () => {
  assert.ok(covers.length >= 10, `found ${covers.length} covers`);
});

test('each cover with a WebP copy offers it through image-set() after a plain url() fallback', () => {
  let withWebp = 0;
  for (const { file, style } of covers) {
    const original = style.match(/^background-image: url\((\/assets\/img\/uploads\/[^)]+\.(?:jpe?g|png|webp|avif))\);/i);
    assert.ok(original, `${file}: the cover starts with a plain url() (${style})`);
    assert.ok(existsSync(built(original[1])), `${file}: ${original[1]} exists`);
    const webp = original[1].replace(/\.(jpe?g|png)$/i, '.webp');
    const set = style.match(/background-image: image-set\(url\(([^)]+)\) type\('image\/webp'\), url\(([^)]+)\) type\('image\/(?:jpeg|png)'\)\);/);
    if (webp !== original[1] && existsSync(built(webp))) {
      assert.ok(set, `${file}: offers ${webp} (${style})`);
      assert.equal(set[1], webp);
      assert.equal(set[2], original[1], 'image-set() keeps the original as its fallback');
      withWebp++;
    } else {
      assert.equal(set, null, `${file}: no image-set() without a WebP copy`);
    }
  }
  assert.ok(withWebp >= 5, `${withWebp} covers use WebP`);
});

test('the style attribute stays well-formed (no double quotes inside it)', () => {
  for (const { file, style } of covers) {
    assert.ok(!style.includes('"'), file);
    assert.equal((style.match(/background-image:/g) || []).length <= 2, true, `${file}: rewritten once`);
  }
});
