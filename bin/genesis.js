#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('project', 'Instantiate your project')
  .command('template', 'Manage your templates')
  .parse(process.argv);