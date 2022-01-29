import template from 'art-template'
import fs, { accessSync } from 'fs'
import ps from 'path'
import { Ora } from 'ora'
import { logInfo } from '../../../base/chalk/index.js'
import { createListPrompt, makeBackupPath } from '../../../base/index.js'
import { IActionsResult } from '../../../types/index.js'
import { abortOperation } from '../abortOperation/index.js'

const add = async function (item: IActionsResult, spinner: Ora): Promise<any> {
  const { data, templatePath, path } = item

  let isFileExists = true
  item.isFileAlreadyExists = false
  let howOperation = null

  try {
    accessSync(path)
    item.isFileAlreadyExists = true
  } catch {
    isFileExists = false
  }

  if (isFileExists) {
    spinner.fail(`action: ${item.description}\npath: ${item.path}`)
    // 处理错误
    const result = await createListPrompt({
      type: 'list',
      name: 'handleFileExistsError',
      message: `${ps.basename(item.path)}文件已存在, 请问如何操作 ?`,
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
        },
        {
          name: '强制生成 (会覆盖原来的内容, 请考虑清楚)',
          value: 'force'
        }
      ]
    })

    howOperation = result.handleFileExistsError
  }

  if (howOperation === 'abort') {
    logInfo('取消命令')
    // 复原操作
    // add 操作, 直接删除文件就行了
    // append 操作, 获取备份文件 -> 覆盖 -> 结束的时候删除文件
    abortOperation()
    process.exit(1)
  }

  if (howOperation === 'skip') {
    logInfo('跳过本次 action')
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

const addType = function (path: string, resultString: string, item: IActionsResult, spinner: Ora): void {
  item.createdPath = fs.mkdirSync(ps.dirname(path), { recursive: true })

  fs.writeFileSync(path, resultString)
  spinner.succeed(`action: ${item.description}\npath: ${path}`)
}

export { add }
