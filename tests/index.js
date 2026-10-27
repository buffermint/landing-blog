// `node --test tests/` finds the *.test.mjs files itself on Node 20; Node 22 treats the argument as a path and
// loads this file instead, so load the same files from here.
const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const { pathToFileURL } = require('node:url');

for (const name of readdirSync(__dirname).filter((n) => n.endsWith('.test.mjs')).sort()) {
  import(pathToFileURL(join(__dirname, name)).href);
}
