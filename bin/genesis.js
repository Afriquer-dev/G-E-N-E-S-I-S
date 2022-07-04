#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const { showIntro } = require('../lib/custom-utils');

const authorData = {
  name: 've3Y',
  email: 'wilfredeveloper@gmail.com',
  licence: 'MIT'
};
showIntro(authorData);

program
  .version(pkg.version)
  .command('forge', 'Instantiate your project')
  .command('template', 'Manage your templates')
  .parse(process.argv);