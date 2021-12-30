import {
  getConfigFilePathEffect,
  generatorFuncEffect,
  echooAPI
} from './core/index'

const gen = function (optionsConfig: IOptionsConfig): void {
  const {
    force = false,
    externalTemplates = false,
    configurationPath = ''
  } = optionsConfig

  console.log(force)
  // 获取配置文件路径, 该函数的副作用是
  getConfigFilePathEffect(externalTemplates, configurationPath)
  console.log(echooAPI.getEchoorcFilePath())

  // 通过配置文件路径, 运行配置文件中的 Generator 函数, 副作用是将配置文件中的配置读取到 configurationCenter
  generatorFuncEffect(echooAPI.getEchoorcFilePath())
  console.log(echooAPI.getGeneratorMap())
  // console.log(configurationCenter.generatorMap)
}

export { gen }
