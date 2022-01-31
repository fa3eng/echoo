import template from 'art-template'
import fs, { accessSync } from 'fs'
import ps from 'path'
import { Ora } from 'ora'
import { IActionAdd } from '../../../types/index.js'
import { abortOperation } from '../abortOperation/index.js'
import { handleErrorPrompt } from '../utility/handleErrorPrompt.js'
import { makeInfoMessage } from '../utility/makeMessage.js'
import { makeBackUpFile } from '../utility/makeBackupFile.js'

const add = async function (item: IActionAdd, spinner: Ora): Promise<any> {
  const { data, templatePath, path } = item

  item.isFileAlreadyExists = false
  item.isForce = false

  try {
    accessSync(path)

    item.isFileAlreadyExists = true
    spinner.stop()

    const howOperation = await handleErrorPrompt('add', item)

    if (howOperation === 'abort') {
      abortOperation()
      process.exit(1)
    }

    if (howOperation === 'skip') {
      spinner.fail(makeInfoMessage('skip', item))
      return
    }

    if (howOperation === 'force') {
      // 覆盖生成的话, 会存储一个文件到本地作为备份, 并且记录本次生成是强制覆盖的
      // 在执行替换之前, 给文件做一个备份, 防止出现错误
      // const backupPath = makeBackupPath(path)
      // fs.writeFileSync(backupPath, )
      makeBackUpFile(path, fs.readFileSync(path).toString())
      item.isForce = true
      throw Error('force')
    }
  } catch {
    const resultString =
      data == null
        ? fs.readFileSync(templatePath).toString()
        : template(templatePath, data)

    addType(path, resultString, item, spinner)
  }
}

const addType = function (
  path: string,
  resultString: string,
  item: IActionAdd,
  spinner: Ora
): void {
  item.createdDirPath = fs.mkdirSync(ps.dirname(path), { recursive: true })

  fs.writeFileSync(path, resultString)
  spinner.succeed(makeInfoMessage('succeed', item))
}

export { add }
