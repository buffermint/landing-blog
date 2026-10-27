// BM-46: the Vue blog cards use the WebP copy where one exists, with the original <img> as the fallback.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { asset, build, built, root } from './helpers.mjs';

const require = createRequire(import.meta.url);
const Vue = require('vue/dist/vue.runtime.common.prod.js');
const compiler = require('vue-template-compiler');
Vue.config.productionTip = false;
Vue.config.devtools = false;

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

// Render ArticleCard.vue to a VNode tree (no DOM needed) from its own template.
function renderCard(article) {
  const sfc = compiler.parseComponent(readFileSync(join(root, 'source/_assets/js/components/Blog/ArticleCard.vue'), 'utf8'));
  const { render, staticRenderFns, errors } = compiler.compileToFunctions(sfc.template.content);
  assert.deepEqual(errors ?? [], []);
  const Card = Vue.extend({ props: ['article'], render, staticRenderFns });
  return new Card({ propsData: { article } })._render();
}

function find(vnode, tag, out = []) {
  if (vnode.tag === tag) out.push(vnode);
  (vnode.children || []).forEach((c) => find(c, tag, out));
  return out;
}

test('a card with a WebP copy renders <picture> with a WebP <source> before the original <img>', () => {
  const card = renderCard({ title: 'T', image: 'assets/img/uploads/a.jpeg', webp: 'assets/img/uploads/a.webp', link: '/x' });
  const [picture] = find(card, 'picture');
  assert.ok(picture);
  const kids = picture.children.filter((c) => c.tag);
  assert.deepEqual(kids.map((c) => c.tag), ['source', 'img']);
  assert.deepEqual(kids[0].data.attrs, { type: 'image/webp', srcset: '/assets/img/uploads/a.webp' });
  assert.equal(kids[1].data.attrs.src, '/assets/img/uploads/a.jpeg');
  assert.equal(kids[1].data.attrs.alt, 'T');
  assert.equal(kids[1].data.staticClass, 'card-img-top', 'the card image styles still match');
});

test('a card without a WebP copy renders only the original <img>', () => {
  const card = renderCard({ title: 'T', image: 'assets/img/uploads/b.jpeg', webp: null, link: '/x' });
  assert.equal(find(card, 'source').length, 0);
  assert.equal(find(card, 'img')[0].data.attrs.src, '/assets/img/uploads/b.jpeg');
});

test('the built main.js carries the WebP <source>', () => {
  const js = readFileSync(asset('/js/main.js'), 'utf8');
  assert.match(js, /image\/webp/);
  assert.match(js, /article\.webp/);
});
