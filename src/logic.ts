import { configMap, effectEchooAPI } from './core/index.js'
import { IOptionsConfig } from './types/index.js'

const {
  getConfigFilePathEffect,
  generatorFuncEffect,
  createDispatchPrompt,
  handleData,
  generateTemplate
} = effectEchooAPI

const gen = async function (optionsConfig: IOptionsConfig): Promise<void> {
  const {
    force = false,
    externalTemplates = false,
    configurationPath = ''
  } = optionsConfig

  // 存储 force 参数
  configMap.set('force', force)

  // 获取配置文件路径, 该函数的副作用是在 configMap 中获得配置文件路径
  getConfigFilePathEffect(externalTemplates, configurationPath)

  // 通过配置文件路径, 运行配置文件中的 Generator 函数, 副作用是将配置文件中的配置读取到 configurationCenter
  await generatorFuncEffect(configMap.get('echoorcFilePath'))

  // 创建 generator 分发页面, 并且将获得的数据存储到数据中
  await createDispatchPrompt(configMap.get('generatorMap'))

  await handleData(configMap.get('currentGenerator'))

  // console.log(configMap.get('actionsResult'))
  generateTemplate()
}

export { gen }
