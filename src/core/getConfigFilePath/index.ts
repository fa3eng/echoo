import ps, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { configMap } from '../index.js'
import { judgePathValidity } from './judgePathValidity/index.js'
import { searchConfigFilePath } from './searchConfigFilePath/index.js'
import { logError, logWarning } from '../../base/chalk/index.js'

const filename = fileURLToPath(import.meta.url)
const dirname_ = dirname(filename)

const buildInEchoorcPath = ps.resolve(
  dirname_,
  '../../../',
  'built-in-template',
  'echoorc.js'
)

/** 返回需要的配置文件路径, 以及修改配置中心文件
 *
 * @param useExternalTemplates 是否使用内置的模板, 依赖于 flag -e
 * @param configurationPath CLI 上指定的路径
 * @returns 配置文件的路径
 */
const getConfigFilePath = function (
  useExternalTemplates: boolean,
  configurationPath: string
): string {
  if (
    configurationPath !== '' &&
    judgePathValidity(configurationPath, 'echoorc')
  ) {
    configMap.set('echoorcFilePath', configurationPath)
    return configurationPath
  }

  if (!useExternalTemplates) {
    configMap.set('echoorcFilePath', buildInEchoorcPath)
    return buildInEchoorcPath
  }

  // 没有指定路径则在目录中搜索路径
  const path = searchConfigFilePath(process.cwd(), 'echoorc')

  if (path === '') {
    logError('没找到路径')
    process.exit(1)
  }

  if (ps.dirname(path) !== process.cwd()) {
    logWarning('警告: 当前配置文件并不在cwd下, 建议将配置置于cwd')
  }

  configMap.set('echoorcFilePath', path)
  return path
}

export { getConfigFilePath }
