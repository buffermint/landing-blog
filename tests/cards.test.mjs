// BM-46: index.json/featured.json give each card its WebP copy where one exists. (The Vue ArticleCard that read the
// webp field was never mounted on a page and went with Vue 2 in BM-48; the cards on the pages come from Blade.)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { build, built } from './helpers.mjs';

for (const feed of ['index.json', 'featured.json']) {
  test(`${feed}: every card has an existing image and a webp field only when the WebP copy exists`, () => {
    const posts = JSON.parse(readFileSync(join(build, feed), 'utf8'));
    assert.ok(posts.length > 0);
    let withWebp = 0;
    for (const post of posts) {
      assert.ok(existsSync(built(post.image)), `${post.image} exists`);
      const copy = post.image.replace(/\.(jpe?g|png)$/i, '.webp');
      if (existsSync(built(copy))) {
        assert.equal(post.webp, copy, post.title);
        withWebp++;
      } else {
        assert.equal(post.webp, null, post.title);
      }
    }
    assert.ok(withWebp > 0, `${feed}: some cards use WebP`);
  });
}
