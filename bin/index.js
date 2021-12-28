#!/usr/bin/env node
const { program } = require('../dist/cli')
const { version } = require('../package.json')

program
  .name('echoo')
  .version(version)
  .parse()
