import { ActionsListItem } from './../../../types/index.js'
import fs from 'fs'
import { makeBackupPath } from '../utility/makeBackupFile.js'
import { configMap } from '../../index.js'

const abortOperation = function (): void {
  const actionList = configMap.get('actionList')

  const map = new Map([
    ['add', abortByAdd],
    ['append', abortByAppend]
  ])

  actionList
    .filter(item => item.isUse)
    .forEach(item => {
      const fn = map.get(item.type)
      if (fn == null) return
      fn(item)
    })
}

const rollback = function (item: ActionsListItem): void {
  const backupPath = makeBackupPath(item.path)
  fs.writeFileSync(item.path, fs.readFileSync(backupPath))
  fs.rmSync(backupPath)
}

const abortByAdd = function (item: ActionsListItem): void {
  if (item.type === 'append') return

  // 回滚时, 只删除新创建的文件以及其创造出来的路径
  if (!item.isFileAlreadyExists) {
    fs.rmSync(item.path)
    if (item.createdDirPath !== undefined) {
      fs.rmdirSync(item.createdDirPath, { recursive: true })
    }
  }

  if (item.isForce) {
    rollback(item)
  }
}

const abortByAppend = rollback

export { abortOperation }
