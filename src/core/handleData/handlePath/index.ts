import { ActionsListItem } from './../../../types/index.js'
import ps from 'path'
import { configMap } from '../../index.js'

const handlePath = function (actionList: ActionsListItem[]): ActionsListItem[] {
  const actionResult = actionList.map((item) => {
    const { path, templatePath } = item
    const path_ = handlePathData(path)
    const templatePath_ = handlePathData(templatePath)

    return { ...item, path: path_, templatePath: templatePath_ }
  })

  return actionResult
}

// 处理 Path
const handlePathData = function (path: string): string {
  // 路径分为三种情况
  // 1. / 开头 -> 直接判断为绝对路径
  // 2. ./ 开头 -> 相对于配置文件的路径
  // 3. 字符开头 -> 相对于 cwd 的路径
  const echoorcFileDirPath = ps.dirname(configMap.get('echoorcFilePath'))

  const firstChar = path[0]

  switch (firstChar) {
    case '/':
      return path
    case '.':
      return ps.join(echoorcFileDirPath, path)
    default:
      return ps.join(process.cwd(), path)
  }
}

export { handlePath }
