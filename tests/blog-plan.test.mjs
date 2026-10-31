// BLOG-PLAN.md's open topics feed the scheduled post lanes (company/blog-workflow.md). A topic that reuses a post's
// `keyword:` would fail tests/posts.test.mjs only after the post is written, and a link to a hidden or renamed tool
// would ship in it. This catches the first while the topic is still a plan. It only reports the second, as a test
// diagnostic: the tool catalogue is a sibling repo that other lanes change, and a tools lane must not fail every
// landing lane. A topic's target is the first keyword on its line; the others are context.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parsePost, root } from './helpers.mjs';

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
      keyword: field('Keyword').match(/`([^`]+)`/)?.[1].toLowerCase(),
      status: field('Status').trim().split(/\s/)[0],
    }];
  });
}

const isOpen = ({ status }) => status === 'todo' || status === 'writing';

const postKeywords = () => readdirSync(POSTS).filter((f) => f.endsWith('.md')).flatMap((name) => {
  const { keyword } = parsePost(readFileSync(join(POSTS, name), 'utf8'), name).meta;
  return keyword ? [[keyword.toLowerCase(), name]] : [];
});

const plan = readFileSync(join(root, 'BLOG-PLAN.md'), 'utf8');
const topics = parseTopics(plan);
const open = topics.filter(isOpen);

test('parseTopics reads keywords and status, and stops before the old posts', () => {
  const sample = '### 1. A · `next`\n- **Keyword:** `Foo Bar` (level 4), `baz`.\n- **Status:** todo\n\n'
    + '### 2. B · `now`\n- **Keyword:** `qux`\n- **Status:** published 2026-10-29 → `/articles/b`\n\n'
    + '## Old posts\n### 3. C\n- **Keyword:** `no`\n';
  const parsed = parseTopics(sample);
  assert.deepEqual(parsed.map((t) => t.keyword), ['foo bar', 'qux']);
  assert.deepEqual(parsed.filter(isOpen).map((t) => t.number), [1]);
});

test('the plan parses: numbered topics, each with a keyword and a status', () => {
  assert.ok(topics.length >= 20, `only ${topics.length} topics: the parser broke`);
  const numbers = topics.map((t) => t.number);
  assert.equal(new Set(numbers).size, numbers.length, 'topic numbers repeat');
  for (const t of topics) {
    assert.ok(t.keyword, `topic ${t.number}: no \`keyword\``);
    assert.ok(t.status, `topic ${t.number}: no Status`);
  }
});

// `todo` only: a `writing` topic's own post carries its keyword
test('no unwritten topic targets a keyword a post already uses', () => {
  const taken = new Map(postKeywords());
  assert.ok(taken.size >= 10, 'post keywords not read');
  const clashes = open.filter((t) => t.status === 'todo' && taken.has(t.keyword)).map((t) => `topic ${t.number}: ${t.keyword} (${taken.get(t.keyword)})`);
  assert.deepEqual(clashes, []);
});

test('no two open topics target the same keyword', () => {
  const seen = new Map();
  for (const t of open) {
    assert.ok(!seen.has(t.keyword), `${t.keyword}: topics ${seen.get(t.keyword)} and ${t.number}`);
    seen.set(t.keyword, t.number);
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
  assert.ok(batch.length, 'no batch topics');
  for (const t of batch) {
    assert.match(t.field('Keyword'), /level \d/, `topic ${t.number}: no autosuggest level`);
    assert.ok(appendixC.includes(`\n| ${t.keyword} |`), `topic ${t.number}: ${t.keyword} has no row in Appendix C`);
    const title = t.section.split('\n')[0].replace(/^\d+\.\s*/, '').replace(/\s*·.*$/, '');
    assert.ok(title.length <= 65, `topic ${t.number}: title is ${title.length} characters`);
    assert.ok(t.field('Search intent').trim(), `topic ${t.number}: no search intent`);
    assert.ok(t.field('New angle').trim(), `topic ${t.number}: no new angle`);
    const hosts = new Set([...t.field('Sources').matchAll(/https?:\/\/([^/\s)]+)/g)].map((m) => m[1].replace(/^www\./, '')));
    assert.ok(hosts.size >= 4, `topic ${t.number}: ${hosts.size} source sites, need 4`);
    const internal = new Set([...t.field('Internal links').matchAll(/\/(?:tools|articles)\/[\w/-]+/g)].map((m) => m[0]));
    assert.ok(internal.size >= 2, `topic ${t.number}: ${internal.size} internal links`);
  }
});
