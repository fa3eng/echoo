import { echooAPI, effectEchooAPI } from './core'

const {
  getConfigFilePathEffect,
  generatorFuncEffect,
  createDispatchPrompt
} = effectEchooAPI

const {
  setForce,
  getEchoorcFilePath,
  getGeneratorMap,
  getCurrentGenerator
} = echooAPI

const gen = async function (optionsConfig: IOptionsConfig): Promise<void> {
  const {
    force = false,
    externalTemplates = false,
    configurationPath = ''
  } = optionsConfig

  // 存储 force 参数
  setForce(force)

  // 获取配置文件路径, 该函数的副作用是
  getConfigFilePathEffect(externalTemplates, configurationPath)

  // 通过配置文件路径, 运行配置文件中的 Generator 函数, 副作用是将配置文件中的配置读取到 configurationCenter
  generatorFuncEffect(getEchoorcFilePath())

  await createDispatchPrompt(getGeneratorMap())

  console.log(getCurrentGenerator())
}

export { gen }
