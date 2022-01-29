import ps from 'path'

function makeBackupPath (path: string): string {
  // 在执行替换之前, 给文件做一个备份, 防止出现错误
  const { name, dir } = ps.parse(path)
  const backupPath = ps.resolve(dir, `.${name}`)

  return backupPath
}

export { makeBackupPath }
