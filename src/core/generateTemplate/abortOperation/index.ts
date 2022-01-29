import { configMap } from '../../index.js'
import fs from 'fs'
import ps from 'path'
import { makeBackupPath } from '../../../base/index.js'

const abortOperation = function (): any {
  const actionList = configMap.get('actionsResult')

  actionList.filter(item => item.isUse).forEach((item) => {
    if (item.type === 'add' && item.isFileAlreadyExists === false) {
      // 检查当前文件是否存在, 如果存在那么就不删除
      fs.rmSync(item.path)
      // 检查是否在在创建文件的时候新创建了路径, 如果新创建了路径, 那么应该去删除
      if (item.createdPath !== undefined) {
        fs.rmdirSync(item.createdPath, { recursive: true })
      }
    }

    // add action 的同时, 强制覆盖了原本的文件, 此时需要恢复原装
    if (item.type === 'add' && item.isForce === true) {
      const backupPath = makeBackupPath(item.path)
      fs.writeFileSync(item.path, fs.readFileSync(backupPath))
      fs.rmSync(backupPath)
    }

    if (item.type === 'append') {
      const { name, dir } = ps.parse(item.path)
      const backupPath = ps.resolve(dir, `.${name}`)

      try {
        const fileContent = fs.readFileSync(backupPath).toString()
        fs.writeFileSync(item.path, fileContent)
        fs.rmSync(backupPath)
      } catch (error) {
        // 不处理
      }
    }
  })
}

export { abortOperation }
