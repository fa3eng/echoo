import { Ora } from 'ora'
import template from 'art-template'
import chalk from 'chalk'
import fs, { accessSync, readFileSync, writeFileSync } from 'fs'
import { createListPrompt, makeBackupPath } from '../../../base/index.js'
import { IActionsResult } from '../../../types/index.js'
import { abortOperation } from '../abortOperation/index.js'
import { isRegExp } from '../../../base/utility/isRegExp.js'

const append = async function (
  item: IActionsResult,
  spinner: Ora
): Promise<void> {
  const { data, templatePath, path, pattern } = item

  let howOperation = null

  try {
    accessSync(path)

    if (data == null) {
      const resultString = readFileSync(templatePath).toString()
      appendType(path, resultString, spinner, item, pattern)
    }

    const resultString = template(templatePath, data)
    appendType(path, resultString, spinner, item, pattern)
  } catch {
    const result = await createListPrompt({
      type: 'list',
      name: 'handleFileExistsError',
      message: `${chalk.red(
        `[ERROR WARNING] action ${chalk.underline(item.description)} 所要修改的目标文件不存在`
      )}\n\n\t${chalk.blueBright('path')}: ${item.path}\n\n`,
      choices: [
        {
          name: '取消命令 (此前的操作将会全部复原)',
          value: 'abort'
        },
        {
          name: '跳过本次 action (后续的 actions 将会执行)',
          value: 'skip'
        }
      ]
    })

    howOperation = result.handleFileExistsError
  }

  if (howOperation === 'skip') {
    spinner.fail(
      `${chalk.yellowBright(`[${item.count}] 跳过 Action`)}: ${item.description}`
    )
    return
  }

  if (howOperation === 'abort') {
    abortOperation()
  }
}

const appendType = function (
  path: string,
  resultString: string,
  spinner: Ora,
  item: IActionsResult,
  pattern?: string
): void {
  if (pattern === undefined) {
    throw Error('pattern 不能为空')
  }

  // pattern 一般都是需要匹配到某一个位置的后面 pattern: /(?<=@echoo-router-import\n)/,
  // pattern 支持自定义正则, 也允许用户使用默认规则 -> 定位到 pattern 字符串的下一行
  const pattern_ = isRegExp(pattern)
    ? pattern
    : new RegExp(`/(?<=${pattern})\n/`)

  const fileContent = readFileSync(path).toString()

  // 备份
  const backupPath = makeBackupPath(path)
  try {
    // 存在对一个文件进行多次 append , 因此如果备份文件已经存在了, 将不执行备份操作
    accessSync(backupPath)
  } catch {
    fs.writeFileSync(backupPath, fileContent)
  }

  const resultContent = fileContent.replace(pattern_, resultString)

  try {
    writeFileSync(path, resultContent)

    spinner.succeed(
      `${chalk.greenBright(`[${item.count}] 执行 Action`)}: ${item.description}`
    )
  } catch (err) {
    console.error(err)
  }
}

export { append }
