import { configMap } from '../index.js'
import ps, { dirname } from 'path'
import { judgePathValidity } from './judgePathValidity.js'
import { searchConfigFilePath } from './searchConfigFilePath.js'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const buildInEchoorcPath = ps.resolve(__dirname, '../../../', 'built-in-template', 'echoorc.js')

/** 返回需要的配置文件路径, 以及修改配置中心文件
 *
 * @param useExternalTemplates 是否使用内置的模板, 依赖于 flag -e
 * @returns 配置文件的路径
 */
const getConfigFilePathEffect = function (useExternalTemplates: boolean, configurationPath: string): string {
  if (configurationPath !== '' && judgePathValidity(configurationPath, 'echoorc')) {
    configMap.set('echoorcFilePath', configurationPath)
    return configurationPath
  }

  if (!useExternalTemplates) {
    configMap.set('echoorcFilePath', buildInEchoorcPath)
    return buildInEchoorcPath
  }

  const path = searchConfigFilePath(process.cwd(), 'echoorc')

  if (path === '') {
    console.error('没找到路径')
    process.exit(1)
  }

  if (ps.dirname(path) !== process.cwd()) {
    console.warn('警告: 当前配置文件并不在cwd下, 建议将配置置于cwd')
  }

  configMap.set('echoorcFilePath', path)

  return path
}

export { getConfigFilePathEffect }
