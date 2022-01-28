import fs from 'fs'
import ps from 'path'
import { logError } from '../../../base/chalk/index.js'
import { getConfigNameMap } from '../getConfigNameMap/index.js'

// 判断路径合法性, 以及路径是否存在
const judgePathValidity = function (path: string, configName: string): boolean {
  try {
    const configNameMap = getConfigNameMap(configName)
    const files = fs.readdirSync(ps.parse(path).dir)

    for (const file of files) {
      const filePath = ps.join(path, file)
      if (fs.statSync(filePath).isDirectory()) continue

      if (configNameMap.has(file)) return true
    }
  } catch {
    logError('路径不合法或者配置文件不存在')
    process.exit(1)
  }

  return false
}

export { judgePathValidity }
