import { Ora } from 'ora'
import template from 'art-template'
import fs, { accessSync, readFileSync, writeFileSync } from 'fs'
import ps from 'path'
import { logInfo } from '../../../base/chalk/index.js'
import { createListPrompt } from '../../../base/index.js'
import { IActionsResult } from '../../../types/index.js'
import { abortOperation } from '../abortOperation/index.js'

const append = async function (item: IActionsResult, spinner: Ora): Promise<void> {
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
    // 文件不存在, 处理异常
    spinner.fail(`action: ${item.description}\npath: ${item.path}`)
    const result = await createListPrompt({
      type: 'list',
      name: 'handleFileExistsError',
      message: `${item.path}文件不存在, 请问如何操作 ?`,
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
          name: '撤销命令 (回滚, 你可以选择哪些 actions 是需要保留的)',
          value: 'skip'
        }
      ]
    })

    howOperation = result.handleFileExistsError
  }

  if (howOperation === 'skip') {
    logInfo('跳过本次 action')
    return
  }

  if (howOperation === 'abort') {
    logInfo('取消本次命令')
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

  const pattern_ = new RegExp(pattern)
  const fileContent = readFileSync(path).toString()

  // 在执行替换之前, 给文件做一个备份, 防止出现错误
  const { name, dir } = ps.parse(path)
  const backupPath = ps.resolve(dir, `.${name}`)

  // 如果备份文件已经存在了, 将不执行备份操作
  try {
    accessSync(backupPath)
  } catch {
    fs.writeFileSync(backupPath, fileContent)
  }

  // 注意: 在添加之前换行, 防止在一个点多次添加的时候, 内容不换行
  const temp = fileContent.replace(pattern_, '\n')
  const resultContent = temp.replace(pattern_, resultString)

  try {
    writeFileSync(path, resultContent)
    spinner.succeed(`action: ${item.description}\npath: ${item.path}`)
  } catch (err) {
    console.log(err)
  }
}

export { append }
