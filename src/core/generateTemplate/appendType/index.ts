import { Ora } from 'ora'
import template from 'art-template'
import { accessSync, readFileSync, writeFileSync } from 'fs'
import { abortOperation } from '../abortOperation/index.js'
import { isRegExp } from '../utility/isRegExp.js'
import { handleErrorPrompt } from '../utility/handleErrorPrompt.js'
import { makeInfoMessage } from '../utility/makeMessage.js'
import { makeBackUpFile } from '../utility/makeBackupFile.js'
import { IActionAppend } from '../../../types/index.js'

const append = async function (
  item: IActionAppend,
  spinner: Ora
): Promise<void> {
  const { data, templatePath, path, pattern } = item

  try {
    accessSync(path)

    const resultString =
      data == null
        ? readFileSync(templatePath).toString()
        : template(templatePath, data)

    appendType(path, resultString, spinner, item, pattern)
  } catch {
    const howOperation = await handleErrorPrompt('append', item)

    if (howOperation === 'abort') {
      abortOperation()
      process.exit(1)
    }

    if (howOperation === 'skip') {
      spinner.fail(makeInfoMessage('skip', item))
    }
  }
}

const appendType = function (
  path: string,
  resultString: string,
  spinner: Ora,
  item: IActionAppend,
  pattern?: string | RegExp
): void {
  if (pattern === undefined) {
    throw Error('pattern 不能为空')
  }

  // pattern 一般都是需要匹配到某一个位置的后面 pattern: /(?<=@echoo-router-import\n)/,
  // pattern 支持自定义正则, 也允许用户使用默认规则 -> 定位到 pattern 字符串的下一行
  const pattern_ = isRegExp(pattern)
    ? pattern
    : new RegExp(`/(?<=${pattern as string})\n/`)

  const fileContent = readFileSync(path).toString()

  makeBackUpFile(path, fileContent)

  const resultContent = fileContent.replace(pattern_, resultString)

  try {
    writeFileSync(path, resultContent)

    spinner.succeed(makeInfoMessage('succeed', item))
  } catch (err) {
    console.error(err)
  }
}

export { append }
