// Review fix 3: "Suggested Articles" under a post lists its own category's posts first, in every case.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { root, build } from './helpers.mjs';

// config.php's suggestedPosts over fake posts [path, category], newest first
function suggested(page, posts) {
  const php = `require 'vendor/autoload.php'; $c = require 'config.php';
    $mk = fn ($p) => new class($p[0], $p[1]) { function __construct(public $path, public $category) {} function getPath() { return $this->path; } };
    [$page, $posts] = json_decode($argv[1], true);
    $all = collect($posts)->mapWithKeys(fn ($p) => [$p[0] => $mk($p)]);
    echo json_encode($c['suggestedPosts']($mk($page), $all)->map(fn ($p) => $p->path)->all());`;
  const run = spawnSync('php', ['-d', 'error_reporting=E_ALL & ~E_DEPRECATED', '-r', php, '--', JSON.stringify([page, posts])], { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  return JSON.parse(run.stdout);
}

const posts = [['/n1', null], ['/n2', 'b'], ['/a1', 'a'], ['/n3', null], ['/a2', 'a'], ['/a3', 'a'], ['/a4', 'a']];

test('3 or more same-category posts: only those, newest first', () => {
  assert.deepEqual(suggested(['/a1', 'a'], posts), ['/a2', '/a3', '/a4']);
});

test('fewer than 3: the category first, topped up with the newest others, no duplicates', () => {
  assert.deepEqual(suggested(['/n2', 'b'], [...posts, ['/b2', 'b']]), ['/b2', '/n1', '/a1']);
});

test('a post with no category gets the newest others', () => {
  assert.deepEqual(suggested(['/n3', null], posts), ['/n1', '/n2', '/a1']);
});

test('built posts suggest their category mates first', () => {
  const index = JSON.parse(readFileSync(join(build, 'index.json'), 'utf8'));
  const cat = (p) => p.categories[0]?.slug ?? null;
  let checked = 0;
  for (const post of index.filter((p) => cat(p))) {
    const html = readFileSync(join(build, post.link.replace(/^\//, ''), 'index.html'), 'utf8');
    const section = html.slice(html.indexOf('Suggested Articles'));
    const links = [...new Set([...section.matchAll(/href="(?:https?:\/\/[^/"]+)?(\/articles\/[^"#?]+?)\/?"/g)].map((m) => m[1]))];
    const mates = index.filter((p) => p.link !== post.link && cat(p) === cat(post)).map((p) => p.link.replace(/\/$/, ''));
    const want = mates.slice(0, 3);
    assert.deepEqual(links.slice(0, want.length), want, post.link);
    assert.ok(!links.slice(0, 3).includes(post.link.replace(/\/$/, '')), `${post.link} suggests itself`);
    checked++;
  }
  assert.ok(checked >= 5, `${checked} categorised posts`);
});
