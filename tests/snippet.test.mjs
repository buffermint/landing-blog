// Review fix 1: getSnippet cuts by characters (a split em dash made json_encode fail and index.json empty),
// and GenerateIndex throws on bad JSON instead of writing an empty file.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { root, build } from './helpers.mjs';

// Runs config.php's getSnippet on a fake page whose content is the given text
function snippet(text) {
  const php = `require 'vendor/autoload.php'; $c = require 'config.php';
    $page = new class($argv[1]) { function __construct(public $t) {} function getContent() { return $this->t; } };
    echo json_encode(['s' => $c['getSnippet']($page)], JSON_THROW_ON_ERROR);`;
  const run = spawnSync('php', ['-d', 'error_reporting=E_ALL & ~E_DEPRECATED', '-r', php, '--', text], { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  return JSON.parse(run.stdout).s;
}

test('a multi-byte character at the cut stays whole', () => {
  const s = snippet('a'.repeat(254) + '—x and more words after it');
  assert.ok(s.endsWith('...'), s);
  assert.ok(!s.includes('�'));
  assert.ok([...s.replace(/\.\.\.$/, '')].length <= 255);
});

test('a short text with curly quotes comes back unchanged', () => {
  assert.equal(snippet('It’s “fine” — really'), 'It’s “fine” — really');
});

test('index.json lists every post with a snippet', () => {
  const index = JSON.parse(readFileSync(join(build, 'index.json'), 'utf8'));
  assert.ok(index.length >= 20, `${index.length} posts`);
  for (const post of index) assert.ok(post.snippet.length > 0, post.link);
});

test('GenerateIndex fails loudly on invalid UTF-8', () => {
  const src = readFileSync(join(root, 'listeners/GenerateIndex.php'), 'utf8');
  for (const file of ['index.json', 'featured.json']) {
    assert.match(src, new RegExp(`/${file.replace('.', '\\.')}', json_encode\\([^)]*JSON_THROW_ON_ERROR\\)`), file);
  }
});
