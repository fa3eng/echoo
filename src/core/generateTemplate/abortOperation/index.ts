import fs from 'fs'
import { makeBackupPath } from '../utility/makeBackupFile.js'
import { configMap } from '../../index.js'
import { IActionsResult } from '../../../types/index.js'

const abortOperation = function (): void {
  const actionList = configMap.get('actionsResult')

  const map = new Map([
    ['add', abortByAdd],
    ['append', abortByAppend]
  ])

  actionList.filter(item => item.isUse).forEach((item) => {
    const fn = map.get(item.type)
    if (fn == null) return
    fn(item)
  })
}

const rollback = function (item: IActionsResult): void {
  const backupPath = makeBackupPath(item.path)
  fs.writeFileSync(item.path, fs.readFileSync(backupPath))
  fs.rmSync(backupPath)
}

const abortByAdd = function (item: IActionsResult): void {
  // 回滚时, 只删除新创建的文件以及其创造出来的路径
  if (item.isFileAlreadyExists === false) {
    fs.rmSync(item.path)
    if (item.createdPath !== undefined) fs.rmdirSync(item.createdPath, { recursive: true })
  }

  if (item.isForce === true) {
    rollback(item)
  }
}

const abortByAppend = rollback

export { abortOperation }
