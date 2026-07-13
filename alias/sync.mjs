#!/usr/bin/env node
// Keeps the unscoped alias in lockstep with the root package: version, dependency
// pin, and description. Runs via the root "version" lifecycle script, so every
// `npm version` bump stages the alias into the same release commit + tag.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(here, '../package.json'), 'utf8'));
const aliasPath = resolve(here, 'package.json');
const alias = JSON.parse(readFileSync(aliasPath, 'utf8'));

alias.version = pkg.version;
alias.dependencies['@heart-it/react-brain'] = `^${pkg.version}`;
alias.description = `${pkg.description} Official alias of @heart-it/react-brain.`;

// the npm registry hard-truncates descriptions at 255 chars (both packages shipped
// ending mid-phrase at "and a 9-tool" before this guard)
if (alias.description.length > 255) {
  console.error(`✗ alias description ${alias.description.length} chars — registry truncates at 255; shorten the root description`);
  process.exit(1);
}

writeFileSync(aliasPath, JSON.stringify(alias, null, 2) + '\n');
console.log(`alias synced → react-brain@${alias.version}`);
