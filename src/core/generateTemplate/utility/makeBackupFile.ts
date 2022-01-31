import ps from 'path'
import { accessSync, writeFileSync } from 'fs'

function makeBackupPath (path: string): string {
  // 在执行替换之前, 给文件做一个备份, 防止出现错误
  const { name, dir } = ps.parse(path)
  const backupPath = ps.resolve(dir, `.${name}`)

  return backupPath
}

const makeBackUpFile = function (path: string, fileContent: string): void {
  // 备份
  const backupPath = makeBackupPath(path)
  try {
    accessSync(backupPath)
  } catch {
    // 如果备份文件不存在, 我们才进行备份
    writeFileSync(backupPath, fileContent)
  }
}

export { makeBackUpFile, makeBackupPath }
