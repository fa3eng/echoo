import template from 'art-template'
import fs, { accessSync } from 'fs'
import ps from 'path'
import { Ora } from 'ora'
import chalk from 'chalk'
import { createListPrompt, makeBackupPath } from '../../../base/index.js'
import { IActionsResult } from '../../../types/index.js'
import { abortOperation } from '../abortOperation/index.js'

const add = async function (item: IActionsResult, spinner: Ora): Promise<any> {
  const { data, templatePath, path } = item

  let howOperation = null
  item.isFileAlreadyExists = false

  try {
    accessSync(path)
    item.isFileAlreadyExists = true
  } catch {}

  if (item.isFileAlreadyExists) {
    spinner.stop()
    // 处理错误
    const result = await createListPrompt({
      type: 'list',
      name: 'handleFileExistsError',
      message: `${chalk.red(
        `[ERROR WARNING] Action: ${chalk.underline(item.description)} 所创建的文件已经存在`
      )}\n\n\t${chalk.blueBright('path')}: ${item.path}\n\n`,
      choices: [
        {
          name: '取消命令 (此前的操作将会全部复原)',
          value: 'abort'
        },
        {
          name: '跳过本次 action (后续的 actions 将会执行)',
          value: 'skip'
        },
        {
          name: '强制生成 (会覆盖原来的原本文件的内容, 请考虑清楚)',
          value: 'force'
        }
      ]
    })

    howOperation = result.handleFileExistsError
  }

  if (howOperation === 'abort') {
    abortOperation()
    process.exit(1)
  }

  if (howOperation === 'skip') {
    spinner.fail(
      `${chalk.yellowBright(`[${item.count}] 跳过 Action`)}: ${
        item.description
      }`
    )
    return
  }

  if (howOperation === 'force') {
    // 覆盖生成的话, 会存储一个文件到本地作为备份, 并且记录本次生成是强制覆盖的
    // 在执行替换之前, 给文件做一个备份, 防止出现错误
    const backupPath = makeBackupPath(path)
    fs.writeFileSync(backupPath, fs.readFileSync(path))
    item.isForce = true
  }

  if (data == null) {
    const resultString = fs.readFileSync(templatePath).toString()
    addType(path, resultString, item, spinner)
    return
  }

  const resultString = template(templatePath, data)
  addType(path, resultString, item, spinner)
}

const addType = function (
  path: string,
  resultString: string,
  item: IActionsResult,
  spinner: Ora
): void {
  item.createdPath = fs.mkdirSync(ps.dirname(path), { recursive: true })

  fs.writeFileSync(path, resultString)
  spinner.succeed(
    `${chalk.greenBright(`[${item.count}] 执行 Action`)}: ${item.description}`
  )
}

export { add }
