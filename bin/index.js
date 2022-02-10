#!/usr/bin/env node
import { createRequire } from 'module'
import { program } from '../dist/cli.js'
// 这种方式实属无奈, 因为 Node.js 对于 JSON-modules 的支持还处于实验性阶段
// 因此如果要使用在 esm 中引入 JSON 需要用这种方式
// https://stackoverflow.com/questions/60205891/import-json-extension-in-es6-node-js-throws-an-error
const require = createRequire(import.meta.url)
const { version } = require('../package.json')

program.name('echoo').version(version).parse()
