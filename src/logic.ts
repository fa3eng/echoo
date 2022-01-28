import { configMap, effectEchooAPI } from './core/index.js'
import { IOptionsConfig } from './types/index.js'

const {
  getConfigFilePath,
  getConfigInfo,
  selectGenerator,
  handleData,
  generateTemplate
} = effectEchooAPI

const gen = async function (optionsConfig: IOptionsConfig): Promise<void> {
  const {
    externalTemplates = false,
    configurationPath = ''
  } = optionsConfig

  // 1. 获取配置文件路径, 并将配置文件路径存入 configMap
  getConfigFilePath(externalTemplates, configurationPath)

  // 2. 通过配置文件路径获取配置, 并将配置信息存入 configMap
  await getConfigInfo(configMap.get('echoorcFilePath'))

  // 3. 根据配置文件信息选择生成器, 并将对应生成器配置信息存入 configMap
  await selectGenerator(configMap.get('generatorsMap'))

  // 4.
  await handleData(configMap.get('currentGenerator'))

  generateTemplate()
}

export { gen }
