// BLOG-PLAN.md's open topics feed the scheduled post lanes (company/blog-workflow.md). A topic that reuses a post's
// `keyword:` would fail tests/posts.test.mjs only after the post is written, and a link to a hidden or renamed tool
// would ship in it, so both are caught here, while the topic is still a plan. Reads files only. The tool catalogue is
// a sibling repo that other lanes change, so a bad /tools/ link is a diagnostic, not a failure: a tools lane must not
// fail every landing lane.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './helpers.mjs';

const POSTS = join(root, 'source/_posts');
const TOOLS = join(root, '..', 'buffermint-tools');
// The batch with the full field set and its evidence in Appendix C (later top-ups date their own evidence).
const BATCH = { first: 33, last: 47 };

function parseTopics(plan) {
  const body = plan.split(/^## Old posts/m)[0];
  return body.split(/^### /m).slice(1).flatMap((text) => {
    const section = text.split(/^## /m)[0];
    const head = section.match(/^(\d+)\.\s/);
    if (!head) return [];
    const field = (name) => section.match(new RegExp(`^- \\*\\*${name}:\\*\\*(.*)$`, 'm'))?.[1] ?? '';
    return [{
      number: Number(head[1]),
      section,
      field,
      keywords: [...field('Keyword').matchAll(/`([^`]+)`/g)].map((m) => m[1].toLowerCase()),
      status: field('Status').trim().split(/\s/)[0],
    }];
  });
}

const isOpen = ({ status }) => status === 'todo' || status === 'writing';

// `keyword: foo   # comment` as in BLOG-PLAN.md's template: posts.test.mjs's parsePost drops the comment, so do the same
function keywordOf(text) {
  const m = text.match(/^keyword:[ \t]*(.*)$/m);
  return m ? m[1].replace(/\s+#.*$/, '').trim().replace(/^["']|["']$/g, '').toLowerCase() : null;
}

const postKeywords = () => readdirSync(POSTS).flatMap((name) => {
  const keyword = keywordOf(readFileSync(join(POSTS, name), 'utf8'));
  return keyword ? [[keyword, name]] : [];
});

const plan = readFileSync(join(root, 'BLOG-PLAN.md'), 'utf8');
const topics = parseTopics(plan);
const open = topics.filter(isOpen);

test('parseTopics reads keywords and status, and stops before the old posts', () => {
  const sample = '### 1. A · `next`\n- **Keyword:** `Foo Bar` (level 4), `baz`.\n- **Status:** todo\n\n'
    + '### 2. B · `now`\n- **Keyword:** `qux`\n- **Status:** published 2026-10-29 → `/articles/b`\n\n'
    + '## Old posts\n### 3. C\n- **Keyword:** `no`\n';
  const parsed = parseTopics(sample);
  assert.deepEqual(parsed.map((t) => t.keywords), [['foo bar', 'baz'], ['qux']]);
  assert.deepEqual(parsed.filter(isOpen).map((t) => t.number), [1]);
});

test('keywordOf drops quotes and a trailing comment', () => {
  assert.equal(keywordOf('---\nkeyword: Compress PDF   # the target\n---'), 'compress pdf');
  assert.equal(keywordOf('---\nkeyword: "heic to jpg"\n---'), 'heic to jpg');
  assert.equal(keywordOf('---\ntitle: x\n---'), null);
});

test('the plan parses: numbered topics, each with a keyword and a status', () => {
  assert.ok(topics.length >= 47, `only ${topics.length} topics: the parser broke`);
  const numbers = topics.map((t) => t.number);
  assert.equal(new Set(numbers).size, numbers.length, 'topic numbers repeat');
  for (const t of topics) {
    assert.ok(t.keywords.length, `topic ${t.number}: no \`keyword\``);
    assert.ok(t.status, `topic ${t.number}: no Status`);
  }
});

// `todo` only: a `writing` topic's own post carries its keyword
test('no unwritten topic targets a keyword a post already uses', () => {
  const taken = new Map(postKeywords());
  assert.ok(taken.size >= 10, 'post keywords not read');
  const clashes = open.filter((t) => t.status === 'todo').flatMap((t) => t.keywords.filter((k) => taken.has(k)).map((k) => `topic ${t.number}: ${k} (${taken.get(k)})`));
  assert.deepEqual(clashes, []);
});

test('no two open topics target the same keyword', () => {
  const seen = new Map();
  for (const t of open) for (const k of t.keywords) {
    assert.ok(!seen.has(k), `${k}: topics ${seen.get(k)} and ${t.number}`);
    seen.set(k, t.number);
  }
});

test('open topics link only real pages', (t) => {
  const links = (t) => [...t.section.matchAll(/(?<![\w./-])\/(tools\/[\w-]+\/[\w-]+|articles\/[\w-]+)/g)].map((m) => m[1]);
  for (const topic of open) for (const link of links(topic).filter((l) => l.startsWith('articles/'))) {
    assert.ok(existsSync(join(POSTS, `${link.split('/')[1]}.blade.md`)), `topic ${topic.number}: /${link} is not a post`);
  }
  if (!existsSync(join(TOOLS, 'TOOL-STATUS.json'))) return;
  const catalogue = JSON.parse(readFileSync(join(TOOLS, 'TOOL-STATUS.json'), 'utf8')).tools;
  const hidden = JSON.parse(readFileSync(join(TOOLS, 'src/hidden.json'), 'utf8')).tools;
  for (const topic of open) for (const link of links(topic).filter((l) => l.startsWith('tools/'))) {
    const [, category, slug] = link.split('/');
    if (catalogue[slug]?.category !== category) t.diagnostic(`topic ${topic.number}: /${link} is not in the catalogue`);
    if (hidden.includes(slug)) t.diagnostic(`topic ${topic.number}: /${link} is hidden`);
  }
});

test('the 2026-10-31 batch carries evidence, intent, an angle and 2+ internal links', () => {
  const batch = topics.filter((t) => t.number >= BATCH.first && t.number <= BATCH.last);
  const appendixC = plan.split(/^## Appendix C/m)[1] ?? '';
  assert.equal(batch.length, BATCH.last - BATCH.first + 1);
  for (const t of batch) {
    assert.match(t.field('Keyword'), /level \d/, `topic ${t.number}: no autosuggest level`);
    for (const k of t.keywords.filter((k) => k !== 'show hn')) { // every Show HN contains the phrase, so no row
      assert.ok(appendixC.includes(`\n| ${k} |`), `topic ${t.number}: ${k} has no row in Appendix C`);
    }
    assert.ok(t.field('Search intent').trim(), `topic ${t.number}: no search intent`);
    assert.ok(t.field('New angle').trim(), `topic ${t.number}: no new angle`);
    assert.match(t.section, /^- \*\*Sources:\*\*.*https?:\/\//m, `topic ${t.number}: sources need full URLs`);
    const internal = new Set([...t.field('Internal links').matchAll(/\/(?:tools|articles)\/[\w/-]+/g)].map((m) => m[0]));
    assert.ok(internal.size >= 2, `topic ${t.number}: ${internal.size} internal links`);
  }
});
