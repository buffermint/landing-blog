// BM-47: the built posts.js must not throw on pages without #blog-scroll-position; the bar still works where it exists.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { asset } from './helpers.mjs';

const code = readFileSync(asset('/js/posts.js'), 'utf8');

function load(bar) {
  const listeners = {};
  const window = {
    innerHeight: 1000,
    pageYOffset: 500,
    addEventListener: (type, fn) => (listeners[type] = fn),
  };
  const document = {
    body: { scrollHeight: 3000 },
    getElementById: (id) => (id === 'blog-scroll-position' ? bar : null),
  };
  window.window = window;
  window.document = document;
  vm.runInNewContext(code, { window, document, self: window });
  assert.equal(typeof listeners.scroll, 'function', 'posts.js listens to scroll');
  return () => listeners.scroll({});
}

test('no error on a page without the progress bar', () => {
  const scroll = load(null);
  assert.doesNotThrow(scroll);
});

test('the progress bar width follows the scroll position', () => {
  const bar = { style: {} };
  load(bar)();
  assert.equal(bar.style.width, '25%'); // 500 of (3000 - 1000)
});
