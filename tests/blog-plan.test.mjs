// BLOG-PLAN.md's open topics feed the scheduled post lanes (company/blog-workflow.md). A topic that reuses a post's
// `keyword:` would fail tests/posts.test.mjs only after the post is written, and a link to a hidden or renamed tool
// would ship in it, so both are caught here, while the topic is still a plan. Reads files only; the tool catalogue is
// a sibling repo, so the /tools/ check is skipped where it isn't checked out.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './helpers.mjs';

const POSTS = join(root, 'source/_posts');
const TOOLS = join(root, '..', 'buffermint-tools');
// Topics from here on carry the full field set; 1-32 were written before these fields were asked for.
const FIRST_FULL_TOPIC = 33;

export function parseTopics(plan) {
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

export const isOpen = ({ status }) => status === 'todo' || status === 'writing';

const postKeywords = () => readdirSync(POSTS).flatMap((name) => {
  const m = readFileSync(join(POSTS, name), 'utf8').match(/^keyword:\s*["']?(.*?)["']?\s*$/m);
  return m ? [[m[1].toLowerCase(), name]] : [];
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

test('the plan parses: numbered topics, each with a keyword and a status', () => {
  assert.ok(open.length >= 10, `only ${open.length} open topics: the plan is low or the parser broke`);
  const numbers = topics.map((t) => t.number);
  assert.equal(new Set(numbers).size, numbers.length, 'topic numbers repeat');
  for (const t of topics) {
    assert.ok(t.keywords.length, `topic ${t.number}: no \`keyword\``);
    assert.ok(t.status, `topic ${t.number}: no Status`);
  }
});

test('no open topic targets a keyword a post already uses', () => {
  const taken = new Map(postKeywords());
  assert.ok(taken.size >= 10, 'post keywords not read');
  const clashes = open.flatMap((t) => t.keywords.filter((k) => taken.has(k)).map((k) => `topic ${t.number}: ${k} (${taken.get(k)})`));
  assert.deepEqual(clashes, []);
});

test('no two open topics target the same keyword', () => {
  const seen = new Map();
  for (const t of open) for (const k of t.keywords) {
    assert.ok(!seen.has(k), `${k}: topics ${seen.get(k)} and ${t.number}`);
    seen.set(k, t.number);
  }
});

test('open topics link only real pages', () => {
  const links = (t) => [...t.section.matchAll(/(?<![\w./-])\/(tools\/[\w-]+\/[\w-]+|articles\/[\w-]+)/g)].map((m) => m[1]);
  for (const t of open) for (const link of links(t).filter((l) => l.startsWith('articles/'))) {
    assert.ok(existsSync(join(POSTS, `${link.split('/')[1]}.blade.md`)), `topic ${t.number}: /${link} is not a post`);
  }
  if (!existsSync(join(TOOLS, 'TOOL-STATUS.json'))) return;
  const catalogue = JSON.parse(readFileSync(join(TOOLS, 'TOOL-STATUS.json'), 'utf8')).tools;
  const hidden = JSON.parse(readFileSync(join(TOOLS, 'src/hidden.json'), 'utf8')).tools;
  const isHidden = (slug) => (Array.isArray(hidden) ? hidden.includes(slug) : slug in hidden);
  for (const t of open) for (const link of links(t).filter((l) => l.startsWith('tools/'))) {
    const [, category, slug] = link.split('/');
    assert.equal(catalogue[slug]?.category, category, `topic ${t.number}: /${link} is not in the catalogue`);
    assert.ok(!isHidden(slug), `topic ${t.number}: /${link} is hidden`);
  }
});

test('new topics carry evidence, intent, an angle and 2+ internal links', () => {
  const batch = topics.filter((t) => t.number >= FIRST_FULL_TOPIC);
  const appendixC = plan.split(/^## Appendix C/m)[1] ?? '';
  assert.ok(batch.length >= 12, `${batch.length} new topics`);
  for (const t of batch) {
    assert.match(t.field('Keyword'), /level \d/, `topic ${t.number}: no autosuggest level`);
    for (const k of t.keywords.filter((k) => k !== 'show hn')) {
      assert.ok(appendixC.includes(`\n| ${k} |`), `topic ${t.number}: ${k} has no row in Appendix C`);
    }
    assert.ok(t.field('Search intent').trim(), `topic ${t.number}: no search intent`);
    assert.ok(t.field('New angle').trim(), `topic ${t.number}: no new angle`);
    assert.match(t.section, /^- \*\*Sources:\*\*.*https?:\/\//m, `topic ${t.number}: sources need full URLs`);
    const internal = new Set([...t.field('Internal links').matchAll(/\/(?:tools|articles)\/[\w/-]+/g)].map((m) => m[0]));
    assert.ok(internal.size >= 2, `topic ${t.number}: ${internal.size} internal links`);
  }
});
