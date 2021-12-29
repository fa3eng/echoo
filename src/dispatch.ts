import { getConfigFilePathEffect, configurationCenter } from './core/index'

const gen = function (optionsConfig: IOptionsConfig): void {
  const {
    force = false,
    externalTemplates = false,
    configurationPath = ''
  } = optionsConfig
  console.log(force)

  getConfigFilePathEffect(externalTemplates, configurationPath)
  console.log(configurationCenter.echoorcFilePath)
}

export { gen }
