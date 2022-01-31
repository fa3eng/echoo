import fs from 'fs'
import ora from 'ora'
import { configMap } from '../index.js'
import { add } from './addType/index.js'
import { append } from './appendType/index.js'
import { makeBackupPath } from './utility/makeBackupFile.js'

const generateTemplate = async function (): Promise<void> {
  const actionList = configMap.get('actionsResult')

  for (const item of actionList) {
    const { type } = item
    item.isUse = true
    item.count = actionList.indexOf(item) + 1

    const spinner = ora(
      `action: ${item.description} path: ${item.path}`
    ).start()

    if (type === 'add') {
      await add(item, spinner)
    }

    if (type === 'append') {
      await append(item, spinner)
    }
  }

  // 结束阶段,需要将生成的 backup 删除
  for (const item of actionList) {
    const { type } = item

    // 只有当 add action 是覆盖文件的时候才会生成 backup
    if ((type === 'add' && item.isForce === true) || type === 'append') {
      const backupPath = makeBackupPath(item.path)
      fs.rmSync(backupPath)
    }
  }
}

export { generateTemplate }
