import fs from 'fs'
import ps from 'path'
import { getConfigNameMap } from '../getConfigNameMap/index.js'

const ignoreDir: Record<string, boolean> = {
  node_modules: true,
  types: true,
  dist: true
}

/** 用于判断该路径是否忽略
 *
 * @param path 需要判断的路径
 * @param ignoreDir 应当忽略的文件夹
 * @returns 返回一个布尔值, 当 path 满足以下三种情况之一时, 返回 false
 * 1. path 是 普通文件
 * 2. path 是 ignoreDir 中包含的文件夹
 * 3. path 是 以.开头的文件夹
 */
const shouldIgnore = function (
  path: string,
  ignoreDir: Record<string, boolean>
): boolean {
  const dirName = ps.basename(path)

  if (!fs.statSync(path).isDirectory()) return false

  if (ignoreDir[dirName]) return false

  if (dirName[0] === '.') return false

  return true
}

/** 基于 basePath 路径上寻找配置文件
 *
 * @param basePath 基础路径
 * @param configName 配置文件的名字,不需要后缀
 * @returns 若配置文件存在返回配置文件的绝对路径, 若不存在则返回空字符串
 */
const searchConfigFilePath = function (
  basePath: string,
  configName: string
): string {
  // Closure variables
  let flag = false
  let result = ''

  const configNameMap = getConfigNameMap(configName)

  function recursiveFind (basePath: string): string {
    const files = fs.readdirSync(basePath)

    const dirFiles = files.filter((item) => {
      const itemPath = ps.join(basePath, item)
      const basename = ps.basename(item)

      // 若目录下存在目标配置文件, 那么更新闭包变量
      if (configNameMap.has(basename)) {
        flag = true
        result = itemPath
      }

      return shouldIgnore(itemPath, ignoreDir)
    })

    if (flag) return result

    for (const dir of dirFiles) {
      // 若在迭代的过程中找到了配置文件, 那么直接 return
      if (flag) return result

      const newBasePath = ps.join(basePath, dir)
      result = recursiveFind(newBasePath)
    }

    return result
  }

  result = recursiveFind(basePath)
  return result
}

export { shouldIgnore, searchConfigFilePath }
