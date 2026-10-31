// BLOG-PLAN.md's open topics feed the scheduled post lanes (company/blog-workflow.md). A topic that reuses a post's
// `keyword:` would fail tests/posts.test.mjs only after the post is written, so this catches it while the topic is
// still a plan. A /tools/ link that is dead or hidden fails here too, in a post or an open topic: seo-check skips
// /tools/, and a dead link in a topic gets copied into its post. The catalogue is a sibling repo, so without a
// checkout that test skips and says why. A topic's target is the first keyword on its line; the others are context.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parsePost, root, siteOf } from './helpers.mjs';

const POSTS = join(root, 'source/_posts');
const TOOLS = join(root, '..', 'buffermint-tools');
// From this topic on, each has the full field set and its evidence in an appendix (Appendix C, and later top-ups').
const FULL_FIELDS_FROM = 33;

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

// Counted as tests/posts.test.mjs counts a post's Sources, so a topic that passes here can pass there
const sourceSites = (text) => new Set([...text.matchAll(/https?:\/\/[^\s),]+/g)].map((m) => siteOf(m[0])).filter(Boolean));

// What build.mjs reads: src/<category>/_tools.json, minus internal workflow steps, which have no page of their own.
// Throws when anything is missing or has changed shape, so a broken checkout never reads as dead links.
function readCatalogue(toolsDir) {
  const read = (file) => JSON.parse(readFileSync(join(toolsDir, file), 'utf8'));
  const categories = new Map(readdirSync(join(toolsDir, 'src')).filter((dir) => existsSync(join(toolsDir, 'src', dir, '_tools.json'))).map((dir) => {
    const tools = read(`src/${dir}/_tools.json`);
    if (!Array.isArray(tools) || !tools.every((tool) => tool.slug)) throw new Error(`unexpected shape in src/${dir}/_tools.json`);
    return [dir, new Set(tools.filter((tool) => !tool.internal).map((tool) => tool.slug))];
  }));
  const { tools: hidden } = read('src/hidden.json');
  const workflows = read('src/recipes-live.json');
  if (!categories.size || !Array.isArray(hidden) || !Array.isArray(workflows)) throw new Error('unexpected shape');
  return { categories, hidden: new Set(hidden), workflows: new Set(workflows) };
}

// Site-relative or on buffermint.com; /assets/tools/, ~/tools/, ?u=/tools/ and example.com/tools/ don't count. A
// sentence's full stop is not part of the link.
const toolLinks = (text) => [...text.matchAll(/(?:(?<![\w.-])(?:www\.)?[Bb]uffer[Mm]int\.com|(?<![\w./~=-]))\/tools\/((?:[\w.-]+\/?)*)/g)]
  .map((m) => m[1].replace(/\.+$/, '').split('/').filter(Boolean));

// build.mjs and src/static publish these beside the tool pages, and the catalogue can't say anything about them
const TOP_FILES = new Set(['feed.xml', 'llms-full.txt', 'llms.txt', 'manifest.webmanifest', 'robots.txt', 'sitemap.xml', 'tools.json']);
const OTHER_ROOTS = new Set(['assets', 'data', 'embed']);

// Why a link under /tools/ is dead, or null. Hidden tools count: they are unlisted and noindex.
function deadReason(path, { categories, hidden, workflows }) {
  const [category, slug, ...rest] = path;
  if (!category || OTHER_ROOTS.has(category) || (path.length === 1 && TOP_FILES.has(category))) return null;
  if (category === 'workflows') return !rest.length && (slug ? workflows.has(slug) : workflows.size) ? null : 'is not a live workflow';
  const tools = categories.get(category);
  if (!slug) return [...tools ?? []].some((name) => !hidden.has(name)) ? null : 'is not a category with listed tools';
  if (rest.length || !tools?.has(slug)) return 'is not in the catalogue';
  return hidden.has(slug) ? 'is hidden' : null;
}

// sources: [{ name, text }]
const toolLinkProblems = (sources, catalogue) => [...new Set(sources.flatMap(({ name, text }) => toolLinks(text).flatMap((path) => {
  const reason = deadReason(path, catalogue);
  return reason ? [`${name}: /tools/${path.join('/')}/ ${reason}`] : [];
})))];

const postSources = (dir) => readdirSync(dir).filter((f) => f.endsWith('.md')).map((name) => ({
  name,
  text: readFileSync(join(dir, name), 'utf8'),
}));
// A post's code samples and comments aren't links: a post about an API can show `POST /tools/call`. A topic's backticks can be one.
const withoutCode = (text) => text.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~|<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>|<!--[\s\S]*?-->|`[^`\n]*`/g, '');
// A draft is not on the site yet, as in tests/posts.test.mjs; it answers to this gate when it is published
const livePostSources = (dir) => postSources(dir).flatMap(({ name, text }) => {
  const { meta, body } = parsePost(text, name);
  return meta.published === 'false' ? [] : [{ name, text: withoutCode(body) }];
});
const topicSources = (openTopics) => openTopics.map((topic) => ({ name: `topic ${topic.number}`, text: topic.section }));

// null with no checkout. A checkout that is there but corrupt, partial or reshaped throws: a skip would switch the
// gate off unseen.
function checkToolLinks(toolsDir, postsDir, openTopics) {
  if (!existsSync(toolsDir)) return null;
  return toolLinkProblems([...livePostSources(postsDir), ...topicSources(openTopics)], readCatalogue(toolsDir));
}

const articleLinks = (topic) => [...topic.section.matchAll(/(?<![\w./-])\/articles\/([\w-]+)/g)].map((m) => m[1]);

const postKeywords = () => postSources(POSTS).flatMap(({ name, text }) => {
  const { keyword } = parsePost(text, name).meta;
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
    assert.match(t.status, /^(todo|writing|published)$/, `topic ${t.number}: Status must start with todo, writing or published`);
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

test('open topics link only real posts', () => {
  for (const topic of open) for (const slug of articleLinks(topic)) {
    assert.ok(existsSync(join(POSTS, `${slug}.blade.md`)), `topic ${topic.number}: /articles/${slug} is not a post`);
  }
});

test('every /tools/ link in a post or an open topic is live and listed', (t) => {
  const problems = checkToolLinks(TOOLS, POSTS, open);
  if (!problems) return t.skip('tool links not checked: no ../buffermint-tools checkout here');
  assert.deepEqual(problems, []);
});

test('toolLinks finds site and buffermint.com links, and nothing else', () => {
  const text = '[a](/tools/pdf/ok/) <a href="/tools/pdf/two">b</a> https://buffermint.com/tools/dev/abs/#x, www.buffermint.com/tools/dev/www/?a=1 '
    + 'HTTPS://BufferMint.com/tools/dev/caps/ See /tools/dev/end. /tools/seo/ /tools/ /tools /assets/tools/a/b/ ~/tools/bin/ https://x.io?u=/tools/h/i '
    + 'https://example.com/tools/c/d/ https://notbuffermint.com/tools/e/f/ tools.pdf24.org/en/g /TOOLS/j/k/';
  assert.deepEqual(toolLinks(text).map((p) => p.join('/')), ['pdf/ok', 'pdf/two', 'dev/abs', 'dev/www', 'dev/caps', 'dev/end', 'seo', '']);
});

test('withoutCode drops a post\'s code samples, so their paths are not links', () => {
  const text = 'A `POST /tools/call`\n```\ncurl /tools/list\n```\n~~~\n/tools/a\n~~~\n<pre><code>/tools/b</code></pre>\n<code>GET /tools/c</code> <!-- /tools/d/ -->\n[x](/tools/dev/hash/)';
  assert.deepEqual(toolLinks(withoutCode(text)), [['dev', 'hash']]);
});

test('toolLinkProblems fails a fixture post and topic with dead links, and passes live ones', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tool-links-'));
  try {
    assert.throws(() => readCatalogue(dir), /ENOENT/, 'no checkout');
    for (const sub of ['src/pdf', 'src/text', 'src/dev', 'posts']) mkdirSync(join(dir, sub), { recursive: true });
    assert.throws(() => readCatalogue(dir), /ENOENT/, 'src/hidden.json is missing');
    writeFileSync(join(dir, 'src/pdf/_tools.json'), JSON.stringify([{ slug: 'ok' }, { slug: 'secret' }, { slug: 'step', internal: true }]));
    writeFileSync(join(dir, 'src/text/_tools.json'), JSON.stringify([{ slug: 'shy' }]));
    writeFileSync(join(dir, 'src/dev/_tools.json'), JSON.stringify([{ slug: 'hash' }]));
    writeFileSync(join(dir, 'src/hidden.json'), JSON.stringify({ tools: ['secret', 'shy'] }));
    writeFileSync(join(dir, 'src/recipes-live.json'), JSON.stringify(['merge']));
    const catalogue = readCatalogue(dir);

    writeFileSync(join(dir, 'posts/live.blade.md'), 'See [ok](/tools/pdf/ok/), [all](/tools/), [pdf](/tools/pdf/), [flow](/tools/workflows/merge/), [hub](/tools/workflows/), [llms](/tools/llms.txt), [embed](/tools/embed/pdf/ok/), [logo](/tools/assets/brand/logo.svg), [data](/tools/data/emoji.json).');
    assert.deepEqual(toolLinkProblems(postSources(join(dir, 'posts')), catalogue), []);

    writeFileSync(join(dir, 'posts/dead.blade.md'), 'A [gone](/tools/pdf/gone/), twice (/tools/pdf/gone/), [hidden](/tools/pdf/secret/), [wrong](/tools/dev/ok/), '
      + '[deep](/tools/pdf/ok/more/), [cat](/tools/nope/), [hidden cat](/tools/text/), [flow](/tools/workflows/old/), [step](/tools/pdf/step/), [more](/tools/workflows/merge/x/), [file](/tools/pdf/gone.html), [typo](/tools/llm.txt).');
    const topic = { number: 7, section: 'Internal links: `/tools/pdf/secret/`, /tools/pdf/ok/.' };
    assert.deepEqual(toolLinkProblems([...postSources(join(dir, 'posts')), ...topicSources([topic])], catalogue), [
      'dead.blade.md: /tools/pdf/gone/ is not in the catalogue',
      'dead.blade.md: /tools/pdf/secret/ is hidden',
      'dead.blade.md: /tools/dev/ok/ is not in the catalogue',
      'dead.blade.md: /tools/pdf/ok/more/ is not in the catalogue',
      'dead.blade.md: /tools/nope/ is not a category with listed tools',
      'dead.blade.md: /tools/text/ is not a category with listed tools',
      'dead.blade.md: /tools/workflows/old/ is not a live workflow',
      'dead.blade.md: /tools/pdf/step/ is not in the catalogue',
      'dead.blade.md: /tools/workflows/merge/x/ is not a live workflow',
      'dead.blade.md: /tools/pdf/gone.html/ is not in the catalogue',
      'dead.blade.md: /tools/llm.txt/ is not a category with listed tools',
      'topic 7: /tools/pdf/secret/ is hidden',
    ]);

    writeFileSync(join(dir, 'src/recipes-live.json'), '[]');
    assert.equal(deadReason(['workflows'], readCatalogue(dir)), 'is not a live workflow', 'no workflows, no hub');

    writeFileSync(join(dir, 'src/pdf/_tools.json'), '{}');
    assert.throws(() => readCatalogue(dir), /unexpected shape/, 'a changed schema');
  } finally {
    rmSync(dir, { recursive: true });
  }
});

test('sourceSites counts a publisher once, like the post gate', () => {
  assert.deepEqual([...sourceSites('https://docs.stripe.com/a, https://stripe.com/us/pricing (found), https://www.gov.uk/x')], ['stripe.com', 'gov.uk']);
});

test('topics from 33 on carry evidence, intent, an angle, 4+ source sites and 2+ internal links', () => {
  const batch = topics.filter((t) => t.number >= FULL_FIELDS_FROM);
  const appendices = plan.split(/^## Appendix/m).slice(1).join('');
  assert.ok(batch.length, 'no batch topics');
  for (const t of batch) {
    assert.match(t.field('Keyword'), /level \d/, `topic ${t.number}: no autosuggest level`);
    assert.ok(appendices.includes(`\n| ${t.keyword} |`), `topic ${t.number}: ${t.keyword} has no row in an appendix`);
    const title = t.section.split('\n')[0].replace(/^\d+\.\s*/, '').replace(/\s*·.*$/, '');
    assert.ok(title.length <= 65, `topic ${t.number}: title is ${title.length} characters`);
    assert.ok(t.field('Search intent').trim(), `topic ${t.number}: no search intent`);
    assert.ok(t.field('New angle').trim(), `topic ${t.number}: no new angle`);
    const sites = sourceSites(t.field('Sources'));
    assert.ok(sites.size >= 4, `topic ${t.number}: ${sites.size} source sites, need 4`);
    const internal = new Set([...t.field('Internal links').matchAll(/\/(?:tools|articles)\/[\w/-]+/g)].map((m) => m[0]));
    assert.ok(internal.size >= 2, `topic ${t.number}: ${internal.size} internal links`);
  }
});

test('checkToolLinks skips with no checkout, fails a broken one, and covers live posts and open topics', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tool-gate-'));
  const tools = join(dir, 'tools');
  const posts = join(dir, 'posts');
  const post = (name, front, body) => writeFileSync(join(posts, name), `---\ntitle: T\n${front}---\n${body}\n`);
  try {
    mkdirSync(posts);
    assert.equal(checkToolLinks(tools, posts, []), null, 'no checkout');

    mkdirSync(join(tools, 'src/pdf'), { recursive: true });
    writeFileSync(join(tools, 'src/pdf/_tools.json'), JSON.stringify([{ slug: 'ok' }]));
    writeFileSync(join(tools, 'src/hidden.json'), JSON.stringify({ tools: [] }));
    assert.throws(() => checkToolLinks(tools, posts, []), /ENOENT/, 'a partial checkout fails, it does not skip');

    writeFileSync(join(tools, 'src/recipes-live.json'), '[]');
    post('live.blade.md', '', '[ok](/tools/pdf/ok/) `/tools/sample/`');
    post('draft.blade.md', 'published: false\n', '[soon](/tools/pdf/soon/)');
    assert.deepEqual(checkToolLinks(tools, posts, []), [], 'a draft and a code sample are not links on the site');

    post('dead.blade.md', 'description: /tools/pdf/front/\n', '[gone](/tools/pdf/gone/)');
    assert.deepEqual(checkToolLinks(tools, posts, [{ number: 3, section: '`/tools/pdf/old/`' }]), [
      'dead.blade.md: /tools/pdf/gone/ is not in the catalogue',
      'topic 3: /tools/pdf/old/ is not in the catalogue',
    ]);
  } finally {
    rmSync(dir, { recursive: true });
  }
});
