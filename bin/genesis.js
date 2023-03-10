#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const { showIntro } = require('../lib/custom-utils');
const { authorData } = require('../lib/config-genesis-cli');

showIntro(authorData);
const isWindows = process.platform === 'win32';


program
  .version(pkg.version)
  .command('forge', 'Instantiate your project')
  .command('template', 'Manage your templates')
  .parse(process.argv);